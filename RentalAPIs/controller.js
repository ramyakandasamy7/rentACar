'use strict';
var express = require('express')
var DynamoDB = require('aws-sdk/clients/dynamodb'); 
var docClient = new DynamoDB.DocumentClient({region: 'us-east-1'});

exports.showhome = function(req, res) {
    res.render('index');
};

exports.getRental = function(req, res) {
    var requests = [];
    var params = {
        TableName: "testRental",
    };
    docClient.scan(params, (err, data) => {
        data.Items.forEach(function(item){
            requests.push(item);
        });
        console.log(requests);
        res.send(requests)
    });
}

exports.createRental = function(req, res) {
    var ID = Math.random().toString(36).substr(2,9);
    var params = {
        TableName: "testRental",
        Item: {
            rentalId: ID,
            carId: req.body.car,
            userId: req.body.user,
            locationid: req.body.location,
            price: req.body.price,
            date: req.body.date
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

exports.updateRental = function(req, res) {
    var params = {
        TableName: "testRental",
        Key: {
          rentalId: req.body.rentalId
        },
        UpdateExpression:
          "set carId=:car, userId=:user, locationid=:location, price=:price, date=:date",  
        ExpressionAttributeValues: {
          ":car": req.body.car,
          ":user": req.body.user,
          ":location": req.body.location,
          ":price": req.body.price,
          ":date": req.body.date
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

exports.deleteRental = function(req, res) {
    var params = {
        TableName: "testRental",
        Key: {
            rentalId: req.body.id
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