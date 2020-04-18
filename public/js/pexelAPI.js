$(document).ready(function() {
  $("#changeBg").on("click", () => {
    UIkit.modal($("#bgmodal")).show();
  });
  var pictureArray = [];
  var theme = "tropical";
  var settings = {
    url: `https://api.pexels.com/v1/search?query=${theme}&per_page=15&page=1`,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: "563492ad6f917000010000015a007adfef72497f8528d58257792ed9"
    }
  };
  function getPictures() {
    $.ajax(settings).then(function(res) {
      for (i = 0; i < res.photos.length; i++) {
        console.log(res.photos[i].src.large);
      }
    });
  }
  getPictures();
  $("#bgOptions");
});
