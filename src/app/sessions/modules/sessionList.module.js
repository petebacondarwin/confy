import angular from 'angular';
import {subscribeAction, unsubscribeAction} from '../states';

class SessionListContainer {
  constructor(sessionsSelectors, $scope, store) {
    this.sessionsSelectors = sessionsSelectors;
    this.$scope = $scope;
    this.store = store;
  }

  $onInit() {
    this.store.dispatch(subscribeAction());
    this.$scope.$on('$destroy', this.store.dispatch(unsubscribeAction));
  }

  getSessions() {
    return this.sessionsSelectors.getSessionItems();
  }
}

export default angular.module('sessions/sessionsListContainer', [])
  .component('sessionListContainer', {
    template: require('./sessionList.template.html'),
    controller: SessionListContainer
  })
  .name;