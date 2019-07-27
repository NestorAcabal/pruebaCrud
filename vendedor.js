var express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

vendedores_router = express.Router();

var Model = {};

Model.sequelize = sequelize;
Model.vendedores = sequelize.define('vendedores', {
    id_vendedor: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    id_dp: { type: Sequelize.INTEGER, allowNull: false },   
},
{timestamps: false}
);

/* 
    "id_dp": 4;
*/

//-----------------queries---------------------
vendedores_router.get('/', function (req, res) {
    Model.vendedores.findAll().then(vende_var => {
        res.json(vende_var);
    });
});

vendedores_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.vendedores.findAll({
        where: {
            id_vendedor: idGet
        }
    }).then((vende_var) => {
        res.json(vende_var);
    })
});

vendedores_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.vendedores.create(entrada).then(vende_var => {
        res.json(vende_var);
    });
});

vendedores_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.vendedores.destroy({
        where: {
            id_vendedor: idDel
        }
    }).then((vende_var) => {
        res.json(vende_var);
    });
});

vendedores_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.vendedores.update({
        id_dp:entrada.id_dp 
    }, {
            where: {
                id_vendedor: idPut
            }
        }).then(vende_var => {
            res.json(vende_var);
        });
});



module.exports = vendedores_router;