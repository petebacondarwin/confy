import angular from 'angular';

class ConfyApp {
  constructor(authSelectors) {
    this.authSelectors = authSelectors;
  }

  isLoggedIn() {
    return this.authSelectors.isLoggedIn();
  }
}

export default angular.module('confyApp', [])
  .component('confyApp', {
    template: require('./confyApp.template.html'),
    controller: ConfyApp,
    $routeConfig: [
      {path: '/sessions', name: 'Sessions', component: 'sessionListContainer', useAsDefault: true}
    ]
  })
  .name;
