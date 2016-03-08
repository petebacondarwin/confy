import angular from 'angular'

class SessionListContainer {
  constructor(store, sessionsActions, $scope) {

    this.sessions = store.getState().sessions;
    sessionsActions.subscribe();
    $scope.$on('$destroy', sessionsActions.unsubscribe);

    store.subscribe(() => {
      let sessions = store.getState().sessions;
      if (this.sessions !== sessions) {
        this.sessions = sessions;
      }
    });
  }
}

const sessionListContainer = {
  template: require('./sessionList.template.html'),
  controller: SessionListContainer
};

export default angular.module('sessions/sessionsListContainer', ['sessions/actions'])
  .component('sessionListContainer', sessionListContainer)
  .name;