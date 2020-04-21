var express = require('express'),
    app = express(),
    port = process.env.PORt || 7000.
bodyParser = require('body-parser');
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);