$(document).ready(function() {
  var userList = $("#userList");
  function populateUsers() {
    $.get("/api/user_data").then(function(result) {
      var activeUser = result.username;
      var activeHash = result.userHash;
      $(".currentUsername").text(activeUser);
      $(".userAvatar").attr(
        "src",
        `https://www.gravatar.com/avatar/${activeHash}.jpg?s=50&r=pg&d=identicon`
      );
      userList.empty();
      $.get("/api/users", function(data) {
        for (i = 0; i < data.length; i++) {
          if (data[i].username !== activeUser) {
            var userTab = $(`<div class="conversation-item" data-id="${data[i].id}" data-src="https://www.gravatar.com/avatar/${data[i].userHash}.jpg?s=50&r=pg&d=identicon"><a href="#" id="${data[i].id}" class="conversation-link"><img class="uk-border-circle avatar" src="https://www.gravatar.com/avatar/${data[i].userHash}.jpg?s=50&r=pg&d=identicon">
                    ${data[i].username}</a></div>`);
            userList.append(userTab);
          }
        }
        $(".conversation-item").on("click", function() {
          var convoObject = {
            userId: parseInt($(this).attr("data-id")),
            activeUserId: result.id
          };
          $.post("/api/conversations", convoObject);
          console.log(convoObject);
        });
      });
    });
  }
  socket.on("new user online", populateUsers);
  //   socket.on("user has logged off", populateUsers);
});
