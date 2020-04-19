const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
var carAPI = require("./CarAPIRoutes");
app.use(carAPI);
app.listen(9000, function () {
  console.log("Listening on port 9000");
});
