const express = require("express");
const app = express();
const cors = require("cors");
var carAPI = require("./CarAPIRoutes");
app.use(cors());
app.use(carAPI);
app.listen(9000, function () {
  console.log("Listening on port 9000");
});
