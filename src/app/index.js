import angular from 'angular'

// Import our redux store
import {createStateServices} from './store'

// Import feature areas
import auth from './auth'
import sessions from './sessions'

// Import other angular module dependencies
import confyAppModule from './modules/confyApp.module'

// Create the top level Angular app module
angular.module('app', [confyAppModule, auth.module, sessions.module])

  .constant('firebaseRootUrl', 'https://confy.firebaseio.com')

  .config(($provide)=> createStateServices($provide, {
    auth: auth.state,
    sessions: sessions.state
  }));

// Bootstrap the app
angular.bootstrap(document, ['app']);