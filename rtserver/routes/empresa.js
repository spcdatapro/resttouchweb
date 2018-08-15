'use strict'

const express = require('express');
const EmpresaController = require('../controllers/empresa');
const api = express.Router();

api.use('/empresa', new EmpresaController().route());

module.exports = api;