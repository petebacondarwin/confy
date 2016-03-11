import {combineReducers, createStore, applyMiddleware} from 'redux'


export default function createStateServices($provide, states, middleware) {

  var key;
  var reducers = {};
  var Selectors = {};

  // Map the `states` to `reducers` and `selectors` objects
  for(key in states) {
    var state = states[key];
    if (state.reducer) {
      reducers[key] = state.reducer;
    }
    if (state.Selectors) {
      Selectors[key] = state.Selectors;
    }
  }

  // Provide the redux store
  $provide.value('store', createStore(
    combineReducers(reducers),
    applyMiddleware.apply(applyMiddleware, middleware)
  ));

  // Provider a "selectors" service for each state
  for(key in Selectors) {
    defineSelectorService(key);
  }

  // Need to define this as a function to create a closure around the key parameter
  function defineSelectorService(key) {
    $provide.factory(key + 'Selectors', (store) => new Selectors[key](key, store))
  }
}