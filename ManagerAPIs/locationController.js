'use strict';
var express    = require('express')
var DynamoDB   = require('aws-sdk/clients/dynamodb'); 
var docClient  = new DynamoDB.DocumentClient({region: 'us-east-1'});
var TABLE_NAME = "rentalLocationDB";

exports.showhome = function(req, res) {
    res.render('index');
};

exports.getAllLocations = function(req, res) {
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

exports.addALocation = function(req, res) {
    var ID = Math.random().toString(36).substr(2,9);
    var params = {
        TableName: TABLE_NAME,
        Item: {
            ID: ID,
            name: req.body.name,
            address: req.body.address,
	    city: req.body.city,
	    state: req.body.state,
	    currentVehicleCount: req.body.count,
	    vehicleCapacity: req.body.capacity,
	    compactPPH: req.body.compact,
	    sedanPPH: req.body.sedan,
	    suvPPH: req.body.suv,
	    truckPPH: req.body.truck,
	    luxuryPPH: req.body.luxury
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

exports.updateALocation = function(req, res) {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    //var params = {
    //    TableName: TABLE_NAME,
    //    Key: {
    //      ID: req.body.managerId
    //    },
    //    UpdateExpression:
    //      "set name=:name, locationid=:location",
    //    ExpressionAttributeValues: {
    //      ":name": req.body.name,
    //      ":location": req.body.location,
    //    }
    //  };
    //  docClient.update(params, function(err, data) {
    //    if (err) {
    //      return err
    //    } else {
    //      return data;
    //    }
    //  });
}

exports.deleteALocation = function(req, res) {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    var params = {
        TableName: TABLE_NAME,
        Key: {
            ID: req.params.locationId
        }
    };
    docClient.delete(params, (err, data) => {
        if(err) {
            res.send(err);
        }
        else {
            res.status(200);
	    res.json({message: "OK"});
        }
    });

}
