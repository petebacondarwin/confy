import angular from 'angular';

class ConfyLoginPanel {
  constructor(authService) {
    this.auth = authService;
  }
}

const confyLoginPanel = {
  template: require('./confyLoginPanel.html'),
  controller: ConfyLoginPanel
};

export default angular.module('confyLoginPanel', [])
  .component('confyLoginPanel', confyLoginPanel)
  .name;