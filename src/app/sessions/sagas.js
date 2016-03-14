import {take, call, put, race} from 'redux-saga/effects';
import {sessionsActionTypes, updateAction} from './states';

export function sessionsSagaFactory(firebaseService) {

  // Get hold of the "sessions" Firebase node
  const firebaseRef = firebaseService.getNode('/sessions');

  function* handleUpdates(channel) {
    while(true) { /*eslint no-constant-condition: 0*/
      // Wait for an update to arrive on the channel
      const snapshot = yield call(channel.take);
      // Dispatch the new value to the store
      yield put(updateAction(snapshot));
    }
  }


  return function* sessionsSaga() {
    while(true) { /*eslint no-constant-condition: 0*/
      // Wait for a SUBSCRIBE action
      yield take(sessionsActionTypes.SUBSCRIBE);
      // Connect the "value" event on the node to a channel
      // from which the saga middleware can "pull"
      let channel = yield call(firebaseService.on, firebaseRef, 'value');

      // Monitor the "sessions" updates until we get an UNSUBSCRIBE action
      race({
        updates: yield handleUpdates(channel),
        unsubscribe: yield take(sessionsActionTypes.UNSUBSCRIBE)
      });

      // Disconnect and destroy the channel
      yield call(firebaseService.off, firebaseRef, 'value', channel);
      channel = null;
    }
  };
}
