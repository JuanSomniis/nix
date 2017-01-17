'use strict';
//const ructor = require('../ructor');
import ructor from '../ructor';
let Ructor = new ructor;

export function index(req, res) {
  Ructor.all().then(response => res.json(response.recordset));
}

export function find(req, res) {
  let
    where = req.body.where,
    val = req.body.val ? req.body.val : '*',
    entity = req.body.entity;
  Ructor.findBy(entity, where, val)
    .then(response => res.json(response.recordset))
    .catch(err => console.log(err));
}

export function insert(req, res) {
  let val = req.body.val,
    entity = req.body.entity;
  Ructor.insert(entity,val).then(response => res.json(response.recordset));
}
