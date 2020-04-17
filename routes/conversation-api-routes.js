var db = require("../models");

module.exports = function(app) {
  app.get("/api/conversations", function(req, res) {
    db.Conversation.findAll({
      include: [db.Message]
    }).then(function(data) {
      console.log(data);
      res.json(data);
    });
  });
  app.post("/api/conversations", function(req, res) {
    db.Conversation.create(req.body).then(function(newConv) {
      res.json(newConv);
    });
  });
};
