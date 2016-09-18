

function findMyEmotion(images) {

for (i=0; i < images.length; i++) {

  var request = require("request");

var options = { method: 'POST',
  url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
  headers: 
   { 'postman-token': '2498de8f-3599-b6dc-5f99-36f29a22390f',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'ocp-apim-subscription-key': 'a76ae506fef04403809ef7606261e5ca' },
  body: { url: images[i]},
  json: true };


request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
}
)};