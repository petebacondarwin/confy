import {take, call, put, race, fork, cancel} from 'redux-saga/effects';
import {sessionsActionTypes, updateFromServerAction} from './states';

export function sessionsSagaFactory(firebaseService) {

  // Get hold of the "sessions" Firebase node
  const firebaseRef = firebaseService.getNode('/sessions');

  function* handleServerUpdates(channel) {
    while(true) { /*eslint no-constant-condition: 0*/
      // Wait for an update to arrive on the channel
      const snapshot = yield call(channel.take);

      // Map the sessions snapshot into an array
      let sessions = [];
      snapshot.forEach((session) => {
        sessions.push(session.val());
      });

      // Dispatch the new sessions list to the store
      yield put(updateFromServerAction(sessions));
    }
  }


  function* sessionSaveSaga() {}

  function* sessionRemoveSaga() {
    yield take(sessionsActionTypes.REMOVE);
    yield call(firebaseService.remove())
  }


  function* sessionsSaga() {
    while(true) { /*eslint no-constant-condition: 0*/
      // Wait for a SUBSCRIBE action
      yield take(sessionsActionTypes.SUBSCRIBE);

      // Kick off the tasks that will deal with saving and removing sessions
      const saveTask = yield fork(sessionSaveSaga);
      const removeTask = yield fork(sessionRemoveSaga);

      // Connect the "value" event on the node to a channel
      // from which the saga middleware can "pull"
      let channel = yield call(firebaseService.on, firebaseRef, 'value');

      // Monitor the "sessions" updates until we get an UNSUBSCRIBE action
      race({
        updates: yield handleServerUpdates(channel),
        unsubscribe: yield take(sessionsActionTypes.UNSUBSCRIBE)
      });

      // Disconnect and destroy the channel
      yield call(firebaseService.off, firebaseRef, 'value', channel);
      channel = null;
      yield cancel(saveTask);
      yield cancel(removeTask);
    }
  }

  function* handleSave() {
    while(true) {
      const {session} = yield take(sessionsActionTypes.SAVE);
      yield call(firebaseService.save, session);
    }
  }

  function* handleAdd() {
    while(true) {
      const {session} = yield take(sessionsActionTypes.ADD);
      yield call(firebaseService.add, session);
    }
  }

  function* handleDelete() {
    while(true) {
      const {session} = yield take(sessionsActionTypes.REMOVE);
      yield call(firebaseService.delete, session);
    }
  }

  return [sessionsSaga, handleSave];
}