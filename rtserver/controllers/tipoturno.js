'use strict'

const BaseController = require('../classes/basecontroller');
const tipoturno = require('../models/tipoturno');

class TipoTurnoController extends BaseController{
    constructor(){
        super(tipoturno, '_id');
    }
}

module.exports = TipoTurnoController;