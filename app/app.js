angular.module('app', ['firebase', 'config', 'auth'])


.component('confyApp', {
  template: '<confy-login-panel></confy-login-panel>',
  controller: ConfyApp,
});
function ConfyApp() {}

