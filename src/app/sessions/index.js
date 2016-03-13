import module from './modules';
import {reducer, Selectors} from './states';

export default {
  module: module,
  state: {reducer, Selectors}
};