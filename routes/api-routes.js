// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// Requiring the js-md5 package for hash generation
const md5 = require("js-md5");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    let userHash = 
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      userHash: md5(req.body.email.trim().toLowerCase())
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // let userHash = md5(req.user.email.trim().toLowerCase());
      // avatarUrl: `https://www.gravatar.com/avatar/${userHash}.jpg?s=50&r=pg&d=identicon`
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
        userHash: req.user.userHash
      });
    }
  });
};
