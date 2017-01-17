'use strict';
const angular = require('angular');

export default angular.module('nixApp.inpil', [])
  .directive('inpil', function() {
    return {
      template: require('./inpil.pug'),
      restrict: 'EA',
      scope : {
        model : '='
      },
      link: function(scope, element, attrs) {

        var input = $(element[0].querySelector('#fileInput'));
        var button = $(element[0].querySelector('#uploadButton'));
        var textInput = $(element[0].querySelector('#textInput'));

        if (input.length && button.length && textInput.length) {
          button.click(function(e) {
            input.click();
          });
          textInput.click(function(e) {
            input.click();
          });
        }

        input.on('change', function(e) {
          var files = e.target.files;
          console.dir(scope);
          /*if (files[0]) {
            scope.fileName = files[0].name;
          } else {
            scope.fileName = null;
          }*/
          scope.$apply();
        });

      }
    };
  })
  .name;
