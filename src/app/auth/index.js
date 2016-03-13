import module from './modules';
import {reducer} from './states';
import {authSelectors} from './selectors';
import {authSagaFactory} from './sagas';

const sagaFactories = [authSagaFactory];
const selectorsFactory = authSelectors;

export default {
  module: module,
  state: {reducer, sagaFactories, selectorsFactory}
};