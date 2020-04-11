const express = require("express");

const router = express.Router();

const users = [
  {
    username: "Mary",
    email: "mary@mail.com",
    avatarUrl: "https://www.w3schools.com/howto/img_avatar.png"
  },
  {
    username: "Bob",
    email: "mary@mail.com",
    avatarUrl: "https://www.w3schools.com/howto/img_avatar.png"
  },
  {
    username: "Mary",
    email: "mary@mail.com",
    avatarUrl: "https://www.w3schools.com/howto/img_avatar.png"
  },
  {
    username: "Todd",
    email: "mary@mail.com",
    avatarUrl: "https://www.w3schools.com/howto/img_avatar.png"
  }
];

router.get("/", function(req, res) {
  res.render("index", users);
});

module.exports = router;
