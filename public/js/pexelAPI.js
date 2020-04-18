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
        pictureArray.push(res.photos[i].src.large);
      }
      return pictureArray;
    });
  }
  getPictures();
  for (i = 0; i < pictureArray.length; i++) {
    var picThumb = $(
      `<a href="#" id="bgPic" value="${pictureArray[i]}"><img src="${pictureArray[i]}" height="100px" width="100"></a><br>`
    );
    console.log(picThumb);
    $("#bgOptions").append(picThumb);
  }
  console.log(pictureArray);

  $("#bgPic").on("click", function(e) {
    e.preventDefault();
    var imageSource = $(this).val();
    $("#chat").css("background-image", `url('${imageSource}')`);
    UIkit.modal($("#bgmodal")).hide();
  });
});
