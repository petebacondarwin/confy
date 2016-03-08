import angular from 'angular';

export default angular.module('auth/stateMachine', [])

.constant('authActionTypes', {
  LOGGING_IN: 'auth/LOGGING_IN',
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT',
  LOGIN_FAILED: 'auth/LOGIN_FAILED'
})

.constant('authStatusTypes', {
  LOGGING_IN: 'auth/LOGGING_IN',
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT'
})

.provider('authReducer', (authActionTypes, authStatusTypes) => {

  const INITIAL_STATE = {
    status: authStatusTypes.LOGGING_IN,
    userInfo: undefined,
    uid: undefined
  };

  const LOGGED_OUT_STATE = {
    status: authStatusTypes.LOGGED_OUT,
    userInfo: null,
    uid: null
  }

  return {
    reducer: (state = INITIAL_STATE, action) => {
      switch(action.type) {
        case authActionTypes.LOGGING_IN:
          return INITIAL_STATE;
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
    },
    $get: () => {}
  };
})

.name;