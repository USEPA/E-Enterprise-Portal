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
		console.log(table_id + ':::' + parent_id);
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

	
  }); // end document ready
  

	
})(jQuery);

