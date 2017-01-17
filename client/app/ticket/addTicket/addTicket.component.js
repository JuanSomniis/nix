'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './addTicket.routes';

export class AddTicketComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop,$scope) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
  }
  //Autocomplete inputs
  searchCliente(query) {
    return this.$select.searchFull(query, this.clientesList, 'nombre');
  }
  searchArea(query) {
    return this.$select.searchFull(query, this.areaList, 'nombre');
  }
  searchOrigen(query) {
    return this.$select.search(query, this.origenList);
  }
  searchServicio(query) {
    return this.$select.search(query, this.servicioList);
  }
  searchActivo(query) {
    return this.$select.searchFull(query, this.activoList);
  }

  selectedCliente(selected) {
    if (selected) {
      this.areaDisabled = false;
      this.clienteSeleccionado = selected.id_cliente;
      let
        arrVal = ['distinct nombre', 'id_area'],
        whereArr = [{
          fk_id_cliente: this.clienteSeleccionado
        }];
      this.$bi.area().find(arrVal, whereArr)
        .then(response => this.areaList = response.data);
    }
  }

  selectedArea(selected) {
    if (selected) {
      this.areaSeleccionada = selected.id_area;
      this.activoDisabled = false;
      let
        arrVal = [],
        whereArr = [{
          fk_id_area: this.areaSeleccionada
        }];
      this.$bi.activo().find(arrVal, whereArr)
        .then(response => this.activoList = response.data);
    }
  }

  changeFile(){
    console.log(this.files);
    let
      reader = new FileReader(),
      binary,
      base64;
    reader.addEventListener('loadend',()=>{
      console.log('wtf');
      binary = reader.result;
      base64 = btoa(binary);
      this.imer = 'data:image/jpeg;base64,'+base64;
      this.$scope.$apply();
    },false);
    reader.readAsBinaryString(this.files[0]);

  }

  selectedActivo(selected) {
    if (selected) {

    }
  }

  nuevoTicket(fr) {
    console.log(fr);
    console.log(this.model);
  }

  $onInit() {
    //Carga el select para cliente desde una vista
    this.$bi.cliente('cliente_completo').all()
      .then(response => this.clientesList = response.data);
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
    //
    this.$bi.usuario('tecnicos').all()
      .then(response => this.tecnicoList = response.data);
    //Se activa el botón de submit por defecto
    this.btnDisabled = false;
    //Se instancia el select para Area
    this.areaList = new Array();
    //Se instancia el select para Activo
    this.activoList = new Array();
    //Se desactiva por defecto el area para cargarlo con cliente
    this.areaDisabled = true;
    //Se desactiva por defecto el activo para cargarlo con area
    this.activoDisabled = true;
    //Objeto de cliente sleccionado
    this.clienteSeleccionado = new Object();
    //Objeto de activo sleccionado
    this.activoSeleccionado = new Object();
    //Objeto de area seleccionada
    this.areaSeleccionada = new Object();
    //

  }
}

export default angular.module('nixApp.addTicket', [uiRouter])
  .config(routes)
  .component('addTicket', {
    template: require('./addTicket.pug'),
    controller: AddTicketComponent
  })
  .name;
