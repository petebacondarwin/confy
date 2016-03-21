import angular from 'angular';
import {subscribeAction, unsubscribeAction, addAction, saveAction, editAction, removeAction} from '../states';

class SessionListContainer {
  constructor(sessionsSelectors, authSelectors, $scope, store) {
    this.sessionsSelectors = sessionsSelectors;
    this.authSelectors = authSelectors;
    this.$scope = $scope;
    this.dispatch = store.dispatch;
  }

  $onInit() {
    this.dispatch(subscribeAction());
    this.$scope.$on('$destroy', () => this.dispatch(unsubscribeAction()));
  }

  isLoggedIn() {
    return this.authSelectors.isLoggedIn();
  }

  getSessions() {
    return this.sessionsSelectors.getSessions();
  }

  isEditing(session) {
    return this.sessionsSelectors.isEditing(session);
  }

  add() {
    this.dispatch(addAction());
  }

  edit(session) {
    this.dispatch(editAction(session));
  }

  save(session, data) {
    this.dispatch(saveAction(session, data));
  }

  remove(session) {
    this.dispatch(removeAction(session));
  }
}

export default angular.module('sessions/sessionsListContainer', [])
  .component('sessionListContainer', {
    template: require('./sessionList.template.html'),
    controller: SessionListContainer
  })
  .name;