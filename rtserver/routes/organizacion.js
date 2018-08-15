'use strict'

const express = require('express');
const OrganizacionController = require('../controllers/organizacion');
const api = express.Router();

api.use('/org', new OrganizacionController().route());

module.exports = api;