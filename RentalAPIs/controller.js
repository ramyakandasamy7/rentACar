'use strict';
var express = require('express')
var DynamoDB = require('aws-sdk/clients/dynamodb');
var docClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.showhome = function (req, res) {
    res.render('index');
};


exports.getRental = function (req, res) {
    console.log(req.params.id + "HOWDY HEY")
    var requests = [];
    var params = {
        TableName: "rentalReservationDB",
    };
    docClient.scan(params, (err, data) => {
        data.Items.forEach(function (item) {
            if (item.userID == req.params.id) {
                requests.push(item);
            }
        });
        console.log(requests);
        res.render('history', { "requests": requests })
    });
}
exports.returnVehicle = function (req, res) {
    console.log(req.body.Id);
    console.log(req.body.userID);
    var requests = [];
    var params = {
        TableName: "rentalReservationDB",
        Key: {
            id: req.body.Id,
            userID: req.body.userID
        },
        UpdateExpression:
            "set #s = :status",
        ExpressionAttributeValues: {
            ":status": 'RETURNED',
        },
        ExpressionAttributeNames: {
            "#s": "status"
        }
    };
    docClient.update(params, function (err, data) {
        if (err) {
            console.log(err);
            return err;
        } else {

            var requests = [];
            var params = {
                TableName: "rentalReservationDB"
            };
            docClient.scan(params, (err, data) => {
                console.log(err);
                data.Items.forEach(function (item) {
                    requests.push(item);
                });
                console.log(requests);
                res.render('history', { "requests": requests })

            });
        }
    });
}
exports.inRange = function (req, res) {
    console.log(req.body.startdate);
    console.log(req.body.enddate);
    console.log(req.body.carID)
    var result = false;
    var trigstart = 0;
    var trigend = 0;
    var carId = req.body.carID;
    var startdate = new Date(req.body.startdate);
    var enddate = new Date(req.body.enddate);
    var params = {
        TableName: "rentalReservationDB",
        FilterExpression: "carId = :CarId",
        ExpressionAttributeValues: {
            ":CarId": carId,
        }

    };
    docClient.scan(params, (err, data) => {
        console.log(req.body.startdate);
        console.log(req.body.enddate);
        data.Items.forEach(function (item) {
            if ((startdate <= new Date(item.enddate)) && (new Date(item.startdate) <= enddate)) {
                result = true;
                trigstart = new Date(item.startdate);
                trigend = new Date(item.enddate);
            }
        });
        res.json({ result: result, startDate: trigstart, endDate: trigend });
    });
}

exports.createRental = function (req, res) {
    console.log(" I AM IN create Rental" + "CAR IS" + req.body.car + " " + req.body.location + " " + req.body.price + req.body.status);
    console.log(req.body.status + "STATUS");
    var ID = Math.random().toString(36).substr(2, 9);
    var params = {
        TableName: "rentalReservationDB",
        Item: {
            id: ID,
            carId: req.body.car,
            userID: req.body.user,
            locationId: req.body.location,
            price: req.body.price,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            hours: req.body.hours,
            status: req.body.status
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });

}

exports.updateRental = function (req, res) {
    var params = {
        TableName: "rentalReservationDB",
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
    docClient.update(params, function (err, data) {
        if (err) {
            return err
        } else {
            return data;
        }
    });
}

exports.deleteRental = function (req, res) {
    console.log(req.body.Id);
    var acceptedDate = new Date(req.body.startdate);
    acceptedDate.setHours(acceptedDate.getHours() + 1);
    var id = req.body.Id;
    if (acceptedDate <= (new Date())) {
        console.log("I AM HERE");
        var params = {
            TableName: "rentalReservationDB",
            Key: {
                id: id,
                userID: "12345"
            }
        };
        docClient.delete(params, (err, data) => {
            if (err) {
                console.log("error is" + err);
                return err;
            }
            else {
                res.redirect('/history');
                return data;
            }
        });
    }
    else {
        res.redirect('/history');
    }

}