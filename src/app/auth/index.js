import module from './modules'
import {reducer} from './states'
import {Selectors} from './Selectors'
import {sagas} from './sagas'

export default {
  module: module,
  state: {reducer, Selectors, sagas}
};