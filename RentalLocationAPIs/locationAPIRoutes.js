const rentalLocation = require("express");
const rentalRouter = rentalLocation.Router();
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
rentalRouter.use(bodyParser.json());
rentalRouter.use(bodyParser.urlencoded({ extended: true }));
let awsConfig = {
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
//get all locations
rentalRouter.get("/locations", (req, res) => {
  var params = {
    TableName: "rentalLocationDB",
  };
  var requests = [];
  console.log("HOLY TOLEDO")
  docClient.scan(params, (err, data) => {
    data.Items.forEach(function (item) {
      console.log(item);
      requests.push(item);
    });
    res.send(requests);
  });
});

//get by ID
rentalRouter.get("/getlocationbyID", (req, res) => {
  var params = {
    TableName: "rentalLocationDB",
    Key: {
      ID: req.body.ID,
    },
  };
  docClient.get(params, function (err, data) {
    if (err) {
      console.log("error -" + JSON.stringify(err, null, 2));
    } else {
      console.log("SUCCESS" + JSON.stringify(data, null, 2));
      res.send(data);
    }
  });
});
//post by ID for axios

rentalRouter.post("/postlocationID", (req, res) => {
  var params = {
    TableName: "rentalLocationDB",
    Key: {
      ID: req.body.ID,
    },
  };
  docClient.get(params, function (err, data) {
    if (err) {
      console.log("error -" + JSON.stringify(err, null, 2));
    } else {
      console.log("SUCCESS" + JSON.stringify(data, null, 2));
      res.send(data);
    }
  });
});
rentalRouter.post("/getlocationbyCity", (req, res) => {
  var city = req.body.city;
  var state = req.body.state;
  console.log(city);
  console.log(state);
  var params = {
    TableName: "rentalLocationDB",

    FilterExpression: "city = :city AND #s = :state",
    ExpressionAttributeNames: {
      "#s": "state",
    },

    ExpressionAttributeValues: {
      ":city": city,
      ":state": state,
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
});
//create a rental location
rentalRouter.post("/createrentallocation", (req, res) => {
  var rentalID = Math.random().toString(36).substr(2, 9);

  var params = {
    TableName: "rentalLocationDB",
    Item: {
      ID: rentalID,
      city: req.body.city,
      state: req.body.state,
      street: req.body.street,
      name: req.body.name,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({
        message: "Rental Location added" + rentalID,
      });
    }
  });
});
//API to update a location
rentalRouter.post("/updatelocation", (req, res) => {
  var paramsModify = {
    TableName: "rentalLocationDB",
    Key: {
      ID: req.body.ID,
    },
    UpdateExpression: " set address=:x, #nameRental=:y",
    ExpressionAttributeValues: {
      ":x": req.body.address,
      ":y": req.body.name,
    },
    ExpressionAttributeNames: {
      "#nameRental": "name",
    },
    ReturnValues: "UPDATED_NEW",
  };
  docClient.update(paramsModify, function (err, data) {
    if (err) {
      return res.status(400).json({
        message:
          "unable to modify rental location " + req.body.ID + "error is " + err,
      });
    } else {
      return res.status(200).json({ message: req.body.ID + "updated" });
    }
  });
});
//delete a car rental
rentalRouter.post("/deletecar", (req, res) => {
  var paramsDelete = {
    TableName: "rentalLocationDB",
    Key: {
      ID: req.body.ID,
    },
  };
  docClient.delete(paramsDelete, (err, data) => {
    if (err) {
      return res.status(400).json({
        error:
          "unable to delete rental location " +
          req.body.ID +
          " error is:" +
          err,
      });
    } else {
      return res
        .status(200)
        .json({ message: req.body.ID + "rental location deleted" });
    }
  });
});
module.exports = rentalRouter;
