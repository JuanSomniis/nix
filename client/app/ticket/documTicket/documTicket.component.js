'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import route from './documTicket.routes';

export class DocumTicketCmponent {
  /*@ngInject*/
  constructor(moment, $http, $select, $bi, $hummer, $pop, $scope, $cookieStore, $time, $stateParams) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.moment = moment;
  }
  openFeatures(feature) {
    this.features[feature].visible = !this.features[feature].visible;
  }

  documentacion() {
    const
      hoy = this.moment().format('YYYY[-]MM[-]D'),
      ahora = this.moment().format('h:mm:ss');
    let
      tipo = this.model.cierre === "NN"? "OO": "SS",
      nombreUsuario =
        this.$cookieStore.get('user').apellido + ' '
        + this.$cookieStore.get('user').nombre,
      arrVal = [
        hoy,
        ahora,
        this.model.texto,
        tipo,
        nombreUsuario,
        this.$stateParams.id
      ];
    this.$bi.documentacion().insert(arrVal).then(response => {
      //SI EL TIPO ES SS SE ACTUALIZA EL CAMBIO DE TIPO CIERRE
      if (tipo === 'SS') {
        let
          valObj = {cierre: this.model.cierre},
          whereObj = {id_ticket: this.$stateParams.id};

        this.$bi.ticket().update(valObj, whereObj)
          .then(response => {
            this.$pop.show("Documentacion registrada")
          });
      }else {
        this.$pop.show("Documentacion registrada")
      }
    });
  }

  $onInit() {
    this.model = new Object();
    this.model.cierre = 'NN';
    this.image = '';
    let url = 'http://picasaweb.google.com/data/entry/api/user/mortombolo@gmail.com?alt=json';
    this.$http.get(url).then(response => this.image = response.data.entry.gphoto$thumbnail.$t).catch(err => console.log(err))
    // data => entry => gphoto$thumbnail ==> $t
    this.features = require('./docum.struct')
  }
}

export default angular.module('nixApp.documTicket', [uiRouter]).config(route).component('documTicket', {
  template: require('./documTicket.pug'),
  controller: DocumTicketCmponent
}).name;
