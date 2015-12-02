(function ($) {
    $(function () {

        var mapsets = {
            'mapsets': [{
                'id': 'EPA',
                'alias': 'USEPA GeoPlatform Online',
                'contactemail': 'epageoplatform@epa.gov',
                'url': 'https://epa.maps.arcgis.com',
                'orgid': 'orgid:cJ9YHowT8TU7DUyn'
            }, {
                'id': 'MPCA',
                'alias': 'Minnesota Pollution Control Agency',
                'contactemail': 'webteam.pca@state.mn.us',
                'url': 'https://mpca.maps.arcgis.com',
                'orgid': 'orgid:7QMLozViUIV7KGFq'
            }, {
                'id': 'Omaha',
                'alias': 'City of Omaha, Nebraska',
                'contactemail': 'gis@douglascounty-ne.gov',
                'url': 'https://omaha.maps.arcgis.com',
                'orgid': 'orgid:tIBLyYZX96jUntYm'
            }, {
                'id': 'NOAA',
                'alias': 'NOAA',
                'contactemail': 'gis.community@noaa.gov',
                'url': 'https://noaa.maps.arcgis.com',
                'orgid': 'orgid:C8EMgrsFcRFL6LrL tags:"oceans"'
            }]
        };
        

        //Direct link to EPA maps
        var galleryLink = '<a href="https://epa.maps.arcgis.com/home/search.html?q=&t=content&focus=applications" target="_blank" class="favorites-ignore">  Browse EPA gallery...</a> | <a href="node/add/ee-map-set">Add a mapset</a>';
        var jcarousel = $('.jcarousel').jcarousel();
        //Opening UL only created in init of gallery    
        var $ul = $('<ul>', {'class': 'thumb'});
        jcarousel.html($ul);

        var totThumbnails = 0;
        //Counter for keeping track of agency mapset insertion-induced reloads
        var reloadCounter = 0;
        //Track the last reload to trigger the reloadend event
        var last_reload = -1;

        var totalNumOrgs = mapsets.mapsets.length;

        //Query all AGOL endpoints given from mapsets JSON
        query_AGOL(mapsets);


        /********************jcarousel event listeners***********************/
        jcarousel.on('jcarousel:reload jcarousel:create', function () {
            //Set max number of items displayed to be 5, with less
            //visible based on current browser width
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
        });

        jcarousel.on('jcarousel:reloadend', function () {
            //Event listener for carousel reloads
            if (last_reload != reloadCounter) {
                //Only contintue if reload was generated from a mapset insertion
                var carousel = $(this);
                //don't want to fire this every time on reload since the
                //order gets shuffled each time, only for the last org
                //that is loaded
                if (reloadCounter == totalNumOrgs) {
                    carousel.jcarousel('scroll', 0);
                    turnOnVisibleThumbs();
                }
                last_reload = reloadCounter;
            }
        });

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .click(function () {
                // If user clicks previous, make sure those thumbs are visible.
                turnOnVisibleThumbs();
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .click(function () {
                // If user clicks next, make sure those thumbs are visible.
                turnOnVisibleThumbs();
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.myMapFilterTerm').click(function () {
            //options from the DOM (id) are mapsAll, mapsAir, mapsWater, or mapsLand
            var filterType = $(this).attr('id');
            $('.myMapFilterTerm').parent('li').removeClass('active-mymaps-filter');
            $(this).parent('li').addClass('active-mymaps-filter');
            filterMyMapsGallery(filterType);
        });


        /*****************************functions******************************/
        function turnOnVisibleThumbs() {
            //Function to turn on thumbnail image sources for visible
            //jcarousel entries.

            //jcarousel's "visible" list doesn't actually include the
            //last visible item, so we need to build our own list
            //Find start of visible list
            start = $.inArray(jcarousel.jcarousel('visible')[0], $(".thumb").find("li").not(":hidden"));
            //Max number of visible items in our carousel is 5,
            //so set ending point to offset 6
            end = start + 6;
            //Slide the full list of entries to just those 5 we are
            //interested in (all possible visible & not filtered/hidden)
            $(".thumb").find("li").not(":hidden").slice(start, end).each(function () {
                // If the img source is not already turned on
                if (!$(this).find(".thumbnailImg").attr("src")) {
                    // Set image source from temporary source.
                    $(this).find(".thumbnailImg").attr("src", $(this).find(".thumbnailImg").attr("tsrc"));
                }
            });
        }

        function filterMyMapsGallery(filterType) {
            var listItems = $('.jcarousel ul li');
            listItems.each(function (li) {
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
                    }
                    break;
                case 'mapsWater':
                    if (itemTags.indexOf('water') == -1 && itemTags.indexOf('ocean') == -1) {
                        $(this).hide();
                    } 
                    break;
                case 'mapsLand':
                    if (itemTags.indexOf('land') == -1 && itemTags.indexOf('rcra') == -1) {
                        $(this).hide();
                    }
                    break;
                }
            });
            updateTotalNumberOfMapsShowing();
            jcarousel.jcarousel('reload');
            // Scroll to beginning of filtered list
            $('.jcarousel').jcarousel('scroll', 0);
            // Ensure thumbs are visible
            turnOnVisibleThumbs();
        }

        //query AGOL/GPO REST API for publicly shared web mapping applications
        function query_AGOL(mapsets) {
            $.each(mapsets.mapsets, function (index, mapset) {
                $.ajax({
                    type: 'GET',
                    url: mapset.url + '/sharing/rest/search',
                    async: true,
                    //later to implement tag search or similar for
                    //filtering based on dynamic criteria
                    data: {
                        q: mapset.orgid + ' -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" (type:"Web Mapping Application" OR type:"Mobile Application")',
                        f: 'json',
                        num: '100'
                    },
                    mapset: mapset,
                    success: function (data, status, xhr) {
                        var resultJson = JSON.parse(data);
                        setupMyMapsGalleryWithThumbs(resultJson, this.mapset);
                    }
                }).fail(function (xhr, status) {
                    if (status == "error") {
                        console.log("Error in " + mapset.id + " AGOL API request.");
                        return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
                    }
                });
            });
        }

        //create the MyMaps thumbnail gallery from the AGOL API query results
        function setupMyMapsGalleryWithThumbs(data, mapset) {
            var numGoodResults = 0;
            var thumbnailNum = 0;

            //generate each thumbnail and only load it if non-default thumbnail image and a good hyperlink
            $.each(data.results, function () {
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
                    var thumbnailURL = mapset.url + "/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
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
                                'data-accessinfo': mapset.alias,
                                'data-conactemail': mapset.contactemail,
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
                                    'aria-describedby': 'thumbnail-desc-' + mapset.id + '-' + thumbnailNum
                                })
                            ),
                            $('<p>', {
                                'data-toggle': 'tooltip',
                                'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                                'title': this.title,
                                'html': this.title
                            }),
                            //the description element can contain HTML markup so use .text to un-format the string
                            //Omaha has no descriptions in their publicly shared WMAs
                            $('<p>', {
                                'data-toggle': 'tooltip',
                                'class': 'ee-bootstrap-tooltip mapAppDesc ellipsis',
                                'id': 'thumbnail-desc-' + mapset.id + '-' + thumbnailNum,
                                'title': truncate($(desc).text(), 1000),
                                'html': $(desc).text()
                            }),
                            $('<p>', {
                                'data-toggle': 'tooltip',
                                'class': 'ee-bootstrap-tooltip mapAppSource ellipsis',
                                id: 'thumbnail-source-' + mapset.id + '-' + thumbnailNum,
                                'title': mapset.alias,
                                'html': mapset.alias
                            })
                        )
                    );

                    $('.jcarousel ul').append($li);
                }
            });

            totThumbnails += numGoodResults;
            //console.log("Added " + String(numGoodResults) + " " + orgAlias + " maps to MyMaps Gallery");

            $('.thumb').randomize('li');
            console.log("reload" + mapset.id)
            reloadCounter++;
            jcarousel.jcarousel('reload');

            $(".ellipsis").dotdotdot({
                watch: "window"
            });
            $(".ellipsis").trigger("update.dot");

            updateTotalNumberOfMapsShowing();
        }

        function updateTotalNumberOfMapsShowing() {
            var numItemsVisible = $('.thumb > li:visible').length;
            $("#numThumbnails").html(numItemsVisible.toString() + ' Maps  - ' + galleryLink);
        }

        //mix content from different sources in the MyMaps Gallery
        $.fn.randomize = function (a) {
            (a ? this.find(a) : this).parent().each(function () {
                $(this).children(a).sort(function () {
                    return Math.random() - 0.5;
                }).detach().appendTo(this);
            });
            return this;
        };

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
        $(document).on('keyup', function (e) {
            var key = e.which || e.keyChar || e.keyCode;
            if (key == 37) {
                $('.jcarousel').jcarousel('scroll', '-=1');
            } else if (key == 39) {
                $('.jcarousel').jcarousel('scroll', '+=1');
            }
        });
    });
})(jQuery);