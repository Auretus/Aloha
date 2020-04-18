$(document).ready(function() {
  var $messageForm = $("#messageForm");
  var $message = $("#message");
  $(".js-example-theme-single").select2({
    theme: "classic"
  });

  $messageForm.submit(function(e) {
    e.preventDefault();
    $.get("/api/user_data").then(function(result) {
      var userId = result.id;
      var message = $message.val();
      socket.emit("send message", message);
      $.post("/api/messages", {
        content: message,
        author: userId
      }).then(function() {
        socket.on("new message", function(data) {
          if (userId === data.msg.author) {
            var $messBubbRight = $(
              `<div class='message sent speech-bubble-right'><p> ${data.msg.content} </p></div>`
            );
          } else {
            var $messBubbLeft = $(
              `<div class='message received speech-bubble-left'><p> ${data.msg.content} </p></div>`
            );
          }
          $chat.append($messBubbLeft);
          $chat.append($messBubbRight);
        });
      });
      $message.val("");
    });
  });
});
