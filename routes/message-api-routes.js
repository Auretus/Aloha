var db = require("../models");

module.exports = function(app) {
  app.get("/api/messages", function(req, res) {
    db.Message.findAll({
      include: [db.User, db.Conversation]
    }).then(result => {
      const messages = result.filter(
        message =>
          message.Users.indexOf(user1) > -1 || message.Users.indexOf(user2) > -1
      );
      res.json(messages);
    });
  });
  app.post("/api/messages", function(req, res) {
    console.log(req.body);
    db.Message.create({
      content: req.body.content,
      author: req.body.author
    }).then(function(newMess) {
      res.send(newMess);
    });
  });
};
