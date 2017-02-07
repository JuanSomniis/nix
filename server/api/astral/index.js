'use strict';

var express = require('express');
var controller = require('./astral.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/find', controller.find);
router.post('/', controller.insert);
router.put('/', controller.update);

module.exports = router;
