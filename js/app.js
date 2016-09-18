var emotionData = {
  lat: 42.3601,
  lng: -71.0942,
  emotion: 'happy'
};
const HAPPY = 'happy';
const SAD = 'sad';
const DISGUST = 'disgust';
const SURPRISE = 'surprise';

function getPinColor(emotion) {
  if (emotion === HAPPY) {
    return "FFEB3B";
  }
  else if (emotion === SAD) {
    return "283593";
  }
  else if (emotion === DISGUST) {
    return "9E9D24";
  }
  else if (emotion === SURPRISE) {
    return "D81B60";
  }
}

var centerLat = 42.3601;
var centerLng = -71.0942;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(centerLat, centerLng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infoWindow = new google.maps.InfoWindow();

  var numLocations = 1;
  for (i = 0;i < numLocations; i ++) {
    var locationLat = centerLat;
    var locationLng = centerLng;
    var pinColor = getPinColor(emotionData.emotion);
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locationLat, locationLng),
      map: map,
      icon: pinImage,
      shadow: pinShadow

    });
    console.log(emotionData.emotion);
    google.maps.event.addListener(marker, 'click',  (function(marker, i){
      return function() {
        infoWindow.setContent(emotionData.emotion);
        infoWindow.open(map, marker);
      }
    })(marker, i));
  }
}


function setTopEmotions() {
  for (i = 0; i < emotionData.topEmotions.length; i ++) {
    setSingleEmotion(emotionData.topEmotions[i], i, emotionData.topEmotionsValues[i]);
  }
}

function setSingleEmotion(emotion, boxnum, value) {
  console.log('single emotion:', value);
  var idString = '#emotion' + boxnum;
  var valuePercent = value+ '%';
  var faicon = 'fa-smile-o';
  var emotioncolor = 'emotion-'+emotion;
  if (emotion == HAPPY) {
    faicon = 'fa-smile-o';
  }
  else if (emotion == SAD) {
    faicon = 'fa-frown-o';
  }
  else if (emotion == DISGUST) {
    faicon = 'fa-qq';
  }
  console.log(idString);
  $(idString).html(`
  <div class="${emotioncolor} w3-container w3-padding-16">
  <div class="w3-left"><i class="fa ${faicon} w3-xxxlarge"></i></div>
    <div class="w3-right">
      <h3>${valuePercent}</h3>
    </div>
    <div class="w3-clear"></div>
    <h4 style="text-transform: capitalize">${emotion}</h4>
  </div>
  </div>
  `);
}

function setRecentPhotos() {
  for (i = 0; i < 3; i ++) {
      var photoid = "#image"+i;
      console.log(photoid);
      var imgurl = emotionData.recentPhotos[i];
      console.log(imgurl);
      $(photoid).prepend(`<img src="${imgurl}" style="width:80%; margin:auto; display:block" />`);
  }
}

$(document).ready(function(){
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8888/dataload',
    dataType: 'json',
    data: {
      latitude: 42.3601,
      longitude: -71.0942
    },
    success: function(data) {
      console.log("data received", data);
      emotionData = {
        lat: 42.3601,
        lng: -71.0942,
        emotion: 'disgust',
        topEmotions: ['disgust', 'happy', 'sad'],
        topEmotionsValues: [50, 29, 40],
        recentPhotos: ["http://images.hellogiggles.com/uploads/2015/03/22/featured.jpg", "http://images.hellogiggles.com/uploads/2015/03/22/featured.jpg", "http://images.hellogiggles.com/uploads/2015/03/22/featured.jpg"]
      };
      console.log('yo');
      setTopEmotions();
      setRecentPhotos();
    }
  });
});
