'use strict'

const BaseController = require('../classes/basecontroller');
const usuario = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

class UsuarioController extends BaseController{
    constructor(){
        super(usuario, '_id');
    }

    async login(usr, pwd) {
        const notValidUsr = { _id: '', nombre: '', apellido: '', usuario: usr, token: '', logeado: false };
        const entidad = await usuario.findOne({ usuario: usr }).populate('idempleado', ['nombre', 'apellido']).exec();
        if(!entidad){
            return notValidUsr;
        }

        if(bcrypt.compareSync(pwd, entidad.contrasenia)){
            return {
                _id: entidad._id,
                nombre: entidad.idempleado ? entidad.idempleado.nombre : '',
                apellido: entidad.idempleado ? entidad.idempleado.apellido : '',
                usuario: entidad.usuario,
                token: jwt.createToken(entidad),
                logeado: true
            }
        }else{
            return notValidUsr;
        }
    }
}

module.exports = UsuarioController;