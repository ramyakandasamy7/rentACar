const express = require("express");
const app = express();
const cors = require("cors");
const carAPI = require("./carAPIRoutes");
app.use(cors());
app.use(carAPI);
app.listen(3000, function() {
  console.log("Listening on port 3000");
});