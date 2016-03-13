import {isCancelError} from 'redux-saga';
import {take, call, put, cps, fork, cancel} from 'redux-saga/effects';
import Firebase from 'firebase';
import {authActionTypes} from './states';

export function authFlowFactory(firebaseRootUrl) {

  const firebaseRef = new Firebase(firebaseRootUrl);

  function createLoggedInAction(authData) {
    console.log(authData);
    return {
      type: authActionTypes.LOGIN_SUCCESS,
      userInfo: authData[authData.provider],
      uid: authData.uid
    };
  }

  function* logout() {
    yield call([firebaseRef, firebaseRef.unauth]);
  }

  function* authenticate(provider) {
    yield cps([firebaseRef, firebaseRef.authWithOAuthPopup], provider);
  }

  function* loginFlow() {
    try {
      console.log('loginFlow');
      // Wait for a login request
      const {provider} = yield take(authActionTypes.LOGIN);
      console.log('loginFlow: login', provider);
      // Attempt to authenticate with firebase
      const authData = yield call(authenticate(provider));
      // Login was successful
      yield put(createLoggedInAction(authData));
    } catch(error) {
      if (!isCancelError(error)) {
        // Login failed
        yield put({ type: authActionTypes.LOGIN_FAILED, error });
      }
    }
  }

  return function* authFlow() {
    console.log('authFlow');
    // See if we were already logged in
    const authData = yield firebaseRef.getAuth();
    if (authData) {
      yield put(createLoggedInAction(authData));
      yield take(authActionTypes.LOGOUT);
      yield logout();
    }

    while(true) {
      console.log('authFlow: logged out');
      // Run the login flow in the background
      const loginTask = yield fork(loginFlow);
      // Wait for a logout request or a login error
      const x = yield take([authActionTypes.LOGOUT, authActionTypes.LOGIN_ERROR]);
      console.log('authFlow: not logged in', x);
      // Cancel the login flow if it was still running
      yield cancel(loginTask);
      // Unauthenticate against firebase
      yield logout();
    }
  };
}