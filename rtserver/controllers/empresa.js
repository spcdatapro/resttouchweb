'use strict'

const BaseController = require('../classes/basecontroller');
const empresa = require('../models/empresa');

class EmpresaController extends BaseController{
    constructor(){
        super(empresa, '_id');
    }
}

module.exports = EmpresaController;