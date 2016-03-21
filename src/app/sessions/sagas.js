import {isCancelError} from 'redux-saga';
import {take, call, put, cancel} from 'redux-saga/effects';
import {createChannel} from 'confy/lib/channel';
import {forkAndLoop} from 'confy/lib/forkAndLoop';
import {sessionsActionTypes, updateFromServerAction, editAction} from './states';
import {errorAction} from 'confy/app/notifications/states';

export function sessionsSagaFactory(firebaseService, $q) {

  // Get hold of the "sessions" Firebase node
  const firebaseRef = firebaseService.getNode('/sessions');
  return [sessionsSaga];

  function* sessionsSaga() {
    while(true) { /*eslint no-constant-condition: 0*/

      // Wait for a SUBSCRIBE action
      yield take(sessionsActionTypes.SUBSCRIBE);

      // Connect the "value" event on the Firebase ref to a "channel" from which we can "pull" updates
      let channel = yield call(createFirebaseChannel, firebaseRef, 'value');

      // Kick off the tasks that will deal with saving and removing sessions
      const addTask = yield forkAndLoop(sessionAddSaga);
      const saveTask = yield forkAndLoop(sessionSaveSaga);
      const removeTask = yield forkAndLoop(sessionRemoveSaga);
      const updateTask = yield forkAndLoop(takeUpdateFromFirebase, channel);

      // Wait for an unsubscribe action
      yield take(sessionsActionTypes.UNSUBSCRIBE);

      // Disconnect and destroy the channel
      yield call(disconnectChannel, firebaseRef, 'value', channel);
      channel = null;

      // Cancel the forked subtasks
      yield cancel(addTask);
      yield cancel(saveTask);
      yield cancel(removeTask);
      yield cancel(updateTask);
    }
  }


  function* takeUpdateFromFirebase(channel) {
    try {
      // Wait for an update to arrive on the channel
      const currentSnapshot = yield call([channel, channel.take]);
      // Dispatch the new sessions list to the store
      yield put(updateFromServerAction(currentSnapshot));
    } catch(e) {
      if (!isCancelError(e)) {
        yield put(errorAction(e));
      }
    }
  }

  function* sessionAddSaga() {
    try {
      // Wait for an add session action
      yield take(sessionsActionTypes.ADD);
      // Create the new session and save it
      const ref = yield call([firebaseRef, firebaseRef.push], {});
      yield call([ref, ref.set], { _isNew: true });
      // Set the action into an editing state
      yield put(editAction({key: ref.key()}));
    } catch(e) {
      if (!isCancelError(e)) {
        yield put(errorAction(e));
      }
    }
  }

  function* sessionSaveSaga() {
    const {session} = yield take(sessionsActionTypes.SAVE);
    const ref = yield call([firebaseRef, firebaseRef.child], session.key);
    delete session.value._isNew;
    try {
      yield call([ref, ref.set], session.value);
    } catch(e) {
      if (!isCancelError(e)) {
        yield put(errorAction(e));
      }
    }
  }

  function* sessionRemoveSaga() {
    try {
      const {session} = yield take(sessionsActionTypes.REMOVE);
      const ref = yield call([firebaseRef, firebaseRef.child], session.key);
      yield call([ref, ref.remove]);
    } catch(e) {
      if (!isCancelError(e)) {
        yield put(errorAction(e));
      }
    }
  }


  function createFirebaseChannel(node, eventType) {
    // We use a "channel" to convert Firebase's "push" approach to
    // redux-saga's "pull" approach
    const channel = createChannel($q);
    // Every time an event arrives we "put" it on the channel
    node.on(eventType, channel.put);
    return channel;
  }

  function disconnectChannel(node, eventType, channel) {
    node.off(eventType, channel.put);
  }
}