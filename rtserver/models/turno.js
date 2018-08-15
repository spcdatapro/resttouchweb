'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const TurnoSchema = Schema({
    idtipoturno: { type: Schema.ObjectId, ref: 'tipoturno' },
    idsede: { type: Schema.ObjectId, ref: 'sede' },
    inicia: Date,
    finaliza: Date,
    abierto: { type: Boolean, default: true },
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('turno', TurnoSchema, 'turnos');