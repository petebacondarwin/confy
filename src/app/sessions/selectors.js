import {ScopedSelectors} from 'confy/lib/ScopedSelectors';

export class SessionSelectors extends ScopedSelectors {
  constructor(reducerKey, store) {
    super(reducerKey, store);
  }

  getSubscription() {
    return this.getState().subscription;
  }

  getSessionItems() {
    return this.getState().items;
  }
}
