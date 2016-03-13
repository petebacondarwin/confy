export function sessionSelectors(getState) {
  return {
    getSubscription() {
      return getState().subscription;
    },
    getSessionItems() {
      return getState().items;
    }
  };
}