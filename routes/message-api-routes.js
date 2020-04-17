var db = require("../models");

module.exports = function(app) {
  app.get("/api/messages", function(req, res) {
    db.Message.findAll({
      include: [db.User]
    }).then(res.json());
  });
  app.post("/api/messages", function(req, res) {
    db.Message.create(req.body).then(function(newMess) {
      res.json(newMess);
    });
  });
};
