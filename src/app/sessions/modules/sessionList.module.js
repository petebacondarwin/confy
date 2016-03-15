import angular from 'angular';
import {subscribeAction, unsubscribeAction, saveAction, editAction} from '../states';

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

  isEditing(session) {
    return this.sessionsSelectors.isEditing(session);
  }

  edit(session) {
    console.log('edit', session);
    this.dispatch(editAction(session));
  }

  save(session) {
    console.log('save', session);
    this.dispatch(saveAction(session));
  }

  delete(session) {
    console.log('delete', session);
    this.dispatch(deleteAction(session));
  }
}

export default angular.module('sessions/sessionsListContainer', [])
  .component('sessionListContainer', {
    template: require('./sessionList.template.html'),
    controller: SessionListContainer
  })
  .name;