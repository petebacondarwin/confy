import Firebase from 'firebase';

export const LOGGING_IN = 'auth/LOGGING_IN';
export const LOGGED_IN = 'auth/LOGGED_IN';
export const LOGGED_OUT = 'auth/LOGGED_OUT';
export const LOGIN_FAILED = 'auth/LOGIN_FAILED';

const initialState = {
  status: LOGGING_IN,
  userInfo: undefined,
  uid: undefined
};

const loggedOutState = {
  status: LOGGED_OUT,
  userInfo: null,
  uid: null
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case LOGGING_IN:
      return initialState;
    case LOGGED_IN:
      return {
        status: LOGGED_IN,
        userInfo: action.userInfo,
        uid: action.uid
      };
    case LOGGED_OUT:
    case LOGIN_FAILED:
      return loggedOutState;
    default:
      return state;
  }
}

const firebaseRef = new Firebase('https://confy.firebaseio.com');

export function initAuth() {
  return (dispatch, getState) => {
    firebaseRef.onAuth((authData) => {
      if (authData) {
        dispatch({
          type: LOGGED_IN,
          userInfo: authData[authData.provider],
          uid: authData.uid
        });
      } else if (getState().userInfo !== null) {
        dispatch({ type: LOGGED_OUT });
      }
    });
  };
}

export function login(provider) {
  return (dispatch, getState) => {
    dispatch({ type: LOGGING_IN });
    firebaseRef.authWithOAuthPopup(provider, (error) => {
      if (error) {
        dispatch({ type: LOGIN_FAILED });
      }
    });
  };
}

export function logout() {
  return () => {
    firebaseRef.unauth();
  };
}