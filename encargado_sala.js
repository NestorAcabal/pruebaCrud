var express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

encargado_router = express.Router();

var Model = {};
Model.sequelize = sequelize;
Model.encargado_salas = sequelize.define('encargado_salas', {
    id_encargado_sala: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true,  allowNull: false },
    id_dp: { type: Sequelize.INTEGER,  allowNull: false }
}, {timestamps: false} );
sequelize.sync();

/* 
    "id_dp": 4,
*/

//-----------------queries---------------------
encargado_router.get('/', function (req, res) {
    Model.encargado_salas.findAll().then(encargado_var => {
        res.json(encargado_var);
    });
});

encargado_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.encargado_salas.findAll({
        where: {
            id_encargado_sala: idGet
        }
    }).then((encargado_var) => {
        res.json(encargado_var);
    })
});

encargado_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.encargado_salas.create(entrada).then(encargado_var => {
        res.json(encargado_var);
    });
});

encargado_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.encargado_salas.destroy({
        where: {
            id_encargado_sala: idDel
        }
    }).then((encargado_var) => {
        res.json(encargado_var);
    });
});

encargado_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.encargado_salas.update({
        id_dp:entrada.id_dp 
    }, {
            where: {
                id_encargado_sala: idPut
            }
        }).then(encargado_var => {
            res.json(encargado_var);
        });
});

module.exports = encargado_router;