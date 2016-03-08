import angular from 'angular'
import Firebase from 'firebase'
import {sessionsActionTypes} from './states'

export default angular.module('sessions/actions', []).factory('sessionsActions', sessionsActionsFactory).name;


function sessionsActionsFactory(firebaseRootUrl, store, $rootScope) {

  const firebaseRef = new Firebase(firebaseRootUrl + '/sessions');

  // A place to store whether we are already subscribed
  let subscription;

  return {

    // Subscribe to the session data in firebase
    subscribe: () => store.dispatch((dispatch) => {
      if (!subscription) {
        dispatch({ type: sessionsActionTypes.SUBSCRIBE });
        subscription = firebaseRef.on("value", (snapshot) => {
          $rootScope.$apply(() => {
            dispatch({
              type: sessionsActionTypes.UPDATE,
              sessions: snapshot.val()
            });
          });
        });
      }
    }),

    // Unsubscribe from the session data
    unsubscribe: () => store.dispatch((dispatch) => {
      if (subsciption) {
        firebaseRef.off(subscription);
        dispatch({ type: sessionsActionTypes.UNSUBSCRIBE });
      }
    })
  }
}