/*eslint no-constant-condition: 0*/
import {isCancelError} from 'redux-saga';
import {call, fork} from 'redux-saga/effects';

// A helper for DRYing up sub-sagas
export function* forkAndLoop(saga, ...args) {
  return yield fork(function* () {
    try {
      while(true) {
        yield call(saga, ...args);
      }
    } catch(e) {
      if (!isCancelError(e)) {
        throw (e);
      }
    }
  });
}
