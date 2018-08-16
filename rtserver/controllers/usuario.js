'use strict'

const BaseController = require('../classes/basecontroller');
const usuario = require('../models/usuario');

class UsuarioController extends BaseController{
    constructor(){
        super(usuario, '_id');
    }
}

module.exports = UsuarioController;