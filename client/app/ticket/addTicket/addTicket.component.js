'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './addTicket.routes';

export class AddTicketComponent {
  /*@ngInject*/
  constructor($select,$time, $bi, $hummer, $pop, $scope, $cookieStore) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
  }
  //Autocomplete inputs
  searchOrigen(query) {
    return this.$select.search(query, this.origenList);
  }
  searchServicio(query) {
    return this.$select.search(query, this.servicioList);
  }
  searchActivo(query) {
    return this.$select.searchFull(query, this.activoList);
  }

  selectedActivo(selected) {
    if (selected)
      this.activoSeleccionado = selected.id_activo;
  }

  nuevoTicket(frm) {

    this.$bi.ticket('lastTicket').find(['N_Ticket'])
      .then(response => {
        let
          now = this.$time.on(),
          data = response.data[0],
          hoy = new Date().toJSON().slice(0,10),
          ahora = now.fullHour,
          creador = (this.$cookieStore.get('user')).id_usuario,
          nTicket = data.N_Ticket ? data.N_Ticket + 1 : '0001',
          model = this.$hummer.castFormToModel(frm),
          arrVal = [
            nTicket,
            "N",
            model.origen,
            model.servicio,
            model.contacto,
            model.tecnico,
            creador,
            this.activoSeleccionado
          ],
          arrValDocum = [
            hoy,
            ahora,
            model.descripcion,
            "II",
            creador
          ];
        this.$bi.ticket().insert(arrVal)
          .then(response => {
            arrValDocum.push(response.data[0].id_ticket);
            this.$bi.documentacion().insert(arrValDocum)
              /*.then(responseDocum => {
                if (this.model.images) {
                  let
                    id_documentacion = responseDocum.data[0].id_documentacion,
                    reader = new FileReader(),
                    binary,
                    img,
                    base64;
                  reader.addEventListener('loadend', () => {
                    binary = reader.result;
                    base64 = btoa(binary);
                    img = 'data:image/jpeg;base64,'+base64;
                    //this.$scope.$apply();
                    this.$bi.imagen().insert([img,id_documentacion])
                      .then(()=>console.log('todo bien ._.'));
                  }, false);
                  reader.readAsBinaryString(this.model.images[0]);
                } else {
                  this.$pop.show('Ticket Registrado satisfactoriamente');
                  this.model = {};
                }
              })*/
          });
      })
  }

  $onInit() {
    //Cara select para origen
    this.$bi.ticket().find(['distinct origen'])
      .then(response =>
        this.origenList = this.$hummer.objectToArray(response.data)
      );
    //Carga select para servicio
    this.$bi.ticket().find(['distinct servicio'])
      .then(response =>
        this.servicioList = this.$hummer.objectToArray(response.data)
      );
    this.$bi.activo().all()
      .then(response => this.activoList = response.data);
    //
    this.$bi.usuario('tecnicos').all()
      .then(response => this.tecnicoList = response.data);
    //Se activa el botón de submit por defecto
    this.btnDisabled = false;
    //Se instancia el select para Activo
    this.activoList = new Array();
    //Objeto de cliente sleccionado
    this.clienteSeleccionado = new Object();
    //Objeto de activo sleccionado
    this.activoSeleccionado = new Object();
    //Objeto de area seleccionada
    this.areaSeleccionada = new Object();
  }
}

export default angular.module('nixApp.addTicket', [uiRouter])
  .config(routes)
  .component('addTicket', {
    template: require('./addTicket.pug'),
    controller: AddTicketComponent
  })
  .name;
