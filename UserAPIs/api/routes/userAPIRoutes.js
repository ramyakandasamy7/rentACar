'use strict';
module.exports = function(app) {
  var users = require('../controllers/userAPIController');

  // Users Routes
  app.route('/users')
    .get(users.get_users)

  app.route('/user/:userId')
    .get(users.get_user);

};
