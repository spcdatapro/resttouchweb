'use strict'

const 
jwt = require('jwt-simple'),
moment = require('moment'),
llave = '1Te.5:17:0r3n_1nc3s@nt3m3nt3';

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ mensaje: 'Por favor agregue la cabecera de autenticación a la solicitud e intente de nuevo.' });
    }

    const token = req.headers.authorization.replace(/['"']+/g, '');
    let payload = {};
    try{
        payload = jwt.decode(token, llave);
        if (payload.exp < moment().unix()) {
            return res.status(401).send({ mensaje: 'El token que está usando ya expiró. Por favor inicie sesión nuevamente.' });
        }
    }catch(ex){
        return res.status(404).send({ mensaje: 'El token no es válido. ERROR: ' + ex.message });
    }

    req.usrauth = payload;
    next();
};