$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".currentUsername").text(data.username);
    $(".userAvatar").attr("src", `https://www.gravatar.com/avatar/${data.userHash}.jpg?s=50&r=pg&d=identicon`);
  });

  const messagePanel = document.querySelector("#chat");
  messagePanel.scrollTop =
    messagePanel.scrollHeight - messagePanel.clientHeight;
});
