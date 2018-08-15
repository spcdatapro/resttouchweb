'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const EmpleadoSchema = Schema({
    idpuesto: { type: Schema.ObjectId, ref: 'puesto' },
    nombre: String,
    apellido: String,
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('empleado', EmpleadoSchema, 'empleados');