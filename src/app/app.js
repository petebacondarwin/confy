import angular from 'angular'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import storeModule from './common/store'
import authModule from './auth'

angular.module('app', [storeModule, authModule])

.component('confyApp', {
  template: '<confy-login-panel></confy-login-panel>'
})


.config((storeProvider, authReducerProvider) => {

  storeProvider
    .reducers({
      auth: authReducerProvider.reducer
    })
    .middleware([
      thunk,
      createLogger()
    ]);
})

.run((store) => {
  console.log(store.getState());
});