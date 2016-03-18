import module from './modules';
import {reducer, authSelectors} from './states';
import {authSagaFactory} from './sagas';

const sagaFactories = [authSagaFactory];
const selectorsFactory = authSelectors;

export default {
  module: module,
  state: {reducer, sagaFactories, selectorsFactory}
};