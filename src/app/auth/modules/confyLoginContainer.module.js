import angular from 'angular';

class ConfyLoginContainer {
  constructor(authActions, authSelectors) {
    this.authActions = authActions;
    this.authSelectors = authSelectors;
  }

  login(provider) {
    this.authActions.login(provider);
  }

  logout() {
    this.authActions.logout();
  }

  isLoggedIn() {
    return this.authSelectors.isLoggedIn();
  }

  getUserInfo() {
    return this.authSelectors.getUserInfo();
  }
}


export default angular.module('auth/confyLoginContainer', ['auth/actions'])
  .component('confyLoginContainer', {
    template: require('./confyLoginContainer.template.html'),
    controller: ConfyLoginContainer
  })
  .name;