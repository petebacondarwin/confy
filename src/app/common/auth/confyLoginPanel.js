import angular from 'angular'
import {login, logout, LOGGED_IN} from '../../states/auth'

class ConfyLoginPanel {
  constructor(store) {
    this.store = store;
  }

  login(provider) {
    this.store.dispatch(login(provider));
  }

  logout() {
    this.store.dispatch(logout());
  }

  isLoggedIn() {
    return this.store.getState().status === LOGGED_IN;
  }

  getDisplayName() {
    const userInfo = this.store.getState().userInfo;
    if (userInfo) {
      return userInfo.displayName;
    }
  }
}

const confyLoginPanel = {
  template: require('./confyLoginPanel.html'),
  controller: ConfyLoginPanel
};

export default angular.module('confyLoginPanel', [])
  .component('confyLoginPanel', confyLoginPanel)
  .name;