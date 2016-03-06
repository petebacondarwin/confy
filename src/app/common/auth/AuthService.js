import angular from 'angular';

class AuthService {

  constructor($firebaseAuth, firebaseUrl) {
    this._auth = $firebaseAuth(new Firebase(firebaseUrl));
    this.currentUser = this._auth.$getAuth();
  }

  login(provider) {
    return this._auth.$authWithOAuthPopup(provider).then((currentUser) => {
      return this.currentUser = currentUser;
    });
  }

  logout() {
    this._auth.$unauth();
    this.currentUser = null;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getDisplayName() {
    if (this.currentUser) {
      return this.currentUser[this.currentUser.provider].displayName;
    }
  }
}

export default angular.module('authService', [])
  .service('authService', AuthService)
  .name;