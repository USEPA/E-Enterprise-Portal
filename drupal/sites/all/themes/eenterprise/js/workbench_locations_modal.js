(function ($) {

$(document).ready(function(){
	// Instantiate previous with primary location
	// Use the placename to lookup (city)
	var previous_selection = $('#location-select option:selected').text();
	// alert(previous_selection);
	// Clip off the zipcode off the end of the selection text (modal IDs use just city names)
	$('input[type=radio][id="' + previous_selection.substring(0, previous_selection.length-8) + '"]').attr('checked', true);
	
	if ($('#locations-modal').length > 0) {
		$('#dialog-all-locations').dialog({
			modal: true,
			autoOpen: false,
			width: 'auto',
			height: 400,
			dialogClass: "locations-modal",
			buttons: [
				{
					text: 'View',
					class: ' usa-button',
					click: function() {
						var selection_array = $(':radio[name=location-radio]:checked').val().split('|');
						var selection_value = selection_array[0];
						var selection_name = selection_array[1];
						locationSelect(selection_value, selection_name);
						$('#dialog-all-locations').dialog('close');
						// $(':radio[name=location-radio]:checked').attr('checked', false);
					}
				},
				{	text : "Cancel",
					class: ' usa-button-outline',
					click: function() {
						// Select prior location by name (can't use .val() since zip codes are no longer unique)
						$('#location-select option').filter(function () { return $(this).html() == previous_selection; }).prop('selected', true);
						$('#dialog-all-locations').dialog('close');
					}	
				}
			]
		});
		$('#locations-modal').click(function() {
			$('#dialog-all-locations').dialog('open');
		})
	}
	
	function locationSelect(selection_value, selection_name) {
		// If selected from modal and exists in select box, just change value
		if ($('#location-select option[value=' + selection_value + ']').length > 0) {
			$('#location-select').val(selection_value);
			$('#location-select').trigger('change');
		}
		else { // add value to select, remove last select value
			$("#location-select").prepend("<option value='" + selection_value + "'>" + selection_name + "</option>");
			$('#location-select option:nth-child(10)').remove();
			$('#location-select').val(selection_value);
			$('#location-select').trigger('change');
		}
	}
	
	// Update Session
	$('body').on('change', '#location-select', function(e) {
		if ($(this).val() == 'view_more') {
			e.preventDefault();
			$('#locations-modal').trigger('click');
		}
		else {
			// Use the placename to lookup (city)
			previous_selection = $('#location-select option:selected').text();
			// Clip off the zipcode off the end of the selection text (modal IDs use just city names)
			$('input[type=radio][id="' + previous_selection.substring(0, previous_selection.length-8) + '"]').attr('checked', true); // Update modal with selected values
			var zip_val = $(this).val();
			var location_name = $(this).find('option:selected').text();
			location_name = location_name.split('(')[0]; // ignore zip code
			location_name = $.trim(location_name); // trim any leading, trailing whitespace.
			$.post("/default_location_zip", {zip: zip_val, name: location_name});
		}
	});


	$(window).resize(function(){
	  $( "#dialog-all-locations" ).dialog( "option", "position", { my: "center", at: "center", of: window } );
	});


    /// Make prog-track and to do list dialogs responsive

        jQuery.fn.center = function () {
            this.css("position","absolute");
            this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
            this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");                 return this;
        }
        $(window).resize(function () {
         var dialog = $('#ui-id-1').closest('.ui-dialog');
            if($(window).width() < 900) {
                dialog.css('width', 'auto');
            }
            else {
                dialog.css('width', 900);
            }
            dialog.center();
        });


	});

})(jQuery);