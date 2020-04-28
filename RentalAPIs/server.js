var express = require('express'),
    app = express(),
    port = process.env.PORt || 7000.
bodyParser = require('body-parser');
var cors = require("cors");
const cron = require("node-cron");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var DynamoDB = require('aws-sdk/clients/dynamodb');
var docClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });

var routes = require('./routes');
routes(app);
app.listen(port);

cron.schedule("* * * * *", function () {

    var requests = [];
    var params = {
        TableName: "rentalReservationDB",
    };
    docClient.scan(params, (err, data) => {
        data.Items.forEach(function (item) {
            requests.push(item);
            if ((new Date(item.startdate) < (new Date())) && new Date(item.enddate) >= (new Date()) && (item.status == "RESERVED")) {
                console.log("HERE!" + item.id);
                var params2 = {
                    TableName: "rentalReservationDB",
                    Key: {
                        id: item.id,
                        userID: item.userID
                    },
                    UpdateExpression:
                        "set #s = :status",
                    ExpressionAttributeValues: {
                        ":status": 'IN-USE',
                    },
                    ExpressionAttributeNames: {
                        "#s": "status"
                    }
                };
                docClient.update(params2, function (err, data) {
                    if (err) {
                        console.log(err);
                        return err;
                    } else {
                        console.log(data);
                        return data;
                    }
                });
            }
        });


    });



});

console.log('RESTful API server started on: ' + port);