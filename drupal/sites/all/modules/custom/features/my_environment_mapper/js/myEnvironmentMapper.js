(function($) {
  "use strict";

  var currentZip;
  var previousZip;

  $(document).ready(function() {
    //user location dropdown
    var $select = $('select#location-select');
    $select.change(function() {
      currentZip = $(this).val();
      if (currentZip !== '' && currentZip !== previousZip) {
        updateMyEnvMapperLoc();
      }
      previousZip = currentZip;
    });

    $select.trigger('change');

  });

  function updateMyEnvMapperLoc() {
    if (currentZip) {
      $.getJSON('/zip_code_lookup?zip=' + currentZip, function(data) {
        if (data.latitude > 0 && data.latitude < 90) {
          var zipCentLat = String(data.latitude);
          var zipCentLon = String(data.longitude);
          console.log("MyEnv map with lat/long: " + zipCentLat + " " + zipCentLon);
          setiFrameNewURL(zipCentLat, zipCentLon);
        }
      });
    }
  }

  function setiFrameNewURL(zipCentLat, zipCentLon) {
    var iFrameURL = "http://www.epa.gov/myenvmap/mainmap.html?mW=490&mH=490&pTheme=all&embed=true&mode=r&pQuery=&pLayers=afs,triair,triwater,rcra,tsca&ve=11," + zipCentLat + "," + zipCentLon;

    $('#myEnviFrame').attr('src', iFrameURL);
  }

})(jQuery);