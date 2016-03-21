import angular from 'angular';

class ConfyApp {}

export default angular.module('confyApp', [])
  .component('confyApp', {
    template: require('./confyApp.template.html'),
    controller: ConfyApp,
    $routeConfig: [
      {path: '/sessions', name: 'Sessions', component: 'sessionListContainer', useAsDefault: true}
    ]
  })
  .name;
