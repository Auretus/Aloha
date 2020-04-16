var db = require("../models");

module.exports = function(app) {
  app.get("/api/messages", function(req, res) {
    db.Message.findAll({
      include: [db.User]
    });
  });
};
