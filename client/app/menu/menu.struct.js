'use strict'

exports = module.exports = [{
  title: 'Ticket',
  items: [{
    icon: 'add',
    state: 'newTicket',
    title: 'Agregar'
  }, {
    icon: 'content_paste',
    state: 'adminTicket',
    title: 'Administrar'
  }, {
    icon: 'bookmark_border',
    state: 'requestTicket',
    title: 'Solicitar'
  }]
}, {
  title: 'Cleintes',
  items: [{
    icon: 'add',
    state: 'm.addCliente',
    title: 'Agregar'
  },{
    icon: 'supervisor_account',
    state: 'adminCliente',
    title: 'Administrar'
  }]
}, {
  title: 'Usuarios',
  items: [{
    icon: 'add',
    state: 'm.addUsuario',
    title: 'Agregar'
  },{
    icon: 'supervisor_account',
    state: 'adminCliente',
    title: 'Administrar'
  }]
}, {
  title: 'Inventario',
  items: [{
    icon: 'add',
    state: 'm.addActivo',
    title: 'Agregar'
  },{
    icon: 'assignment',
    state: 'adminActivo',
    title: 'Administrar'
  },{
    icon: 'description',
    state: 'hojaActivo',
    title: 'Hoja de vida'
  }]
}]
