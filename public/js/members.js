$(document).ready(function() {
  var $messageForm = $("#messageForm");
  var $message = $("#message");
  var $chat = $("#chat");
  $(".js-example-theme-single").select2({
    theme: "classic"
  });
  $messageForm.submit(function(e) {
    e.preventDefault();
    socket.emit("send message", $message.val());
    $.post("/api/messages", {
      content: req.body
    }).then(function(data) {
      console.log(data);
    });
    $message.val("");
  });
  socket.on("new message", function(data) {
    var $messBubbLeft = $(
      `<div class='message received speech-bubble-left'><p> ${data.msg} </p></div>`
    );
    var $messBubbRight = $(
      `<div class='message sent speech-bubble-right'><p> ${data.msg} </p></div>`
    );
    $chat.append($messBubbLeft);
    $chat.append($messBubbRight);
    const chat = document.querySelector("#chat");
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  });

  $("#plusIcon").on("click", function(e) {
    e.preventDefault();
    var user = $("#selectedUser").val();
    var currentUser = $(".currentUsername").text();
    // var currentGravatar = $(".userAvatar").attr("src");

    console.log(user);
    if (user !== "" && user !== currentUser) {
      socket.emit("send conversation", [
        `${user} & ${currentUser}`,
        user,
        currentUser
      ]);
      $.post("/api/conversations", {
        // name: user + " & " + currentUser,
        participant1: currentUser,
        participant2: user
      }).then(function(data) {
        console.log(data);
      });
    }
    $("#selectedUser").prop("selectedIndex", 0);
  });
});
