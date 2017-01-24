'use strict'
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './adminTicket.routes'

export class AdminTicketComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop, $scope, $cookieStore) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
  }

  $onInit() {

  }
}


export default angular.module('nixApp.adminTicket', [uiRouter])
  .config(routes)
  .component('adminTicket', {
    template: require('./adminTicket.pug'),
    controller: AdminTicketComponent
  })
  .name;
