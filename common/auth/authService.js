angular.module('authService', ['config']).service('authService', AuthService);

function AuthService($firebaseAuth, firebaseUrl) {
  this._auth = $firebaseAuth(new Firebase(firebaseUrl));
  this.currentUser = this._auth.$getAuth();
}

AuthService.prototype.login = function(provider) {
  var that = this;
  return this._auth.$authWithOAuthPopup(provider).then(function(currentUser) {
    return that.currentUser = currentUser;
  });
};

AuthService.prototype.logout = function() {
  this._auth.$unauth();
  this.currentUser = null;
};

AuthService.prototype.isLoggedIn = function() {
  return !!this.currentUser;
};

AuthService.prototype.getDisplayName = function() {
  if (this.currentUser) {
    return this.currentUser[this.currentUser.provider].displayName;
  }
};