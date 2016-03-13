import angular from 'angular';
import {sessionsActionTypes} from '../states';

export default angular.module('sessions/actions', []).factory('sessionsActions', sessionsActionsFactory).name;


function sessionsActionsFactory(store) {

  return {
    // Subscribe to the session data in firebase
    subscribe: () => store.dispatch({ type: sessionsActionTypes.SUBSCRIBE }),
    // Unsubscribe from the session data
    unsubscribe: () => store.dispatch({ type: sessionsActionTypes.UNSUBSCRIBE })
  };
}