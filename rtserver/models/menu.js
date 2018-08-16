'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const MenuSchema = Schema({
    idpadre: { type: Schema.ObjectId, ref: 'menu', default: null },
    ruta: { type: String, default: null },
    descripcion: String,
    nivel: Number,
    url: { type: String, default: null },
    icono: { type: String, default: null },
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('menu', MenuSchema, 'menu');