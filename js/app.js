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
    }
  });
});
