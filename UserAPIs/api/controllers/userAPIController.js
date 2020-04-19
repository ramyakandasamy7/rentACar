"use strict";

var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
let docClient = new AWS.DynamoDB.DocumentClient();

exports.get_users = function (req, res) {
  console.log("Getting all users from database...");
  var params = {
    TableName: "carRentalUsers",
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      res.send(err);
      console.log(err, err.stack);
    } else {
      res.json(data);
      console.log(data);
    }
  });
};

exports.get_user = function (req, res) {
  console.log("Getting user with userId: " + req.body.ID);
  console.log(req.body);
  var userId = req.body.ID;
  var params = {
    TableName: "carRentalUsers",
    KeyConditionExpression: "#i = :i",
    ExpressionAttributeNames: {
      "#i": "ID",
    },
    ExpressionAttributeValues: {
      ":i": userId,
    },
  };
  docClient.query(params, function (err, data) {
    if (err) {
      res.send(err);
      console.log(err, err.stack);
    } else {
      res.json(data);
      console.log(data);
    }
  });
};

exports.signup = function (req, res) {
  var userID = Math.random().toString(36).substr(2, 9);

  var params = {
    TableName: "carRentalUsers",
    Item: {
      ID: userID,
      address: req.body.address,
      username: req.body.username,
      password: req.body.password,
      license: req.body.license,
      payment: req.body.payment,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({
        message: "User added" + userID,
      });
    }
  });
};
exports.login = function (req, res) {
  var username = req.body.email;
  var password = req.body.password;
  var params = {
    TableName: "carRentalUsers",
    FilterExpression: "username = :username AND password = :password",
    ExpressionAttributeValues: {
      ":username": username,
      ":password": password,
    },
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      res.send(err);
      console.log(err, err.stack);
    } else {
      res.json(data);
      console.log(data);
    }
  });
};
exports.modify = function (req, res) {
  var paramsModify = {
    TableName: "carRentalUsers",
    Key: {
      ID: req.body.ID,
    },
    UpdateExpression:
      " set username=:x, password=:y, address=:z, paymentinformation=:a, driverslicense=:b ",
    ExpressionAttributeValues: {
      ":x": req.body.username,
      ":y": req.body.password,
      ":z": req.body.address,
      ":a": req.body.paymentinformation,
      ":b": req.body.driverslicense,
    },
    ReturnValues: "UPDATED_NEW",
  };
  docClient.update(paramsModify, function (err, data) {
    if (err) {
      return res.status(400).json({
        message: "unable to modify user " + req.body.ID + "error is " + err,
      });
    } else {
      return res.status(200).json({ message: req.body.ID + "updated" });
    }
  });
};
