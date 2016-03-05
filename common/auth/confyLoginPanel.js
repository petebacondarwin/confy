angular.module('confyLoginPanel', []).component('confyLoginPanel', {
  templateUrl: 'common/auth/confyLoginPanel.html',
  controller: ConfyLoginPanel
})
function ConfyLoginPanel(authService) {
  this.auth = authService;
}
