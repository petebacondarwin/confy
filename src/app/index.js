import 'babel-polyfill';
import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import createStateServices from 'confy/lib/createStateServices';
import {firebaseServiceFactory} from 'confy/lib/firebase';

// Middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// Import feature areas
import auth from './auth';
import sessions from './sessions';
import notifications from './notifications';

// Import other angular module dependencies
import confyApp from './modules/confyApp.component';

// Create the object containing redux state stuff
let states = {
  auth: auth.state,
  sessions: sessions.state,
  notifications: notifications.state
};

// Create an array of middleware to pass to redux
let middleware = [
  thunk,
  createLogger()
];

// Create the top level Angular app module
angular.module('app', ['ngComponentRouter', confyApp, auth.module, sessions.module])
  .constant('firebaseRootUrl', 'https://confy.firebaseio.com')
  .value('$routerRootComponent', 'confyApp')
  .factory('firebaseService', firebaseServiceFactory)
  .config(($provide)=> createStateServices($provide, states, middleware));

// Bootstrap the app
angular.bootstrap(document, ['app']);