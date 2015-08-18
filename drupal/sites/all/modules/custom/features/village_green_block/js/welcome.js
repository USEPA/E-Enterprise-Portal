(function($) {
    
    var VillageGreen = STI.namespace('VillageGreen');
    var VillageGreenDAL = VillageGreen.VillageGreenDAL;    
    var currentInterval = 60;
    var currentIntervalID; 
  
    var PageController = {
        initializeMap : function() {
            var map_canvas = document.getElementById('map_canvas');
            var latlng = new google.maps.LatLng($("#siteLat").val(), $("#siteLon").val());
            var map_options = {
                center: latlng,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            };
            var marker = new google.maps.Marker({
                position: latlng,
                title: $("#citiesMenu").text()
            });
            
            var map = new google.maps.Map(map_canvas, map_options);     
            marker.setMap(map);
        },
          
        getWindDirection : function(degree) {
            if((degree <= 360 && degree >= 348.75) || (degree >= 0 && degree <= 33.75)) {
                return "N";
            } else if(degree > 33.75 && degree <= 78.75) {
                return "NE";
            } else if(degree > 78.75 && degree <= 123.75) {
                return "E";
            } else if(degree > 123.75 && degree <= 168.75) {
                return "SE";
            } else if(degree > 168.75 && degree <= 213.75) {
                return "S";
            } else if(degree > 213.75 && degree <= 258.75) {
                return "SW";
            } else if(degree > 258.75 && degree <= 303.75) {
                return "W";
            } else if(degree > 303.75 && degree <= 348.75) {
                return "NW";
            }
            return "";
        },
        
        renderCurrentDataTable : function(data) {           

            console.log(data);

            $(".curPMReading").html(data.curPmValue);
        
            $(".curOzoneReading").html(data.curOzoneValue);        
            $(".curWSReading").html(data.curWSValue);
            $(".curHumidReading").html(data.curHumValue);
            $(".curTempReading").html(data.curTempValue);
            $(".curWDReading").html(PageController.getWindDirection(data.curWDValue));           

            var currentDateString = data.currentDateTime;
            currentDateString = currentDateString + ' ' + data.timezone;
            
            $(".currentObsDate").html(currentDateString);  

            // After current data section is rendered, set the background
            //PageController.checkIfImageExists( VG.config.baseUrl + "/images/site_banners/"+ $("#currentFullAQS").val() +".jpg");
        },
      
        checkIfImageExists : function(src) {
            var img = new Image();
            img.onload = function() {
                $("#topRow").backstretch(VG.config.baseUrl + "/images/site_banners/"+ $("#currentFullAQS").val() +".jpg");                          
            };
            img.onerror = function() {
                $("#topRow").backstretch(VG.config.baseUrl + "/images/site_backgrounds/0.jpg");                
            };
            img.src = src;
        },
        
        setIntervalTimerForCurrentData : function() {
            window.clearInterval(currentIntervalID);

            currentIntervalID = setInterval(function() {

                currentInterval = currentInterval-1;

                if(currentInterval === 0) {
                           
                    VillageGreenDAL.getDataForCurrentMinuteWelcomePage($("#currentSiteID").val(), function(data) {
                        PageController.renderCurrentDataTable(data.responseJSON);
                    });     
                 
                }


                var percentProgress = (60 - currentInterval)/60 * 100;

                $(".countdownContainer").html(currentInterval);
                $(".village-green-countdown").css("width", percentProgress + "%").attr({"aria-valuenow": percentProgress});

                    if (currentInterval <= 0) {
                        currentInterval = 60;
                    }                                                                      
            }, 1000);             
        }

    };         

    $(document).ready(function() {

        $("#currentSiteID").on('change', function(evt) {

            var siteID = $("#currentSiteID").val();

            $("a.village-green-external-link").attr("href", "http://villagegreen.airnowtech.org/welcome?siteID="+siteID);

            // On load, populate the data sections
            VillageGreenDAL.getDataForCurrentMinuteWelcomePage(siteID, function(response) {
                PageController.renderCurrentDataTable(response.responseJSON);
            });

            PageController.setIntervalTimerForCurrentData();
        });

        $("#currentSiteID").trigger('change');
    });
    
}(jQuery));