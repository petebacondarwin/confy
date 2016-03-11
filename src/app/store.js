import {combineReducers, createStore, applyMiddleware} from 'redux'

// Middleware
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'



export function createStateServices($provide, states) {

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
    applyMiddleware(
      thunk,
      createLogger()
    )
  ));

  // Provider a "selectors" service for each state
  for(key in Selectors) {
    defineSelectorService(key);
  }

  function defineSelectorService(key) {
    $provide.factory(key + 'Selectors', (store) => new Selectors[key](key, store))
  }
}