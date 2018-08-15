'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const OrganizacionSchema = Schema({
    nombre: String,
    empresas: [
        {
            idempresa: { type: Schema.ObjectId, ref: 'empresa' }
        }
    ],
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('organizacion', OrganizacionSchema, 'organizaciones');