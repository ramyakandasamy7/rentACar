"use strict";
module.exports = function (app) {
  var users = require("../controllers/userAPIController");

  // Users Routes
  app.route("/users").get(users.get_users);

  app.route("/user").post(users.get_user);

  app.route("/login").post(users.login);
  app.route("/signup").post(users.signup);
  app.route("/modifyuser").post(users.modify);
};
