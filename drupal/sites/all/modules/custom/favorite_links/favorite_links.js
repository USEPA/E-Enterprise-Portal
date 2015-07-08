(function ($) {

$(document).ready(function(){
	
	///SCRIPT FOR FAVORITE  LINKS BOX
	//collect urls already favored
	var favorite_urls;
	
	function load_links(index) {
		$('#load_more').hide();
		$.ajax({
			url:'/load_links/' + index,
			method: 'POST',
			success: function(data) {
				var data = $.parseJSON(data);
				if (data.url_data != 'false') {
					favorite_urls = data.urls;
					processPageAnchors();
				}
			}
		});	
	}

	$('#edit-favorite-links').click(function() {
		$('#field-profile-favourites-values').show();
		$('.view-favorite-sites .views-table').hide();
		$(this).closest('.edit-actions-submit').show();
	});
	
	
	
	
	///////Script for Attached button functionality to links
	
	
	function createFavoriteButton(id, text_title) {
		if ($.inArray(id, favorite_urls) === -1) {
	 		var favorite_button = "<div class='button_input_holder' style='display:none'><button id='" + id + "|" + text_title + "' class='btn  btn-success add_link favorite_hover'>Add</button>"
					 + "<input type='text' placeholder='Optional title...'/></div>";	
		}
		else {
			var favorite_button = "<div class='button_input_holder' style='display:none'><button id='" + id + "|" + text_title + "' class='btn btn-danger remove_link favorite_hover'>Remove</button>"
			 + "<input type='text' placeholder='Optional title...'/></div>";	
		}
	 return favorite_button;
	} 
	
	function processPageAnchors() {
		// process anchor tags
		$('#main-content a:not(.favorites-ignore)').each(function () {
		if ($(this).text().length > 0 && $(this).attr('href') != '#') {
			var url = $(this).attr('href');
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
	            	}
				});
			}
		});
		// process img links
		$('#main-content img').each(function () {
		if ($(this).attr('href') != '#' && $(this).attr('href')!= '') {
			var url = $(this).attr('href');
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
		load_links();
		$(document.body).on('click', '.add_link', function(){
			var string_array = $(this).attr('id').split('|');
			var url = string_array[0];
			var custom_label = $(this).next('input').val();
			var label = string_array[1];
			if (custom_label != '') {
				label = custom_label;
			}
			processFavoriteLink($(this), 'add', url, label);
		});
		
		$(document.body).on('click', '.remove_link', function() {
			var string_array = $(this).attr('id').split('|');
			var url = string_array[0];
			var label = string_array[1];
			processFavoriteLink($(this), 'remove', url, label );
		});
	}
	// function removeRow(url) {
	// 	$.ajax({
	// 		url: '/user_add_favorite_link/' + url + '/remove'
	// 		});
	// };
	
	function processFavoriteLink(button, action, url, label) {
		url = encodeURIComponent(url);
		$.ajax({
			url: '/process_favorite_link',
			type: 'POST',
			data: {url: url, action: action, title: label},
			beforeSend: function() {
				button.removeClass("btn-success").removeClass("btn-danger");
				button.addClass("btn-default");
				button.text("Loading");
			},
			success: function(data) {
				if (data == 'success') {
					button.unbind("click");
					if (action == 'add') {
						button.removeClass('add_link').removeClass('btn-default').removeClass('btn-success');
						button.text('Remove');
						button.addClass('remove_link btn-danger');
						button.click(function (){
							var url = $(this).attr('id');
							var label = $(this).text();
							processFavoriteLink($(this), 'remove', url, label )
						});
					}
					else{
						button.removeClass('remove_link').removeClass('btn-default').removeClass('btn-danger');
						button.text('Add');
						button.addClass('add_link btn-success');
						button.click(function () {
							var url = $(this).attr('id');
							var label = $(this).text();
							processFavoriteLink($(this), 'add', url, label );
						});
					}
				}
			reloadView();
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
		$('#favorite_links-ajax-wrapper').html('<h4>Loading...</h4>');

		// $.ajax({
		// 	url: 'favorite_sites-ajax/ajax',
		// 	type: 'POST',
		// 	beforeSend: function() {
		// 		$('#favorite_links-ajax-wrapper').html('<h4>Loading...</h4>');
		// 	},
		// 	success: function(data){
		// 		// console.log(data);
		// 		// if (data != 'reload') {
		// 		// 	$('#favorite_links-ajax-wrapper').html(data);
		// 		// };
		// 	}
		// });
	}
	

	

})(jQuery);