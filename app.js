var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//------------Tabla Boletos
const boletos_router= require ('./boletos');
app.use('/boletos', boletos_router);

//-------------Tabla Categorias
const categorias_router= require ('./categorias.js');
app.use('/categorias', categorias_router);

//----------------Tabla Clientes
const cliente_router = require ('./cliente.js');
app.use('/cliente', cliente_router);

//-----------------Tabla datos Personales
const dat_pers_router = require ('./datos_personales');
app.use('/datos_personales', dat_pers_router);


app.listen(4000, function () {
  console.log('app: 4000!');
});