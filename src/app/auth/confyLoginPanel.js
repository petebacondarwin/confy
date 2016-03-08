import angular from 'angular'
import {authStateTypes} from './states'

class ConfyLoginPanel {
  constructor(authActions, store) {

    this.authActions = authActions;

    this.auth = store.getState().auth;

    store.subscribe(() => {
      let auth = store.getState().auth;
      if (this.auth !== auth) {
        this.auth = auth;
      }
    })
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
  template: require('./confyLoginPanel.html'),
  controller: ConfyLoginPanel
};

export default angular.module('auth/confyLoginPanel', ['auth/actions'])
  .component('confyLoginPanel', confyLoginPanel)
  .name;