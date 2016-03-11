import angular from 'angular'
import createStateServices from '@@root/lib/createStateServices'

// Middleware
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// Import feature areas
import auth from './auth'
import sessions from './sessions'

// Create the object containing redux state stuff
let states = {
  auth: auth.state,
  sessions: sessions.state
};

// Create an array of middleware to pass to redux
let middleware = [
  thunk,
  createLogger()
];

// Import other angular module dependencies
import confyAppModule from './modules/confyApp.module'

// Create the top level Angular app module
angular.module('app', [confyAppModule, auth.module, sessions.module])
  .constant('firebaseRootUrl', 'https://confy.firebaseio.com')
  .config(($provide)=> createStateServices($provide, states, middleware));

// Bootstrap the app
angular.bootstrap(document, ['app']);