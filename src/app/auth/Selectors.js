import {SelectorsBase} from 'confy/lib/SelectorsBase';

export class Selectors extends SelectorsBase {

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

