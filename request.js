
//API for Emotion
// var request = require("request");

// var options = { method: 'POST',
//   url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
//   headers: 
//    { 'postman-token': '2498de8f-3599-b6dc-5f99-36f29a22390f',
//      'cache-control': 'no-cache',
//      'content-type': 'application/json',
//      'ocp-apim-subscription-key': 'a76ae506fef04403809ef7606261e5ca' },
//   body: { url: 'http://resources3.news.com.au/images/2013/08/19/1226699/627379-b4bd176e-07da-11e3-842c-e58b8b7bc9c3.jpg' },
//   json: true };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });


//API for Instagram
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.instagram.com/v1/locations/206258876/media/recent',
  qs: { access_token: '3153740075.afaff3a.f5c8ae423d41455d96c2cf030d4bc4f8' },
  headers: 
   { 'postman-token': '6d8fffd9-c30c-f666-d241-8092379b8933',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});



