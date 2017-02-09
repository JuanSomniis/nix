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

  messageRight() {
    this.$pop.show("Documentacion registrada satisfactoriamente")
  }
  openFeatures(feature) {
    this.features[feature].visible = !this.features[feature].visible;
  }
  /*
   *   Proceso global de documentar
   *   @tipo = tipo de documentacion OO,SS,CC,EE
   */
  nota(tipo) {
    let hoy = this.moment().format('YYYY[-]MM[-]D'),
      ahora = this.moment().format('h:mm:ss'),
      nombreUsuario = `${this.$cookieStore.get('user').apellido} ${this.$cookieStore.get('user').nombre}`,
      arrVal = [
        hoy,
        ahora,
        this.model.texto,
        tipo,
        nombreUsuario,
        this.$stateParams.id
      ];

    return this.$bi.documentacion().insert(arrVal);
  }

  cerrar(){
    // Registrar la encuesta

  }

  escalar() {
    //Se actualiza el te4cnico en el ticket
    let
      valObj = {fk_id_tecnico: this.model.tecnico,estado : 'P'},
      whereObj = {id_ticket: this.$stateParams.id};
    ths.$bi.ticket().update(valObj, whereObj).then(() => messageRight());
  }

  solucionar() {
    let
      valObj = {cierre: this.model.cierr, estado : 'V'},
      whereObj = {id_ticket: this.$stateParams.id};
    ths.$bi.ticket().update(valObj, whereObj).then(()=> messageRight());
  }

  frmSubmit() {
    if (this.modo === 'N' || this.modo === 'P') {
      //NOTA O SOLUCION
      let tipo = this.model.cierre === "NN"? "OO": "SS";
      this.nota(tipo).then(response => {
        //SI ES SOLUCION
        if (tipo === 'SS') this.solucionar();
        //SI ES NOTA
        else this.messageRight();
      });
    }
    else if (this.modo === 'V') this.nota("CC").then(response=>this.cerrar());
    else if (this.modo === 'E') this.nota("EE").then(response => this.escalar());
  }

  /*documentacion() {
    const hoy = this.moment().format('YYYY[-]MM[-]D'),
      ahora = this.moment().format('h:mm:ss');
    let tipo = this.model.cierre === "NN"
        ? "OO"
        : "SS",
      nombreUsuario = `${this.$cookieStore.get('user').apellido} ${this.$cookieStore.get('user').nombre}`,
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
        let valObj = {
            cierre: this.model.cierre
          },
          whereObj = {
            id_ticket: this.$stateParams.id
          };

        this.$bi.ticket().update(valObj, whereObj).then(response => {
          this.$pop.show("Documentacion registrada")
        });
      } else {
        this.$pop.show("Documentacion registrada")
      }
    });
  }*/

  $onInit() {
    //El modeo en el que se ejecuta la documentacion ESCALAR|DOCUMENTAR-SOLUCIONAR|CERRAR(ENCUESTA)
    this.modo = this.$stateParams.modo;
    this.model = new Object();
    //Por defecto es un nota mas no un cierre
    this.model.cierre = 'NN';
    this.image = '';
    let url = 'http://picasaweb.google.com/data/entry/api/user/mortombolo@gmail.com?alt=json';
    this.$http.get(url).then(response => this.image = response.data.entry.gphoto$thumbnail.$t).catch(err => console.log(err))
    // data => entry => gphoto$thumbnail ==> $t
    this.features = require('./docum.struct')
    this.preguntas = [
      {
        name: 'pregunta1',
        model: 'pregunta1',
        placeholder: 'El servicio se atendio ',
        respuestas: [
          {
            value: 'Si',
            display: 'Si'
          }, {
            value: 'No',
            display: 'No'
          }
        ]
      }, {
        name: 'pregunta2',
        model: 'pregunta2',
        placeholder: 'El servicio se atendio ',
        respuestas: [
          {
            value: 'Si',
            display: 'Si'
          }, {
            value: 'No',
            display: 'No'
          }
        ]
      }, {
        name: 'pregunta3',
        model: 'pregunta3',
        placeholder: 'El servicio se atendio ',
        respuestas: [
          {
            value: 'Si',
            display: 'Si'
          }, {
            value: 'No',
            display: 'No'
          }
        ]
      }
    ]
  }
}

export default angular.module('nixApp.documTicket', [uiRouter]).config(route).component('documTicket', {
  template: require('./documTicket.pug'),
  controller: DocumTicketCmponent
}).name;
