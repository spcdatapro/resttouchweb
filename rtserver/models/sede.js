'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema, 
EmpresaSchema = require('./empresa');

const SedeSchema = Schema({
    idempresa: { type: Schema.ObjectId, ref: 'empresa' },
    nombre: String,
    areas: [
        {
            idarea: { type: Schema.ObjectId, ref: 'area' }
        }
    ],
    debaja: { type: Boolean, default: false }
});

SedeSchema.post('save', function(doc) {
    EmpresaSchema.update(
        { 
            _id: doc.idempresa
        },
        {
            $push: { 
                sedes:{
                    idsede: doc._id
                }
            }
        },
        () => {}
    )
});

module.exports = mongoose.model('sede', SedeSchema, 'sedes');