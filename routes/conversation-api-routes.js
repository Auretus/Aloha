// var db = require("../models");

module.exports = function(app) {
  app.get("/api/conversations", function(req, res) {
    console.log(req);
    console.log(res);
  });
  app.post("/api/conversations", function(req, res) {
    console.log(req.body);
    console.log(res);
  });
};
