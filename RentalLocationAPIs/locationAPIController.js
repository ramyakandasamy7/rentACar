const express = require("express");
const app = express();
const cors = require("cors");
const locationAPI = require("./locationAPIRoutes");
app.use(cors());
app.use(locationAPI);
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
