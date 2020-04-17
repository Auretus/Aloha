// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var http = require("http");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/conversation-api-routes.js")(app);
require("./routes/message-api-routes.js")(app);

// IO sockets
var server = http.createServer(app);
var io = require("socket.io").listen(server);
var connections = [];
io.sockets.on("connection", function(socket) {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  socket.on("disconnect", function(data) {
    console.log(data);
    connections.splice(connections.indexOf(socket, 1));
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  socket.on("send message", function(data) {
    console.log(data);
    io.sockets.emit("new message", { msg: data });
  });

  socket.on("send conversation", function(data) {
    console.log(data);
    io.sockets.emit("new conversation", { con: data });
  });
});
// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
  server.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
