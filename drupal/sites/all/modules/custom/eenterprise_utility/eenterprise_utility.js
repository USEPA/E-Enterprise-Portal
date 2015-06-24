(function ($) {


  $(document).ready(function(){
	var last_clicked = "";

	function placeAddAnotherButton(addTd, table_id, parent_id) {
	 	var table = $(table_id);
		var input_button = $(parent_id).find('.field-add-more-submit');
		if (addTd){
			table.find("tr:first").append("<th></th>");
			table.find("tr").not('tr:first').append("<td></td>");
		}
		table.find("tr:last").find('td:last').addClass('last-td').append(input_button);
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
		console.log(table_id + ':::' + parent_id);
		placeAddAnotherButton(true, '#' + table_id, parent_id);
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
		console.log(str + ' ::: ' + substring)
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
	
	    var availableTags = [];
		var initialInterests = {
			'Environmental Media':
				['Soils & Land', 'Air', 'Species', 'Water'],
			'Health':
				['Food Safety', 'Health Effects', 'Health Risks', 'Special Populations'],
			'Pollution Prevention' :
				['Conservation', 'Energy Effienciency', 'Fuel Economy', 'Pollution Prevention', 'Renewable Energy', 'Sustainable Development', 'Waste Reduction'],
		};
		
		var allInitialInterests = ['Conservation', 'Energy Effienciency', 'Fuel Economy', 'Pollution Prevention', 
			'Renewable Energy', 'Sustainable Development', 'Waste Reduction','Food Safety', 'Health Effects', 'Health Risks', 
			'Special Populations', 'Soils & Land', 'Air', 'Species', 'Water'];
	
	
	$.each(initialInterests, function(key, value) {
		
	});
	function showValue(checkbox_id) {
		console.log('called with' + checkbox_id);
		// $('#' + checkbox_id).show();
		$('#' + checkbox_id).attr('checked','checked');
		$('label[for="' + checkbox_id + '"]').show();
	}
		
	// $('.field-name-field-interests2 .form-item').hide();
	$('.field-name-field-interests2 .form-item .form-type-checkbox').each(function() {
		var checkbox_text = $(this).find('label').text();
		checkbox_text = $.trim(checkbox_text.replace(/\-/g, ''));
		$(this).find('label').text(checkbox_text);
		var checkbox_id = $(this).find('input').attr('id');
		
		
		availableTags.push({value: checkbox_id, label: checkbox_text});

		if ($.inArray(checkbox_text, allInitialInterests) !== -1) {
			$(this).find('label').show();
			$(this).find('input').hide();
		}
		else if ($(this).find('input').attr('checked') == 'checked') {
			$(this).find('label').show();
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
	create: function() { console.log('create');},
	focus:  function(e, v) { console.log('focus');
		e.preventDefault();},
	open:  function() { console.log('open');},
	response:  function() { 
		//console.log('response');
		},
	search:  function(e, v) {
		//console.log('search');
				},
	select:  function(e,selection) { 
		showValue(selection.item.value);
		$('.ui-autocomplete-input').val(selection.item.label);
		e.preventDefault();
	}
    });


	
	
	
	
	
  }); // end document ready
  

	
})(jQuery);

