$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var socket = io.connect();
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
      content: $message.val()
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
  });

  $.get("/api/user_data").then(function(data) {
    $(".currentUsername").text(data.username);
    $(".userAvatar").attr(
      "src",
      `https://www.gravatar.com/avatar/${data.userHash}.jpg?s=50&r=pg&d=identicon`
    );
  });

  const chat = document.querySelector("#chat");
  chat.scrollTop = chat.scrollHeight - chat.clientHeight;

  $("#plusIcon").on("click", function(e) {
    e.preventDefault();
    var user = $("#selectedUser").val();
    console.log(user);
    socket.emit("send conversation", user);
    if (!user) {
      return;
    }
    $.post("/api/conversations", { name: user }).then(function(data) {
      console.log(data);
    });
    user.val("");
  });
  socket.on("new conversation", function(data) {
    var $convoList = $("#conversationList");
    var $newConvo = $(`<a href="#" class="conversation-link">
    <div class="conversation-item">
        <img class="uk-border-circle avatar" src="${data.con}">${data.con}</div></a>`);
    $convoList.append($newConvo);
  });
});
