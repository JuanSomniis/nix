'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.documTicket', {
      url : '/documTicket/:id',
      template : '<docum-ticket></docum-ticket>'
    });

}
