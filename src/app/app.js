import angular from 'angular'
import common from './common'

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {reducer, initAuth} from './states/auth'

angular.module('app', [common])
.component('confyApp', {
  template: '<confy-login-panel></confy-login-panel>'
})

.factory('store', ($rootScope) => {
  const logger = createLogger();
  const store = createStore(reducer, applyMiddleware(thunk, logger));
  store.dispatch(initAuth());
  store.subscribe(() => $rootScope.$$phase || $rootScope.$apply());
  return store;
});
