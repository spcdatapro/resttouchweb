'use strict'

const express = require('express');
// const pluralize = require('pluralize');

class BaseController{
    /*
    @param model Modelo de mongoose
    @param key Llave primaria del modelo
    */

    constructor(model, key){
        this.model = model;
        this.modelName = model.modelName.toLowerCase();
        this.key = key;
    }

    create(data){
        return this.model.create(data);
        /*
        return this.model.create(data).then((modelInstance) => {
            const response = {};
            response[this.modelName] = modelInstance;
            return response;
        });
        */
    }

    read(id){
        const filter = {};
        filter[this.key] = id;
        return this.model.findOne(filter).exec();        
    }

    list(){        
       return this.model.find({}).exec();
    }

    filter(filtro){
        return this.model.find(filtro).exec();
    }

    delete(id){
        const filter = {};
        filter[this.key] = id;

        return this.model.remove(filter).then(() => {});
    }

    update(id, data){
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }    
    
    // Rutas para API normal...
    ok(res){ return (data) => res.json(data); }

    fail(res){ return (error) => { console.log(error); res.sendStatus(404).end(); } }

    route(){
        const router = express.Router();

        router.get('/', (req, res) => this.list().then(this.ok(res), this.fail(res)));
        router.post('/', (req, res) => this.create(req.body).then(this.ok(res), this.fail(res)));
        router.get('/:key', (req, res) => this.read(req.params.key).then(this.ok(res), this.fail(res)));
        router.put('/:key', (req, res) => this.update(req.params.key, req.body).then(this.ok(res), this.fail(res)));
        router.delete('/:key', (req, res) => this.delete(req.params.key).then(this.ok(res), this.fail(res)));

        return router;
    }
    
}

module.exports = BaseController;