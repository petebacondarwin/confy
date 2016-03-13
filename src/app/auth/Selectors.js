import {ScopedSelectors} from 'confy/lib/ScopedSelectors';

export class AuthSelectors extends ScopedSelectors {

  constructor(reducerKey, store) {
    super(reducerKey, store);
  }

  getUserInfo() {
    return this.getState().userInfo;
  }

  isLoggedIn() {
    return !!this.getUserInfo();
  }
}

