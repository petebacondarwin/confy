import angular from 'angular';
import auth from './auth';
import config from './config';

export default angular.module('common', [config, auth]).name;
