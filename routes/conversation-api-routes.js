var db = require("../models");

module.exports = function(app) {
  app.post("/api/conversations", function(req, res) {
    console.log(req.body);
    const conversationID = db.query(
      "select `conversations.id` as conversationID from users join userConversations on `users.id`=`userconversations.userid` join conversations on `userconversations.conversationid`=`conversations.id` where `users.username`=? or `users.username`=? group by `userconversations.conversationid` having count(*)>1;",
      {
        replacements: [req.body.participant1, req.body.participant2],
        type: QueryTypes.SELECT
      }
    );
    res.json(conversationID);
  });
  db.Conversation.create(req.body).then(function(newConv) {
    res.json(newConv);
  });
};
