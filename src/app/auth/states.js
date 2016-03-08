export const authActionTypes = {
  LOGGING_IN: 'auth/LOGGING_IN',
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT',
  LOGIN_FAILED: 'auth/LOGIN_FAILED'
};

export const authStatusTypes = {
  LOGGING_IN: 'auth/LOGGING_IN',
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT'
};

const LOGGING_IN_STATE = {
  status: authStatusTypes.LOGGING_IN,
  userInfo: undefined,
  uid: undefined
};

const LOGGED_OUT_STATE = {
  status: authStatusTypes.LOGGED_OUT,
  userInfo: null,
  uid: null
}

export function reducer(state = LOGGED_OUT_STATE, action) {
  switch(action.type) {
    case authActionTypes.LOGGING_IN:
      return LOGGING_IN_STATE;
    case authActionTypes.LOGGED_IN:
      return {
        status: authStatusTypes.LOGGED_IN,
        userInfo: action.userInfo,
        uid: action.uid
      };
    case authActionTypes.LOGGED_OUT:
    case authActionTypes.LOGIN_FAILED:
      return LOGGED_OUT_STATE;
    default:
      return state;
  }
}