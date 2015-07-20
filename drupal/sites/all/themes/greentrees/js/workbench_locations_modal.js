(function ($) {

$(document).ready(function(){
	if ($('#locations-modal').length > 0) {
		$('#dialog-all-locations').dialog({
			modal: true,
			autoOpen: false,
			width: 600,
			height: 'auto',
			dialogClass: "locations-modal",
			buttons: {
				'View': function() {
					var selection_array = $(':radio[name=location-radio]:checked').val().split('|');
					var selection_value = selection_array[0];
					var selection_name = selection_array[1];
					locationSelect(selection_value, selection_name);
					$('#dialog-all-locations').dialog('close');
				},
				'Cancel': function() {
					$('#dialog-all-locations').dialog('close');
				}
			}
		});
		$('#locations-modal').click(function() {
			$('#dialog-all-locations').dialog('open');
		})
	}
	
	function locationSelect(selection_value, selection_name) {
		console.log(selection_value, selection_name);
		// If selected from modal and exists in select box, just change value
		if ($('#location-select option[value=' + selection_value + ']').length > 0) {
			$('#location-select').val(selection_value);
			$('#location-select').trigger('change');
		}
		else { // add value to select, remove last select value
			$("#location-select").prepend("<option value='" + selection_value + "'>" + selection_name + "</option>");
			$("#location-select option:last").remove();
			$('#location-select').val(selection_value);
			$('#location-select').trigger('change');
		}
	}
	
	
	});

})(jQuery);