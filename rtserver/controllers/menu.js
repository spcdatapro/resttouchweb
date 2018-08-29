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

    async getTreeMenu(level = 0, father = null, obj = []){
        let filtro = { nivel: +level, debaja: false };
        if(+level > 0 && father !== null && father !== undefined){ filtro.idpadre = father; }

        const itemsMenu = await menu.find(filtro).exec();
        for(let i = 0; i < itemsMenu.length; i++){
            let itemMenu = itemsMenu[i];
            obj.push({
                _id: itemMenu._id,
                ruta: itemMenu.ruta,
                descripcion: itemMenu.descripcion,
                nivel: itemMenu.nivel,
                url: itemMenu.url,
                icono: itemMenu.icono,
                children: []
            });
        }

        for(let i = 0; i < obj.length; i++){
            await this.getTreeMenu(+level + 1, obj[i]._id, obj[i].children);
        }

        return obj;
    }
}

module.exports = MenuController;