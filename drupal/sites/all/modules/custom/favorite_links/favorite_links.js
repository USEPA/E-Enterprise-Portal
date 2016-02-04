(function ($) {

    //var LinkHeart = function (id) {
    //    this.id = id;
    //    this.unfavor = function() {
    //        // function to unfavor button
    //    }
    //    this.favor = function() {
    //        //function to favor button
    //    }
    //    this.favorite_html =       "<div class='button_input_holder' style='display:none'><span title='Remove Favorite' id='" + this.id + "__favorite_link' " +
    //        "class=' remove_link favorite_hover old_link glyphicon glyphicon-heart filled' aria-hidden='true'></span></div>";
    //    this.non_favorite_html = '<div class="button_input_holder" style="display:none"><span title="Add Favorite" id="' + this.id + '-' + text_title + '"' +
    //    "class='add_link favorite_hover new_link glyphicon glyphicon-heart empty' aria-hidden='true'></span></div>";
    //}
    //
    //var LinkGroups = function() {
    //
    //    this.link_hearts = [];
    //    this.add_link_heart = function(link_heart) {
    //        this.link_hearts[]''
    //    }
    //
    //
    //    this.favor = function(id) {
    //
    //    }
    //
    //}


    $(document).ready(function () {

        // Only run on workbench
        var path = window.location.pathname;
        var page = path.split('/')[1];
        var focus_link_id;
        
        if (page == 'workbench') {

            // Only run if favorite links module is active

            var favorite_links_panel = $('.pane-views-favorite-sites-block');
            if (favorite_links_panel.length > 0) {
                ///SCRIPT FOR FAVORITE  LINKS BOX
                //collect urls already favored
                var favorite_urls;
                var favorite_url_mapping;
                var id_label_mapping;

                function load_links(process_page_anchors) {

                    $('#load_more').hide();
                    $.ajax({
                        url: '/load_links',
                        method: 'POST',
                        async: process_page_anchors,
                        success: function (data) {
                            var data = $.parseJSON(data);
                            if (data.url_data != 'false') {
                                //console.log(data);
                                favorite_urls = data.urls;
                                favorite_url_mapping = data.url_mapping;
                                id_label_mapping = data.label_mapping;
                            }
                        }
                    });
                }
								
								///////Script for Attached button functionality to links
								function createFavoriteButton(url, text_title) {
                    var id;
                    var favorite_button;
                    if ($.inArray(url, favorite_urls) >= 0) {
                        id = favorite_url_mapping[url];
                        favorite_button =
                            "<div class='button_input_holder' style='display:none'><span title='Remove Favorite' id='" + id + "__favorite_link' " +
                            " class=' remove_link favorite_hover old_link glyphicon glyphicon-heart filled' aria-hidden='true'></span><span class='sr-only'>Favorited. To remove favorite, press Ctrl + D</span></div>";
                    }
                    else {
                        id = url;
                        favorite_button = '<div class="button_input_holder" style="display:none"><span title="Add Favorite" id="' + id + '__' + text_title + '"' +
                        " class='add_link favorite_hover new_link glyphicon glyphicon-heart empty' aria-hidden='true'></span><span class='sr-only'>To favorite, press Ctrl + D</span></div>";
                    }
                    return favorite_button;
                }

                function processPageAnchors() {
                    var ignore_panels = ['.pane-views-my-air-quality-chart-block-1', '.pane-views-cdx-facility-management-block', '.pane-views-progress-tracker-block-1', '.pane-views-to-do-block-1'];
                    // process img links
                    $('.panel-pane:not(' + ignore_panels.join(',') + ') img').each(function () {

                        if ($(this).closest('a').attr('href') != '#' && $(this).closest('a').attr('href') != '') {
                            if (!$(this).closest('a').hasClass('processed-favorite')) {
                                $(this).closest('a').addClass('processed-favorite');
                                var url = $(this).closest('a').attr('href');
                                var encodedURI = encodeURIComponent(url);
                                var title = $(this).attr('alt');
                                var favorite_button = createFavoriteButton(url, title);
                                $(this).after(favorite_button);
                                $(this).qtip({ // Grab some elements to apply the tooltip to
                                    content: {
                                        text: $(this).next('div')
                                    },
                                    hide: {
                                        fixed: true,
                                        delay: 300
                                    },
                                    position: {
                                        my: 'right bottom',  // Position my top left...
                                        at: 'right bottom', // at the bottom right of...
                                        target: $(this) // my target
                                    },
                                    style: {
                                        classes: 'transparent-qtip',
                                        width: 4
                                    }
                                });
                            }
                        }
                    });
                    // process anchor tags
                    $('.panel-pane:not(' + ignore_panels.join(',') + ') a:not(.favorites-ignore, .menu-link, .skip-link, .paginate_button,[href^=mailto], [href^=javascript])').each(function () {
                        if ($(this).text().length > 0 && $(this).attr('href') != '#' && $(this).attr('href') != '/') {
                            if (!$(this).hasClass('processed-favorite')) {
                                var url = $(this).attr('href');
                                var encodedURI = encodeURIComponent(url);
                                var title = $(this).text();
                                var favorite_button = createFavoriteButton(url, title);
                                $(this).after(favorite_button);
                                $(this).qtip({ // Grab some elements to apply the tooltip to
                                    content: {
                                        text: $(this).next('div')
                                    },
                                    hide: {
                                        fixed: true,
                                        delay: 300
                                    },
                                    position: {
                                        my: 'left center',  // Position my top left...
                                        at: 'right center', // at the bottom right of...
                                        target: $(this) // my target
                                    },
                                    style: {
                                        classes: 'transparent-qtip',
                                        width: 4
                                    }
                                });
                                $(this).addClass('processed-favorite');
                            }
                        }
                    });


                }


                load_links(true);

                $(document.body).on('click', '.old_link', function () {
                    var string_array = $(this).attr('id').split('__');
                    var id = string_array[0];
                    var action;
                    var $this = $(this);
                    if ($this.hasClass('add_link')) {
                        action = 'add';
                    }
                    else {
                        action = 'remove';
                    }
                    processFavoriteLink($this, action, id, '');
                    if ($this.hasClass('.in-widget')) {
                        load_links(true);
                    }
                    // processPageAnchors();
                });

                $(document.body).on('click', '.new_link', function () {
                    var string_array = $(this).attr('id').split('__');
                    var url = string_array[0];
                    var label = string_array[1];
                    var action;
                    var $this = $(this);
                    if ($this.hasClass('add_link')) {
                        action = 'add';
                    }
                    else {
                        action = 'remove';
                    }
                    processFavoriteLink($this, action, url, label);
                    if ($this.hasClass('.in-widget')) {
                        load_links(true);
                    }
                    // processPageAnchors();
                });


                $(document).ajaxSuccess(function (event, xhr, settings) {
	                if (settings.url == 'favorite_sites-ajax/ajax') {
		                refocusLink(focus_link_id);
	  							}
               		else {
                    processPageAnchors();
                  }
                });

                $(document).on("ee:new_links_to_process", function() {
                    processPageAnchors();
                });

								function refocusLink(focus_link_id) {
									if (focus_link_id != "") {
										$('#favorite_links-ajax-wrapper').find(focus_link_id).focus();	
									}
									else {
										$('#favorite_links-ajax-wrapper').find('.favorites-ignore').focus();
									}
								}
								
                function processFavoriteLink(button, action, unparsed_url, label) {
                    var id;
                    var old_link = false;
                    var url;
                    if ($.isNumeric(unparsed_url)) {
                        id = unparsed_url;
                        old_link = true;
                        url = 'id';
                    }
                    else {
                        url = encodeURIComponent(unparsed_url);
                    }
                    $.ajax({
                        url: '/process_favorite_link',
                        type: 'POST',
                        data: {url: url, action: action, title: label, id: id},
                        async: false,
                        beforeSend: function () {
                            if (!old_link) {
                                // button.removeClass("btn-success").removeClass("btn-danger");
                                // button.addClass("btn-default");
                                // button.text("Loading");
                            }
                        },
                        success: function (data) {

                            button.unbind("click");
                            if (action == 'add') {
                                reloadView();
                                load_links(false);
                                button.removeClass('add_link').removeClass('new_link').removeClass('old_link').removeClass('filled');
                                button.removeClass('empty');
                                button.addClass('remove_link old_link filled');
                                button.attr('id', favorite_url_mapping[unparsed_url] + '__favorite_link');
                            }
                            else {
                                if (button.hasClass('in-widget')) {
                                    unparsed_url = $(button).closest('tr').find('a').attr('href');
                                    var row = $(button).closest('tr');
                                    var row_num = row[0].rowIndex - 1;
                                    //Count # rows in table, subtract for first row that's a holder
																		var row_total = $('#favorite_links-ajax-wrapper').find('table').find('tbody').children('tr').length - 1;
																		
																		//If current row isn't last row, focus next row favorite
                                    if (row_num < row_total) {
                                    	var next_link = row.next().find('a');
																			focus_link_id = "#" + next_link[0].id;
                                    }
                                    //If no next rows, focus previous row favorite
                                    else if (row_num == row_total && row_total != 1) {
                                   		var previous_link = row.prev().find('a');
																	 		focus_link_id = "#" + previous_link[0].id;
																		}
																		//If only row left, focus Edit Profile link
																		else {
																	 		focus_link_id = "";
																		}
																		$(button).closest('tr').remove();                           
                                }
                                else {
                                    var widget_button = $('*[id="' + id + '__favorite_link"].in-widget')
                                    unparsed_url = $(widget_button).closest('tr').find('a').attr('href');
                                }

                                button = $('*[id="' + id + '__favorite_link"]');
                                label = id_label_mapping[id];
                                reloadView();
                                button.attr('id', unparsed_url + '-' + label);
                                button.removeClass('remove_link').removeClass('new_link').removeClass('old_link').removeClass('filled').removeClass('empty');
                                button.addClass('add_link new_link empty ');
                                
                            }
														refocusLink(focus_link_id);
                        },
                        failure: function () {
                            alert('something went wrong');
                        }
                    });
                }

                ///////////////////////////////////////////

                function reloadView() {
                    $('#reload_favorite_links').trigger('click');
                    // $('#favorite_links-ajax-wrapper').html('<h4>Loading...</h4>');
                }

            }
        }
        
                        // Show tooltip on <a> element, but only when
							  // focused and Shift key pressed.
							  var findLink;
							  var findQtip;
							  var hideQtip;
							  
							  function triggerQtip(findLink, hideQtip) {
							  	try {
							    	if (hideQtip == true) {
							    		$(findLink).trigger('mouseover');
							    		findQtip = '#' + $(findLink).attr('aria-describedby');
							    		return findQtip;
							      }
							      else {
							        $(findLink).trigger('mouseout');
							      }
							    }
							    catch(err) {
							    	//console.log("Error on triggerQtip: " + err);
							    }
							  }
							  
							  // If a link that's favorite-able is focused, watch for key presses
							  // Shift (16) triggers qTip
							  // Escape (27) or blur hide qTip
							  // Ctrl + D (68) toggles the favorite and shows the qTip
							  $("a").not(".menu-link", ".ctools-use-modal", ".skip-link", ".favorites-ignore", ".paginate_button", "[href^=mailto]", "[href^=javascript]").focus(function() {
							    $("a").not(".menu-link", ".ctools-use-modal", ".skip-link", ".favorites-ignore", ".paginate_button", "[href^=mailto]", "[href^=javascript]").keydown(function(event) {
							    	try {
							        if (event.which == 16) {
												if (event.which == 9) {
													event.stopImmediatePropagation();
							            // Ignore shift + tab (9)
							            return false;
							          } else {
								          var linkQtip = $(this).attr('data-hasqtip');
								          var imgQtip = $(this).find('img').attr('data-hasqtip');
							            if (linkQtip > 0 ) {
							            	event.stopImmediatePropagation();
								            findLink = $(this);
								            triggerQtip(findLink, true);
							            }	else if (imgQtip > 0) {
														event.stopImmediatePropagation();
														findLink = $(this).find('img');
								            triggerQtip(findLink, true);
													}
							            return false;
							          }
							        }
							        else if (event.which == 68 && event.ctrlKey) {
							          event.stopImmediatePropagation();
							          var linkQtip = $(this).attr('data-hasqtip');
						            if (linkQtip > 0 ) {
							            findLink = $(this);
						            }	else {
													findLink = $(this).find('img');
												}
												triggerQtip(findLink, true);
							          var qTipSpan = findQtip + ' .favorite_hover';
							          $(qTipSpan).trigger('click');
							          triggerQtip(findLink, true);
							          $(this).unbind("click");
							          return false;
							        } else {
							        }
							      } catch (e) {
							      }
							    }); //End keyup function
							  }); //End focus function
    });

})(jQuery);