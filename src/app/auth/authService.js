import angular from 'angular'
import Firebase from 'firebase'

export default angular.module('auth/actions', [])

.factory('authService', (store, $rootScope, authActionTypes, authStatusTypes) => {

  // TODO: Configure this elsewhere
  const firebaseRef = new Firebase('https://confy.firebaseio.com');

  // Initialize the authentication state
  store.dispatch((dispatch) => {
    const authData = firebaseRef.getAuth();
    dispatch(createLoginAction(authData));
  });

  class AuthService {
    constructor(store) {
      this.store = store;
    }

    _getState() {
      return this.store.getState().auth;
    }

    isLoggedIn() {
      return this._getState().status === authStatusTypes.LOGGED_IN;
    }

    getUserInfo() {
      return this._getState().userInfo;
    }

    login(provider) {
      this.store.dispatch((dispatch) => {
        // Tell the state machine that we are logging in
        dispatch({ type: authActionTypes.LOGGING_IN });
        // Send the request to firebase
        firebaseRef.authWithOAuthPopup(provider, (error, authData) => {
          // We are outside Angular here so we need to use create call $apply
          $rootScope.$apply(() => {
            // Tell the state machine whether we successfully logged in or not
            dispatch(createLoginAction(authData));
          });
        });
      });
    }

    logout() {
      this.store.dispatch((dispatch) => {
        // Ask firebase to log us out
        firebaseRef.unauth();
        // Tell the state machine that we are now logged out
        dispatch({ type: authActionTypes.LOGGED_OUT });
      });
    }
  }

  return new AuthService(store);

  function createLoginAction(authData) {
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
})

.name;