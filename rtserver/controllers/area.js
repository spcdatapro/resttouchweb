'use strict'

const BaseController = require('../classes/basecontroller');
const area = require('../models/area');

class AreaController extends BaseController{
    constructor(){
        super(area, '_id');
    }
}

module.exports = AreaController;