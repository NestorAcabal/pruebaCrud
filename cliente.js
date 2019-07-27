var express = require('express');
//var app = express();
const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

cliente_router = express.Router();
var Model = {};
Model.sequelize = sequelize;
Model.clientes = sequelize.define('clientes', {
    id_cliente: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true,  allowNull: false },
    id_dp: { type: Sequelize.INTEGER,  allowNull: false }
});
sequelize.sync();
/*
    "id_dp": 2
*/

cliente_router.get('/', function (req, res) {
    Model.clientes.findAll().then(clientes_bas => {
        res.json(clientes_bas);
    });
});

cliente_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.clientes.findAll({
        where: {
            id_cliente: idGet
        }
    }).then((clientes_bas) => {
        res.json(clientes_bas);
    })
});

cliente_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.clientes.create(entrada).then(clientes_bas => {
        res.json(clientes_bas);
    });
});

cliente_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.clientes.destroy({
        where: {
            id_cliente: idDel
        }
    }).then((clientes_bas) => {
        res.json(clientes_bas);
    });
});

cliente_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.clientes.update({
        id_dp: entrada.id_dp
    }, {
            where: {
                id_cliente: idPut
            }
        }).then(clientes_bas => {
            res.json(clientes_bas);
        });
});

module.exports = cliente_router;