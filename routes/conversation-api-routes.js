var db = require("../models");

module.exports = function(app) {
  app.post("/api/conversations", function(req, res) {
    // inputs: participant1 (string), participant2 (string)
    // outputs: conversationId (int)

    // let's see what we have to work with
    console.log("Incoming request body:");
    console.log(req.body);

    // first, grab the userIds by searching on the username field
    let user1 = db.User.findOne({
      where: {
        username: req.body.participant1
      }
    });
    let user2 = db.User.findOne({
      where: {
        username: req.body.participant2
      }
    });

    // then, look for a conversationId that references both userIDs
    // const { Op } = require("sequelize");
    let conversationID = db.UserConversation.findOne({
      where: {
        $or: [{ UserId: user1 }, { UserId: user2 }]
      },
      group: "ConversationId",
      having: "COUNT(*)>1"
    });
    // let conversationID = sequelize.query(
    // `SELECT ConversationId FROM userConversations
    // WHERE UserId=? or UserId=?
    // GROUP BY ConversationId
    // HAVING COUNT(*)>1;`,
    // {
    //   replacements: [user1, user2]
    // }
    // );

    console.log(`Conversation ID after query: ${conversationID}`);
    if (conversationID === null) {
      // create a new conversation
      const newConversation = db.Conversation.create();
      console.log(newConversation.id);
      conversationID = newConversation.id;
      db.UserConversation.create({
        UserId: req.body.participant1,
        ConversationId: conversationID
      });
      db.UserConversation.create({
        UserId: req.body.participant2,
        ConversationId: conversationID
      });
    }
    res.json(conversationID);
  });
};
