'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema, 
OrganizacionSchema = require('./organizacion');

const EmpresaSchema = Schema({
    idorganizacion: { type: Schema.ObjectId, ref: 'organizacion' },
    nombre: String,
    razonsocial: String,
    abreviatura: String,
    nit: String,
    direccion: String,
    sedes:[
        {
            idsede: { type: Schema.ObjectId, ref: 'sede' }
        }
    ],
    debaja: { type: Boolean, default: false }
});

EmpresaSchema.post('save', function(doc) {
    OrganizacionSchema.update(
        { 
            _id: doc.idorganizacion
        },
        {
            $push: { 
                empresas:{
                    idempresa: doc._id
                }
            }
        },
        () => {}
    )
});

module.exports = mongoose.model('empresa', EmpresaSchema, 'empresas');