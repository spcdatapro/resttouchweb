'use strict'

const BaseController = require('../classes/basecontroller');
const puesto = require('../models/puesto');

class PuestoController extends BaseController{
    constructor(){
        super(puesto, '_id');
    }
}

module.exports = PuestoController;