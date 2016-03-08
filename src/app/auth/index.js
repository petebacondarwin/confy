import angular from 'angular'
import actions from './actions'
import confyLoginPanel from './confyLoginPanel'

export default angular.module('auth', [actions, confyLoginPanel]).name;