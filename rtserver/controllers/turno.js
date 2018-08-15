'use strict'

const BaseController = require('../classes/basecontroller');
const turno = require('../models/turno');

class TurnoController extends BaseController{
    constructor(){
        super(turno, '_id');
    }
}

module.exports = TurnoController;