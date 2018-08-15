'use strict'

const BaseController = require('../classes/basecontroller');
const caja = require('../models/caja');

class CajaController extends BaseController{
    constructor(){
        super(caja, '_id');
    }
}

module.exports = CajaController;