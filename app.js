var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const boletos_router= require ('./boletos');
app.use('/boletos', boletos_router);

app.listen(4000, function () {
  console.log('app: 4000!');
});