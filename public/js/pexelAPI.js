$(document).ready(function() {
  $("#changeBg").on("click", () => {
    UIkit.modal($("#bgmodal")).show();
  });

  function getPictures() {
    var theme = $("#themeInput").val();
    var settings = {
      url: `https://api.pexels.com/v1/search?query=${theme}&per_page=15&page=1`,
      method: "GET",
      timeout: 0,
      headers: {
        Authorization:
          "563492ad6f917000010000015a007adfef72497f8528d58257792ed9"
      }
    };
    $.ajax(settings).then(function(res) {
      for (i = 0; i < res.photos.length; i++) {
        var picThumb = $(
          `<img class="bgPic" src="${res.photos[i].src.large}" height="100px" width="100">`
        );
        $("#bgOptions").append(picThumb);
      }
      $(".bgPic").on("click", e => {
        var imageSource = $(e.target).attr("src");
        $("#chat").css("background-image", `url("${imageSource}")`);
      });
    });
    $("#themeInput").val("");
  }
  $("#searchIcon").on("click", getPictures);
});
