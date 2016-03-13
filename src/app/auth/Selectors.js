export function authSelectors(getState) {
  return {
    getUserInfo() {
      return getState().userInfo;
    },
    isLoggedIn() {
      return !!this.getUserInfo();
    }
  };
}