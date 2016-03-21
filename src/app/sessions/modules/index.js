import angular from 'angular';
import sessionList from './sessionList.component';
import sessionEditor from './sessionEditor.component';

export default angular.module('sessions', [sessionList, sessionEditor]).name;