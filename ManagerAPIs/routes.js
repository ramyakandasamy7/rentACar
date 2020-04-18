'use strict';
module.exports = function(app) {
    var manager        = require('./managerController');
    var lot            = require('./locationController');
    var car            = require('./inventoryController');
    var bodyParser     = require('body-parser');
    var methodOverride = require('method-override');

    var express = require('express');

    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.set('view engine', 'ejs');

    app.route("/")
        .get(manager.showhome);

    app.route("/manager")
        .get(manager.getManager)
	.post(manager.authenticateManager);

    app.route("/deletemanager")
        .get(manager.deleteManager);

    app.route("/updatemanager")
        .get(manager.updateManager);

    app.route("/location")
	.get(lot.getAllLocations)
	.post(lot.addALocation);

    app.route("/inventory")
	.get(car.getAllCars)
	.post(car.addACar);
}
