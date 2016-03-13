import angular from 'angular';

class SessionListContainer {
  constructor(sessionsSelectors, sessionsActions, $scope) {
    this.sessionsSelectors = sessionsSelectors;
    this.sessionsActions = sessionsActions;
    this.$scope = $scope;
  }

  $onInit() {
    this.sessionsActions.subscribe();
    this.$scope.$on('$destroy', this.sessionsActions.unsubscribe);
  }

  getSessions() {
    return this.sessionsSelectors.getSessionItems();
  }
}

const sessionListContainer = {
  template: require('./sessionList.template.html'),
  controller: SessionListContainer
};

export default angular.module('sessions/sessionsListContainer', ['sessions/actions'])
  .component('sessionListContainer', sessionListContainer)
  .name;