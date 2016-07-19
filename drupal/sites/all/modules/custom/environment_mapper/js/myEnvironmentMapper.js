(function ($) {
  "use strict";

  var currentZip;
  var previousZip;

  // Boolean tracking if a user is selecting first time settings to optimize UX
  var first_time_user_loading = false;

  $(document).ready(function () {


    var first_time_user_block = $('#first-time-user-block');
    if (first_time_user_block.length > 0) {
      first_time_user_loading = true;
    }
    $(document).on('ee:first_time_user_complete', function () {
      first_time_user_loading = false;
    });

    $(document).on('ee:zipCodeQueried', function (evt, data) {
      if (!first_time_user_loading) {
        currentZip = data.zip;
        if (currentZip !== '' && currentZip !== previousZip) {
          updateMyEnvMapperLoc(data);
        }
        previousZip = currentZip;
      }
    });


  });


  function showMap() {
    var logged_in_view = $('.embedMyEnv-container');
    var error_view = $('#invalid-location');
    logged_in_view.show();
    error_view.hide();
  }

  function missingZipLatLong() {
    var logged_in_view = $('.embedMyEnv-container');
    var error_view = $('#invalid-location');
    logged_in_view.hide();
    error_view.show();

  }

  function updateMyEnvMapperLoc(data) {
    if (currentZip) {
      if (data.latitude > 0 && data.latitude < 90) {
        var zipCentLat = String(data.latitude);
        var zipCentLon = String(data.longitude);
        createIframe(zipCentLat, zipCentLon);
        showMap();
      } else {
        missingZipLatLong();
      }
    }
  }

  /**
   * Sets error message if iframe does not load in time
   * @param $iframe
   */
  function iframeUnavailable($iframe) {
    var $error_container = $('.error-loading-enviromapper');
    $error_container.text('Unable to load Environment Mapper.');
    $iframe.remove();
  }

  /**
   * Creates and appends Iframe
   * @param zipCentLat
   * @param zipCentLon
   */
  function createIframe(zipCentLat, zipCentLon) {
    var iframe_loaded = false;
    var wait_for_iframe_seconds = 10;
    var iFrameURL = "https://map11.epa.gov/myem/envmapEEP/mainmap.html?pTheme=all&pLayers=afs,triair,triwater,rcra,tsca&ve=11," + zipCentLat + "," + zipCentLon;
    //Create Iframe
    var $iframe = $('<iframe>', {
      src: iFrameURL,
      title: 'My EnviroMapper map from EPA.gov',
      width: '800',
      height: '500',
      style: 'border:0',
      id: "myEnviFrame"
    });

    //Load Iframe
    $('.embedMyEnv-container').html($iframe);
    // Update extra details text with new link
    $('#myEnvMoreInfo').attr('href', 'http://www3.epa.gov/myenv/myenview2.find?zipcode=' + currentZip + '&GO=go');

    // If iframe loads, clear error message
    $iframe.on('load', function () {
      iframe_loaded = true;
      $('.error-loading-enviromapper').text('');
    });

    // If Iframe fails to  load withing wait_for_iframe_seconds, show error message
    setTimeout(function () {
      if (iframe_loaded) {
        iframeUnavailable($iframe);
      }
    }, wait_for_iframe_seconds * 1000);
  }

})(jQuery);
