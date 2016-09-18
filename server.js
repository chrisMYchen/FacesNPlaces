var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(express.static('js'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

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
