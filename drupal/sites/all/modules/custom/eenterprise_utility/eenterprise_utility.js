(function ($) {

// Bmatkin:  
//	$.fn.zipCodeValidate = function(data) {
//		var zip_codes = [];
//		var zip_code_inputs = $('.field_zip_code');
//
//		$.each(zip_code_inputs, function() {
//			var zip = $(this).val();
//			if (zip != '') {
//				if ($.inArray(zip, zip_codes) == -1) {
//					zip_codes.push($(this).val());
//				}
//				else {
//					var zip_code_elem = $(this);
//					zip_code_elem.addClass('error');
//					
//					$('.zip_code_ajax_error').text('Duplicate zip codes are not allowed.');
//				}
//			}
//		});
//	};
	
//	
//	$('body').on('click', '#clear_all_zip_codes', function() {
//
//		var inputs = $('#zipcode_description .field-multiple-table tr.draggable');
//
//		
//	});
	
	
	function moveAddAnother() {
			var zip_code_table = $('body').find('#field-zip-code-values');
			var last_td =  zip_code_table.find('td').last();
			var add_button = zip_code_table.next('.field-add-more-submit');
			console.log(zip_code_table);
			console.log(last_td);
			console.log(add_button);
			last_td.after(add_button);
		}
	moveAddAnother();
	
})(jQuery);