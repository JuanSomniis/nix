'use strict';
const angular = require('angular');
/*@ngInject*/
export function bifrostService($http, $hummer) {
  let
    url = '/api/astral',
    entity = '',
    methods = {
      find: find,
      insert: insert,
      all: all,
      update : update
    };
  /*ACTIONS*/
  function update (valObj,whereObj){
    let
      where = whereObj ? $hummer.objectToSentence(whereObj) : '1=1',
      val = $hummer.objectToSentence(valObj,','),
      dataObject = {
        where: where,
        val: val,
        entity: entity
      };
    return $http.put(url + '/', dataObject);
  }
  function find(valArray, whereObj) {
    let
      where = whereObj ? $hummer.objectToSentence(whereObj) : '1=1',
      val = $hummer.arrayToSentence(valArray),
      dataObject = {
        where: where,
        val: val,
        entity: entity
      };
    return $http.post(url + '/find', dataObject);
  }

  function all(whereArray) {
    let
      where = whereArray ? $hummer.objectToSentence(whereArray) : '1=1';
      console.log(where);
    return $http.post(url + '/find', {
      where: where,
      entity: entity
    });
  }

  function insert(valArray) {
    let
      _val = $hummer.returnQuotes(valArray);
    return $http.post(url, {
      val: _val,
      entity: entity
    });
  }
  /*PRIVATE FUNCTIONS */



  /*PUBLIC FUNCTIONS */
  function usuario(vista) {
    entity = vista ? vista : 'usuario';
    return methods;
  }

  function cliente(vista) {
    entity = vista ? vista : 'cliente';
    return methods;
  }

  function activo() {
    entity = 'activo';
    return methods;
  }

  function area() {
    entity = 'area';
    return methods;
  }

  function ticket(vista){
    entity = vista ? vista : 'ticket';

    return methods;
  }

  function documentacion(_entity = 'documentacion'){
    entity = _entity;
    return methods;
  }

  function imagen (_entity='imagen'){
    entity = _entity;
    return methods;
  }

  function respuesta (_entity = 'respuesta') {
    entity = _entity;
    return methods;
  }

  function pregunta (_entity='pregunta'){
    entity =_entity;
    return methods;
  }
  function encuesta (_entity='encuesta') {
    entity = _entity;
    return methods;
  }

  this.encuesta = encuesta;
  this.respuesta = respuesta;
  this.pregunta = pregunta;
  this.imagen = imagen;
  this.documentacion = documentacion;
  this.ticket = ticket;
  this.area = area;
  this.usuario = usuario;
  this.cliente = cliente;
  this.activo = activo;
}

export default angular.module('nixApp.bifrost', [])
  .service('$bi', bifrostService)
  .name;
