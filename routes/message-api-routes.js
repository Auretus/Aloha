var db = require("../models");

module.exports = function(app) {
  app.get("/api/messages", function(req, res) {
    db.Message.findAll({
      include: [db.User]
    }).then(res.json());
  });
  app.post("/api/messages", function(req, res) {
    console.log(req.body);
    db.Message.create({
      content: req.body
    }).then(function(newMess) {
      res.json(newMess);
    });
  });
};
