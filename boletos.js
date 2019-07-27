var express = require('express');
//var app = express();
const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

boletos_router = express.Router();

var Model = {};

Model.sequelize = sequelize;
Model.boletos = sequelize.define('boletos', {
    id_boleto: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    precio: { type: Sequelize.FLOAT, allowNull: false },
    id_pelicula: { type: Sequelize.INTEGER, allowNull: false },
    hora: { type: 'TIMESTAMP', allowNull: false },
    num_sala: { type: Sequelize.INTEGER, allowNull: false }
    //VALUES ('32', '1', '01:31:48', '1');
   
},
{timestamps: false}
);
sequelize.sync();
/*
"precio": 25,
"id_pelicula":2,
"hora": "2019-07-26T13:31:48.000Z",
"num_sala": 2
*/

//-----------------queries---------------------
boletos_router.get('/', function (req, res) {
    Model.boletos.findAll().then(boletos => {
        res.json(boletos);
    });
});

boletos_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.boletos.findAll({
        where: {
            id_boleto: idGet
        }
    }).then((boletos) => {
        res.json(boletos);
    })
});

boletos_router.post("/", function (req, res, body) {
    var entrada = req.body;
    Model.boletos.create(entrada).then(boletos => {
        res.json(boletos);
    });
});

boletos_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.boletos.destroy({
        where: {
            id_boleto: idDel
        }
    }).then((boletos) => {
        res.json(boletos);
    });
});

boletos_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.boletos.update({
        precio: entrada.precio,
        id_pelicula:entrada.id_pelicula,
        hora: entrada.hora,
        num_sala: entrada.num_sala
    }, {
            where: {
                id_boleto: idPut
            }
        }).then(boletos => {
            res.json(boletos);
        });
});


module.exports = boletos_router;