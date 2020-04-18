'use strict';
var express    = require('express')
var DynamoDB   = require('aws-sdk/clients/dynamodb'); 
var docClient  = new DynamoDB.DocumentClient({region: 'us-east-1'});
var TABLE_NAME = "carInventoryDB";

exports.showhome = function(req, res) {
    res.render('index');
};

exports.getAllCars = function(req, res) {
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

exports.addACar = function(req, res) {
    var ID = Math.random().toString(36).substr(2,9);
    var params = {
        TableName: TABLE_NAME,
        Item: {
            ID:             ID,
	    year:           req.body.year,
	    make:           req.body.make,
	    model:          req.body.model,
	    type:           req.body.type,
	    mileage:        req.body.mileage,
	    registrationID: req.body.licensePlate,
	    lastServiced:   req.body.lastServiced,
	    locationID:     req.body.locationId,
	    condition:      req.body.condition,
        }
    };
    docClient.put(params, (err, data) => {
        if(err) {
	    console.log(err);
            res.send(err);
        }
        else {
	    console.log(data);
            res.status(200);
	    res.json({message:"OK"});
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
