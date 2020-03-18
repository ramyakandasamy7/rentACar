'use strict';
var express = require('express')
var DynamoDB = require('aws-sdk/clients/dynamodb'); 
var docClient = new DynamoDB.DocumentClient({region: 'us-east-1'});

exports.showhome = function(req, res) {
    res.render('index');
};

exports.getManager = function(req, res) {
    var requests = [];
    var params = {
        TableName: "testManager",
    };
    docClient.scan(params, (err, data) => {
        data.Items.forEach(function(item){
            requests.push(item);
        });
        console.log(requests);
        res.send(requests)
    });
}

exports.createManager = function(req, res) {
    var ID = Math.random().toString(36).substr(2,9);
    var params = {
        TableName: "testManager",
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
        TableName: "testManager",
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
        TableName: "testManager",
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