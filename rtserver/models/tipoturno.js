'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const TipoTurnoSchema = Schema({
    nombre: String,    
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('tipoturno', TipoTurnoSchema, 'tiposturno');