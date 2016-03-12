import angular from 'angular'
import {authActionTypes} from '../states'

export default angular.module('auth/actions', []).factory('authActions', authActionsFactory).name;


function authActionsFactory(firebaseRootUrl, store, $rootScope) {

  return {
    login: (provider) => store.dispatch({ type: authActionTypes.LOGGING_IN }),
    logout: () => store.dispatch({ type: authActionTypes.LOGGED_OUT })
  };
}
