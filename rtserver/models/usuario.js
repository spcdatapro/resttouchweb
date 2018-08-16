'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    idempleado: { type: Schema.ObjectId, ref: 'empleado', default: null },
    usuario: { type: String, unique: true, required: true, dropDups: true },
    contrasenia: { type: String, required: true },
    sedes:[{
        idsede: { type: Schema.ObjectId, ref: 'sede' }
    }],
    permisos:[{
        idmenu: { type: Schema.ObjectId, unique: true, required: true, ref: 'menu', dropDups: true },
        c: { type: Boolean, default: false },
        r: { type: Boolean, default: false },
        u: { type: Boolean, default: false },
        d: { type: Boolean, default: false }
    }],
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('usuario', UsuarioSchema, 'usuarios');