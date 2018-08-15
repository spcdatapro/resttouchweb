'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema, 
SedeSchema = require('./sede');

const AreaSchema = Schema({
    idsede: { type: Schema.ObjectId, ref: 'sede' },
    nombre: String,
    mesas: [{
        idmesa: { type: Schema.ObjectId, ref: 'mesa'}
    }],
    cajas: [{
        idcaja: { type: Schema.ObjectId, ref: 'caja' }
    }],
    debaja: { type: Boolean, default: false }
});

AreaSchema.post('save', function(doc) {
    SedeSchema.update(
        { 
            _id: doc.idsede
        },
        {
            $push: { 
                areas:{
                    idarea: doc._id
                }
            }
        },
        () => {}
    )
});

module.exports = mongoose.model('area', AreaSchema, 'areas');