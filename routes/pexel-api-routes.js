require("dotenv").config();
const PexelsAPI = require("pexels-api-wrapper");
var pexelsClient = new PexelsAPI(process.env.PEXELS_API_KEY);
var store = require("store");

module.exports = function(app) {
  app.get("/api/pexels", function(req, res) {
    res.send();
  });
  app.post("/api/pexels", function(req, res) {
    var theme = req.body.query;
    pexelsClient
      .search(theme, 15, 1)
      .then(function(result) {
        res.send(result);
      })
      .catch(function(e) {
        console.err(e);
      });
  });
  app.get("/api/pexels/store", function(req, res) {
    // console.log(req.user);
    if (
      !store.get(req.user.id) ||
      store.get(req.user.id).name !== req.user.id
    ) {
      res.send({});
    } else {
      store.each(function(value, key) {
        console.log(key, "==", value);
      });
      var chatBG = store.get(req.user.id);
      console.log(chatBG);
      res.send(chatBG.chatBG);
    }
  });
  app.post("/api/pexels/store", function(req, res) {
    // var sessionID = req.socket.parser.incoming.sessionID;
    var chatObject = {
      name: req.user.id,
      chatBG: req.body
    };
    console.log(chatObject);
    store.set(req.user.id, chatObject);
    res.end();
  });
};
