var db = require("../models");

module.exports = function(app) {
  app.post("/api/conversations", function(req, res) {
    // inputs: participant1 (string), participant2 (string)
    // outputs: conversationId (int)

    // let's see what we have to work with
    console.log("Incoming request body:");
    console.log(req.body);

    // first, grab the userIds by searching on the username field
    let user1 = 1;
    let user2 = 2;

    // then, look for a conversationId that references both userIDs

    db.Conversation.findAll({
      include: [db.Message, db.User]
    }).then(result => {
      const convos = result.filter(convo => {
        return (
          convo.Users.indexOf(user1) > -1 || convo.Users.indexOf(user2) > -1
        );
      });

      res.json(convos);
    });
    // const { Op } = require("sequelize");
    // let conversationID = db.UserConversation.findOne({
    //   where: {
    //     [Op.or]: [{ UserId: { [Op.eq]: user1 } }, { UserId: { [Op.eq]: user2 } }]
    //   },
    //   group: "ConversationId",
    //   having: [db.sequelize.fn("COUNT", db.sequelize.col("ConversationId")>1")]
    // })
    // console.log(db);

    // let conversationID = db.sequelize
    //   .query(
    //     "SELECT ConversationId FROM userConversations \
    // WHERE UserId=? or UserId=? \
    // GROUP BY ConversationId \
    // HAVING COUNT(*)>1;",
    //     {
    //       replacements: [user1, user2],
    //       type: db.sequelize.QueryTypes.SELECT
    //     }
    //   )
    // .then(userConversation => {
    //   console.log(
    //     `Conversation ID after query: ${userConversation.conversationID}`
    //   );
    // });

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
