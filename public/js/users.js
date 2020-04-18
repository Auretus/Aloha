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
            var userTab = $(`<a href="#" id="${data[i].id}" class="conversation-link">
                <div class="conversation-item">
                    <img class="uk-border-circle avatar" src="https://www.gravatar.com/avatar/${data[i].userHash}.jpg?s=50&r=pg&d=identicon">
                    ${data[i].username}
                </div>
            </a>`);
            userList.append(userTab);
          }
        }
      });
    });
  }
  socket.on("new user online", populateUsers);
  //   socket.on("user has logged off", populateUsers);
});
