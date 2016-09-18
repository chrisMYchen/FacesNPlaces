// <!DOCTYPE html>
// <html>
// <head>
//     <title>JSSample</title>
//     <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
// </head>
// <body>

// <script type="text/javascript">


var httparray = ['https://s-media-cache-ak0.pinimg.com/564x/6f/ce/ed/6fceedb0da2c03fc35fec87641089c63.jpg', 'http://resources3.news.com.au/images/2013/08/19/1226699/627379-b4bd176e-07da-11e3-842c-e58b8b7bc9c3.jpg'];


for (i=0; i < httparray.length; i++) {

  var request = require("request");

var options = { method: 'POST',
  url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
  headers: 
   { 'postman-token': '2498de8f-3599-b6dc-5f99-36f29a22390f',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'ocp-apim-subscription-key': 'a76ae506fef04403809ef7606261e5ca' },
  body: { url: httparray[i]},
  json: true };


request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
}
)};
// </script>
// </body>
// </html>
