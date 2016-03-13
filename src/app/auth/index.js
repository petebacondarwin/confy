import module from './modules';
import {reducer} from './states';
import {Selectors} from './Selectors';
import {authFlowFactory} from './sagas';

export default {
  module: module,
  state: {reducer, Selectors, sagaFactories: [authFlowFactory]}
};