'use strict';
module.exports = function(app) {
    var controller = require('./controller');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    var express = require('express');

    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.set('view engine', 'ejs');

    app.route("/")
        .get(controller.showhome);
    app.route("/history")
        .get(controller.showhistory);
    app.route("/cancelReservation")
        .post(controller.cancelReservation);
        app.route("/returnVehicle")
        .post(controller.returnVehicle);
    app.route("/rental")
        .get(controller.getRental);
    app.route("/deleterental")
        .get(controller.deleteRental);
    app.route("/updaterental")
        .get(controller.updateRental);
}