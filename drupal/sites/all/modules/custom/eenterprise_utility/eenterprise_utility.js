(function ($) {


  $(document).ready(function(){
	var last_clicked = "";
	
	function placeAddAnotherButton(addTd, table_id, parent_id) {
	 	var table = $(table_id);
		var input_button = $(parent_id).find('.field-add-more-submit');
		if (addTd){
			table.find("tr:first").append("<th></th>");
			table.find("tr").not('tr:first').append("<td><div class='ajax-new-content'></div></td>");
		}
		table.find("tr:last").find('td:last').find('.ajax-new-content').append(input_button);
	};
	
	$( document ).ajaxSuccess(function( event, xhr, settings ) {
		// determine which table to place the Add Another buttom
		var table_id = '';
		var parent_id = '';
		$('.field-multiple-table').each(function() {
			var table =  $(this);
			var add_button = table.find('tr:last').find('td:last').find('.field-add-more-submit');
			if (add_button.length == 0) {
				table_id = table.attr('id');
			}
		});
		if (inString(table_id, 'zip-code')) {
			parent_id = '#zipcode_description';
		}
		else {
			parent_id = '#links_description';
		}

		if (table_id != '') {
			placeAddAnotherButton(true, '#' + table_id, parent_id);
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
		}
		placeAddAnotherButton(false, table_id, parent_id);
	};
	
	
	function inString(str, substring) {
		if (str.indexOf(substring) >= 0) {
			return true;
		}
		else {
			return false;
		}
		
	}
	
		placeAddAnotherButton(true, '#field-zip-code-values', '#zipcode_description');
		placeAddAnotherButton(true, '#field-profile-favourites-values', '#links_description');

	// AUTOCOMPLETE FUNCTIONALITY
	
	
		function generateParents(parents_array, last_parent_id, vid) {
			if (parents_array.length > 0) {
				var current_parent = parents_array[parents_array.length - 1];
				parents_array.splice(-1, 1);
				var vocab_list = '<ul><li id="parent-holder-' + current_parent[0] + '"></li><ul>';
				if (vid > 0 ) { 
					$('#vocab_holder-' + vid).append(vocab_list);
					$('#ul_vocab_holder-' + vid).show(); 
					vid = -1;

				}
				if ($('#parent-holder-' + last_parent_id).length > 0) {
					$('#parent-holder-' + last_parent_id).append(vocab_list);
				}
				else if ($('#parent-holder-' + current_parent[0]).length == 0){
					$('.vocab-tier-0').append(vocab_list); // highest tier
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

	
	

	function showValue(checkbox_id) {
		//Grab number from checkbox_id, TID
		var tid = checkbox_id.split('-');
		var parent_id;
		tid = tid[tid.length - 1]; 
		$.ajax({
			url: '/get_taxonomy_parent_name/' + tid,
			method: 'POST',
			async: false,
			data: checkbox_id,
			success: function(data) {
				var data = $.parseJSON(data);
				$('#' + checkbox_id).attr('checked','checked');
				generateParents(data.parents, checkbox_id, data.vid);
			}
		});
		// $('#' + checkbox_id).show();

	}




/// FIRST ITERATE THROUGH PARENTS
	// $.each(initialParents, function(key, value) {
	// 		// var checkbox_id = $(this).attr('id');
	// 		var vocab_parent = '<ul><li id="vocab_holder-' + value + '" class="vocab_holder"><h3><span class="label label-primary full-width">' + key + '</span></h3></li></ul>';
	// 		$('.vocab-tier-0').append(vocab_parent);
	// 		console.log(vocab_parent);
	// 	});
	// $('.field-name-field-interests2 .form-item').hide();
	$('.field-name-field-interests2 .form-item .form-type-checkbox').each(function() {
		var checkbox_text = $(this).find('label').text();
		checkbox_text = $.trim(checkbox_text.replace(/\-/g, ''));
		if ($(this).find('input').attr('checked') == 'checked') {
			$(this).find('label').html('<h4><span class="label label-primary full-width">' +checkbox_text + '</span></h4>');
		}
		else {
			$(this).find('label').html('<h4><span class="label label-default full-width">' +checkbox_text + '</span></h4>');
		}
		var checkbox_id = $(this).find('input').attr('id');
		
		
		availableTags.push({value: checkbox_id, label: checkbox_text});
		if ($.inArray(checkbox_text, allInitialInterests) !== -1) {
			// var checkbox_id = $(this).attr('id');
			showValue(checkbox_id);
			allInitialInterests.splice($.inArray(checkbox_text, allInitialInterests), 1);
			$(this).find('label').hide();
			$(this).find('input').hide();
		}
		else if ($(this).find('input').attr('checked') == 'checked') {
			showValue(checkbox_id);
			// $(this).find('label').show();
			$(this).find('input').hide();
		}
		else {
			$(this).find('label').hide();
			$(this).find('input').hide();
		}
	});

    $( "#tags" ).autocomplete({
      source: availableTags,
	  change: function(e) {
		  e.preventDefault();
	  },
	close: function() { console.log('close');},
	focus:  function(e, v) { console.log('focus');
		e.preventDefault();},
	open:  function() { 
		//console.log('open');
	},
	response:  function() { 
		//console.log('response');
		},
	search:  function(e, v) {
		//console.log('search');
				},
	select:  function(e,selection) { 
		showValue(selection.item.value);
		$('.ui-autocomplete-input').val('Start typing...');		
		e.preventDefault();
	}
    });

	
	
// 	$('body').on('click', '.vocab_holder .label', function() {
// 	if ($(this).hasClass('label-primary')) {
// 		$(this).closest('.vocab_holder').find('checkboxes').attr('checked', '');
// 		$(this).removeClass('label-primary').addClass('label-default');
// 	}
// 	else {
// 		$(this).closest('.vocab_holder').find('checkboxes').attr('checked', 'checked');
// 		$(this).removeClass('label-default').addClass('label-primary');
// 	}
// });

// Handle group edits down the hierarchy
$('body').on('click', '.label-primary', function() {
	var children = $(this).closest('ul').find('ul .label.label-primary');
	if (children.length > 0) {
		children.removeClass('label-primary').addClass('label-default');
		// console.log('here1');
		// $(children.find('label')).each( function() {
		// 	console.log ('here');
		// 	var checkbox_id = $(this).attr('for');
		// 	$('#' + checkbox_id).attr('checked', '');
		// });
	}
});
$('body').on('click', '.label-default', function() {
	var children = $(this).closest('ul').find('ul .label.label-default');
	if (children.length > 0) {
		children.removeClass('label-default').addClass('label-primary');
		// $(children.find('label')).each( function() {
		// 	var checkbox_id = $(this).attr('for');
		// 	$('#' + checkbox_id).attr('checked', '');
		// });
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
	$('.autocomplete-interests').show();

  }); // end document ready
  

	
})(jQuery);

