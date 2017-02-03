'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import route from './documTicket.routes';

export class DocumTicketCmponent {
  /*@ngInject*/
  constructor(
    $http,$select, $bi, $hummer, $pop, $scope, $cookieStore, $time,$stateParams) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    this.$http  =$http;
    this.$stateParams = $stateParams;
  }
  $onInit(){
    this.image = '';
    let url = 'http://picasaweb.google.com/data/entry/api/user/mortombolo@gmail.com?alt=json';
    this.$http.get(url)
      .then(response =>this.image = response.data.entry.gphoto$thumbnail.$t)
      .catch(err => console.log(err))
      // data => entry => gphoto$thumbnail ==> $t

    //
    this.features = [
      {
        title : "Caracteristicas generales",
        list : [
          { key : "Ticket nº", value : "1"},
          { key : "Estado", value : "Abierto"},
          { key : "Fecha", value : "24 de Julio 2017"},
          { key : "Hora", value : "10:20am"},
          { key : "Servicio", value : "Mantenimiento"},
          { key : "Origen", value : "Correo"},
          { key : "Usuario final", value : "Juan Sebastian Gonzalez Rivera"}
        ]
      },{
        title : "Caracteristicas generales",
        list : [
          { key : "Estado", value : "Abierto"},
          { key : "Fecha", value : "24 de Julio 2017"},
          { key : "Origen", value : "Correo"},
          { key : "Estado", value : "Abierto"}
        ]
      }
    ]
  }
}

export default angular.module('nixApp.documTicket',[uiRouter])
  .config(route)
  .component('documTicket',{
    template : require('./documTicket.pug'),
    controller : DocumTicketCmponent
  })
  .name;
