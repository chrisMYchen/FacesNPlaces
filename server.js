var emotions = require('./emotions.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function getEmotionData(latitude, longitude) {
  var results = {
      lat: 42.3601,
      lng: -71.0942,
      emotion: 'happy'
    };
  return results;
}
app.use(express.static('public'));
app.use(express.static('js'));
app.use(express.static('css'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});
function getEmotionData(latitude, longitude) {
  var emotionsPromise = emotions.topThreeEmotions(206258876);
  var topEmotions;
  emotionsPromise.then(function(emotions) {
    console.log(emotions);
    topEmotions = emotions;
  });
  // for (i = 0; i < Object.keys(topEmotions).length; i ++) {
  //   console.log("key: ", Object.keys(topEmotions)[i], " value: ", topEmotions[Object.keys(topEmotions)[i]]);
  // }
  // console.log(emotions);
  // console.log(topEmotions);
  var photosPromise = emotions.topThreePhotos(206258876);
  var topPhotos;
  return photosPromise.then(function(photos) {
  	console.log(photos);
    topPhotos = photos;
    return {
      lat: 42.3601,
      lng: -71.0942,
      emotion: topEmotions[0],
      topEmotions: topEmotions,
      topEmotionsValues: [50, 29, 40],
      recentPhotos: topPhotos
    };
  });

  // emotionProportions = proportionEmotions(topEmotions);

}

app.post('/dataload', urlencodedParser, function(req, res){

    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var emotionData = getEmotionData(latitude, longitude);

    console.log('body: ' + JSON.stringify(req.body));
    res.send(emotionData);
});

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
