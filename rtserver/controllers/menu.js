'use strict'

const BaseController = require('../classes/basecontroller');
const menu = require('../models/menu');

class MenuController extends BaseController{
    constructor(){
        super(menu, '_id');
    }

    async getRuta(idpadre, ruta){        
        const padre = await this.read(idpadre);
        if(padre){
            ruta.push(padre.descripcion);
            if(padre.idpadre){
                await this.getRuta(padre.idpadre, ruta);
            }
        }
        let tmp = [];
        for(let i = ruta.length-1; i >= 0; i--){
            tmp.push(ruta[i]);
        }
        return tmp.join(' - ');
    }    
}

module.exports = MenuController;