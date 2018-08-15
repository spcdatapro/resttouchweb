'use strict'

const 
mongoose = require('mongoose'), 
app = require('./app'), 
fs = require('fs'),
port = process.env.PORT || 3789,
baseDeDatos = fs.readFileSync('bd.txt', 'utf8');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${baseDeDatos}`, { useNewUrlParser: true }).then(() => {
    console.log( `Conexión a BD ${baseDeDatos} exitosa...`);
    app.listen(port, () => { console.log('Servidor express corriendo...'); });
}).catch(err => console.log(`ERROR: ${err}`));