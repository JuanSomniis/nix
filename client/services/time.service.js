'use strict';
const angular = require('angular');

/*@ngInject*/
export function timeService() {

  function on(_fecha) {
    let
      fecha = _fecha ? new Date(_fecha) : new Date(),
      weekday = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'),
      months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'),
      hour = fecha.getHours() > 12 ? fecha.getHours() - 12 : (fecha.getHours() < 10 ? "0" + fecha.getHours() : fecha.getHours()),
      minute = fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes(),
      seconds = fecha.getSeconds() < 10 ? "0" + fecha.getSeconds() : fecha.getSeconds(),
      meridiem = fecha.getHours() > 12 ? "PM" : "AM",
      dayOfWeek = weekday[fecha.getDay()],
      day = fecha.getDate(),
      month = months[fecha.getMonth()],
      year = fecha.getFullYear(),
      objTime = {
        fullHour: hour + ':' + minute + ':' + seconds,
        fullDate: dayOfWeek +' '+  day +' de ' + month +' del ' + year,
        fullMeridian :hour + ':' + minute + ':' + seconds + meridiem,
      }
    return objTime;

  }
  this.on = on;
}

export default angular.module('nixApp.time', [])
  .service('$time', timeService)
  .name;
