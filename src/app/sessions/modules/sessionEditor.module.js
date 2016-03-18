import angular from 'angular';

class SessionEditor {

  constructor($scope) {
    $scope.$watch(
      () => this.session,
      (session) => Object.assign(this, angular.copy(session))
    );
  }

  edit() {
    this.onEdit();
  }

  save() {
    this.onSave({key: this.key, value: this.value});
  }

  delete() {
    this.onDelete();
  }
}

export default angular.module('sessions/sessionEditor', [])
  .component('sessionEditor', {
    bindings: {
      session: '<',
      isEditing: '<',
      onSave: '&',
      onDelete: '&',
      onEdit: '&'
    },
    template: require('./sessionEditor.template.html'),
    controller: SessionEditor
  })
  .name;