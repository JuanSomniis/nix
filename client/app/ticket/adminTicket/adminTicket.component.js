'use strict'
//Libreries
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const _ = require('lodash');
//Import the route
import routes from './adminTicket.routes'

export class AdminTicketComponent {
  /*@ngInject*/
  constructor(moment, $select, $bi, $hummer, $pop, $scope, $cookieStore, $time) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    this.moment = moment;
  }

  allTickets(filter) {
    if(filter)
      filter["tipo"] = 'II';
    this.$bi.ticket('full_ticket').all(filter).then(response => {
      response.data.forEach(ticket => {
        let castFecha = this.moment(ticket.fecha);
        ticket.fecha = castFecha.add(1, 'day').format("LL");
        this.estados.forEach(estado => {
          if (estado.value == ticket.estado)
            ticket.icon = estado.icon
        });
      });
      this.tickets = _.sortBy(response.data, 'N_Ticket').reverse();
    });
  }

  filterDates(second) {
    let fecha = new Array();
    const sqlFormat = 'YYYY[-]MM[-]D';
    if (!second) {
      fecha[0] = this.moment(this.fecha[0]).format(sqlFormat);
      fecha[1] = fecha[0];
    } else {
      fecha[0] = this.moment(this.fecha[0]).format(sqlFormat);
      fecha[1] = this.moment(this.fecha[1]).format(sqlFormat);
    }
    // BETWEENCO = es una fecha se remplaza en la conversion
    this.model.fecha = `'${fecha[0]}' and '${fecha[1]}'`;
    this.allTickets(this.model);
  }
  $onInit() {
    //Carga todos los tickets sin filtro inicial
    this.allTickets({tipo:'II'});
    //Modelo
    this.model = new Object();
    //Tecnicos
    this.$bi.usuario('tecnicos').all().then(response => this.tecnicos = response.data);
    //SERVICIOS
    this.$bi.ticket().find(['distinct servicio']).then(response => this.servicios = this.$hummer.objectToArray(response.data));
    //CLIENTES
    this.$bi.cliente('cliente_completo').all().then(response => this.clientes = response.data);

    //Estados
    this.estados = [
      {
        value: 'N',
        display: 'Abierto',
        icon: 'error_outline'
      }, {
        value: 'P',
        display: 'En proceso',
        icon: 'loop'
      }, {
        value: 'V',
        display: 'Cierre pendiente',
        icon: 'phone_locked'
      }, {
        value: 'C',
        display: 'Cerrado',
        icon: 'remove_circle_outline'
      }
    ];
  }
}

export default
angular.module('nixApp.adminTicket', [uiRouter])
  .config(routes)
  .component('adminTicket', {
    template: require('./adminTicket.pug'),
    controller: AdminTicketComponent
  })
  .name;
