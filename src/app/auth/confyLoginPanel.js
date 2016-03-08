import angular from 'angular'

class ConfyLoginPanel {
  constructor(authService, authStatusTypes) {
    this.authService = authService;
  }

  login(provider) {
    this.authService.login(provider);
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUserInfo() {
    return this.authService.getUserInfo();
  }
}

const confyLoginPanel = {
  template: require('./confyLoginPanel.html'),
  controller: ConfyLoginPanel
};

export default angular.module('confyLoginPanel', [])
  .component('confyLoginPanel', confyLoginPanel)
  .name;