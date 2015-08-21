function initialize() {
  window.geo = new google.maps.Geocoder();
  var myOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  window.map = new google.maps.Map(document.getElementById("map_canvas"),
    myOptions);
}

function findByAddress(address, title, zoom) {
  $.cookie('address', address);
  $.cookie('title', title);
  if (zoom === undefined) {
    zoom = 16;
  };
  var map_height;
  if (navigator.userAgent.indexOf('iPhone') != -1) {
    map_height = 480 - 50;
  } else {
      map_height = window.screen.height;
  }
  $("#map_canvas").css("width", "100%");
  $("#map_canvas").css("height", map_height);

  geo.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var myLatlang = new google.maps.LatLng(-34.397, 150.644);
      var myOptions = {
        center: results[0].geometry.location,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
      });
      var infoWindow = new google.maps.InfoWindow({
        content: title,
        size: new google.maps.Size(50, 50)
      });
      infoWindow.open(map, marker);
    } else {
      alert(" Geocode was not successful for the following reason:" +
        status);
    }
  });
}
