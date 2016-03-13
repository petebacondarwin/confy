import angular from 'angular';
import actions from './actions.module';
import confyLoginContainer from './confyLoginContainer.module';

export default angular.module('auth', [actions, confyLoginContainer]).name;