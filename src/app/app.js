import angular from 'angular'
import {combineReducers, createStore, applyMiddleware} from 'redux'

// Middleware
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// Reducers
import {reducer as auth} from './auth/states'
import {reducer as sessions} from './sessions/states'

// Angular Modules
import authModule from './auth'
import sessionsModule from './sessions'

angular.module('confyApp', [authModule, sessionsModule])

.component('confyApp', {
  template: '<confy-login-panel></confy-login-panel>'
})

.constant('firebaseRootUrl', 'https://confy.firebaseio.com')

.value('store', createStore(
  combineReducers({
    auth,
    sessions
  }),
  applyMiddleware(
    thunk,
    createLogger()
  )
))

.run((authActions, sessionsActions) => {
  authActions.init();
  sessionsActions.subscribe();
});

angular.bootstrap(document, ['confyApp']);