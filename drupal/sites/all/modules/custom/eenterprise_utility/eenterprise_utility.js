(function ($) {



  $(document).ready(function(){
	
	function placeAddAnotherButton(ajax_content, table_id, parent_id) {
	 	var table = $(table_id);
		var input_button = $(parent_id).find('.field-add-more-submit');
		if (!ajax_content){
			table.find("tr:last").find('td:nth-child(2)').append(input_button);
		}
	};

	function sortZipCodesbyCity() {
		// Sort rows alphabetically
	    var table  = $('#zipcode_description .field-multiple-table');        // cache the target table DOM element
	    var rows   = table.find('tbody > tr'); // cache rows from target table body
	    rows.sort(function(a, b) {
	        var keyA = $('td:nth-child(2)',a).find('.field-suffix').text();
	        var keyB = $('td:nth-child(2)',b).find('.field-suffix').text();
			if (keyA != '' && keyB != '') {
	            return (keyA > keyB) ? 1 : 0;  // A bigger than B, sorting ascending
			}
		});
		    table.find('tbody').html(rows);
	}

	function processPrimaryFields() {
	    var table  = $('#zipcode_description .field-multiple-table');        // cache the target table DOM element
		var  checkboxes = table.find('input[type=checkbox]');
		var selection = table.find('input[type=checkbox]:checked');
		checkboxes.after('<div class="zip-code-primary-holder"><span class="glyphicon glyphicon-flag zip-code-primary-select" aria-hidden="true"></span></div>');
		var primary_indicator = selection.next('.zip-code-primary-holder').find('.zip-code-primary-select');
		primary_indicator.addClass('selected');
		$('body').on('click', '.zip-code-primary-select', function() {
			$('.zip-code-primary-select.selected').removeClass('selected');
			$('.zip-code-primary-select').closest('td').find('input[type=checkbox]:checked').prop('checked', false);
			var selected_icon = $(this);
			selected_icon.addClass('selected');
			selected_icon.closest('td').find('input[type=checkbox]').prop('checked', true);
		});
		$('body').on('click', '.zip-code-primary-select.selected', function() {
			var selected_icon = $(this);
			selected_icon.removeClass('selected');
			selected_icon.closest('td').find('input[type=checkbox]').prop('checked', false);
		});
	}
	
	
	
	var path = window.location.pathname;
	var page = path.split('/')[1];
	if (page == 'user') {
		$( document ).ajaxSuccess(function( event, xhr, settings ) {
				console.log(settings.url);
				var target_url = settings.url;
				// determine which table to place the Add Another buttom
				if (target_url == '/system/ajax' || target_url == '/multifield/field-remove-item/ajax') {
					var table_id = '';
					var parent_id = '';
					$('.field-multiple-table').each(function() {
						var table =  $(this);
						var add_button = table.find('tr:last').find('td:nth-child(2)').find('.field-add-more-submit');
						if (add_button.length == 0) {
							table_id = table.attr('id');
						}
					});
					if (inString(table_id, 'zip-code')) {
						processPrimaryFields();
						parent_id = '#zipcode_description';
					}
					else {
						parent_id = '#links_description';
					}
			
					if (table_id != '') {
						placeAddAnotherButton(false, '#' + table_id, parent_id);
				
					}
				}
		});
	
	
	
		Drupal.tableDrag.prototype.row.prototype.onSwap = function(swappedRow) {
			var table = $(swappedRow).closest('table');
			var table_id = '#' + table.attr('id');
			var parent_id = '';
			if (inString(table_id, 'zip-code')) {
				parent_id = '#zipcode_description';
			}
			else {
				parent_id = '#links_description';
				// table_id = '#field-profile-favourites-values';
			}
			placeAddAnotherButton(false, table_id, parent_id);
		};
	
  }
	
	
	function inString(str, substring) {
		if (str.indexOf(substring) >= 0) {
			return true;
		}
		else {
			return false;
		}
		
	}



		sortZipCodesbyCity();
		processPrimaryFields();
		placeAddAnotherButton(false, '#field-zip-code-values', '#zipcode_description');
		placeAddAnotherButton(false, '#field-profile-favourites-values', '#links_description');
		$('#zipcode_description').show();
	// AUTOCOMPLETE FUNCTIONALITY
	
	
		function generateParents(parents_array, last_parent_id, vid, initial) {
			var parents_array = parents_array;
			if (parents_array.length > 0) {
				var current_parent = parents_array[parents_array.length - 1];
				parents_array.splice(-1, 1);
				var vocab_list = '<ul><li id="parent-holder-' + current_parent[0] + '"></li><ul>';
				if (vid > 0 ) { 
					$('#vocab_holder-' + vid).append(vocab_list);
					$('#vocab_holder-' + vid).show(); 
					vid = -1;
				}
				if ($('#parent-holder-' + last_parent_id).length > 0) {
					$('#parent-holder-' + last_parent_id).append(vocab_list);
				}
				$('#parent-holder-' + current_parent[0]).append($('label[for="' + 'edit-field-interests2-und-' + current_parent[0] + '"]'));
				$('label[for="' + 'edit-field-interests2-und-' + current_parent[0] + '"]').show();

				generateParents(parents_array, current_parent[0], vid);
			}
		}
		
		
		
	    var availableTags = [];
		var allInitialInterests = ['Conservation', 'Energy Effienciency', 'Fuel Economy', 'Pollution Prevention', 
			'Renewable Energy', 'Sustainable Development', 'Waste Reduction','Food Safety', 'Health Effects', 'Health Risks', 
			'Special Populations', 'Soils & Land', 'Air', 'Species', 'Water', 'Compliance & Enforcement', 'Permitting Programs', 'Regulated Facilities',
			'Regulatory Development', 'Substances Management'];
		var otherInterests = ['Coop & Assistance', 'EPA General', 'EPA Operational', 'Emergencies & Cleanup', 'Environmental Laws, Regulations, & Treaties',
						'Research, Analysis, & Technologies', 'Substances'];
	
	

	function showValue(checkbox_id, initial) {
		//Grab number from checkbox_id, TID
		var tid = checkbox_id.split('-');
		var parent_id;
		tid = tid[tid.length - 1]; 
		var ul_id;
		return $.ajax({
			url: '/get_taxonomy_parent_name/' + tid,
			method: 'POST',
			data: checkbox_id,
			success: function(data) {
				var data = $.parseJSON(data);
				$('#' + checkbox_id).attr('checked', true);
				generateParents(data.parents, checkbox_id, data.vid, initial);
			}
		});
	}




/// FIRST ITERATE THROUGH PARENTS
	// $.each(initialParents, function(key, value) {
	// 		// var checkbox_id = $(this).attr('id');
	// 		var vocab_parent = '<ul><li id="vocab_holder-' + value + '" class="vocab_holder"><h3><span class="label label-primary full-width">' + key + '</span></h3></li></ul>';
	// 		$('.vocab-tier-0').append(vocab_parent);
	// 		console.log(vocab_parent);
	// 	});
	$('.field-name-field-interests2 .form-item').hide();
	
	$('.field-name-field-interests2 .form-item .form-type-checkbox').hide();
	function processCheckboxes() {
		var promises = [];

	$('.field-name-field-interests2 .form-item .form-type-checkbox').each(function() {
		var checkbox_text = $(this).find('label').text();
		var request;
		checkbox_text = $.trim(checkbox_text.replace(/\-/g, ''));
		if ($(this).find('input').attr('checked') == 'checked') {
			$(this).find('label').html('<h3><span class="label label-primary">' +checkbox_text + '</span></h3>');
		}
		else {
			$(this).find('label').html('<h3><span class="label label-default">' +checkbox_text + '</span></h3>');
		}
		var checkbox_id = $(this).find('input').attr('id');
		// load elements for autocomplete
		availableTags.push({value: checkbox_id, label: checkbox_text});
		if ($.inArray(checkbox_text, allInitialInterests) !== -1) {
			request = showValue(checkbox_id, true);
			// remove element from initial interests
			allInitialInterests.splice($.inArray(checkbox_text, allInitialInterests), 1);
		}
		else if ($(this).find('input').attr('checked') == 'checked') {
			request = showValue(checkbox_id, true);
		}
		promises.push(request);
	});
	return promises;
	}


    $( "#tags" ).autocomplete({
      source: availableTags,
	  change: function(e) {
		  e.preventDefault();
	  },
	focus:  function(e, v) { 
		e.preventDefault();},
	select:  function(e,selection) { 
		showValue(selection.item.value, false);
		$('.ui-autocomplete-input').val('Start typing...');		
		e.preventDefault();
	}
    });

	
	
	$('body').on('click', '.vocab_holder .label', function() {
	if ($(this).hasClass('label-primary')) {
		$(this).removeClass('label-primary').addClass('label-default');
	}
	else {
		$(this).removeClass('label-default').addClass('label-primary');
	}
});

// Handle group edits down the hierarchy
$('body').on('click', '.label-primary', function() {
	var children = $(this).closest('ul').find('ul .label.label-primary');
	if (children.length > 0) {
		children.removeClass('label-primary').addClass('label-default');
		$(this).closest('.vocab_holder').find('checkboxes').attr('checked', false);
	}
});
$('body').on('click', '.label-default', function() {
	var children = $(this).closest('ul').find('ul .label.label-default');
	if (children.length > 0) {
		children.removeClass('label-default').addClass('label-primary');
		$(this).closest('.vocab_holder').find('checkboxes').attr('checked', true);
	}
});


$('body').on('click', '.glyphicon-chevron-down', function() {
	$(this).closest('li').find('ul').show();
	$(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
});
$('body').on('click', '.glyphicon-chevron-up', function() {
	$(this).closest('li').find('ul').hide();
	$(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
});	
	
	var promises = processCheckboxes();
	$.when.apply(null, promises).done(function(){
		$('#loading_interests').hide();
		$('.glyphicon').trigger('click');
		$('.autocomplete-interests').show();
	});



  }); // end document ready
  // On location change, save session



	
})(jQuery);

