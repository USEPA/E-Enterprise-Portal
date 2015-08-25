(function($) {
  "use strict";

  var currentZip;
  var previousZip;

  $(document).ready(function() {
    $(document).on('ee:zipCodeQueried', function(evt, data) {
      currentZip = data.zip;
      if (currentZip !== '' && currentZip !== previousZip) {
        updateMyEnvMapperLoc(data);
      }
      previousZip = currentZip;
    })
  });

  function updateMyEnvMapperLoc(data) {
    if (currentZip) {
      if (data.latitude > 0 && data.latitude < 90) {
        var zipCentLat = String(data.latitude);
        var zipCentLon = String(data.longitude);
        //console.log("MyEnv map with lat/long: " + zipCentLat + " " + zipCentLon);
        setiFrameNewURL(zipCentLat, zipCentLon);
      }
    }
  }

  function setiFrameNewURL(zipCentLat, zipCentLon) {
    var iFrameURL = "https://map11.epa.gov/myem/envmap/mainmap.html?pTheme=all&pLayers=afs,triair,triwater,rcra,tsca&ve=11," + zipCentLat + "," + zipCentLon;

    $('#myEnviFrame').attr('src', iFrameURL);
    //document.getElementById('myEnviFrame').src = iFrameURL;
  }

})(jQuery);