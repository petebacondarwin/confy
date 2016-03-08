import angular from 'angular'

// Import our redux store
import store from './store'

// Import the angular module dependencies
import authModule from './auth'
import sessionsModule from './sessions'

// Create the top level Angular app module
angular.module('confyApp', [authModule, sessionsModule])

  .constant('firebaseRootUrl', 'https://confy.firebaseio.com')
  .value('store', store)
  .component('confyApp', { template: require('./confyApp.template.html') })

  // Initialize the application
  .run((authActions, sessionsActions) => {
    authActions.init();
    sessionsActions.subscribe();
  });

// Bootstrap the app
angular.bootstrap(document, ['confyApp']);