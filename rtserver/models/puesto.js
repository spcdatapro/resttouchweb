'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const PuestoSchema = Schema({
    nombre: String,
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('puesto', PuestoSchema, 'puestos');