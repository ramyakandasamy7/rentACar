var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/userAPIRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Car Rental User RESTful API server started on: ' + port);

