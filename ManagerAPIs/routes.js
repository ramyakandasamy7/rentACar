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
    app.route("/manager")
        .get(controller.getManager);
    app.route("/deletemanager")
        .get(controller.deleteManager);
    app.route("/updatemanager")
        .get(controller.updateManager);
}