import module from './modules';
import {reducer} from './states';
import {SessionSelectors} from './selectors';
import {sessionsSagaFactory} from './sagas';

const sagaFactories = [sessionsSagaFactory];
const Selectors = SessionSelectors;

export default {
  module: module,
  state: {reducer, sagaFactories, Selectors}
};