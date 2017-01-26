'use strict';
const angular = require('angular');

/*@ngInject*/
export function hummerService() {
  // AngularJS will instantiate a singleton by calling "new" on this function

  function objectToSentence(objectArray) {
    let sentence = '';
    for (var i = 0; i < objectArray.length; i++) {
      for (var name in objectArray[i]) {
        sentence += " " + name + " = '" + objectArray[i][name] + "' and";
      }
    }
    sentence += ' 1= 1';
    return sentence;
  }

  function now() {
    let
      objToday = new Date(),
      weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
      dayOfWeek = weekday[objToday.getDay()],
      domEnder = function() {
        var a = objToday;
        if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
        a = parseInt((a + "").charAt(1));
        return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th"
      }(),
      //dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
      months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
      curMonth = months[objToday.getMonth()],
      curYear = objToday.getFullYear(),
      curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
      curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
      curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
      curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    return curHour + ":" + curMinute + ":" + curSeconds;
  }

  function returnQuotes(array) {
    let sentence = '';
    for (var i = 0; i < array.length; i++) {
      if (!(array.length == i + 1))
        sentence += " '" + array[i] + "',";
      else
        sentence += " '" + array[i] + "'";
    }
    return sentence;
  }

  function arrayToSentence(array) {
    let sentence = '';
    for (var i = 0; i < array.length; i++) {
      if (!(array.length == i + 1))
        sentence += " " + array[i] + ",";
      else
        sentence += " " + array[i] + "";
    }
    return sentence;
  }

  function objectToArray(arrayObject) {
    let arrary = [];
    for (var i = 0; i < arrayObject.length; i++)
      arrary.push(Object.values(arrayObject[i]).toString());
    return arrary;
  }
  //frm = Objecto de formulario
  function castFormToModel(frm) {
    //Se declara objecto en donde se guardará cada modelo de cada input
    let castObject = new Object();
    //Bucle para recorrer cada item del objeto
    for (let item in frm)
      //En caso que el key del item empiece con $ se sabe que es propio del formulario
      if (!(item.startsWith('$')))
        //Se pasa al castObject los nuevos valores del modelo
        castObject[item] = frm[item].$modelValue;
    //se retorna el objeto con los modelos
    return castObject;
  }

  function evaluateRepetition(list, value, key) {
    let repeat = false;
    list.forEach(item => {
      if (item[key] === value) repeat = true
    });
    return repeat;
  }

  this.now = now;
  this.evaluateRepetition = evaluateRepetition;
  this.castFormToModel = castFormToModel;
  this.objectToArray = objectToArray;
  this.arrayToSentence = arrayToSentence;
  this.returnQuotes = returnQuotes;
  this.objectToSentence = objectToSentence;
}

export default angular.module('nixApp.hummer', [])
  .service('$hummer', hummerService)
  .name;
