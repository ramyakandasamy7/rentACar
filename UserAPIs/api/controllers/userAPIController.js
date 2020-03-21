'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.get_users = function(req, res) {
	console.log("Getting all users from database...");
	var params = {
		TableName: 'carRentalUsers'
	};
	ddb.scan(params, function(err, data) {
		if (err) { 
			res.send(err)
			console.log(err, err.stack);
		}
		else { 
			res.json(data)
			console.log(data);
		}
	});
};

exports.get_user = function(req, res) {
	console.log("Getting user with userId: "+req.params.userId);
	console.log(req.params);
	var userId = req.params.userId;
	var params = {
		TableName: 'carRentalUsers',
		KeyConditionExpression: "#i = :i",
		ExpressionAttributeNames: {
			"#i" : "id"
		},
		ExpressionAttributeValues: {
			":i": userId
		}
	};
	ddb.query(params, function(err, data) {
		if (err) { 
			res.send(err)
			console.log(err, err.stack);
		}
		else { 
			res.json(data)
			console.log(data);
		}
	});
};
