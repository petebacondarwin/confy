import {take, call, put, race, fork, cancel} from 'redux-saga/effects';
import {createChannel} from 'confy/lib/channel';
import {sessionsActionTypes, updateFromServerAction, editAction} from './states';

export function sessionsSagaFactory(firebaseService, $q) {

  // Get hold of the "sessions" Firebase node
  const firebaseRef = firebaseService.getNode('/sessions');
  return [sessionsSaga];

  function* sessionsSaga() {
    while(true) { /*eslint no-constant-condition: 0*/

      // Wait for a SUBSCRIBE action
      yield take(sessionsActionTypes.SUBSCRIBE);

      // Kick off the tasks that will deal with saving and removing sessions
      const addTask = yield fork(sessionAddSaga);
      const saveTask = yield fork(sessionSaveSaga);
      const removeTask = yield fork(sessionRemoveSaga);

      // Connect the "value" event on the Firebase ref to a "channel" from which we can "pull" updates
      let channel = yield call(createFirebaseChannel, firebaseRef, 'value');

      // Monitor the "sessions" updates until we get an UNSUBSCRIBE action
      race({
        updates: yield takeUpdateFromFirebase(channel),
        unsubscribe: yield take(sessionsActionTypes.UNSUBSCRIBE)
      });

      // Disconnect and destroy the channel
      yield call(disconnectChannel, 'value', channel);
      channel = null;

      // Cancel the forked subtasks
      yield cancel(addTask);
      yield cancel(saveTask);
      yield cancel(removeTask);
    }
  }


  function* takeUpdateFromFirebase(channel) {
    while(true) { /*eslint no-constant-condition: 0*/
      // Wait for an update to arrive on the channel
      const currentSnapshot = yield call([channel, channel.take]);
      // Dispatch the new sessions list to the store
      yield put(updateFromServerAction(currentSnapshot));
    }
  }

  function* sessionAddSaga() {
    while(true) {
      // Wait for an add session action
      yield take(sessionsActionTypes.ADD);
      // Create the new session and save it
      const ref = yield call([firebaseRef, firebaseRef.push], {});
      yield call([ref, ref.set], { name: '' });
      // Set the action into an editing state
      yield put(editAction({key: ref.key()}));
    }
  }

  function* sessionSaveSaga() {
    while(true) {
      const {session} = yield take(sessionsActionTypes.SAVE);
      const ref = yield call([firebaseRef, firebaseRef.child], session.key);
      yield call([ref, ref.set], session.value);
    }
  }

  function* sessionRemoveSaga() {
    while(true) {
      const {session} = yield take(sessionsActionTypes.REMOVE);
      const ref = yield call([firebaseRef, firebaseRef.child], session.key);
      console.log(ref.toString());
      yield call([ref, ref.remove]);
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
    console.log('disconnectChannel');
    node.off(eventType, channel.put);
  }
}