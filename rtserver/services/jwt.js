'use strict'

const 
jwt = require('jwt-simple'),
moment = require('moment'),
llave = '1Te.5:17:0r3n_1nc3s@nt3m3nt3';

exports.createToken = (usr) => {
    const payload = {
        sub: usr._id,        
        nombre: usr.idempleado ? usr.idempleado.nombre : '',
        apellido: usr.idempleado ? usr.idempleado.apellido : '',
        usuario: usr.usuario,
        iat: moment().unix(),
        exp: moment().add(24, 'hours').unix()
    };
    return jwt.encode(payload, llave);
};