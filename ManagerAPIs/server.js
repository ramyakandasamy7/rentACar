<<<<<<< HEAD
var express = require("express"),
  app = express(),
  port = process.env.PORt || 4000;
bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
=======
var express    = require('express'),
    app        = express(),
    https      = require('https'),
    fs         = require('fs');
    port       = process.env.PORT || 4000.
    bodyParser = require('body-parser'),
    cors       = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
>>>>>>> e1e2487793284f7594072885f8068ada3faca2b4
app.use(bodyParser.json());

var routes = require("./routes");
routes(app);

https.createServer({
	key: fs.readFileSync('certs/key.pem'),
	cert: fs.readFileSync('certs/cert.pem')
},app).listen(port);

<<<<<<< HEAD
console.log("RESTful API server started on: " + port);
=======
console.log('RESTful API server started on: ' + port);
>>>>>>> e1e2487793284f7594072885f8068ada3faca2b4
