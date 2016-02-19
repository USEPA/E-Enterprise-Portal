(function ($) {
  var numSelects = 0;
  var fieldToCheck;
  var type;
  var removedSelect = false;
  var failedLookup = false;
  
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
          var starsSpot = checkboxes.next('div');
          
          var selection = table.find('input[type=checkbox]:checked');
          
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
          
          // If no default location exists, set the first row to be the default
          if (table.find('input[type=checkbox]:checked').length == 0) {
            setPrimaryZip();
          }
          
          // If location error exists, lock down buttons to avoid accidental submit
          if ($('#city-state-lookup-zips').length == 0) {
            $('.form-submit').prop("disabled", false);
            table.find("tr:last").find('.field_zip_code').focus();
          }
          else {
            $('.form-submit').prop("disabled", true);
            $('#city-state-lookup-zips').focus();
          }
          
          // If location error exists, lock down buttons to avoid accidental submit
          if ($('.field-suffix').hasClass('error')) {
            hideButtons();
            var fixInput = $('.field-suffix.error').closest('td').find('.field_zip_code');
            fixInput.focus();
          }
          else {
            resetButtons();
          }
          
          if (numSelects > 0) {
            hideButtons();
            var fixInput = $('#zipcode_description select').closest('td').find('.field_zip_code');
            fixInput.focus();
          }
        }
        
        function setPrimaryZip() {
            $('#zipcode_description .field-multiple-table').find('tr:nth-child(1)').find('.zip-code-primary-select').click();
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
          $('.field_zip_code').on('change', function() {
             $('.form-submit').prop("disabled", true);
             $('.field-suffix').removeClass('error')
          });
          $(".field_zip_code").keyup(function(e) {
              if ($(this).val() != '' && (lastVal != $(this).val())) {
                  hideButtons();
              }
              if (e.which == 13) { // Enter key
                if (!$('.field-suffix').hasClass('error')) {
                  $(this).blur();
                }
                else {
                  hideButtons();
                  $(this).closest("td").find(".field_zip_code").focus();
                }
              }
          });
        });
        
        $('#user-profile-select-zip').on('keyup', function(e) {
            if (e.which == 13) { // Enter key
              $(this).trigger('click');
            }
        });      
        
        $('body').on('blur', '.field_zip_code', function (e) {
          if (lastVal != $(this).val()) {
            fieldChanged = $(e.target);
            checkLocation(fieldChanged, "textfield");    
            fieldChanged.closest("td").find(".field_zip_code").focus();     	
          }
        });
        
        $('body').on('click', '.form-submit', function(e) {
          mouse_click = $(e.target);
          checkLocation(mouse_click, "button");
        });
        
        $('body').on('click', 'button', function(e) {
          mouse_click = $(e.target);
          checkLocation(mouse_click, "button");
          if ($('.field-suffix').hasClass('error')) {
             hideButtons();
          }        
          mouse_click.closest("td").find(".field_zip_code").focus();
        });
        
        function checkLocation(fieldToCheck, type) {
          // Lock save and add as to not submit faulty data before processed
          if (type != 'button' && fieldToCheck.val() != '') {
            hideButtons();
          } 

          if (type == 'button' || type == 'select') {
            var clicked_id = fieldToCheck.id;
            var input = $(clicked_id).closest('td').find('.field_zip_code');
          }

          if (type == 'textfield') {
	          // This is an override of the drupal add and save to allow the zip code data to process before saving
	          var input = fieldToCheck;
	          var field_suffix = input.next('.field-suffix');
	          var add_button = input.closest('td').find('.field-add-more-submit');
	          var remove_button = input.closest('td').find('.remove-button');
	          var primary_indicator = input.closest('td').find('.zip-code-primary-holder');
	          
	          if (field_suffix.hasClass('error')) {
          		field_suffix.removeClass('error');
          	}

            if ($.trim(input.val()) == '') {
              field_suffix.html('');
            }
            else {
              var ariaid = input.attr('aria-describedby');
              field_suffix.attr('id', ariaid);
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
                          hideButtons();
                          field_suffix.html(confirm);                          
                          field_suffix.append(back);
                          $('.form-submit').prop("disabled", true);
                          select.focus();
                          back.on('click', function () {
                              removedSelect = true;
                              numSelects = 0;
                              field_suffix.html('');
                              input.prop("disabled", false);
                              $('#profile-locations').find('#zip-label').remove();
                              $('#profile-locations').find('#city-state-lookup-zips').remove();
                              back.remove();
                              confirm.remove();
                              remove_button.show();
                              add_button.show();
                              primary_indicator.show();
                              field_suffix.addClass('error');
                              field_suffix.html('Please update your location or remove this field before saving.');
                              processPrimaryFields();
                              input.focus();
                          });
                          confirm.on('click', function () {
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
                                  resetButtons();
                              }
                              numSelects = 0;
                              input.prop("disabled", false);
                              processPrimaryFields();
                              input.focus();
                          });
                      }
                      // Count zips returned isn't greater than 1
                      else {
                          input.val(location_data.zip_array[0]);
                          field_suffix.html(location_data.city + ', ' + location_data.state);
                          if (!existingLocationErrors()) {
                              resetButtons();
                          }
                          else {
                          }
                      } 
                  } // Ends if location_data.zip_codes
                  else {
                      // add city and state data to field suffix
                      field_suffix.html(location_data.city + ', ' + location_data.state);
                      if (!existingLocationErrors()) {
                          resetButtons();
                      }
                      else {
                      }
                      processPrimaryFields();
											moveAddButton();
                      field_suffix.closest("td").find('.field_zip_code').focus();
                  }
              }).fail(function (location_data) {
                  // Print error message
                  failedLookup = true;
                  field_suffix.addClass('error').html(location_data.error_message);
                  field_suffix.attr("id", "zip-code-error");
                  field_suffix.prev().attr("aria-describedby", "zip-code-error");
                  are_there_errors = true;
                  hideButtons();
              });
            }
          } 
          input.focus();
        } // End checkLocation

        // Check if there are any errors. If no errors, make sure Save button / plus button are enabled
        function resetButtons(){
            $('body').find('.field-add-more-submit').show();
            $('#edit-field-zip-code .field-add-more-submit').prop("disabled", false);
            $('#edit-submit').prop("disabled", false);
            $('#edit-submit--2').prop("disabled", false);
            $('#edit-delete').prop("disabled", false);
            if (removedSelect == true || failedLookup == true) {
            	$('.remove-button').prop("disabled", false);
            }                        
        }

        // On an Drupal Ajax call- if there is an error, hide the actual Save and +
        function hideButtons() {
            $('#edit-field-zip-code .field-add-more-submit').prop("disabled", true);
            $('#edit-submit').prop("disabled", true);
            $('#edit-submit--2').prop("disabled", true);
            $('#edit-delete').prop("disabled", true);
            if (removedSelect == true || failedLookup == true) {
              $('.remove-button').prop("disabled", false);
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
            $("#edit-submit").prependTo(".edit-user-profile");
            $(document).ajaxSuccess(function (event, xhr, settings) {
                var target_url = settings.url;
                
                if (target_url == '/multifield/field-remove-item/ajax') {
                    if (existingLocationErrors()) {
                        hideButtons();
                    }
                    else {
                        resetButtons();
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

        // Delete user profile
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
