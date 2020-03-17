const car = require("express");
const carRouter = car.Router();
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
carRouter.use(bodyParser.json());
carRouter.use(bodyParser.urlencoded({ extended: true }));
let awsConfig = {
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "",
  secretAccessKey: ""
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

//API to get car based on ID
carRouter.get("/getcar", (req, res) => {
  var params = {
    TableName: "carInventoryDB",
    Key: {
      ID: req.body.ID
    }
  };
  docClient.get(params, function(err, data) {
    if (err) {
      console.log("error -" + JSON.stringify(err, null, 2));
    } else {
      console.log("SUCCESS" + JSON.stringify(data, null, 2));
      res.send(data);
    }
  });
});
//API to get all cars
carRouter.get("/getallcars", (req, res) => {
  var params = {
    TableName: "carInventoryDB"
  };
  var requests = [];
  docClient.scan(params, (err, data) => {
    data.Items.forEach(function(item) {
      console.log(item);
      requests.push(item);
    });
    res.send(requests);
  });
});
//API to create car
function calculateCost(type) {
  if (type.toString() == "sedan") {
    return 50;
  } else if (type.toString() == "SUV") {
    return 100;
  } else {
    return 25;
  }
}
carRouter.post("/createcar", (req, res) => {
  var carID = Math.random()
    .toString(36)
    .substr(2, 9);
  var cost = calculateCost(req.body.type.toString());
  var paramsAdd = {
    TableName: "carInventoryDB",
    Item: {
      ID: carID,
      make: req.body.make,
      model: req.body.model,
      type: req.body.type,
      mileage: req.body.mileage,
      year: req.body.year,
      registrationID: req.body.registration,
      locationID: req.body.locationID,
      condition: req.body.condition,
      cost: cost
    }
  };
  docClient.put(paramsAdd, function(err, data) {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({
        message: "Car added!" + carID
      });
    }
  });
});
//API to update a car
carRouter.post("/modifycar", (req, res) => {
  var cost = calculateCost(req.body.type);
  var paramsModify = {
    TableName: "carInventoryDB",
    Key: {
      ID: req.body.ID
    },
    UpdateExpression:
      " set make=:x, model=:y, mileage=:f, registrationID=:a, #typeofCar=:b, locationID=:z , #yearofCar=:c, #conditionofCar=:d, cost=:e",
    ExpressionAttributeValues: {
      ":x": req.body.make,
      ":y": req.body.model,
      ":z": req.body.locationID,
      ":a": req.body.registrationID,
      ":b": req.body.type,
      ":c": req.body.year,
      ":d": req.body.condition,
      ":e": cost,
      ":f": req.body.mileage
    },
    ExpressionAttributeNames: {
      "#typeofCar": "type",
      "#yearofCar": "year",
      "#conditionofCar": "condition"
    },
    ReturnValues: "UPDATED_NEW"
  };
  docClient.update(paramsModify, function(err, data) {
    if (err) {
      return res.status(400).json({
        message: "unable to modify car " + req.body.ID + "error is " + err
      });
    } else {
      return res.status(200).json({ message: req.body.ID + "updated" });
    }
  });
});

//API to delete a car
carRouter.post("/deletecar", (req, res) => {
  var paramsDelete = {
    TableName: "carInventoryDB",
    Key: {
      ID: req.body.ID
    }
  };
  docClient.delete(paramsDelete, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "unable to delete car " + req.body.ID + " error is:" + err
      });
    } else {
      return res.status(200).json({ message: req.body.ID + "gym deleted" });
    }
  });
});
module.exports = carRouter;
