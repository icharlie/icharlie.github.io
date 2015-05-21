function changePage() {
  $("ol > div[id^=page]").hide();
  $("ol > div[id=page" + paginate.current + "]").show();
  $("a[href^='#page']").removeAttr("class");
  $("a[href^='#page" + paginate.current + "']").attr("class", "active")
}

function paginate() {
  var d = $("ol").children().length;
  window.paginate = {
    count: d,
    display: 10,
    current: 1
  };
  var b = Math.ceil(d / paginate.display);
  var a = new Array();
  for (var c = 0; c < b; c += 1) {
    a[c] = $("ol > li:lt(" + paginate.display + ")");
    a[c].wrapAll("<div id='page" + (c + 1) + "'></div>");
    $("<a href=#page" + (b - c) + ">" + (b - c) + "</a>").insertAfter($("ol"))
  }
  $("a[href^='#page']").wrapAll("<div id='links'></div>");
  $("a[href^='#page']").bind("click", function(f) {
    f.preventDefault();
    paginate.current = $(this).text();
    changePage()
  });
  changePage()
}

function init() {
  paginate();
  initialAddressLink();
  bindSelectedEvent()
}

function bindSelectedEvent() {
  $("ol > div[id^=page] > li").each(function(a) {
    $(this).bind("click", function() {
      $("ol > div[id^=page] > li.selected").removeClass("selected");
      $(this).attr("class", "selected")
    })
  })
}

function initialAddressLink() {
  $("ol > div[id^=page] > li").each(function(a) {
    var b = "<b>" + $(this).children("a").text() + "</b><br/>" + $(this).children(
      "address").text();
    $(this).bind("click", function() {
      findByAddress($("address", this).text(), b)
    })
  })
}

function initialize() {
  findByAddress("Oregon State University Corvallis, OR",
    "Oregon State University", 15)
}

function findByAddress(a, d, b) {
  if (b === undefined) {
    b = 18
  }
  var c = new google.maps.Geocoder();
  c.geocode({
    address: a
  }, function(j, h) {
    if (h == google.maps.GeocoderStatus.OK) {
      var g = new google.maps.LatLng(-34.397, 150.644);
      var f = {
        center: j[0].geometry.location,
        zoom: b,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var k = new google.maps.Map(document.getElementById("map_canvas"),
        f);
      var e = new google.maps.Marker({
        position: j[0].geometry.location,
        map: k,
      });
      var i = new google.maps.InfoWindow({
        content: d,
        size: new google.maps.Size(50, 50)
      });
      i.open(k, e)
    } else {
      alert(" Geocode was not successful for the following reason:" + h)
    }
  })
};

window.onload = init;
