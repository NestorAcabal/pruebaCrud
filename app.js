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

//-----------------Tabla Vendedores
const vendedores_router = require ('./vendedor.js');
app.use('/vendedores', vendedores_router);

//-----------------Tabla datos Personales
const dat_pers_router = require ('./datos_personales');
app.use('/datos_personales', dat_pers_router);

//-----------------Tabla compras
const compras_router = require ('./compras.js');
app.use('/compras', compras_router);

//-----------------Tabla encargados
const encargado_router = require ('./encargado_sala.js');
app.use('/encargados', encargado_router);

//-----------------Tabla peliculas
const peliculas_router = require ('./peliculas.js');
app.use('/peliculas', peliculas_router);

//-----------------Tabla peliculas
const sala_router = require ('./sala.js');
app.use('/salas', sala_router);

app.listen(4000, function () {
  console.log('app: 4000!');
});