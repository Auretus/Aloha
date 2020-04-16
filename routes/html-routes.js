var isAuthenticated = require("../config/middleware/isAuthenticated");
const userData = {
  fakeUsers: [
    {
      username: "MariaThalia",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar.png",
      messagesSent: [
        {
          message: "Hello"
        },
        {
          message: "My name is Maria"
        },
        {
          message: "Nice to meet you"
        }
      ],
      activeChat: false
    },
    {
      username: "JosiePosie",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar.png",
      messagesSent: [
        {
          message: "Hello"
        },
        {
          message: "My name is Josie"
        },
        {
          message: "Nice to meet you"
        }
      ],
      activeChat: false
    },
    {
      username: "AnnaBanana",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar.png",
      messagesSent: [
        {
          message: "Hello"
        },
        {
          message: "My name is Anna"
        },
        {
          message: "Nice to meet you"
        }
      ],
      activeChat: false
    },
    {
      username: "MarcoDarko",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar.png",
      messagesSent: [
        {
          message: "Hello"
        },
        {
          message: "My name is Marco"
        },
        {
          message: "Nice to meet you"
        }
      ],
      activeChat: false
    },
    {
      username: "RandyPandy",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar.png",
      messagesSent: [
        {
          message: "Hello"
        },
        {
          message: "My name is Randy"
        },
        {
          message: "Nice to meet you"
        }
      ],
      activeChat: false
    }
  ]
};

module.exports = function(app) {
  app.get("/", function(req, res) {
    // if (req.user) {
    //   res.render("index", userData);
    // }
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    // if (req.user) {
    //   res.render("/members");
    // }
    res.render("signup");
  });
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("index", userData);
  });
};
