'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema, 
AreaSchema = require('./area');

const MesaSchema = Schema({
    idarea: { type: Schema.ObjectId, ref: 'area' },
    numero: Number,
    sillas: Number,
    posicion: {
        x: Number,
        y: Number
    },
    debaja: { type: Boolean, default: false }
});

MesaSchema.post('save', function(doc) {
    AreaSchema.update(
        { 
            _id: doc.idarea
        },
        {
            $push: { 
                mesas:{
                    idmesa: doc._id
                }
            }
        },
        () => {}
    )
});

module.exports = mongoose.model('mesa', MesaSchema, 'mesas');