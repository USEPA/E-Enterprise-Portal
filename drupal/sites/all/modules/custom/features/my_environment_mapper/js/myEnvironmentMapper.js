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
        $(document).on('ee:first_time_user_complete', function() {
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
                setiFrameNewURL(zipCentLat, zipCentLon);
                showMap();
            } else {
                missingZipLatLong();
            }
        }
    }

    function setiFrameNewURL(zipCentLat, zipCentLon) {
        var iFrameURL = "https://map11.epa.gov/myem/envmapEEP/mainmap.html?pTheme=all&pLayers=afs,triair,triwater,rcra,tsca&ve=11," + zipCentLat + "," + zipCentLon;
        $('#myEnviFrame').attr('src', iFrameURL);
        $('#myEnvMoreInfo').attr('href', 'http://www3.epa.gov/myenv/myenview2.find?zipcode=' + currentZip + '&GO=go');
    }

})(jQuery);