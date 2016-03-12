import {take, call, put, cps} from 'redux-saga/effects'
import Firebase from 'firebase'
import {authActionTypes} from './states'

export default (firebaseRootUrl) => {
  const firebaseRef = new Firebase(firebaseRootUrl);

  function loggedInAction(authData) {
    return {
      type: authActionTypes.LOGGED_IN,
      userInfo: authData[authData.provider],
      uid: authData.uid
    };
  }

  function* login(provider) {
    try {
      // Wait for a login request
      const {provider} = yield take(authActionTypes.LOGIN);
      // Attempt to authenticate with firebase
      const authData = yield cps(firebaseRef.authWithOAuthPopup, provider);
      // Login was successful
      yield put(loggedInAction(authData));
    } catch(error) {
      // Login failed
      yield put({ type: authActionTypes.LOGIN_FAILED });
    }
  }

  return function* authFlow() {
    // See if we were already logged in
    const authData = yield call(firebaseRef.getAuth());
    if (authData) {
      yield put(loggedInAction(authData));
      yield take(authActionTypes.LOGOUT);
      yield call(firebaseRef.unauth())
    }

    while(true) {
      // Run the login flow in the background
      const loginTask = yield fork(login, provider);
      // Wait for a logout request or a login error
      yield take([authActionTypes.LOGOUT, authActionTypes.LOGIN_ERROR])
      // Cancel the login flow if it was still running
      yield cancel(loginTask)
      // Unauthenticate against firebase
      yield call(firebaseRef.unauth())
    }
  }
}