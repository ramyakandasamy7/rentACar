'use strict';

exports.get_users = function(req, res) {
	console.log("Getting all users from database...");
};

exports.get_user = function(req, res) {
	console.log("Getting user with userId: "+req.params.userId);
};
