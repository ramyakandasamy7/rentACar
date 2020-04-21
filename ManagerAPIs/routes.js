'use strict';
module.exports = function(app) {
    var manager        = require('./managerController');
    var lot            = require('./locationController');
    var car            = require('./inventoryController');
    var users          = require('./usersController');
    var reserv         = require('./reservationsController');
    var trans          = require('./transactionsController');
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
	.put(lot.updateALocation)
	.post(lot.addALocation)
	.delete(lot.deleteALocation);

    app.route("/inventory")
	.get(car.getAllCars)
	.put(car.updateACar)
	.post(car.addACar)
	.delete(car.deleteACar);

    app.route("/users")
	.get(users.getAllUsers)
	.put(users.updateAUser)
	.delete(users.deleteAUser);

    app.route("/reservations")
	.get(reserv.getAllReservations)
	.put(reserv.updateAReservation)
	.delete(reserv.deleteAReservation);

    app.route("/transactions")
	.get(trans.getAllTransactions)
	.put(trans.updateATransaction)
	.delete(trans.deleteATransaction);

}
