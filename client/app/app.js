'use strict';
import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
//MY IMPORTS
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngLoading from 'angular-loading-bar';
import ngFileUpload from 'ng-file-upload';
import moment from  'moment';
import momentTimeZone from 'moment-timezone';
import es from 'moment/locale/es.js'
import ngMoment from 'angular-moment';
import ngPagination from 'angular-utils-pagination';
moment.locale('es');
//TRASH
import {
  routeConfig,
  runConfig
} from './app.config';
import constants from './app.constants';
import util from '../components/util/util.module';
//SERVICES
import bifrost from '../services/bifrost.service';
import pop from '../services/pop.service';
import dialog from '../services/dialog.service';
import hummer from '../services/hummer.service';
import select from '../services/select.service';
import timer from '../services/time.service';
//COMPONENTS ROUTERS
import login from './login/login.component';
import menu from './menu/menu.component';
import master from './main/master/master.component';
import addUsuario from './usuario/addUsuario/addUsuario.component';
import addCliente from './cliente/addCliente/addCliente.component';
import addActivo from './activo/addActivo/addActivo.component';
import addTicket from './ticket/addticket/addTicket.component';
import adminTicket from './ticket/adminTicket/adminTicket.component';
//STYLESHEETS
import './app.styl';
import '../../node_modules/angular-material/angular-material.min.css'
import '../../node_modules/angular-loading-bar/build/loading-bar.min.css'

angular.module('nixApp', [
    ngCookies, ngResource, ngSanitize, uiRouter, constants, util, ngMaterial,
    ngMessages, ngLoading, ngFileUpload, ngMoment,ngPagination, //==>EXTERNAL MODUELES
    bifrost, pop, dialog, hummer, select, timer, //==> SERVICES
    login, menu, master, addUsuario, addCliente, addActivo, addTicket, adminTicket // ==> COMPONENTS
  ])
  .config(routeConfig)
  .run(runConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['nixApp'], {
      strictDi: true
    });
  });
