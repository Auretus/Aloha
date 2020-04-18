var db = require("../models");

module.exports = function(app) {
  //   app.get("/api/conversations", function(req, res) {
  //     console.log(req);
  //     console.log(res);
  //   });
  app.post("/api/conversations", function(req, res) {
    console.log(req.body);
    var user1 = req.body.userId;
    var user2 = req.body.activeUserId;
    db.Conversation.create({
      participant1: user1,
      participant2: user2
    }).then(function(data) {
      res.json(data);
    });

    // const [results, metadata] = sequelize.query(
    //   "SELECT ConversationId FROM userConversations \
    // WHERE UserId=? or UserId=? \
    // GROUP BY ConversationId \
    // HAVING COUNT(*)>1;",
    //   {
    //     replacements: [user1, user2],
    //     type: QueryTypes.SELECT
    //   }
    // );
    // console.log(results, metadata);
    res.send();
  });
};
