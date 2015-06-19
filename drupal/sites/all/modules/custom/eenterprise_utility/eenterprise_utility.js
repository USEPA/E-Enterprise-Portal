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


////Bmatkin: Fancybox 6-18-2015
	/* This is basic - uses default settings */
	
//	$("body").on('click', '#edit-delete', function() {
//		console.log('here');
//		$(".fancybox").trigger('click');
//    	return false; // prevents form from submitting
//	});
//
//	    function fancyAlert(msg) {
//    $.fancybox({
//        'modal' : true,
//        'content' : "<div style='margin:1px;width:240px;'>"+msg+"<div style='text-align:right;margin-top:10px;'><input style='margin:3px;padding:0px;' type='button' onclick='jQuery.fancybox.close();' value='Ok'></div></div>"        });    }
//
//function fancyConfirm(msg, callback) {
//    var ret;
//    $.fancybox({
//        'modal' : true,
//        'content' : "<div style='margin:1px;width:240px;'>"+msg+"<div style='text-align:right;margin-top:10px;'><input id='fancyConfirm_cancel' style='margin:3px;padding:0px;' type='button' value='Cancel'><input id='fancyConfirm_ok' style='margin:3px;padding:0px;' type='button' value='Ok'></div></div>",
//        onComplete : function() {
//            $("#fancyConfirm_cancel").click(function() {
//                ret = false;
//                $.fancybox.close();
//            })
//            $("#fancyConfirm_ok").click(function() {
//                ret = true;
//                $.fancybox.close();
//            })
//        },
//        onClosed : function() {
//            onClosed : function() { if (typeof callback == 'function'){ callback.call(this, ret); } };
//        }
//    });
//}
//
//function fancyConfirm_text() {
//    fancyConfirm("Ceci est un test", function(ret) {
//        alert(ret);
//    })
//}

// Traverses fields and updates ids after addition or deletion
function update_table_ids(no_fields) {
	var table = $('#zipcode_description .field-multiple-table');
 	var add_to_id = '--' + (no_fields - 1);
	var table_id = table.attr('id') + add_to_id;
	table.attr('id', table_id);
	var inputs = table.find('input');
	$.each(inputs, function(index) {
		if (index != (inputs.length - 1)) {
		var input_id = $(this).attr('id') + add_to_id;
		$(this).attr('id', input_id);
		}
	});
	var labels = table.find('label');
	$.each(labels, function(index) {
		if (index != (labels.length - 1)) {
		var label_attr_for = $(this).attr('for');
		if (label_attr_for != 'undefined' && label_attr_for != '') {
			var label_for = label_attr_for + add_to_id;
			$(this).attr('for', label_for); 
		}
		}
	});
	var selects = table.find('select');
	$.each(selects, function(index, select) {
		if (index != (selects.length - 1)) {
		$(this).empty().append(generate_weight_option(no_fields, index));
		var select_id = $(this).attr('id') + add_to_id;
		$(this).attr('id', select_id);
		}
	});
	
	// Each input update id- add --(no_)fields) to id
}


// Takes current number of fields and generates the next field
//function field_item(number_of_fields) {
//	var next_id_number = number_of_fields + 1; 
//	var weight_elem_id = 'edit-field-zip-code-und-' + number_of_fields + '--weight';
//	var weight_elem_div_id = 'form-item-field-zip-code-und-' + number_of_fields + '--weight';
//	var weight_elem_name = 'field_zip_code[und][' + number_of_fields + '][_weight]';
//	var div_elem_class = 'form-item-field-zip-code-und-' + number_of_fields + '-value';
//	var input_elem_id = 'edit-field-zip-code-und-' + number_of_fields + '-value';
//	var input_elem_name = 'field_zip_code[und][' + number_of_fields +'][value]';
//	var row_elem = "<tr class='draggable'><td class='field-multiple-drag'>"
////		+ "<a href='#' class='tabledrag-handle' title='Drag to re-order'>"
//		+ "</td>"
//		+ "<td><div class='form-item form-type-textfield ";
//	var input_elem = '<div class="ajax-new-conten"><input class="text-full field_zip_code form-control form-text" type="text" id="'
//		+ input_elem_id + '" name="' + input_elem_name + '" value="" size="60" maxlength="255">';
//	var table_drag_td = '<td class="delta-order tabledrag-hide" style="display: none;">';
//	var weight_div = '<div class="form-item form-type-select ' + weight_elem_div_id + '">';
//	var weight_label = '<label class="element-invisible" for="edit-field-zip-code-und-' + number_of_fields + '-weight">Weight for row ' + (number_of_fields + 1) + ' </label>';
//	var select_weight = ' <select class="field_zip_code-delta-order form-select"' 
//		+ 'id="edit-field-zip-code-und-' + number_of_fields + '-weight" name="field_zip_code[und][' + number_of_fields
//			+ '][_weight]">' + generate_weight_option(number_of_fields, number_of_fields) + '</select>';
//	row_elem = row_elem + div_elem_class + "'>" + input_elem + '</div></div></td>'
//		+ table_drag_td + weight_div + weight_label + select_weight + '</div></td></tr>';
//	return row_elem;
//}
//
//
//function generate_weight_option(number_of_fields, postion_of_elem) {
//	var neg_number = number_of_fields * -1;
//	var select_options = "";
//	var selected_str = "";
//	for (var index = neg_number; index <= number_of_fields; index++) {
//		selected_str = "";
//		if (index == postion_of_elem) {
//			selected_str = 'selected="selected"';
//		}
//		select_options += '<option value="' + index + '" ' + selected_str + ' >' + index + '</option>';
//	}
//	return select_options;
//}


  $(document).ready(function(){
//
//	var table = $('#zipcode_description .field-multiple-table');
//	table.find('.multiple-fields-remove-button').after('<input type="checkbox"/>');
//$('#add-field-zip-code').click( function() {
//	var table = $('#zipcode_description .field-multiple-table');
//	var number_of_fields = $('#zipcode_description .field-multiple-table tr.draggable').length;
//	var drupalTableDrag = Drupal.tableDrag['field-zip-code-values'];
//	table.append(field_item(number_of_fields));
//	drupalTableDrag.makeDraggable($('#zipcode_description .field-multiple-table tr:last'));
//	update_table_ids(number_of_fields);
//});


   // Your JS code.
  });
	
})(jQuery);

