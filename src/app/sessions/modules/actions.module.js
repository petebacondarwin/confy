import angular from 'angular'
import Firebase from 'firebase'
import {sessionsActionTypes} from '../states'

export default angular.module('sessions/actions', []).factory('sessionsActions', sessionsActionsFactory).name;


function sessionsActionsFactory($rootScope, store, sessionsSelectors, firebaseRootUrl) {

  const firebaseRef = new Firebase(firebaseRootUrl + '/sessions');

  return {

    // Subscribe to the session data in firebase
    subscribe: () => store.dispatch((dispatch) => {
      if (!sessionsSelectors.getSubscription()) {
        dispatch({ type: sessionsActionTypes.SUBSCRIBE });
        let subscription = firebaseRef.on("value", (snapshot) => {
          // Firebase callbacks come from outside Angular
          $rootScope.$apply(() => {
            dispatch({
              type: sessionsActionTypes.UPDATE,
              sessions: snapshot.val(),
              subscription: subscription
            });
          });
        });
      }
    }),

    // Unsubscribe from the session data
    unsubscribe: () => store.dispatch((dispatch) => {
      let subsciption = !sessionsSelectors.getSubsciption();
      if (subscription) {
        firebaseRef.off(subscription);
        dispatch({ type: sessionsActionTypes.UNSUBSCRIBE });
      }
    })
  }
}