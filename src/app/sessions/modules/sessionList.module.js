import angular from 'angular';
import {subscribeAction, unsubscribeAction, saveAction} from '../states';

class SessionListContainer {
  constructor(sessionsSelectors, $scope, store) {
    this.sessionsSelectors = sessionsSelectors;
    this.$scope = $scope;
    this.dispatch = store.dispatch;
  }

  $onInit() {
    this.dispatch(subscribeAction());
    this.$scope.$on('$destroy', () => this.dispatch(unsubscribeAction));
  }

  getSessions() {
    return this.sessionsSelectors.getSessionItems();
  }

  save(session) {
    console.log('save', session);
    this.dispatch(saveAction(session));
  }
}

export default angular.module('sessions/sessionsListContainer', [])
  .component('sessionListContainer', {
    template: require('./sessionList.template.html'),
    controller: SessionListContainer
  })
  .name;