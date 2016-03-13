import module from './modules';
import {reducer} from './states';
import {AuthSelectors} from './selectors';
import {authSagaFactory} from './sagas';

const sagaFactories = [authSagaFactory];
const Selectors = AuthSelectors;

export default {
  module: module,
  state: {reducer, sagaFactories, Selectors}
};