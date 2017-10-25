(function($) {

    Drupal.behaviors.agency_map_list = {
        attach: function(context, settings) {
            var $field_messages = $('.form-field-type-url .fieldset-description');

            $('#url_preview', context).click(function () {
                var url = $('#edit-field-ee-agency-map-url-und-0-value').val();
                var original_text = $field_messages.text();
                $.ajax({
                    url: Drupal.settings.basePath + 'ajax_map_form_validate',
                    data: {url: url},
                    method: 'POST',
                    beforeSend: function() {
                        $field_messages.text('Loading...');
                    },
                    success: function(response) {
                        var response = $.parseJSON(response);
                        if (response.error) {
                            $field_messages.html('<span class="field-suffix error">' + response.message + '</span>');
                            console.log(response.console_message);
                        }
                        else {
                            $field_messages.text(original_text);
                            query_AGOL(response.url, response.orgid);
                        }
                    }

                });
            });
        }
    };

    //query AGOL/GPO REST API for publicly shared web mapping applications
    //recycled from mymaps.js
    function query_AGOL(url, orgid) {
        $.ajax({
            type: 'GET',
            url: url + '/sharing/rest/search',
            data: {
                q: 'orgid:' + orgid + ' -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" (type:"Web Mapping Application" OR type:"Mobile Application")',
                f: 'json',
                num: '100'
            },
            success: function (data, status, xhr) {
                var resultJson = JSON.parse(data);
                var results = setupMyMapsGalleryWithThumbs(resultJson, url);
                // Print results in jQuery Dialog modal (see css for sizing)
                // Set up two columns, the first for qualified maps, the second for unqualified
                var dialog = $("<h2>").append($("<table/>")
                        .append($("<tr/>")
                            .append($("<td/>")
                                .append("<h2>Qualified Maps (" + results[0].childElementCount + ")</h2>").attr('style', 'width: 50%')
                                .append("<div>" + results[0].innerHTML + "</div>"))
                            .append($("<td/>")
                                .append("<h2>Unqualified Maps (" + results[1].childElementCount + ")</h2>").attr('style', 'width: 50%')
                                .append("<div>" + results[1].innerHTML + "</div>"))).attr('style', 'width: 100%'))
                        .appendTo("body").dialog({
                    autoOpen: true,
                    modal: true,
										dialogClass: 'agency-map-list',                                
                    resizable: false,
                    width: "90%",
                    height: "90%",
                    position: {
                            my: "center",
                            at: "center",
                            of: window
                    },
                    close: function () {
                        $(this).dialog("destroy").remove();
                    }
                });
            }
        }).fail(function (xhr, status) {
            if (status == "error") {
                console.log("Error in AGOL API request.");
                return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
            }
        });
    }

    //create the MyMaps thumbnail gallery from the AGOL API query results
    function setupMyMapsGalleryWithThumbs(data, url) {
        var numGoodResults = 0;
        var thumbnailNum = 0;
        var $li_qual = $('<li>');
        var $li_unqual = $('<li>');
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

            // Qualified results
            if (this.thumbnail != 'thumbnail/ago_downloaded.png' && this.thumbnail !== null && this.description !== null && this.owner != 'jquacken_EPA' && hyperlinkValid === true) {
                var itemTags = this.tags.toString();
                thumbnailNum += 1;
                numGoodResults += 1;
                var thumbnailURL = url + "/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
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

                $li_qual.append(
                    $('<div>').append(
                        $('<a>', {
                            'class': 'thumbhyperlink',
                            'data-tags': itemTags,
                            'href': hyperlinkURL,
                            'title': this.title,
                            'target': '_blank'
                        }).append(
                            $('<img>', {
                                'class': 'thumbnailImg',
                                'src': thumbnailURL, // Use temporary source as placeholder so all thumbs are not loaded at once.
                                'alt': this.title,
                                'title': this.title,
                            })
                        ),
                        $('<p>', {
                            'data-toggle': 'tooltip',
                            'style': 'font-size:10pt',
                            'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                            'title': this.title,
                            'html': this.title
                        })
                    )
                );
            } else {
                // Unqualified results
                var itemTags = this.tags.toString();
                thumbnailNum += 1;
                numGoodResults += 1;
                var thumbnailURL = url + "/sharing/rest/content/items/" + this.id + "/info/" + this.thumbnail;
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

                $li_unqual.append(
                    $('<div>').append(
                        $('<a>', {
                            'class': 'thumbhyperlink',
                            'data-tags': itemTags,
                            'href': hyperlinkURL,
                            'title': this.title,
                            'target': '_blank'
                        }).append(
                            $('<img>', {
                                'class': 'thumbnailImg',
                                'src': thumbnailURL, // Use temporary source as placeholder so all thumbs are not loaded at once.
                                'alt': this.title,
                                'title': this.title,
                            })
                        ),
                        $('<p>', {
                            'data-toggle': 'tooltip',
                            'style': 'font-size:10pt',
                            'class': 'ee-bootstrap-tooltip mapAppTitle ellipsis',
                            'title': this.title,
                            'html': this.title
                        })
                    )
                );

            }
        });
        return [$li_qual[0], $li_unqual[0]];
    }

}(jQuery));
