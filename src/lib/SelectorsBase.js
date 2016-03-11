export class SelectorsBase {

  constructor(reducerKey, store) {
    this.reducerKey = reducerKey;
    this.store = store;
  }

  getState() {
    return this.store.getState()[this.reducerKey];
  }
}