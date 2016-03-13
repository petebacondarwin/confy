import Firebase from 'firebase';
import {createChannel} from './channel';

export function firebaseServiceFactory(firebaseRootUrl, $q) {
  // Create a reference to the root of the firebase DB to use for authentication
  const firebaseRef = new Firebase(firebaseRootUrl);

  return {

    login(provider) {
      return $q((resolve, reject) => {
        firebaseRef.authWithOAuthPopup(provider, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            resolve(authData);
          }
        });
      });
    },

    logout() {
      firebaseRef.unauth();
    },

    getAuth() {
      return firebaseRef.getAuth();
    },

    getNode(nodePath) {
      return firebaseRef.child(nodePath);
    },

    on(node, eventType) {
      // We use a "channel" to convert Firebase's "push" approach to
      // redux-saga's "pull" approach
      const channel = createChannel($q);
      // Every time an event arrives we "put" it on the channel
      node.on(eventType, channel.put);
      return channel;
    },

    off(node, eventType, channel) {
      // Remove the channel "put" handler from the event
      node.off(eventType, channel.put);
    }
  };
}