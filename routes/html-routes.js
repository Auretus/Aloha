var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.render("signup");
  });
  app.get("/members", isAuthenticated, function(req, res) {
    db.User.findAll({}).then(function(data) {
      var userObject = {
        users: data
      };
      db.Conversation.findAll({}).then(function(data1) {
        var convObject = {
          conversations: data1
        };
        db.Message.findAll({}).then(function(data2) {
          var messObject = {
            messages: data2
          };
          var hbsObject = {
            users: userObject,
            conversations: convObject,
            messages: messObject
          };
          console.log(hbsObject);
          res.render("index", hbsObject);
        });
      });
    });
  });
};
