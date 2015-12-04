(function($) {
  $(function() {

		//If user is a state_admin, then show the "Add agency maps" link
    if (Drupal.settings.userrole == 'state_admin') {
    	var galleryLink = '<a href="https://epa.maps.arcgis.com/home/search.html?q=&t=content&focus=applications" target="_blank" class="favorites-ignore">Browse EPA gallery...</a>     <a href="/new-agency-map" class="favorites-ignore last">Add agency map collection</a>';
		}
    else {
	  	var galleryLink = '<a class="first" href="https://epa.maps.arcgis.com/home/search.html?q=&t=content&focus=applications" target="_blank" class="favorites-ignore">Browse EPA gallery...</a>';
	  }
    var totThumbnails = 0;
    var jcarousel = $('.jcarousel').jcarousel();
    var reloadAndCreateCounter = 0;

    //dynamically calculate this val during re-factor for dynamic input
    //hardcoded for EPA, NOAA, Minnesota, and Omaha
    var totalNumOrgs = 4;

    queryEPA_AGOL();

    jcarousel.on('jcarousel:reload jcarousel:create', function() {
      var carousel = $(this),
        width = carousel.innerWidth();

      if (width >= 1100) {
        width = (width / 5) - 4;
      } else if (width >= 850) {
        width = (width / 4) - 4;
      } else if (width >= 600) {
        width = (width / 3) - 4;
      } else if (width >= 350) {
        width = (width / 2) - 4;
      }

      carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
      //don't want to fire this every time on reload since the order gets shuffled each time, only for the last org that is loaded
      //Firefox doesn't scroll to 0 like it should, so this is a temp workaround
      //console.log(reloadAndCreateCounter);
      if (reloadAndCreateCounter > totalNumOrgs) {
        turnOnVisibleThumbs();
      }
      reloadAndCreateCounter++;
    });

    $('.jcarousel-control-prev')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .click(function() {
        // If user clicks previous, make sure those thumbs are visible.
        turnOnVisibleThumbs();
      })
      .jcarouselControl({
        target: '-=1'
      });

    $('.jcarousel-control-next')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .click(function() {
        // If user clicks next, make sure those thumbs are visible.
        turnOnVisibleThumbs();
      })
      .jcarouselControl({
        target: '+=1'
      });

    $('.myMapFilterTerm').click(function() {
      //options from the DOM (id) are mapsAll, mapsAir, mapsWater, or mapsLand
      var filterType = $(this).attr('id');
      $('.myMapFilterTerm').parent('li').removeClass('active-mymaps-filter');
      $(this).parent('li').addClass('active-mymaps-filter');
      //$(this).blur(); //was used as workaround to holding focus after click, but broke tab focus and caused 508 issues
      filterMyMapsGallery(filterType);
    });

    function turnOnVisibleThumbs() {
      // Function to turn on thumbnail image sources for visible jcarousel entries.

      // jcarousel's "visible" list doesn't actually include the last visible item, so we need to build our own list
      // Find start of visible list
      start = $.inArray(jcarousel.jcarousel('visible')[0], $(".thumb").find("li").not(":hidden"));
      // Max number of visible items in our carousel is 5, so set ending point to offset 6
      end = start + 6;
      // Slide the full list of entries to just those 5 we are interested in (all possible visible & not filtered/hidden)
      $(".thumb").find("li").not(":hidden").slice(start, end).each(function() {
        // If the img source is not already turned on
        if (!$(this).find(".thumbnailImg").attr("src")) {
          // Set image source from temporary source.
          $(this).find(".thumbnailImg").attr("src", $(this).find(".thumbnailImg").attr("tsrc"));
        }
      })
    }

    function filterMyMapsGallery(filterType) {
      var listItems = $('.jcarousel ul li');
      listItems.each(function(li) {
        //reset gallery to show all items before applying filter
        $(this).show();
        var itemTags = $(this).find('a').data('tags').toLowerCase();
        switch (filterType) {
          case 'mapsAll':
            //nothing to do because all items are showing
            break;
          case 'mapsAir':
            if ((itemTags.indexOf('air') == -1 && itemTags.indexOf('oaqps') == -1) || (itemTags.indexOf('impair') > -1)) {
              $(this).hide();
            } else {

            }
            break;
          case 'mapsWater':
            if (itemTags.indexOf('water') == -1 && itemTags.indexOf('ocean') == -1) {
              $(this).hide();
            } else {

            }

            break;
          case 'mapsLand':
            if (itemTags.indexOf('land') == -1 && itemTags.indexOf('rcra') == -1) {
              $(this).hide();
            } else {}
            break;
        }

      });
      updateTotalNumberOfMapsShowing();
      jcarousel.jcarousel('reload');
      $('.jcarousel').jcarousel('scroll', 0);
      turnOnVisibleThumbs();



    }


    //query the EPA AGOL/GPO REST API for publicly shared web mapping applications
    function queryEPA_AGOL(successCallback) {
      $.ajax({
        type: 'GET',
        url: 'https://epa.maps.arcgis.com/sharing/rest/search',
        async: true,
        //hardcoded string for EPA  GPO (AGOL) query - hardcoded query for empty string (wildcard) - later to implement tag search or similar for filtering based on dynamic criteria
        data: {
          q: ' orgid:cJ9YHowT8TU7DUyn orgid:cJ9YHowT8TU7DUyn (type:"Web Mapping Application" OR type:"Mobile Application") -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In"',
          f: 'json',
          num: '100'
        },
        success: function(data, status, xhr) {
          var resultJson = JSON.parse(data);
          setupMyMapsGalleryWithEPAthumbs(resultJson);
        }
      }).fail(function(xhr, status) {
        if (status == "error") {
          console.log("Error in EPA AGOL API request.");
          return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
      });
    }

    //create the MyMaps thumbnail gallery from the EPA GPO/AGOL API query results
    function setupMyMapsGalleryWithEPAthumbs(data) {
      var orgAlias = "USEPA GeoPlatform Online";
      var orgContactEmail = "epageoplatform@epa.gov";
      var orgAGOLacronym = 'epa';

      //Opening UL only created in init of gallery
      var $ul = $('<ul>', {
        'class': 'thumb'
      });
      var numGoodResults = 0;
      var thumbnailNum = 0;

      //generate each thumbnail and only load it if non-default thumbnail image and a good hyperlink
      $.each(shuffle(data.results), function() {
        //Added filter for user 'jquacken_EPA' because all of that user's WMAs are not maps - they are how-to guides
        //Check for hyperlinks to most likely apps that are internal only (non default ports of 80, 443)
        var hyperlinkValid;
        if (this.url.indexOf('http') > -1 && this.url !== null) {
          var linkArr = (this.url.split("://"));
          //checks if hyperlink contains port designator
          if ((linkArr[1].indexOf(':') > -1)) {
            hyperlinkValid = false;
          } else {
            hyperlinkValid = true;
          }
        } else {
          hyperlinkValid = false;
        }

        if (this.thumbnail != 'thumbnail/ago_downloaded.png' && this.thumbnail !== null && this.description !== null && this.owner != 'jquacken_EPA' && hyperlinkValid === true) {
          var itemTags = this.tags.toString();
          thumbnailNum += 1;
          numGoodResults += 1;
          var thumbnailURL = "https://" + orgAGOLacronym + ".maps.arcgis.com/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
          //Descriptions can contain or not contain HTML markup, to let JQuery's .text() work, we just add the p tags to all descriptions
          //and all tags are remove with .text(), including descriptions which has no HTML markup which would normally throw an error
          var desc = "<p>" + this.description + "</p>";
          //check if hyperlink is hosted on maps.arcgis.com, if it is, switch URL to HTTPS
          var origURL = this.url;
          var hyperlinkURL;
          if ((origURL.indexOf('http://') > -1) && (origURL.indexOf('maps.arcgis.com') > -1)) {
            //replace with HTTPS since we know maps.arcgis.com support SSL/TLS
            hyperlinkURL = origURL.replace('http://', 'https://');
          } else {
            hyperlinkURL = origURL;
          }

          var $li = $('<li>').append(
            $('<div>', {
              'class': 'thumbitem-border'
            }).append(
              $('<a>', {
                'class': 'thumbhyperlink',
                'data-accessinfo': orgAlias,
                'data-contactemail': orgContactEmail,
                'data-tags': itemTags,
                'href': hyperlinkURL,
                'title': this.title,
                'target': '_blank',
              }).append(
                $('<img>', {
                  'class': 'thumbnailImg',
                  'tsrc': thumbnailURL, // Use temporary source as placeholder so all thumbs are not loaded at once.
                  'alt': this.title,
                  'title': this.title,
                  'aria-describedby': 'thumbnail-desc-' + thumbnailNum
                })
              ),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                'title': this.title,
                'html': this.title,
                'aria-describedby': 'thumbnail-desc-noaa-' + thumbnailNum + ' ' + 'thumbnail-source-noaa-' + thumbnailNum + ' ' + 'thumbnail-contact-' + thumbnailNum,                
              }),
              //the description element can contain HTML markup so use .text to un-format the string
              //Omaha has no descriptions in their publicly shared WMAs
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppDesc ellipsis',
                'id': 'thumbnail-desc-' + thumbnailNum,
                'title': truncate($(desc).text(), 1000),
                'html': $(desc).text(),
                'tabindex': '0',                
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppSource ellipsis',
                id: 'thumbnail-source-' + thumbnailNum,
                'title': orgAlias,
                'html': orgAlias
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppContact ellipsis',
                id: 'thumbnail-contact-' + thumbnailNum,
                'title': orgContactEmail,
                'html': orgContactEmail
              })
            )
          );

          $ul.append($li);
        }
      });

      totThumbnails += numGoodResults;
      //console.log("Added " + String(numGoodResults) + " " + orgAlias + " maps to MyMaps Gallery");

      //set the content of the carousel with the newly generated html
      jcarousel.html($ul);
      jcarousel.jcarousel('reload');

      //Don't load other orgs until after EPA items are loaded
      //these orgs are all loaded async
      queryMPCA_AGOL();
      queryOmahaNE_AGOL();
      queryNOAA_AGOL();

      $(".ellipsis").dotdotdot({
        watch: "window"
      });
      $(".ellipsis").trigger("update.dot");

      updateTotalNumberOfMapsShowing();

      addMapThumbnailClickListeners();

    }





    //Minnesota Pollution Control Agency

    //query the MPCA AGOL REST API for publicly shared web mapping applications
    function queryMPCA_AGOL(successCallback) {
      $.ajax({
        type: 'GET',
        url: 'https://mpca.maps.arcgis.com/sharing/rest/search',
        async: true,
        //hardcoded string for MPCA AGOL REST API query - hardcoded query for empty string (wildcard)
        data: {
          q: '(group:"5ef8204969ca4aebb247b9013acebe02")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration"  (type:"Web Mapping Application")',
          f: 'json',
          num: '100'
        },
        success: function(data, status, xhr) {
          var resultJson = JSON.parse(data);
          appendMPCAToMyMapsGallery(resultJson);
        }
      }).fail(function(xhr, status) {
        if (status == "error") {
          console.log("Error in MPCA API request.");
          return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
      });
    }

    //gallery is already populated with thumbnails from previous query
    function appendMPCAToMyMapsGallery(data) {
      var orgAlias = "Minnesota Pollution Control Agency";
      var orgContactEmail = "webteam.pca@state.mn.us";
      var orgAGOLacronym = "mpca";

      var numGoodResults = 0;
      var thumbnailNum = 0;
      //generate each thumbnail and only load it if non-default thumbnail image and a good hyperlink
      $.each(shuffle(data.results), function() {
        //Check for hyperlinks to most likely apps that are internal only (non default ports of 80, 443)
        var hyperlinkValid;
        if (this.url.indexOf('http') > -1 && this.url !== null) {
          var linkArr = (this.url.split("://"));
          //checks if hyperlink contains port designator
          if ((linkArr[1].indexOf(':') > -1)) {
            hyperlinkValid = false;
          } else {
            hyperlinkValid = true;
          }
        } else {
          hyperlinkValid = false;
        }

        if (this.thumbnail != 'thumbnail/ago_downloaded.png' && this.thumbnail !== null && this.description !== null && hyperlinkValid === true) {
          var itemTags = this.tags.toString();
          thumbnailNum += 1;
          numGoodResults += 1;
          var thumbnailURL = "https://" + orgAGOLacronym + ".maps.arcgis.com/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
          //Descriptions can contain or not contain HTML markup, to let JQuery's .text() work, we just add the p tags to all descriptions
          //and all tags are remove with .text(), including descriptions which has no HTML markup which would normally throw an error
          var desc = "<p>" + this.description + "</p>";
          //check if hyperlink is hosted on maps.arcgis.com, if it is, switch URL to HTTPS
          var origURL = this.url;
          var hyperlinkURL;
          if ((origURL.indexOf('http://') > -1) && (origURL.indexOf('maps.arcgis.com') > -1)) {
            //replace with HTTPS since we know maps.arcgis.com support SSL/TLS
            hyperlinkURL = origURL.replace('http://', 'https://');
          } else {
            hyperlinkURL = origURL;
          }

          var $li = $('<li>').append(
            $('<div>', {
              'class': 'thumbitem-border'
            }).append(
              $('<a>', {
                'class': 'thumbhyperlink',
                'data-accessinfo': orgAlias,
                'data-contactemail': orgContactEmail,
                'data-tags': itemTags,
                'href': hyperlinkURL,
                'title': this.title,
                'target': '_blank'
              }).append(
                $('<img>', {
                  'class': 'thumbnailImg',
                  'tsrc': thumbnailURL, // Use temporary source as placeholder so all thumbs are not loaded at once.
                  'alt': this.title,
                  'title': this.title,
                  'aria-describedby': 'thumbnail-desc-MPCA-' + thumbnailNum
                })
              ),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                'title': this.title,
                'html': this.title,
                'aria-describedby': 'thumbnail-desc-noaa-' + thumbnailNum + ' ' + 'thumbnail-source-noaa-' + thumbnailNum + ' ' + 'thumbnail-contact-' + thumbnailNum,                                
              }),
              //the description element can contain HTML markup so use .text to un-format the string
              //Omaha has no descriptions in their publicly shared WMAs
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppDesc ellipsis',
                'id': 'thumbnail-desc-MPCA-' + thumbnailNum,
                'title': truncate($(desc).text(), 1000),
                'html': $(desc).text(),
                'tabindex': '0',                
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppSource ellipsis',
                id: 'thumbnail-source-MPCA-' + thumbnailNum,
                'title': orgAlias,
                'html': orgAlias
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppContact ellipsis',
                id: 'thumbnail-contact-' + thumbnailNum,
                'title': orgContactEmail,
                'html': orgContactEmail
              })              
            )
          );

          // Append items one at a time to carousel
          $('.jcarousel ul').append($li);
        }
      });

      totThumbnails += numGoodResults;
      //console.log("Added " + String(numGoodResults) + " " + orgAlias + " maps to MyMaps Gallery");
      $('.thumb').randomize('li');

      //jcarousel.jcarousel('reload');
      //$('.jcarousel').jcarousel('scroll', 0);


      $(".ellipsis").dotdotdot({
        watch: "window"
      });
      $(".ellipsis").trigger("update.dot");

      updateTotalNumberOfMapsShowing();

      addMapThumbnailClickListeners();
    }









    //Omaha NE City GIS

    //query the Omaha, NE AGOL REST API for publicly shared web mapping applications
    function queryOmahaNE_AGOL(successCallback) {
      $.ajax({
        type: 'GET',
        url: 'https://omaha.maps.arcgis.com/sharing/rest/search',
        async: true,
        //hardcoded string for Omaha AGOL REST API query - hardcoded query for empty string (wildcard)
        data: {
          q: 'orgid:tIBLyYZX96jUntYm  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration"  (type:"Web Mapping Application")',
          f: 'json',
          num: '100'
        },
        success: function(data, status, xhr) {
          var resultJson = JSON.parse(data);
          appendOmahaNEToMyMapsGallery(resultJson);
        }
      }).fail(function(xhr, status) {
        if (status == "error") {
          console.log("Error in Omaha API request.");
          return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
      });
    }

    function appendOmahaNEToMyMapsGallery(data) {

      var orgAlias = "City of Omaha, Nebraska";
      var orgContactEmail = "gis@douglascounty-ne.gov";
      var orgAGOLacronym = "omaha";

      var numGoodResults = 0;
      var thumbnailNum = 0;
      //generate each thumbnail and only load it if non-default thumbnail image and a good hyperlink and a description
      //removed && this.description !== null
      $.each(shuffle(data.results), function() {
        //Check for hyperlinks to most likely apps that are internal only (non default ports of 80, 443)
        var hyperlinkValid;
        if (this.url.indexOf('http') > -1 && this.url !== null) {
          var linkArr = (this.url.split("://"));
          //checks if hyperlink contains port designator
          if ((linkArr[1].indexOf(':') > -1)) {
            hyperlinkValid = false;
          } else {
            hyperlinkValid = true;
          }
        } else {
          hyperlinkValid = false;
        }

        if (this.thumbnail != 'thumbnail/ago_downloaded.png' && this.thumbnail !== null && this.description !== null && hyperlinkValid === true) {
          var itemTags = this.tags.toString();
          thumbnailNum += 1;
          numGoodResults += 1;
          var thumbnailURL = "https://" + orgAGOLacronym + ".maps.arcgis.com/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
          //Descriptions can contain or not contain HTML markup, to let JQuery's .text() work, we just add the p tags to all descriptions
          //and all tags are remove with .text(), including descriptions which has no HTML markup which would normally throw an error
          var desc = "<p>" + this.description + "</p>";
          //check if hyperlink is hosted on maps.arcgis.com, if it is, switch URL to HTTPS
          var origURL = this.url;
          var hyperlinkURL;
          if ((origURL.indexOf('http://') > -1) && (origURL.indexOf('maps.arcgis.com') > -1)) {
            //replace with HTTPS since we know maps.arcgis.com support SSL/TLS
            hyperlinkURL = origURL.replace('http://', 'https://');
          } else {
            hyperlinkURL = origURL;
          }

          var $li = $('<li>').append(
            $('<div>', {
              'class': 'thumbitem-border'
            }).append(
              $('<a>', {
                'class': 'thumbhyperlink',
                'data-accessinfo': orgAlias,
                'data-contactemail': orgContactEmail,
                'data-tags': itemTags,
                'href': hyperlinkURL,
                'title': this.title,
                'target': '_blank'
              }).append(
                $('<img>', {
                  'class': 'thumbnailImg',
                  'tsrc': thumbnailURL, // Use temporary source as placeholder so all thumbs are not loaded at once.
                  'alt': this.title,
                  'title': this.title,
                  'aria-describedby': 'thumbnail-desc-omahane-' + thumbnailNum
                })
              ),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                'title': this.title,
                'html': this.title,
                'aria-describedby': 'thumbnail-desc-noaa-' + thumbnailNum + ' ' + 'thumbnail-source-noaa-' + thumbnailNum + ' ' + 'thumbnail-contact-' + thumbnailNum,                                
              }),
              //the description element can contain HTML markup so use .text to un-format the string
              //Omaha has no descriptions in their publicly shared WMAs
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppDesc ellipsis',
                'id': 'thumbnail-desc-omahane-' + thumbnailNum,
                'title': truncate($(desc).text(), 1000),
                'html': $(desc).text(),
                'tabindex': '0',                
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppSource ellipsis',
                id: 'thumbnail-source-omahane-' + thumbnailNum,
                'title': orgAlias,
                'html': orgAlias
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppContact ellipsis',
                id: 'thumbnail-contact-' + thumbnailNum,
                'title': orgContactEmail,
                'html': orgContactEmail
              })              
            )
          );

          //Append items one at a time to carousel
          $('.jcarousel ul').append($li);
        }
      });

      totThumbnails += numGoodResults;
      //console.log("Added " + String(numGoodResults) + " " + orgAlias + " maps to MyMaps Gallery");

      $('.thumb').randomize('li');
      //jcarousel.jcarousel('reload');
      //$('.jcarousel').jcarousel('scroll', 0);

      $(".ellipsis").dotdotdot({
        watch: "window"
      });
      $(".ellipsis").trigger("update.dot");

      updateTotalNumberOfMapsShowing();

      addMapThumbnailClickListeners();
    }





    //TODO: Need to refactor into array of other orgs after adding any further orgs
    //all 3rd party orgs should call same function with diff. input args (eg. orgID, orgName, orgAlias, orgRootURL)

    //National Oceanic and Atmospheric Administration

    //query the NOAA AGOL REST API for publicly shared web mapping applications
    function queryNOAA_AGOL(successCallback) {
      $.ajax({
        type: 'GET',
        url: 'https://noaa.maps.arcgis.com/sharing/rest/search',
        async: true,
        //hardcoded string for NOAA AGOL REST API query - hardcoded query for empty string (wildcard)
        data: {
          q: 'orgid:C8EMgrsFcRFL6LrL  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration"  (type:"Web Mapping Application" AND tags:"oceans")',
          f: 'json',
          num: '100'
        },
        success: function(data, status, xhr) {
          var resultJson = JSON.parse(data);
          appendNOAAToMyMapsGallery(resultJson);
        }
      }).fail(function(xhr, status) {
        if (status == "error") {
          console.log("Error in NOAA API request.");
          return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
      });
    }

    //gallery is already populated with thumbnails from previous query
    function appendNOAAToMyMapsGallery(data) {
      var orgAlias = "NOAA";
      var orgContactEmail = "gis.community@noaa.gov";
      var orgAGOLacronym = "noaa";

      var numGoodResults = 0;
      var thumbnailNum = 0;
      //generate each thumbnail and only load it if non-default thumbnail image and a good hyperlink
      $.each(shuffle(data.results), function() {
        //Check for hyperlinks to most likely apps that are internal only (non default ports of 80, 443)
        var hyperlinkValid;
        if (this.url.indexOf('http') > -1 && this.url !== null) {
          var linkArr = (this.url.split("://"));
          //checks if hyperlink contains port designator
          if ((linkArr[1].indexOf(':') > -1)) {
            hyperlinkValid = false;
          } else {
            hyperlinkValid = true;
          }
        } else {
          hyperlinkValid = false;
        }

        if (this.thumbnail != 'thumbnail/ago_downloaded.png' && this.thumbnail !== null && this.description !== null && hyperlinkValid === true) {
          var itemTags = this.tags.toString();

          thumbnailNum += 1;
          numGoodResults += 1;
          var thumbnailURL = "https://" + orgAGOLacronym + ".maps.arcgis.com/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
          //Descriptions can contain or not contain HTML markup, to let JQuery's .text() work, we just add the p tags to all descriptions
          //and all tags are remove with .text(), including descriptions which has no HTML markup which would normally throw an error
          var desc = "<p>" + this.description + "</p>";
          //check if hyperlink is hosted on maps.arcgis.com, if it is, switch URL to HTTPS
          var origURL = this.url;
          var hyperlinkURL;
          if ((origURL.indexOf('http://') > -1) && (origURL.indexOf('maps.arcgis.com') > -1)) {
            //replace with HTTPS since we know maps.arcgis.com support SSL/TLS
            hyperlinkURL = origURL.replace('http://', 'https://');
          } else {
            hyperlinkURL = origURL;
          }

          var $li = $('<li>').append(
            $('<div>', {
              'class': 'thumbitem-border'
            }).append(
              $('<a>', {
                'class': 'thumbhyperlink',
                'data-accessinfo': orgAlias,
                'data-contactemail': orgContactEmail,
                'data-tags': itemTags,
                'href': hyperlinkURL,
                'title': this.title,
                'target': '_blank'
              }).append(
                $('<img>', {
                  'class': 'thumbnailImg',
                  'tsrc': thumbnailURL, // Use temporary source as placeholder so all thumbs are not loaded at once.
                  'alt': this.title,
                  'title': this.title,
                  'aria-describedby': 'thumbnail-desc-noaa-' + thumbnailNum
                })
              ),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                'title': this.title,
                'html': this.title,
                'aria-describedby': 'thumbnail-desc-noaa-' + thumbnailNum + ' ' + 'thumbnail-source-noaa-' + thumbnailNum + ' ' + 'thumbnail-contact-' + thumbnailNum,                 
              }),
              //the description element can contain HTML markup so use .text to un-format the string
              //Omaha has no descriptions in their publicly shared WMAs
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppDesc ellipsis',
                'id': 'thumbnail-desc-noaa-' + thumbnailNum,
                'title': truncate($(desc).text(), 1000),
                'html': $(desc).text(),
                'tabindex': '0',                
              }),
              $('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppSource ellipsis',
                id: 'thumbnail-source-noaa-' + thumbnailNum,
                'title': orgAlias,
                'html': orgAlias
              }),
							$('<p>', {
                'data-toggle': 'tooltip',
                'class': 'ee-bootstrap-tooltip mapAppContact ellipsis',
                id: 'thumbnail-contact-' + thumbnailNum,
                'title': orgContactEmail,
                'html': orgContactEmail
              })              
            )
          );

          // Append items one at a time to carousel
          $('.jcarousel ul').append($li);
        }
      });

      totThumbnails += numGoodResults;
      //console.log("Added " + String(numGoodResults) + " " + orgAlias + " maps to MyMaps Gallery");

      $('.thumb').randomize('li');
      jcarousel.jcarousel('reload');
      $('.jcarousel').jcarousel('scroll', 0);

      $(".ellipsis").dotdotdot({
        watch: "window"
      });
      $(".ellipsis").trigger("update.dot");

      updateTotalNumberOfMapsShowing();

      addMapThumbnailClickListeners();

      // Need to wait until all sources loaded before turning on visible thumbnails due to randomization.
      turnOnVisibleThumbs();
    }



    function addMapThumbnailClickListeners() {
      //remove any previous click listeners
      /*
      //Disable iframe functionality for Phase I Release due to mixed resources (HTTP/HTTPS) issues without proxy
      $(".thumbhyperlink").off("click");
      $(".thumbhyperlink").on("click", function(e) {
        e.preventDefault();
        var WMAorgalias = $(this).data('accessinfo');
        var contactEmail = $(this).data('contactemail');

        //workaround since dialog only accepts pixel size and not percentages for h/w
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.8;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.8;

        //mapiFrame holds the div for mapDialog
        var iframe = $('<span class="ui-helper-hidden-accessible"><input type="text"/></span><iframe class="WMAiframe" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
        var iframeFooter = $("<div id='mapiFrameFooter' class='mapiFrameFooter'>Map Source: " + WMAorgalias + " - <a href='mailto:" + contactEmail + "'>Contact Map Owner</a> </div>");
        var dialog = $("<div id='mapiFrame' class='mapiFrame'></div>").append(iframe).append(iframeFooter).appendTo("body").dialog({
          autoOpen: false,
          modal: true,
          resizable: false,
          width: dWidth,
          height: dHeight,
          dialogClass: 'mapDialog',
          close: function() {
            iframe.attr("src", "");
          },
          //workaround for using jQ UI and Bootstrap - close button won't show up in top right of dialog
          open: function() {
            var closeBtn = $('.ui-dialog-titlebar-close');
            //closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
          }
        });

        var src = $(this).attr("href");
        var title = $(this).attr("title");
        iframe.attr({
          width: '100%',
          height: '100%',
          src: src
        });

        dialog.dialog("option", "title", title).dialog("open");

      });
      */
      jcarousel.jcarousel('reload');

    }

    function updateTotalNumberOfMapsShowing() {
      var numItemsVisible = $('.thumb > li:visible').length;
      $("#numThumbnails").html(numItemsVisible.toString() + ' Maps  - ' + galleryLink);
    }

    //mix content from different sources in the MyMaps Gallery
    $.fn.randomize = function(a) {
      (a ? this.find(a) : this).parent().each(function() {
        $(this).children(a).sort(function() {
          return Math.random() - 0.5;
        }).detach().appendTo(this);
      });
      return this;
    };


    //Fisher-Yates shuffle just to randomize thumbnail order,
    //Makes it less boring on page reload until we implement tag filtering, recommendation engine, etc.
    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }



    function truncate(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }
      var truncated = text.substr(0, maxLength);
      var spaceIndex = truncated.lastIndexOf(' ');
      if (spaceIndex === -1) {
        return truncated + '...';
      }
      return truncated.substring(0, spaceIndex) + '...';
    }



    //better beyboard accessibility, allow keyboard left and right arrows to navigate gallery
    $(document).on('keyup', function(e) {
      var key = e.which || e.keyChar || e.keyCode;
      if (key == 37) {
        $('.jcarousel').jcarousel('scroll', '-=1');
      } else if (key == 39) {
        $('.jcarousel').jcarousel('scroll', '+=1');
      }
    });


  });
})(jQuery);