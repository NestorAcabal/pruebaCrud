
var express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

sala_router = express.Router();

var Model = {};

Model.sequelize = sequelize;
Model.salas = sequelize.define('salas', {
    id_sala: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    num_sala: { type: Sequelize.INTEGER, allowNull: false },
    num_lugares: { type: Sequelize.INTEGER, allowNull: false },
    id_encargado_sala: { type: Sequelize.INTEGER, allowNull: false }
},
    { timestamps: false }
);

/*
    "num_sala":
    "num_lugares":
    "ind_encargado_sala":
*/

//-----------------queries---------------------
sala_router.get('/', function (req, res) {
    Model.salas.findAll().then(sala_var => {
        res.json(sala_var);
    });
});

sala_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.salas.findAll({
        where: {
            id_sala: idGet
        }
    }).then((sala_var) => {
        res.json(sala_var);
    })
});

sala_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.salas.create(entrada).then(sala_var => {
        res.json(sala_var);
    });
});

sala_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.salas.destroy({
        where: {
            id_sala: idDel
        }
    }).then((sala_var) => {
        res.json(sala_var);
    });
});

sala_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.salas.update({
        num_sala: entrada.num_sala,
        num_lugares: entrada.num_lugares,
        id_encargado_sala: entrada.id_encargado_sala
    }, {
            where: {
                id_sala: idPut
            }
        }).then(sala_var => {
            res.json(sala_var);
        });
});



module.exports = sala_router;