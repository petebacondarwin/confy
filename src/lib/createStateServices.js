import {combineReducers, createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'


export default function createStateServices($provide, states, middleware, sagaFactories) {

  var key;
  var reducers = {};
  var Selectors = {};
  var sagaFactories = [];

  // Map the `states` to `reducers` and `selectors` objects
  for(key in states) {
    var state = states[key];
    if (state.reducer) {
      reducers[key] = state.reducer;
    }
    if (state.Selectors) {
      Selectors[key] = state.Selectors;
    }
    if (state.sagas) {
      sagaFactories.push(...state.sagas);
    }
  }



  // Provide the redux store
  $provide.factory('store', ($injector) => {

    // Create the sagas from their injectable factories
    var sagas = sagaFactories.map((sagaFactory)=>$injector.invoke(sagaFactory));
    middleware = [createSagaMiddleware(...sagas), ...middleware];

    return createStore(
      combineReducers(reducers),
      applyMiddleware(...middleware)
    )
  });

  // Provider a "selectors" service for each state
  for(key in Selectors) {
    defineSelectorService(key);
  }

  // Need to define this as a function to create a closure around the key parameter
  function defineSelectorService(key) {
    $provide.factory(key + 'Selectors', (store) => new Selectors[key](key, store))
  }
}