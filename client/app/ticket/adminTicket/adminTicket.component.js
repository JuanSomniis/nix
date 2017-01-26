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
  filter(entity) {
    let obj = this.model[entity]
  }
  allTickets(filter){
    //All tickets
    this.$bi.ticket('full_ticket').all(filter)
      .then(response => {

        for (let ticket in response.data) {
          /*ticket.fecha =
          ticket.hora =
          ticket.icon =*/
        }
        this.tickets = response.data;

      });
  }
  $onInit() {
    this.allTickets();
    //Modelo
    this.model = new Object();
    //SERVICIOS
    this.$bi.ticket().find(['distinct servicio'])
      .then(response =>
        this.servicios = this.$hummer.objectToArray(response.data)
      );
    //CLIENTES
    this.$bi.cliente('cliente_completo').all()
      .then(response => this.clientes = response.data);
    //USUARIOS
    this.$bi.usuario('tecnicos').all()
      .then(response =>this.tecnicos = response.data);
    //Estados
    this.estados = [{
        value: 'N',
        display: 'Abierto',
        icon: 'error_outline'
      },
      {
        value: 'P',
        display: 'En proceso',
        icon: 'loop'
      },
      {
        value: 'V',
        display: 'Cierre pendiente',
        icon: 'phone_locked'
      },
      {
        value: 'C',
        display: 'Cerrado',
        icon: 'remove_circle_outline'
      }
    ];
  }
}

export default angular.module('nixApp.adminTicket', [uiRouter])
  .config(routes)
  .component('adminTicket', {
    template: require('./adminTicket.pug'),
    controller: AdminTicketComponent
  })
  .name;
