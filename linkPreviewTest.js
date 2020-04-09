import {getLinkPreview} from 'link-preview-js';

getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c')
  .then((data) => console.debug(data));
 
getLinkPreview('This is a text supposed to be parsed and the first link displayed https://www.youtube.com/watch?v=MejbOFk7H6c')
  .then((data) => console.debug(data));