import angular from 'angular'
import {combineReducers, createStore, applyMiddleware} from 'redux'

// Middleware
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// Reducers
import {reducer as auth} from './auth/states'

// Angular Modules
import authModule from './auth';

angular.module('confyApp', [authModule])

.component('confyApp', {
  template: '<confy-login-panel></confy-login-panel>'
})

.constant('firebaseRootUrl', 'https://confy.firebaseio.com')

.value('store', createStore(
  combineReducers({
    auth
  }),
  applyMiddleware(
    thunk,
    createLogger()
  )
))

.run((authActions) => {
  authActions.init();
});

angular.bootstrap(document, ['confyApp']);