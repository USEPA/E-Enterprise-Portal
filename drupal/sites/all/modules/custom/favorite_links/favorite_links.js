(function ($) {

///SCRIPT FOR FAVORITE  LINKS BOX
//collect urls already favored
var favorite_urls_widget = [];
var order_mapping = {};
var url_mapping = {};
var load_index = 0;
var load_threshold = 5;

console.log('called');

function load_links(index) {
	$('#load_more').hide();
	$.ajax({
		url:'/load_links/' + index,
		method: 'POST',
		beforeSend: function() {
			$('#loading_list').show();
		},
		success: function(data) {
			var loadedList = $.parseJSON(data);
			$('#loading_list').hide();

			$.each(loadedList.url_data, function (key, value) {
				favorite_urls_widget.push(key);
				url_mapping[key] = {order_weight: value.order_weight, date_updated: value.date_updated};
			});

			if(loadedList.loadNextElem){
				$('#load_more').show();
			}
			else {
				$('#load_more').hide();
			}
			//load_index = load_index + loadedList.amountLoaded;
			buildLinks(0);
		}
	});	
}
// initial load links
load_links(load_index);


$('#load_more').click(function() {
	buildLinks(load_index);
});




// sort favorite urls by date and order
function sortUrls() {
	favorite_urls_widget = favorite_urls_widget.sort(function(a, b) {
	return  (url_mapping[a]['date_updated'] == url_mapping[b]['date_updated']) ? 0 : 
		(new Date(url_mapping[a]['date_updated']) < new Date(url_mapping[b]['date_updated'])) ? 1 : -1;
	});

favorite_urls_widget = favorite_urls_widget.sort(function(a, b) {
	return  (url_mapping[a]['order_weight'] == url_mapping[b]['order_weight']) ? 0 : 
		(url_mapping[a]['order_weight'] < url_mapping[b]['order_weight']) ? 1 : -1;
	});
}

//buildLinks();
// Build links in widget
function buildLinks(startIndex) {
	sortUrls();
	$('#load_links').empty();
	var first = true;
	var last = false;
	var row;

	var local_threshold = startIndex + load_threshold
	$.each(favorite_urls_widget, function(index, url) {
		if (first) {
			row = "<table class='table'>";
		}
		if (index == local_threshold) {
			last = true;
			load_index = local_threshold;
			if (index < favorite_urls_widget.length) {
				$('#load_more').show();
			}
			return false;
		}
		else if (index == favorite_urls_widget.length - 1) {
			$('#load_more').hide();
		}
		row += '<tr id="' + url + '"><td><a class="favorites_block_link" href="' + url + '">'+
					 url + '</a></td><td>' + url_mapping[url].date_updated + '</td>';
//		if (!first) {
//	    	row += '<td><button class="btn btn-sm btn-primary move_down">Up</button></td>';
//		}
//		else if (!last) {
//			row += '<td><button class="btn btn-sm btn-primary move_up">Down</button></td>'; 
//		}
//		else {
//			row += "<td></td>";
//		}
		row += "<td><button class='btn-danger row_remove' id='" + url + "'>Remove</button><td></tr>";
		first = false;
	});
	row += "</table>";
	$('#load_links').append(row);
	$('.row_remove').click(function() {
		var url = $(this).attr('id');
		removeRow(url);
		$(this).closest('tr').remove();
	})
}



/////////


///////Script for Attached button functionality to links
var favorite_urls = [];



$('.user_url').each(function() {
	var data_array = $(this).val().split('|');
	var url = data_array[0];
	var date_updated = data_array[1];
	var order_weight = data_array[2];
	favorite_urls.push(url);
});
function createFavoriteButton(id) {
	if ($.inArray(id, favorite_urls) === -1) {
 		var favorite_button = "<button id='" + id + "' class='btn  btn-success add_link favorite_hover' style='display:none'>Add</button>";	
	}
	else {
		var favorite_button = "<button id='" + id + "' class='btn btn-danger remove_link favorite_hover' style='display:none'>Remove</button>";	
	}
 return favorite_button;
} 

$('#content a').each(function () {
	if ($(this).text().length > 0) {
		var url = $(this).attr('href');
		var favorite_button = createFavoriteButton(url);
		$(this).after(favorite_button);

		$(this).mouseover(function() {
			$(this).next('button').show();	
		});
	$(this).mouseout(function() {
			$(this).next('button').hide();	
		});
	}
});

$('.favorite_hover').mouseover(function() {
	$(this).show();	
});
$('.favorite_hover:not(.btn-default)').mouseout(function() {
	$(this).hide();	
});

$('.add_link').click(function() {
	var url = $(this).attr('id');
	var label = $(this).text();
	processFavoriteLink($(this), 'add', url, label );
});

$('.remove_link').click(function() {
	var url = $(this).attr('id');
	var label = $(this).text();
	processFavoriteLink($(this), 'remove', url, label );
});

function removeRow(url) {
	$.ajax({
		url: '/user_add_favorite_link/' + url + '/remove'
		});
};

function processFavoriteLink(button, action, url, label) {
	$.ajax({
		url: '/user_add_favorite_link/' + url + '/' + action,
		type: 'POST',
		beforeSend: function() {
			button.removeClass("btn-success").removeClass("btn-danger");
			button.addClass("btn-default");
			button.text("Loading");
		},
		success: function(data) {
			button.unbind("click");
			if (action == 'add') {
				button.hide();
				button.removeClass('add_link').removeClass('btn-default').removeClass('btn-success');
				button.text('Remove');
				button.addClass('remove_link btn-danger');
				button.click(function (){
					var url = $(this).attr('id');
					var label = $(this).text();
					processFavoriteLink($(this), 'remove', url, label )
				})
			}
			else{
				button.hide();
				button.removeClass('remove_link').removeClass('btn-default').removeClass('btn-danger');
				button.text('Add');
				button.addClass('add_link btn-success');
				button.click(function () {
					var url = $(this).attr('id');
					var label = $(this).text();
					processFavoriteLink($(this), 'add', url, label );
				});
			}
		},
		failure: function() {
			alert('something went wrong');
		}
	})
}
///////////////////////////////////////////


})(jQuery);