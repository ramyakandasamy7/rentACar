'use strict';
var express = require('express')
var DynamoDB = require('aws-sdk/clients/dynamodb'); 
var docClient = new DynamoDB.DocumentClient({region: 'us-east-1'});

exports.showhome = function(req, res) {
    res.render('index');
};

exports.showhistory = function(req,res) {
    var requests = [];
    var params = {
        TableName: "rentalTransactionDB",
        IndexName: "userID-index",
		KeyConditionExpression: "#i = :i",
		ExpressionAttributeNames: {
			"#i" : "userID"
		},
		ExpressionAttributeValues: {
			":i": '12345'
		}
    };
    docClient.query(params, (err, data) => {
        console.log(err);
        data.Items.forEach(function(item){
            requests.push(item);
        });
        console.log(requests);
        res.render('history', {"requests":requests})
        //res.send(requests)
    });
}

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

exports.cancelReservation = function(req, res) {
    console.log("HELLO");
    console.log(req.body.Id);
    console.log(req.body.userID);
    var requests = [];
    var params = {
        TableName: "rentalTransactionDB",
        Key: {
          'ID': req.body.Id,
          'userID': req.body.userID
        },
        UpdateExpression:
          "set field = :status",  
        ExpressionAttributeValues: {
          ":status": 'CANCELLED',
        }
      };
      docClient.update(params, function(err, data) {
        if (err) {
            console.log(err);
          return err;
        } else {
            console.log(data);
            res.redirect('/history');
            
          return data
        }
      });
}

exports.returnVehicle = function(req, res) {
    console.log(req.body.Id);
    var requests = [];
    var params = {
        TableName: "rentalTransactionDB",
        Key: {
          ID: req.body.Id,
          'userID': req.body.userID
        },
        UpdateExpression:
          "set field = :status",  
        ExpressionAttributeValues: {
          ":status": 'RETURNED',
        }
      };
      docClient.update(params, function(err, data) {
        if (err) {
            console.log(err);
          return err;
        } else {
            params = {
                TableName: "rentalTransactionDB",
                IndexName: "userID-index",
                KeyConditionExpression: "#i = :i",
                ExpressionAttributeNames: {
                    "#i" : "userID"
                },
                ExpressionAttributeValues: {
                    ":i": '12345'
                }
            };
            docClient.query(params, (err, data) => {
                console.log(err);
                data.Items.forEach(function(item){
                    requests.push(item);
                });
                console.log(requests);
                res.render('history', {"requests":requests})
                //res.send(requests)
            });
            console.log(data);
          return data
        }
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