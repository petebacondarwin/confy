import angular from 'angular';

export default angular.module('confyApp', [])
  .component('confyApp', { template: require('./confyApp.template.html') })
  .name;
