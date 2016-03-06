import angular from 'angular';
import authService from './authService';
import confyLoginPanel from './confyLoginPanel';

export default angular.module('auth', [confyLoginPanel, authService]).name;