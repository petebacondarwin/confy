import {take, call, put, cps, fork, cancel} from 'redux-saga/effects';
import Firebase from 'firebase';
import {authActionTypes} from './states';

export function authFlowFactory(firebaseRootUrl) {
  const firebaseRef = new Firebase(firebaseRootUrl);

  function createLoggedInAction(authData) {
    return {
      type: authActionTypes.LOGGED_IN,
      userInfo: authData[authData.provider],
      uid: authData.uid
    };
  }

  function* logout() {
    return call([firebaseRef, firebaseRef.unauth]);
  }

  function* getAuth(provider) {
    return cps([firebaseRef, firebaseRef.authWithOAuthPopup], provider);
  }

  function* loginFlow() {
    try {
      // Wait for a login request
      const {provider} = yield take(authActionTypes.LOGIN);
      // Attempt to authenticate with firebase
      const authData = yield getAuth(provider);
      // Login was successful
      yield put(createLoggedInAction(authData));
    } catch(error) {
      // Login failed
      yield put({ type: authActionTypes.LOGIN_FAILED });
    }
  }

  return function* authFlow() {
    // See if we were already logged in
    const authData = yield getAuth();
    if (authData) {
      yield put(createLoggedInAction(authData));
      yield take(authActionTypes.LOGOUT);
      yield logout();
    }

    while(true) {
      // Run the login flow in the background
      const loginTask = yield fork(loginFlow);
      // Wait for a logout request or a login error
      yield take([authActionTypes.LOGOUT, authActionTypes.LOGIN_ERROR]);
      // Cancel the login flow if it was still running
      yield cancel(loginTask);
      // Unauthenticate against firebase
      yield logout();
    }
  };
}