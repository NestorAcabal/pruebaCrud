var express = require('express');
var datos_personales = express();
const bodyParser = require('body-parser');
datos_personales.use(bodyParser.urlencoded({ extended: false }));
datos_personales.use(bodyParser.json());
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebacruddb', 'root', '', {
    dialect: 'mysql'
})

dat_pers_router = express.Router();

var Model = {};
Model.sequelize = sequelize;
Model.datos_personales = sequelize.define('datos_personales', {
    id_dp: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nombres: { type: Sequelize.STRING, allowNull: false },
    apellidos: { type: Sequelize.STRING, allowNull: false },
    genero: { type: "SET('Masculino', 'Femenino')", allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    edad: { type: Sequelize.INTEGER, allowNull: false },
    dpi: { type: Sequelize.INTEGER, allowNull: false }
}, { timestamps: false });
sequelize.sync();
/*	{
        "nombres": "pruebaPut1",
        "apellidos": "pruebaPut1",
        "genero": "Masculino",
        "email": "prueba@put1.com",
        "edad": 26,
        "dpi": 987654321
    }
*/

//-----------------queries---------------------
dat_pers_router.get('/', function (req, res) {
    Model.datos_personales.findAll().then(dat_pers => {
        res.json(dat_pers);
    });
});

dat_pers_router.get('/:idGet', function (req, res) {
    var idGet = req.params.idGet;
    Model.datos_personales.findAll({
        where: {
            id_dp: idGet
        }
    }).then((dat_pers) => {
        res.json(dat_pers);
    })
});

dat_pers_router.post("/", function (req, res    ) {
    var entrada = req.body;
    Model.datos_personales.create(entrada).then(dat_pers => {
        res.json(dat_pers);
    });
});

dat_pers_router.delete("/:idDel", function (req, res, body) {
    var idDel = req.params.idDel;
    Model.datos_personales.destroy({
        where: {
            id_dp: idDel
        }
    }).then((dat_pers) => {
        res.json(dat_pers);
    });
});

dat_pers_router.put("/:idPut", function (req, res) {
    var idPut = req.params.idPut;
    var entrada = req.body;
    Model.datos_personales.update({
        nombres: entrada.nombres,
        apellidos: entrada.apellidos,
        genero: entrada.genero,
        email: entrada.email,
        edad: entrada.edad,
        dpi: entrada.dpi
    }, {
            where: {
                id_dp: idPut
            }
        }).then(dat_pers => {
            res.json(dat_pers);
        });
});


module.exports = dat_pers_router;

