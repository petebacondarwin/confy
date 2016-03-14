import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

export default function createStateServices($provide, states, middleware) {

  var key;
  var reducers = {};
  var selectorsFactory = {};
  var sagaFactories = [];

  // Map the `states` to `reducers` and `selectors` objects
  for(key in states) {
    var state = states[key];
    if (state.reducer) {
      reducers[key] = state.reducer;
    }
    if (state.selectorsFactory) {
      selectorsFactory[key] = state.selectorsFactory;
    }
    if (state.sagaFactories) {
      sagaFactories.push(...state.sagaFactories);
    }
  }



  // Provide the redux store
  $provide.factory('store', ($injector, $rootScope) => {

    // Create the sagas from their injectable factories
    var sagas = sagaFactories.map((sagaFactory)=> $injector.invoke(sagaFactory));
    middleware = [createSagaMiddleware(...flatten(sagas)), ...middleware];

    const store = createStore(
      combineReducers(reducers),
      applyMiddleware(...middleware)
    );

    // Trigger a digest (if necessary) after each change to the store
    store.subscribe(() => $rootScope.$evalAsync());

    return store;
  });

  // Provider a "selectors" service for each state
  for(key in selectorsFactory) {
    registerSelectors(key);
  }

  // Need to define this as a function to create a closure around the key parameter
  function registerSelectors(key) {
    $provide.factory(key + 'Selectors', (store) => {
      // Create a specialised form of the getState method that is scoped to the state
      let getState = () => store.getState()[key];
      return selectorsFactory[key](getState);
    });
  }
}