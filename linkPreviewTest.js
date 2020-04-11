const URLPreview = require("link-preview-js");
// const handlebars = require("handlebars");
var exYouTube;
var exParsedText;

URLPreview.getLinkPreview("https://www.youtube.com/watch?v=MejbOFk7H6c").then(
  data => (exYouTube = data)
);

URLPreview.getLinkPreview(
  "This is a text supposed to be parsed and the first link displayed https://www.youtube.com/watch?v=MejbOFk7H6c"
).then(data => (exParsedText = data));

if (exYouTube) {
  console.log(exYouTube);
}
if (exParsedText) {
  console.log(exParsedText);
}
