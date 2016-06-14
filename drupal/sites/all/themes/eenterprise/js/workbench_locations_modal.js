(function ($) {

  $(document).ready(function(){
    // Instantiate previous with primary location
    var previous_selection = $('#location-select option:selected');
    // Flag for hitting cancel in modal, default is true
    var cancelling_input = true;
  
    // If View all cities (#locations-modal) link exists, then instantiate dialog
    // View all cities is added via eenterprise_utility.module
    if ($('#locations-modal').length > 0) {
      $('#dialog-all-locations').dialog({
        modal: true,
        autoOpen: false,
        width: 'auto',
        height: 400,
        dialogClass: "locations-modal",
        beforeClose: function() {
          if (cancelling_input) {
            var $location_select = $('#location-select');
            // Select previously selected value by recapturing elements from previous selection elem
            var select_title = previous_selection.attr('title');
            $location_select.find('option[title="' + select_title + '"]').prop('selected', 'selected');
            $location_select.trigger('change');
          } else { // Reset canceling input
            cancelling_input = true;
          }
        },
        buttons: [
          {
            text: 'Update',
            class: ' usa-button',
            click: function() {
              cancelling_input = false;
              var selection_array = $(':radio[name=location-radio]:checked').val().split('|');
              var selection_value = selection_array[0];
              var selection_name = selection_array[1];
              locationSelect(selection_value, selection_name);              
            }
          },
          {  text : "Cancel",
            class: ' usa-button-outline',
            click: function() {
              $('#dialog-all-locations').dialog('close');
              $('body').removeClass('modal-open');
            }  
          }
        ]
      });
      
    }
    
    function locationSelect(zipcode, name) {
      var max_allowed_locations =  9;
      // If selected from modal and exists in select box change value
      // Searching via select TITLE, not VALUE
      name = $.trim(name);
      var select_title = name + ' (' + zipcode + ')';
      var $location_select = $('#location-select');
      if ($location_select.find('option[title="' + select_title + '"]').length > 0) {
        //  Using first in case there are ever duplicates
      }
      else { // add value to select, remove last select value
        var $new_option = $("<option title='" + select_title + "' value='" + zipcode + "'>" + name + " (" + zipcode + ")</option>");
        // If last option isn't default location, remove it
        // Otherwise, remove second to last
        var $check_last_option = $location_select.find('option:nth-child(' + max_allowed_locations + ')');
        if ($location_select.find('option:nth-child(9)').attr('data-ee-location') == 'primary') {
          var remove_option = max_allowed_locations - 1;
          $location_select.find('option:nth-child(' + remove_option + ')').remove();
        }
        else {
        $location_select.find('option:nth-child(' + max_allowed_locations + ')').remove();
        }
        // Alphabetically place select option. Because already alphabetical, if not in
        // select drop down, just make last choice (position 9)
        $location_select.find('option:nth-child(' + (max_allowed_locations - 1) + ')').after($new_option);
      }
      $('#dialog-all-locations').dialog('close');
      $location_select.find('option[title="' + select_title + '"]').prop('selected', 'selected');      
      $location_select.trigger('change');
    }
    
    // Update Session
    $('body').on('change', '#location-select', function(e) {
      var setlocation_title = previous_selection.attr('title');
      if ($('#location-select option:selected').text() == 'Show more...') {
        e.preventDefault();
        $('body').addClass('modal-open');
        matchSelectToRadio(setlocation_title); // e.g., Centreville, VA (20121)        
        $('#dialog-all-locations').dialog('open');
        $('#dialog-all-locations :radio[name=location-radio]').each(function() {
          var radioInput = $(this);
          if(radioInput.is(':checked')) {
            $('#dialog-all-locations').animate({
              scrollTop: radioInput.position().top
            }, 1500);
            radioInput.focus();
          }
        });
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
  
		$(':radio[name=location-radio]').change(function() {
			var container = $('#dialog-all-locations');
			var scroll_to = $(this);
			container.scrollTop(scroll_to.offset().top - container.offset().top + container.scrollTop());
		});    
  
    // Select title = city, state (zip) (e.g., Chicago, IL (60660))
    // Dialog radio buttons use id and value = zip|city, state (e.g., 60660|Chicago, IL)
    function matchSelectToRadio(setlocation_title) {
      var citystate = setlocation_title.split('(')[0];
      var selectzip = setlocation_title.split('(')[1];
      selectzip = selectzip.split(')')[0];
      var select_radio = selectzip + '|' + citystate;
      
      $('input[type=radio][id="' + select_radio + '"]').prop('checked', true);
      
    }
  
    $(window).resize(function(){
      $( "#dialog-all-locations" ).dialog( "option", "position", { my: "center", at: "center", of: window } );
    });
  
  
    /// Make prog-track and to do list dialogs responsive  
    jQuery.fn.center = function () {
      this.css("position","absolute");
      this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
      $(window).scrollTop()) + "px");
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
      $(window).scrollLeft()) + "px");         return this;
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
