'use strict'

const BaseController = require('../classes/basecontroller');
const sede = require('../models/sede');

class SedeController extends BaseController{
    constructor(){
        super(sede, '_id');
    }
}

module.exports = SedeController;