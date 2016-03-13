import module from './modules';
import {reducer} from './states';
import {sessionSelectors} from './selectors';
import {sessionsSagaFactory} from './sagas';

const sagaFactories = [sessionsSagaFactory];
const selectorsFactory = sessionSelectors;

export default {
  module: module,
  state: {reducer, sagaFactories, selectorsFactory}
};