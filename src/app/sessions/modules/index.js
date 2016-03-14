import angular from 'angular';
import sessionList from './sessionList.module';
import sessionEditor from './sessionEditor.module';

export default angular.module('sessions', [sessionList, sessionEditor]).name;