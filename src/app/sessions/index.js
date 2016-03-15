import module from './modules';
import {reducer, sessionSelectors} from './states';
import {sessionsSagaFactory} from './sagas';

const sagaFactories = [sessionsSagaFactory];
const selectorsFactory = sessionSelectors;

export default {
  module: module,
  state: {reducer, sagaFactories, selectorsFactory}
};