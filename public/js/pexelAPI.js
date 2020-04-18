$(document).ready(function() {
  $("#changeBg").on("click", () => {
    UIkit.modal($("#bgmodal")).show();
  });
  $.get("/api/pexels/store", function(data) {
    console.log(data);
    $("#chat").css(data);
  });
  function getPictures() {
    var theme = $("#themeInput").val();
    $.post("/api/pexels", { query: theme }).then(function(data) {
      var photos = data.photos;
      for (i = 0; i < photos.length; i++) {
        var picThumb = $(
          `<img class="bgPic" src="${photos[i].src.large}" height="100px" width="100">`
        );
        $("#bgOptions").append(picThumb);
      }
      $(".bgPic").on("click", e => {
        var imageSource = $(e.target).attr("src");
        $("#chat").css("background-image", `url("${imageSource}")`);
        $.post("/api/pexels/store", {
          "background-image": `url("${imageSource}")`
        });
      });
      $("#themeInput").val("");
    });
  }
  $("#searchIcon").on("click", getPictures);
});
