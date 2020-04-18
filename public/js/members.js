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
  // function getUserGravatar(){
  //   $.get("/api/users", function(data) {
  //     var userHash;
  //     for (i=0;i<data.length;i++){

  //     }
  //   });
  // }
  // getUserGravatar();
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
  socket.on("new conversation", function(data) {
    var $convoList = $("#conversationList");
    var currentUser = $(".currentUsername").text();
    var user = $("#selectedUser").val();
    var name = `${user} & ${currentUser}`;
    // var gravatar = $(".userAvatar").attr("src");
    var $newConvo = $(`<a href="#" class="conversation-link">
    <div class="conversation-item">${data.con[0]}</div></a>`);
    if (data.con[0] !== name) {
      $convoList.append($newConvo);
    }
  });
});
