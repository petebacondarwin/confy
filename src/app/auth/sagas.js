import {isCancelError} from 'redux-saga';
import {take, call, put, cps, race} from 'redux-saga/effects';
import Firebase from 'firebase';
import {authActionTypes} from './states';

// Since we need the `firebaseRootUrl` service to create a firebase reference
// with which to do the authentication, we must ask for it to be injected
// into our factory function by the angular injector
export function authFlowFactory(firebaseRootUrl) {

  // Create a reference to the root of the firebase DB to use for authentication
  const firebaseRef = new Firebase(firebaseRootUrl);

  // A login saga to handle making the authentication request
  function* loginSaga() {
    // Wait for a LOGIN action
    const {provider} = yield take(authActionTypes.LOGIN);
    try {
      // Run the authentication request
      // we use `cps()` because the `authWithOAuthPopup` method accepts a node-style callback
      const authData = yield cps([firebaseRef, firebaseRef.authWithOAuthPopup], provider);
      yield put(createLoginAction(authData));
    } catch(error) {
      // There are two reasons for an exception:
      // - the authentication failed
      // - the loginSaga was cancelled (perhaps by a LOGOUT action)
      if (!isCancelError(error)) {
        yield put({type: authActionTypes.LOGIN_FAILED, error});
      }
    }
  }

  // A logout saga to handle unauthentication
  function* logout() {
    // Wait for a LOGOUT action
    yield take(authActionTypes.LOGOUT);
    // Do the unauthentication
    yield call([firebaseRef, firebaseRef.unauth]);
  }

  // The main saga for authentication
  return function* authSaga() {
    // Are we already logged in?
    const authData = yield firebaseRef.getAuth();
    if (authData) {
      yield put(createLoginAction(authData));
    }

    // Race the login and logout flows against each other
    // (this allows a logout to cancel a pending login)
    while(true) { /*eslint no-constant-condition: 0*/
      yield race({
        authData: call(loginSaga),
        loggedOut: call(logout)
      });
    }
  };

  function createLoginAction(authData) {
    return {
      type: authActionTypes.LOGIN_SUCCESS,
      userInfo: authData[authData.provider],
      uid: authData.uid
    };
  }
}