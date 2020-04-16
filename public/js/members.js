$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".currentUsername").text(data.username);
    $(".userAvatar").attr("src", data.avatarUrl);
  });

  const messagePanel = document.querySelector("#messagePanel");
  messagePanel.scrollTop =
    messagePanel.scrollHeight - messagePanel.clientHeight;
});
