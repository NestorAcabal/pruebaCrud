
var express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

peliculas_router = express.Router();

var Model = {};

Model.sequelize = sequelize;
Model.peliculas = sequelize.define('peliculas', {
    id_pelicula: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nombre: { type: Sequelize.STRING, allowNull: false },
    fecha_estreno: { type: Sequelize.DATE, allowNull: false },
    id_categoria: { type: Sequelize.INTEGER, allowNull: false }
},
{timestamps: false}
);

/*
    "nombre": "Avengers",
    "fecha_estreno": "2019-04-20",
    "id_categoria": 3
*/

//-----------------queries---------------------
peliculas_router.get('/', function (req, res) {
    Model.peliculas.findAll().then(pelis_var => {
        res.json(pelis_var);
    });
});

peliculas_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.peliculas.findAll({
        where: {
            id_pelicula: idGet
        }
    }).then((pelis_var) => {
        res.json(pelis_var);
    })
});

peliculas_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.peliculas.create(entrada).then(pelis_var => {
        res.json(pelis_var);
    });
});

peliculas_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.peliculas.destroy({
        where: {
            id_pelicula: idDel
        }
    }).then((pelis_var) => {
        res.json(pelis_var);
    });
});

peliculas_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.peliculas.update({
        nombre: entrada.nombre,
        fecha_estreno: entrada.fecha_estreno,
        id_categoria: entrada.id_categoria
    }, {
            where: {
                id_pelicula: idPut
            }
        }).then(pelis_var => {
            res.json(pelis_var);
        });
});



module.exports = peliculas_router;