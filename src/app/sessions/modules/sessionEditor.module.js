import angular from 'angular';
import {BindingCloner} from 'confy/lib/bindingCloner';


class SessionEditor extends BindingCloner {
  constructor($scope) {
    super($scope, ['session']);
  }

  $onInit() {
    // console.log('onInit', this);
  }

  edit() {
    console.log('edit (inner)', this.session);
    this.onEdit({ session: this.session });
  }

  save() {
    console.log('save (inner)', this.session);
    this.onSave({ session: this.session });
  }

  delete() {
    console.log('delete (inner)', this.session);
    this.onDelete({ session: this.session });
  }
}

export default angular.module('sessions/sessionEditor', [])
  .component('sessionEditor', {
    bindings: {
      _session: '<session',
      isEditing: '<',
      onSave: '&',
      onDelete: '&',
      onEdit: '&'
    },
    template: require('./sessionEditor.template.html'),
    controller: SessionEditor
  })
  .name;