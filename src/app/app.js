import angular from 'angular';
import 'firebase';
import firebase from 'angularFire';
import common from './common';

angular.module('app', [firebase, common])
.component('confyApp', {
  template: '<confy-login-panel></confy-login-panel>'
});
