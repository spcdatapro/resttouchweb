'use strict'

const BaseController = require('../classes/basecontroller');
const organizacion = require('../models/organizacion');

class OrganizacionController extends BaseController{
    constructor(){
        super(organizacion, '_id');
    }
}

module.exports = OrganizacionController;