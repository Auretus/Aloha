var db = require("../models");
// const sequelize = require("sequelize");
// const { Op } = require("sequelize");

module.exports = function(app) {
  app.post("/api/conversations", function(req, res) {
    console.log("Incoming request body:");
    console.log(req.body);

    let user1 = 1;
    let user2 = 2;

    db.Conversation.findAll({
      include: [db.Message, db.User]
    }).then(result => {
      const convos = result.filter(
        convo =>
          convo.Users.indexOf(user1) > -1 || convo.Users.indexOf(user2) > -1
      );
      res.json(convos);
    });
  });
};
