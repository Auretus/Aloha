const URLPreview = require("link-preview-js");
// const handlebars = require("handlebars");
var exYouTube;

URLPreview.getLinkPreview("https://www.youtube.com/watch?v=MejbOFk7H6c")
  .then(data => {
    console.log("Logging data inside callback function:");
    console.log(data);
    exYouTube = data;
  })
  .then(() => {
    console.log("Logging assigned variable outside of callback function:");
    console.log(exYouTube);
  });
