var express    = require('express'),
    app        = express(),
    https      = require('https'),
    fs         = require('fs');
    port       = process.env.PORT || 4000.
    bodyParser = require('body-parser'),
    cors       = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require("./routes");
routes(app);

https.createServer({
	key: fs.readFileSync('certs/key.pem'),
	cert: fs.readFileSync('certs/cert.pem')
},app).listen(port);

console.log('RESTful API server started on: ' + port);
