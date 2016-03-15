export class BindingCloner {
  constructor($scope, boundProps) {
    boundProps.forEach((boundProp) => {
      $scope.$watch(
        () => this['_' + boundProp],
        (value) => {
          this[boundProp] = Object.assign({}, value);
        }
      );
    });
  }
}