import angular from 'angular';

class SessionEditor {
  constructor() {

  }

  $onInit() {
    console.log('onInit', this.session);
  }

  save() {
    console.log('save (inner)', this.session);
    this.onSave({ session: this.session });
  }
}

export default angular.module('sessions/sessionEditor', [])
  .component('sessionEditor', {
    bindings: {
      session: '<',
      onSave: '&'
    },
    template: require('./sessionEditor.template.html'),
    controller: SessionEditor
  })
  .name;