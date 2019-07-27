var express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

compras_router = express.Router();

var Model = {};

Model.sequelize = sequelize;
Model.compras = sequelize.define('compras', {
    id_compra: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    id_cliente: { type: Sequelize.INTEGER, allowNull: false },
    fecha: { type: Sequelize.DATE, allowNull: false },
    id_boleto: { type: Sequelize.INTEGER, allowNull: false },
    vendedor_id: { type: Sequelize.INTEGER, allowNull: false }
},
{timestamps: false}
);

/*
    id_cliente: 2
    fecha:  2019-07-27 01:52:45
    id_boleto: 3
    vendedor_id: 1
*/

//-----------------queries---------------------
compras_router.get('/', function (req, res) {
    Model.compras.findAll().then(compras_var => {
        res.json(compras_var);
    });
});

compras_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.compras.findAll({
        where: {
            id_compra: idGet
        }
    }).then((compras_var) => {
        res.json(compras_var);
    })
});

compras_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.compras.create(entrada).then(compras_var => {
        res.json(compras_var);
    });
});

compras_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.compras.destroy({
        where: {
            id_compra: idDel
        }
    }).then((compras_var) => {
        res.json(compras_var);
    });
});

compras_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.compras.update({
        id_cliente: entrada.id_cliente,
        fecha:entrada.fecha,
        id_boleto: entrada.id_boleto,
        vendedor_id: entrada.vendedor_id
    }, {
            where: {
                id_compra: idPut
            }
        }).then(compras_var => {
            res.json(compras_var);
        });
});



module.exports = compras_router;