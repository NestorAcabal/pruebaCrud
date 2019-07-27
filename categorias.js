var express = require('express');
//var app = express();
const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

categorias_router = express.Router();

var Model = {};
Model.sequelize = sequelize;
Model.categorias = sequelize.define('categorias', {
    id_categoria: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nombre: { type: Sequelize.STRING, allowNull: false },
    clasif_edad: { type: Sequelize.INTEGER, allowNull: false },
}, { timestamps: false });
sequelize.sync();
/*
    "nombre": "Terror",
    "clasif_edad": 16
*/

categorias_router.get('/', function (req, res) {
    Model.categorias.findAll().then(categ_var => {
        res.json(categ_var);
    });
});

categorias_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.categorias.findAll({
        where: {
            id_categoria: idGet
        }
    }).then((categ_var) => {
        res.json(categ_var);
    })
});

categorias_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.categorias.create(entrada).then(categ_var => {
        res.json(categ_var);
    });
});

categorias_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.categorias.destroy({
        where: {
            id_categoria: idDel
        }
    }).then((categ_var) => {
        res.json(categ_var);
    });
});

categorias_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.categorias.update({
        nombre: entrada.nombre,
        clasif_edad: entrada.clasif_edad
    }, {
            where: {
                id_categoria: idPut
            }
        }).then(categ_var => {
            res.json(categ_var);
        });
});

module.exports = categorias_router;