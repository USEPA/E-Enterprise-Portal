(function ($) {
	var numSelects = 0;
	var fieldToCheck;
	var type;
	
    $(document).ready(function () {
    		$('body').find('.field-multiple-table').removeClass('sticky-enabled');
    		$('#profile-locations').find('.sticky-header').remove();
        function placeAddAnotherButton(ajax_content, table_id, parent_id) {
            var table = $(table_id);
            var input_button = $(parent_id).find('.field-add-more-submit');
            if (!ajax_content) {
              // Add the + button next to the Remove button
              table.find("tr:last").find('td:nth-child(2)').append(input_button);
            }
        }
        
        function moveAddButton() {
        		var table = $('#zipcode_description .field-multiple-table');        
	        	var addMoreBtn = $('#profile-locations').find('.field-add-more-submit');
	        	var add_button = table.find('tr:last').find('td:nth-child(2)').find('.field-add-more-submit');
            if (add_button.length == 0) {
              table_id = table.attr('id');
	          }
	          $('#profile-locations').find('tr:last').find('td:nth-child(2)').append(addMoreBtn);
        }

        function processPrimaryFields() {
    		$('body').find('.field-multiple-table').removeClass('sticky-enabled');
    		$('#profile-locations').find('.sticky-header').remove();        
            var table = $('#zipcode_description .field-multiple-table');        // cache the target table DOM element
            var checkboxes = table.find('input[type=checkbox]');
            var selection = table.find('input[type=checkbox]:checked');
            var starsSpot = checkboxes.next('div');
            if (!$(starsSpot).hasClass('zip-code-primary-holder')) {
	            checkboxes.after('<div class="zip-code-primary-holder"><a href="javascript:void(0)" title="Set to default location" class="zip-code-primary-select"><i class="glyphicon glyphicon-star-empty" aria-hidden="true"></i><span class="sr-only">Set to default location</span></a></div>');
	            var primary_indicator = selection.next('.zip-code-primary-holder').find('.zip-code-primary-select');
	            primary_indicator.addClass('selected');
	            primary_indicator.prop('title', 'Default location');
	            var primary_indicator_star = primary_indicator.find('i');
	            primary_indicator_star.removeClass('glyphicon-star-empty');
	            primary_indicator_star.addClass('glyphicon-star');
	            var screenreader_indicator = primary_indicator.find('.sr-only');
	            screenreader_indicator.text("Default location");
            }
            table.find("tr:last").find('.field_zip_code').focus();
        }

        var old_button = '';
        var new_button = '';
        var save_submit = '';
        var new_save_submit = '';
        var mouse_click;
        var are_there_errors;

        $(document).click(function (e) {
            // The latest element clicked
            mouse_click = $(e.target);
        });
        
        $('body').on('click', '.zip-code-primary-select', function () {
            $('.zip-code-primary-select.selected').removeClass('selected');
            $('.zip-code-primary-select').prop('title', 'Set to default location');
            $('.zip-code-primary-select').closest('td').find('input[type=checkbox]:checked').prop('checked', false);
            var original_star = $('.zip-code-primary-select').find('i')
            original_star.addClass('glyphicon-star-empty');
            original_star.removeClass('glyphicon-star');
            var selected_icon = $(this);
            selected_icon.addClass('selected');
            selected_icon.prop('title', 'Default location');
            var selected_icon_star = selected_icon.find('i');
            selected_icon_star.removeClass('glyphicon-star-empty');
            selected_icon_star.addClass('glyphicon-star');
            selected_icon_star.closest('td').find('input[type=checkbox]').prop('checked', true);
            var screenreader_indicator = $(this).find('.sr-only');
        		screenreader_indicator.text('Default location');
            
        });
        $('body').on('click', '.zip-code-primary-select.selected', function () {
        		$(this).removeClass('selected');
        		$(this).prop('title', 'Set to default location');
            var selected_icon = $(this).find('i');
            selected_icon.removeClass('glyphicon-star');
            selected_icon.addClass('glyphicon-star-empty');
            selected_icon.closest('td').find('input[type=checkbox]').prop('checked', false);
            var screenreader_indicator = $(this).find('.sr-only');
        		screenreader_indicator.text('Set to default location');
        });

				var lastVal;

        $('body').on('focus', '.field_zip_code', function() {
	        lastVal = $(this).val();
        });
        
        $('body').on('blur', '.field_zip_code', function (e) {
					if (lastVal != $(this).val()) {
          	fieldChanged = $(e.target);
          	checkLocation(fieldChanged, "textfield");
          }
        });
        
        $('body').on('click', '.form-submit', function(e) {
          mouse_click = $(e.target);
	        checkLocation(mouse_click, "button");
        });
        
        $('body').on('click', 'button', function(e) {
          mouse_click = $(e.target);
	        checkLocation(mouse_click, "button");
        });
        
        $('body').on('click', 'city-state-lookup-zips', function(e) {
          mouse_click = $(e.target);
	        checkLocation(mouse_click, "select");
        });
        
        function checkLocation(fieldToCheck, type) {
					// Lock save and add as to not submit faulty data before processed
        	if (type != 'button' && fieldToCheck.val() != '') {
	        	hideButtons();
	        }	

					if (type == 'button' || type == 'select') {
						var clicked_id = fieldToCheck.id;
					}

          // This is an override of the drupal add and save to allow the zip code data to process before saving
          var input = fieldToCheck;
          var field_suffix = input.next('.field-suffix');
          var add_button = input.closest('td').find('.field-add-more-submit');
          var remove_button = input.closest('td').find('.remove-button');
          var primary_indicator = input.closest('td').find('.zip-code-primary-holder');
          var button_clicked = false;
          if (new_button != '' && new_button.attr('id') == clicked_id) {
              button_clicked = 'add';
          }
          else if (new_save_submit != '' &&  new_save_submit.attr('id') == clicked_id) {
              button_clicked = 'save';
          }
          else if (remove_button != '' && remove_button.attr('id') == clicked_id) {
            button_clicked = 'remove';
          }
          
          if (type == 'textfield') {
          	field_suffix.removeClass('error');
						var trimmedValue = $.trim(input.val());

						if ($.trim(input.val()) == '') {
							field_suffix.html('');
						}
						else {
              field_suffix.html('Loading...');
						  Drupal.settings.locationInputEngine.lookUpLocation(input.val()).done(function (location_data) {
                  if (location_data.zip_codes) {
                      // Lookup city, state - IF only one zip code, automatically input into input
                      var count_zips_returned = location_data.zip_array.length;
                      if (count_zips_returned > 1) {
                          // replace input with select list of zip codes.
                          add_button.hide();
                          remove_button.hide();
                          primary_indicator.hide();

													var labelselect = $('<label id="zip-label" for="city-state-lookup-zips">Select a zip code for ' + input.val() + ':</label>');
                          var select = $(location_data.zip_select);
                          select.addClass('city-state-lookup-zips');
                          var confirm = $('<button type="button" class="btn btn-default btn-sm" id ="user-profile-select-zip">Select</button>');
                          var back = $('<button type="button" class="btn btn-default btn-sm" id="user-profile-back-zip">Back</button>');
                          input.prop("disabled", true);
                          if (numSelects == 0) {
                            input.after(labelselect);
                            labelselect.after(select);
                            numSelects = numSelects + 1;
													}
                          field_suffix.html(confirm);                          
                          field_suffix.append(back);
                          select.focus();

                          back.click(function () {
                              field_suffix.html('');
                              select.replaceWith(input);
                              remove_button.show();
                              primary_indicator.show();
                          });
                          confirm.click(function () {
                              back.remove();
                              confirm.remove();
                              var currentZip = $('.city-state-lookup-zips option:selected').val();
                              input.val(currentZip);
                              field_suffix.html(location_data.city + ', ' + location_data.state);
                              $('#profile-locations').find('#zip-label').remove();
                              $('#profile-locations').find('#city-state-lookup-zips').remove();
                              remove_button.show();
                              primary_indicator.show();
                              if (!existingLocationErrors()) {
                                  resetButtons(button_clicked);
                              }
															numSelects = 0;
															input.prop("disabled", false);
															input.focus();
                          });
                      }
                      // Count zips returned isn't greater than 1
                      else {
                          input.val(location_data.zip_array[0]);
                          field_suffix.html(location_data.city + ', ' + location_data.state);
                          if (!existingLocationErrors()) {
                              resetButtons(button_clicked);
                          }
                      } 
                  } // Ends if location_data.zip_codes
                  else {
                      // add city and state data to field suffix
                      field_suffix.html(location_data.city + ', ' + location_data.state);
                      if (!existingLocationErrors()) {
                          resetButtons(button_clicked);
                      }
                      input.focus();
                  }
              }).fail(function (location_data) {
                  // Print error message
                  field_suffix.addClass('error').html(location_data.error_message);
                  field_suffix.attr("id", "zip-code-error");
                  field_suffix.prev().attr("aria-describedby", "zip-code-error");
                  are_there_errors = true;
              });
						}
					}	
				} // End checkLocation

        // Check if there are any errors. If no errors, make sure Save button / plus button are enabled
        function resetButtons(button_clicked){
            if (new_button.length > 0) {
                new_button.remove();
                old_button.show();
            }
            if (save_submit.length > 0) {
                $('#edit-submit.new-button-unusable').remove();
                save_submit.show();
            }
            if (button_clicked == 'add') {
                old_button.trigger('mousedown');
            }
            if (button_clicked == 'save') {
                save_submit.trigger('click');
            }
            if (button_clicked == 'remove') {
            }
        }

        // On an Drupal Ajax call- if there is an error, hide the actual Save and +
        function hideButtons() {
            var button = $('#edit-field-zip-code .field-add-more-submit').last();
            var save = $('#edit-submit');
            if (!button.hasClass('new-button-unusable')) {
                old_button = button;
                new_button = old_button.clone().addClass('new-button-unusable');
                // Replace drupal button with fake temporarily
                if ($(old_button).is(":visible")) {
                    new_button.unbind('click').attr("type", "button");
                    new_button.prop("disabled", true);
                    old_button.hide().after(new_button);
                }
            }
            if (!save.hasClass('new-button-unusable')) {
                save_submit = save;
                new_save_submit = save_submit.clone().addClass('new-button-unusable');
                // Replace drupal button with fake temporarily
                if ($(save_submit).is(":visible")) {
                    new_save_submit.unbind('click').attr("type", "button");
                    save_submit.hide().after(new_save_submit);
                }
            }
        }


        function existingLocationErrors() {
            var num_errors = $('#edit-field-zip-code .error').length;
            if (num_errors > 0) {
                return true;
            }
            else {
                return false;
            }
        }

        var path = window.location.pathname;
        var page = path.split('/')[1];
        if (page == 'user') {
            $(document).ajaxSuccess(function (event, xhr, settings) {
                var target_url = settings.url;
								
								if (target_url == '/multifield/field-remove-item/ajax') {
                    if (existingLocationErrors()) {
                        hideButtons();
                    }
                    else {
                        resetButtons(false);
                    }
                }
                // determine which table to place the Add Another button
                if (target_url == '/system/ajax' || target_url == '/multifield/field-remove-item/ajax') {
                    var table_id = '';
                    var parent_id = '';
                    $('.field-multiple-table').each(function () {
                        var table = $(this);
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
								processPrimaryFields();
								moveAddButton();
            });

            //Add hide and show functionality for the local government user options
            $org_select = $('#edit-field-organization select');

            $org_select.change(function() {
               $local_gov_opts =  $('.local-government-options');
               if($(this).find('option:selected').text() == 'Local government') {
                   $local_gov_opts.show();
               }
                else {
                   $local_gov_opts.hide();
               }
            });


            Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
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
            $('#profile-tabs').tabs();
        }
        
        if (page == 'app-connect') {
					$('#app-connect-tabs').tabs();
        }

        function inString(str, substring) {
            return str.indexOf(substring) >= 0;
        }

        $('#edit-delete').click(function (e) {
            var delete_button = $(this);
            var fancybox = $.fancybox({
                content: $('#delete-holder'),
                'width': 400,
                'height': 150,
                'autoSize': false
            });

            // If confirmed delete, unbind prevent default and trigger click to continue action
            $('#confirm-delete-profile').unbind('click').click(function () {
                delete_button.unbind('click');
                delete_button.trigger('click');
            });

            $('#cancel-delete-profile').unbind('click').click(function () {
                $.fancybox.close();
            });

            e.preventDefault();
        });

        processPrimaryFields();
        placeAddAnotherButton(false, '#field-zip-code-values', '#zipcode_description');
        placeAddAnotherButton(false, '#field-profile-favourites-values', '#links_description');
        $('#zipcode_description').show();
    });
})(jQuery);

