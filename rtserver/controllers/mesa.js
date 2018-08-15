'use strict'

const BaseController = require('../classes/basecontroller');
const mesa = require('../models/mesa');

class MesaController extends BaseController{
    constructor(){
        super(mesa, '_id');
    }
}

module.exports = MesaController;