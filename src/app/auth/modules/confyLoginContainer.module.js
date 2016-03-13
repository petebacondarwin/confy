import angular from 'angular';
import {loginAction, logoutAction} from '../states';

class ConfyLoginContainer {
  constructor(store, authSelectors) {
    this.dispatch = store.dispatch;
    this.authSelectors = authSelectors;
  }

  login(provider) {
    this.dispatch(loginAction(provider));
  }

  logout() {
    this.dispatch(logoutAction());
  }

  isLoggedIn() {
    return this.authSelectors.isLoggedIn();
  }

  getUserInfo() {
    return this.authSelectors.getUserInfo();
  }
}


export default angular.module('auth/confyLoginContainer', [])
  .component('confyLoginContainer', {
    template: require('./confyLoginContainer.template.html'),
    controller: ConfyLoginContainer
  })
  .name;