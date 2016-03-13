import 'babel-polyfill';
import angular from 'angular';
import createStateServices from 'confy/lib/createStateServices';
import {firebaseServiceFactory} from 'confy/lib/firebase';

// Middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// Import feature areas
import auth from './auth';
import sessions from './sessions';

// Import other angular module dependencies
import confyAppModule from './modules/confyApp.module';

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

// Create the top level Angular app module
angular.module('app', [confyAppModule, auth.module, sessions.module])
  .constant('firebaseRootUrl', 'https://confy.firebaseio.com')
  .factory('firebaseService', firebaseServiceFactory)
  .config(($provide)=> createStateServices($provide, states, middleware));

// Bootstrap the app
angular.bootstrap(document, ['app']);