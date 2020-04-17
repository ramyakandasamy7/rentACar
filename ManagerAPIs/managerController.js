'use strict';
var express    = require('express')
var DynamoDB   = require('aws-sdk/clients/dynamodb'); 
var docClient  = new DynamoDB.DocumentClient({region: 'us-east-1'});
var TABLE_NAME = "CarRentalManagers";

exports.showhome = function(req, res) {
    res.render('index');
};

exports.getManager = function(req, res) {
    var params = {
        TableName: TABLE_NAME,
    };
    docClient.scan(params, (err, data) => {
        if (err) {
	    res.send(err);
	} else {
	    console.log(data);
	    res.status(200);
	    res.json(data);
	}
    });
}

exports.authenticateManager = function(req, res) {
	var params = {
		TableName: TABLE_NAME,
		IndexName: 'email-index',
		KeyConditionExpression: "email = :e",
		ExpressionAttributeValues: {
			":e": req.body.email
		}
	};
	docClient.query(params, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			console.log(data);
			res.status(200);
			res.json(data.Items[0]);
		}
	});
}

exports.createManager = function(req, res) {
    var ID = Math.random().toString(36).substr(2,9);
    var params = {
        TableName: TABLE_NAME,
        Item: {
            managerId: ID,
            name: req.body.name,
            locationid: req.body.location
        }
    };
    docClient.put(params, (err, data) => {
        if(err) {
            return err;
        }
        else {
            return data;
        }
    });

}

exports.updateManager = function(req, res) {
    var params = {
        TableName: TABLE_NAME,
        Key: {
          ID: req.body.managerId
        },
        UpdateExpression:
          "set name=:name, locationid=:location",
        ExpressionAttributeValues: {
          ":name": req.body.name,
          ":location": req.body.location,
        }
      };
      docClient.update(params, function(err, data) {
        if (err) {
          return err
        } else {
          return data;
        }
      });
}

exports.deleteManager = function(req, res) {
    var params = {
        TableName: TABLE_NAME,
        Key: {
            managerId: req.body.id
        }
    };
    docClient.delete(params, (err, data) => {
        if(err) {
            return err;
        }
        else {
            return data;
        }
    });

}
