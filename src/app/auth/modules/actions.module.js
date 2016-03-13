import angular from 'angular'
import {authActionTypes} from '../states'

export default angular.module('auth/actions', []).factory('authActions', authActionsFactory).name;
function authActionsFactory(store) {
  return {
    login: (provider) => store.dispatch({ type: authActionTypes.LOG_IN }),
    logout: () => store.dispatch({ type: authActionTypes.LOG_OUT })
  };
}
