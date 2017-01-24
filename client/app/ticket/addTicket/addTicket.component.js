'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './addTicket.routes';

export class AddTicketComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop, $scope, $cookieStore) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
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

  changeFile() {
    let
      reader = new FileReader(),
      binary,
      base64;
    reader.addEventListener('loadend', () => {
      binary = reader.result;
      base64 = btoa(binary);
      //this.imer = 'data:image/jpeg;base64,'+base64;
      //this.$scope.$apply();
    }, false);
    reader.readAsBinaryString(this.files[0]);
  }

  nuevoTicket(frm) {

    this.$bi.ticket('lastTicket').find(['N_Ticket'])
      .then(response => {
        let
          hoy = 'convert(date, getdate())',
          ahora = 'CONVERT(VARCHAR(8),GETDATE(),108)',
          creador = (this.$cookieStore.get('user')).id_usuario,
          nTicket = response.data[0] ? data.N_Ticket + 1 : '0001',
          model = this.$hummer.castFormToModel(frm),
          arrVal = [
            nTicket,
            "'N'",
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
            "'II'",
            creador
          ];
        console.log(arrVal, arrValDocum);
        this.$bi.ticket().insert(arrVal)
          .then(response => {
            arrValDocum.push(response.data[0].id_ticket);
            this.$bi.documentacion.insert(arrValDocum)
              .then(response => {
                if (this.model.images) {
                  let
                    reader = new FileReader(),
                    binary,
                    base64;
                  reader.addEventListener('loadend', () => {
                    binary = reader.result;
                    base64 = btoa(binary);
                    //this.imer = 'data:image/jpeg;base64,'+base64;
                    //this.$scope.$apply();
                  }, false);
                  reader.readAsBinaryString(this.files[0]);
                } else {
                  this.$pop.show('Ticket Registrado satisfactoriamente');
                  this.model = {};
                }
              })
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
