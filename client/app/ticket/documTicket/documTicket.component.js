'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import route from './documTicket.routes';

export class DocumTicketCmponent {
  /*@ngInject*/
  constructor($http,moment, $select, $bi, $hummer, $pop, $scope, $cookieStore, $time) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    this.moment = moment;
    this.$http  =$http;
  }
  $onInit(){
    this.image = '';
    let url = 'http://picasaweb.google.com/data/entry/api/user/mortombolo@gmail.com?alt=json';
    this.$http.get(url)
      .then(response =>this.image = response.data.entry.gphoto$thumbnail.$t)
      .catch(err => console.log(err))
      // data => entry => gphoto$thumbnail ==> $t
  }
}

export default angular.module('nixApp.documTicket',[uiRouter])
  .config(route)
  .component('documTicket',{
    template : require('./documTicket.pug'),
    controller : DocumTicketCmponent
  })
  .name;
