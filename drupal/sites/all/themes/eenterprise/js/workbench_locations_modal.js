(function ($) {

$(document).ready(function(){
	// Instantiate previous with primary location
	 var previous_selection = $('#location-select option:selected');

	if ($('#locations-modal')	.length > 0) {
		$('#dialog-all-locations').dialog({
			modal: true,
			autoOpen: false,
			width: 'auto',
			height: 400,
			dialogClass: "locations-modal",
			close: function() {
				var $location_select = $('#location-select');
				// Select previously selected value by recapturing elements from previous selection elem
				var select_title = previous_selection.attr('title');
				$location_select.find('option[title="' + select_title + '"]').prop('selected', 'selected');
				$location_select.trigger('change');
			},
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
					}
				},
				{	text : "Cancel",
					class: ' usa-button-outline',
					click: function() {
						$('#dialog-all-locations').dialog('close');

					}	
				}
			]
		});
		$('#locations-modal').click(function() {
			$('#dialog-all-locations').dialog('open');
		})

		$(':radio[name=location-radio]').change(function() {
			var container = $('#dialog-all-locations');
			var scroll_to = $(this);
			var height = container.height();
			var scroll_to_height = scroll_to.height();

			if (scroll_to.offset().top < 0) {// Is above container, must scroll up
				container.scrollTop( scroll_to.offset().top - scroll_to_height);
			}
			else if (scroll_to.offset().top - container.offset().top > height) { // below, must scroll down or stay the same
				container.scrollTop(scroll_to.offset().top + scroll_to_height);
			}
		});
	}
	
	function locationSelect(zipcode, name) {
		// If selected from modal and exists in select box change value
		// Searching via select TITLE, not VALUE
		var select_title = name + ' (' + zipcode + ')';
		var $location_select = $('#location-select');
		if ($location_select.find('option[title="' + select_title + '"]').length > 0) {
			//  Using first in case there are ever duplicates
			$location_select.find('option[title="' + select_title + '"]').first().prop('selected', 'selected');
			$location_select.trigger('change');
		}
		else { // add value to select, remove last select value
			var $new_option = $("<option title='" + select_title + "' value='" + zipcode + "'>" + name + " (" + zipcode + ")</option>");
			$location_select.find('option:nth-child(9)').remove();
			// Alphabetically place select option. Because already alphabetical, if not in
			// select drop down, just make last choice (position 9)
			$location_select.find('option:nth-child(8)').after($new_option);
			$location_select.find('option[title="' + select_title + '"]').prop('selected', 'selected');
			$location_select.trigger('change');
		}
	}
	
	// Update Session
	$('body').on('change', '#location-select', function(e) {
		if ($(this).val() == 'view_more') {
			e.preventDefault();
			$('#locations-modal').trigger('click');
		}
		else {
			previous_selection = $('#location-select option:selected');
			var zip_val = $(this).val();
			var location_name = $(this).find('option:selected').text();
			location_name = location_name.split('(')[0]; // ignore zip code
			location_name = $.trim(location_name); // trim any leading, trailing whitespace.
			$('input[type=radio][id="' + zip_val + '|' + location_name + '"]').prop('checked', true);
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