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

exports.updateACar = function(req, res) {
    console.log(req.body);
    var params = {
        TableName: TABLE_NAME,
        Key: {
          "ID": req.body.id
        },
        UpdateExpression:
          "set #mak=:mak, #mod=:mod, #yr=:yr, #typ=:typ, #cond=:cond, #locat=:locat, #regi=:licensePl, #mile=:mile, #lastServ=:lastService",
        ExpressionAttributeValues: {
          ":mak":         req.body.make,
          ":mod":         req.body.model,
          ":yr":          req.body.year,
          ":typ":         req.body.type,
          ":cond":        req.body.condition,
          ":locat":       req.body.locationId,
          ":licensePl":   req.body.licensePlate,
          ":mile":        req.body.mileage,
          ":lastService": req.body.lastServiced,
        },
	ExpressionAttributeNames: {
		"#mak":      "make",
		"#mod":      "model",
		"#yr":       "year",
		"#typ":      "type",
		"#cond":     "condition",
		"#locat":    "locationID",
		"#regi":     "registrationID",
		"#mile":     "mileage",
		"#lastServ": "lastServiced",

	}
      };
      docClient.update(params, function(err, data) {
        if (err) {
	  console.log(err);
          res.send(err)
        } else {
          res.status(200);
          res.json(data);
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
