import angular from 'angular'
import Firebase from 'firebase'
import {authActionTypes} from './states'

export default angular.module('auth/actions', []).factory('authActions', authActionsFactory).name;


function authActionsFactory(firebaseRootUrl, store, $rootScope) {

  const firebaseRef = new Firebase(firebaseRootUrl);

  return {
    // Initialize the authentication state
    init: () => store.dispatch((dispatch) => {
      dispatch(loggedInAction(firebaseRef.getAuth()));
    }),

    // Attempt to login to firebase using the specified provider
    login: (provider) => store.dispatch((dispatch) => {
      // Tell the state machine that we are logging in
      dispatch({ type: authActionTypes.LOGGING_IN });
      // Send the request to firebase
      firebaseRef.authWithOAuthPopup(provider, (error, authData) => {
        // We are outside Angular here so we need to use create call $apply
        $rootScope.$apply(() => {
          // Tell the state machine whether we successfully logged in or not
          dispatch(loggedInAction(authData));
        });
      });
    }),

    // Logout from firebase
    logout: () => store.dispatch((dispatch) => {
      // Ask firebase to log us out
      firebaseRef.unauth();
      // Tell the state machine that we are now logged out
      dispatch({ type: authActionTypes.LOGGED_OUT });
    })
  };
}

function loggedInAction(authData) {
  if (authData) {
    return {
      type: authActionTypes.LOGGED_IN,
      userInfo: authData[authData.provider],
      uid: authData.uid
    };
  } else {
    return { type: authActionTypes.LOGIN_FAILED };
  }
}