import angular from 'angular'
import {combineReducers, createStore, applyMiddleware} from 'redux'

export default angular.module('common/store', [])

.provider('store', () => {
  let _reducers;
  let _middleware;
  let storeProvider = {
    middleware: (middleware) => {
      _middleware = middleware;
      return storeProvider;
    },
    reducers: (reducers) => {
      _reducers = reducers;
      return storeProvider;
    },
    $get: () => {
      const reducer = combineReducers(_reducers);
      return createStore(reducer, applyMiddleware.apply(null, _middleware));
    }
  };
  return storeProvider;
})

.name;
