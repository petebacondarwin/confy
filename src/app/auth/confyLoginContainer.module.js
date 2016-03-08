import angular from 'angular'
import {authStateTypes} from './states'

class ConfyLoginContainer {
  constructor(authActions, store) {

    this.authActions = authActions;
    this.auth = store.getState().auth;

    store.subscribe(() => {
      let auth = store.getState().auth;
      if (this.auth !== auth) {
        this.auth = auth;
      }
    });
  }

  login(provider) {
    this.authActions.login(provider);
  }

  logout() {
    this.authActions.logout();
  }

  isLoggedIn() {
    return !!this.auth.userInfo;
  }

  getUserInfo() {
    return this.auth.userInfo ? this.auth.userInfo.displayName : '';
  }
}

const confyLoginPanel = {
  template: require('./confyLoginContainer.template.html'),
  controller: ConfyLoginContainer
};

export default angular.module('auth/confyLoginContainer', ['auth/actions'])
  .component('confyLoginPanel', confyLoginPanel)
  .name;