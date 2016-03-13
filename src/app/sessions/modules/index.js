import angular from 'angular';
import actions from './actions.module';
import sessionList from './sessionList.module';

export default angular.module('sessions', [actions, sessionList]).name;