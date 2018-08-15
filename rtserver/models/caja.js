'use strict'

const 
mongoose = require('mongoose'),
Schema = mongoose.Schema;

const CajaSchema = Schema({
    numero: Number,
    areas: [{ 
        idarea: { type: Schema.ObjectId, ref: 'area' }
    }],    
    debaja: { type: Boolean, default: false }
});

module.exports = mongoose.model('caja', CajaSchema, 'cajas');