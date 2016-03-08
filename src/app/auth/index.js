import angular from 'angular'
import stateMachine from './stateMachine'
import authService from './authService'
import confyLoginPanel from './confyLoginPanel'

export default angular.module('auth', [stateMachine, authService, confyLoginPanel]).name;