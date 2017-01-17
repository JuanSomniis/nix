'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './addActivo.routes';

export class AddActivoComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
  }

  //Autocomplete inputs
  searchTipoActivo(query) {
    return this.$select.search(query, this.activosList);
  }
  searchCliente(query) {
    return this.$select.searchFull(query, this.clientesList, 'nombre');
  }
  searchArea(query) {
    return this.$select.searchFull(query, this.areaList, 'nombre');
  }

  selectedCliente(selected) {
    if(selected) {
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
    if (selected) this.areaSeleccionada = selected;
  }

  nuevoActivo(frm) {
      this.btnDisabled = true;
      let
      //Convierte el formulario en un modelo
        model = this.$hummer.castFormToModel(frm),
        repetition = this.$hummer.evaluateRepetition(
          this.areaList,
          model.area,
          'nombre'
        );
      /*
        Si se repite el area dentro de la lista quiere decir que ya existe y
        por lo tanto no es necesario registrar una nueva area
      */
      if (!repetition) { //No se repite, se inserta
        this.$bi.area().insert([model.area, this.clienteSeleccionado])
          .then(response => {
            model.area = response.data[0].id_area;
            this.ingresarActivo(model);
          });
      } else { //Se repite
        model.area = this.areaSeleccionada.id_area;

        this.ingresarActivo(model);
      }
    }
    //Metodo privado
  ingresarActivo(model) {
    let arrVal = [
      model.serial,
      model.marca,
      model.modelo,
      model.inventario,
      model.seguridad,
      model.espesificaciones,
      model.tipoActivo,
      model.area
    ];
    this.$bi.activo().insert(arrVal)
      .then(() => {
        this.$pop.show('Activo registrado satisfactoriamente.');
        this.model = new Object();
      });
  }

  $onInit() {
    //Carga el select para tipo de activo
    this.$bi.activo().find(['distinct tipo_activo'])
      .then(response =>
        this.activosList = this.$hummer.objectToArray(response.data)
      );
    //Carga el select para cliente desde una vista
    this.$bi.cliente('cliente_completo').all()
      .then(response => this.clientesList = response.data);
    //Se activa el botón de submit por defecto
    this.btnDisabled = false;
    //Se instancia el select para Area
    this.areaList = new Array();
    //Se desactiva por defecto el area para cargarlo con cliente
    this.areaDisabled = true;
    //Objeto de cliente sleccionado
    this.clienteSeleccionado = new Object();
    //Objeto de area seleccionada
    this.areaSeleccionada = new Object();
  }
}
export default angular.module('nixApp.addActivo', [uiRouter])
  .config(routes)
  .component('addActivo', {
    template: require('./addActivo.pug'),
    controller: AddActivoComponent
  })
  .name;
