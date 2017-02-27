'use strict';
const angular = require('angular');

let activoList = ($bi,$time) => {

  let link = (scope,element,attrs) => {


    $bi.activo().all().then(response=> scope.activos =response.data);

    scope.selected = [];
    scope.$watch('selected', activo => scope.ngModel = activo,() => {});
  }

  return {
    template: require('./activoList.pug'),
    restrict: 'EA',
    require : 'ngModel',
    scope : {ngModel : '='},
    link : link
  };
}

export default angular.module('nixApp.activoList', [])
  .directive('activoList', activoList)
  .name;

