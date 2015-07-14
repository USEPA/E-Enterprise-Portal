(function ($) {

$(document).ready(function(){
	
	///SCRIPT FOR FAVORITE  LINKS BOX
	//collect urls already favored
	var favorite_urls;
	var favorite_url_mapping;
	var id_label_mapping;
	function load_links(process_page_anchors) {
	
		$('#load_more').hide();
		$.ajax({
			url:'/load_links',
			method: 'POST',
			async: process_page_anchors,
			success: function(data) {
				var data = $.parseJSON(data);
				if (data.url_data != 'false') {
					favorite_urls = data.urls;
					favorite_url_mapping = data.url_mapping;
					console.log(data)
					id_label_mapping = data.label_mapping;
					if (process_page_anchors) {
						processPageAnchors();
					}
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
			 	"<div class='button_input_holder' style='display:none'><span id='" + id + "|favorite_link' " +
				 "class=' remove_link favorite_hover old_link glyphicon glyphicon-heart filled' aria-hidden='true'></span></div>";
		}
		else {
			id = url;
			favorite_button = "<div class='button_input_holder' style='display:none'><span id='" + id+ "|" + text_title + "'" +
				"class='add_link favorite_hover new_link glyphicon glyphicon-plus empty' aria-hidden='true'></span></div>";	
		}
	 return favorite_button;
	} 
	
	function processPageAnchors() {
		// process anchor tags
		$('#main-content a:not(.favorites-ignore)').each(function () {
		if ($(this).text().length > 0 && $(this).attr('href') != '#' && $(this).attr('href') != '/') {
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
			}
		});

		// process img links
		$('#main-content img').each(function () {
		if ($(this).attr('href') != '#' && $(this).attr('href')!= '') {
			var url = $(this).attr('href');
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
		});
	}

	
	
	
	// $('.favorite_hover').mouseover(function() {
	// 	$(this).show();	
	// });
	// $('.favorite_hover:not(.btn-default)').mouseout(function(	// $('.favorite_hover:not(.btn-dfault)').mouseout(function() {
		// 	$(this).hide();	
			// });
var path = window.location.pathname;
	var page = path.split('/')[1];
	if (page == 'workbench') {
		load_links(true);
		
		$(document.body).on('click', '.old_link', function() {
			var string_array = $(this).attr('id').split('|');
			var id = string_array[0];
			var action;
			if ($(this).hasClass('add_link')) {
				action = 'add';
			} 
			else {
				action = 'remove';
			}
			processFavoriteLink($(this), action, id, '');
			if ($(this).hasClass('.in-widget')) {
				load_links(true);
			}
			// processPageAnchors();
		});
		
		$(document.body).on('click', '.new_link', function(){
			var string_array = $(this).attr('id').split('|');
			var url = string_array[0];
			var label = string_array[1];
			var action;
			if ($(this).hasClass('add_link')) {
				action = 'add';
			}
			else {
				action = 'remove';
			}
			processFavoriteLink($(this), action, url, label);
				if ($(this).hasClass('.in-widget')) {
				load_links(true);
			}
			// processPageAnchors();
		});
		
	
	}
	// function removeRow(url) {
	// 	$.ajax({
	// 		url: '/user_add_favorite_link/' + url + '/remove'
	// 		});
	// };
	
	function processFavoriteLink(button, action, unparsed_url, label) {
		var id;
		var old_link = false;
		var url;
		if ($.isNumeric(unparsed_url)) {
			id = unparsed_url;
			old_link = true;
			url='id';
		}
		else {
			url = encodeURIComponent(unparsed_url);
		} 
		$.ajax({
			url: '/process_favorite_link',
			type: 'POST',
			data: {url: url, action: action, title: label, id: id},
			async: false,
			beforeSend: function() {
				if (!old_link) {
					// button.removeClass("btn-success").removeClass("btn-danger");
					// button.addClass("btn-default");
					// button.text("Loading");
				}
			},
			success: function(data) {

					button.unbind("click");
					if (action == 'add') {
						reloadView();
						load_links(false);
						button.removeClass('add_link').removeClass('new_link').removeClass('old_link').removeClass('filled').removeClass('empty');
						button.removeClass('glyphicon-plus');
						button.addClass('remove_link old_link glyphicon-heart filled');
						button.attr('id', favorite_url_mapping[unparsed_url] + '|favorite_link');
					}
					else{
						if (button.hasClass('in-widget')) {
							unparsed_url = $(button).closest('tr').find('a').attr('href');
							$(button).closest('tr').remove();
						}
						else {
							var widget_button = $('*[id="' + id + '|favorite_link"].in-widget')
							unparsed_url = $(widget_button).closest('tr').find('a').attr('href');
						}

						button = $('*[id="' + id + '|favorite_link"]');
						label = id_label_mapping[id];
						reloadView();
						button.attr('id', unparsed_url + '|' + label);
						button.removeClass('remove_link').removeClass('new_link').removeClass('old_link').removeClass('filled').removeClass('empty');
						button.removeClass('glyphicon-heart');
						button.addClass('add_link new_link glyphicon-plus empty ');

					}

			},
			failure: function() {
				alert('something went wrong');
			}
		});
	}
	///////////////////////////////////////////
	});
	
	function reloadView() {
		$('#reload_favorite_links').trigger('click');
		// $('#favorite_links-ajax-wrapper').html('<h4>Loading...</h4>');
	}
	

	

})(jQuery);