(function($) {
  "use strict";

  var currentZip;


  $(document).ready(function() {

    $("#myEnviFrame").append("<p>Test</p>");

    //user location dropdown
    var $select = $('select#location-select');

    $select.change(function() {
      currentZip = $(this).val();

      if (currentZip != 'view_more') {
        updateMyEnvMapperLoc(currentZip);
      }
    });

    $select.trigger('change');

  });

  function updateMyEnvMapperLoc() {
    if (currentZip) {

      $.getJSON('/zip_code_lookup?zip=' + currentZip, function(data) {

        if (data.latitude > 0 && data.latitude < 90) {

          var zipCentLat = String(data.latitude);
          var zipCentLon = String(data.longitude);
          console.log(zipCentLat);
          console.log(zipCentLon);

          setiFrameNewURL(zipCentLat, zipCentLon);
        }

      });
    }
  }


  function setiFrameNewURL(zipCentLat, zipCentLon) {


    var iFrameURL = "http://www.epa.gov/myenvmap/mainmap.html?mW=640&mH=640&pTheme=all&embed=true&mode=r&pQuery=&pLayers=afs,triair,pcs,triwater,npl,rcra,triland,energycoal,tsca&ve=11," + zipCentLat + "," + zipCentLon;

    $('#myEnviFrame').attr('src', iFrameURL);


  }




})(jQuery);