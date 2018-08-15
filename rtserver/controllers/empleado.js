'use strict'

const BaseController = require('../classes/basecontroller');
const empleado = require('../models/empleado');

class EmpleadoController extends BaseController{
    constructor(){
        super(empleado, '_id');
    }
}

module.exports = EmpleadoController;