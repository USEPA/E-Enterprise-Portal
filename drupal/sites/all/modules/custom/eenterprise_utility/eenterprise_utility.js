(function ($) {
  var numSelects = 0;
  var type;
  var removedSelect = false;
  var failedLookup = false;
  var mouse_click;
  var are_there_errors;
  var lastVal;
  // Map of location and zip data
  var location_obj = {};
  // Flags for when to search for location information
  var enter_pressed = false; // When user deliberately presses enter in a location
  var show_locations_again = false; // When the location errored but returned multiple options.


  // Disables entering the form by key press when focused on an input
  Drupal.behaviors.DisableInputEnter = {
    attach: function (context, settings) {
      $('input', context).once('disable-input-enter', function () {
        $(this).keypress(function (e) {
          var $elem = $(this);
          if (e.keyCode == 13) {
            enter_pressed = true;
            $elem.blur();
            e.preventDefault();
          }
        });
      });
    }
  };


  function placeAddAnotherButton(ajax_content, table_id, parent_id) {
    var table = $(table_id);
    var input_button = $(parent_id).find('.field-add-more-submit');
    if (!ajax_content) {
      // Add the + button next to the Remove button
      table.find("tr:last").find('td:nth-child(2)').append(input_button);
    }
  }

  function moveAddButton() {
    var table = $('#zipcode_description').find('.field-multiple-table');
    var $profile_locations = $('#profile-locations');
    var addMoreBtn = $profile_locations.find('.field-add-more-submit');
    var add_button = table.find('tr:last').find('td:nth-child(2)').find('.field-add-more-submit');
    if (add_button.length == 0) {
      table_id = table.attr('id');
    }
    $profile_locations.find('tr:last').find('td:nth-child(2)').append(addMoreBtn);
  }

  function processPrimaryFields() {
    var reset_buttons = false;
    var hide_buttons = false;
    var $zipcode_description = $('#zipcode_description');
    $('body').find('.field-multiple-table').removeClass('sticky-enabled');
    $('#profile-locations').find('.sticky-header').remove();
    var table = $zipcode_description.find('.field-multiple-table');        // cache the target table DOM element
    var checkboxes = table.find('input[type=checkbox]');
    var starsSpot = checkboxes.next('div');

    var selection = table.find('input[type=checkbox]:checked');

    if (!$(starsSpot).hasClass('zip-code-primary-holder')) {
      checkboxes.after('<div class="zip-code-primary-holder"><a href="javascript:void(0)" title="Set to default location" class="zip-code-primary-select"><i class="fa fa-star-o" aria-hidden="true"></i><span class="sr-only">Set to default location</span></a></div>');
      var primary_indicator = selection.next('.zip-code-primary-holder').find('.zip-code-primary-select');
      primary_indicator.addClass('selected');
      primary_indicator.prop('title', 'Default location');
      var primary_indicator_star = primary_indicator.find('i');
      primary_indicator_star.removeClass('fa-star-o');
      primary_indicator_star.addClass('fa-star');
      var screenreader_indicator = primary_indicator.find('.sr-only');
      screenreader_indicator.text("Default location");
    }

    // If no default location exists, set the first row to be the default
    if (table.find('input[type=checkbox]:checked').length == 0) {
      setPrimaryZip();
    }

    // If city select exist, lock submit and focus on select
    var $city_lookup = $('.city-state-lookup-zips');
    if ($city_lookup.length == 0) {
      $('.form-submit').prop("disabled", false);
      table.find("tr:last").find('.field_zip_code').focus();
    }
    else {
      $('.form-submit').prop("disabled", true);
      $city_lookup.focus();
    }

    // If location error exists, lock down buttons to avoid accidental submit
    var fixInput;

    if (!$('.field-suffix').hasClass('error')) {
      reset_buttons = true;
    } else {
      hide_buttons = true;
      fixInput = $('.field-suffix.error').closest('td').find('.field_zip_code');
      fixInput.focus();
    }

    if (numSelects > 0) {
      //hideButtons();
      hide_buttons = true;
      fixInput = $zipcode_description.find('select').closest('td').find('.field_zip_code');
     // fixInput.focus();
    }

    if (hide_buttons) {
      hideButtons();
    }
    if (reset_buttons && !existingLocationErrors()) {
      resetButtons();
    }

    var $field_add_more_submit = $('#links_description').find('.field-add-more-submit');
    $field_add_more_submit.prop("value", "New favorite").addClass("usa-button");
    $('.field_zip_code').prop("disabled", false);
  }

  function setPrimaryZip() {
    $('#zipcode_description').find('.field-multiple-table').find('tr:nth-child(1)').find('.zip-code-primary-select').click();
  }

  function setCommunitySizeType(commsize, isurban) {
    if (commsize && isurban) {
      if (isurban == "1") {
        $('#edit-field-community-type-und-urban').prop('checked', true);
      } else {
        $('#edit-field-community-type-und-rural').prop('checked', true);
      }
      var selected_pop = parseInt(commsize);
      if (selected_pop < 5000) {
        $('#edit-field-community-size-und option:contains("0 - 5,000")').prop('selected', true);
      } else if (selected_pop < 10000) {
        $('#edit-field-community-size-und option:contains("5,000 - 10,000")').prop('selected', true);
      } else if (selected_pop < 25000) {
        $('#edit-field-community-size-und option:contains("10,000 - 25,000")').prop('selected', true);
      } else if (selected_pop < 100000) {
        $('#edit-field-community-size-und option:contains("25,000 - 100,000")').prop('selected', true);
      } else if (selected_pop < 1000000) {
        $('#edit-field-community-size-und option:contains("100,000 - 1,000,000")').prop('selected', true);
      } else {
        $('#edit-field-community-size-und option:contains("1,000,000+")').prop('selected', true);
      }
    } else {
      // Reset options if not found in census data
      $('#edit-field-community-type-und-urban').prop('checked', false);
      $('#edit-field-community-type-und-rural').prop('checked', false);
      $('#edit-field-community-type-und-none').prop('checked', true);
      $('#edit-field-community-size-und').find('option:contains(None)').prop('selected', true);
    }

  }


  /**
   *
   * @param location_name
   * @param commsize
   * @param isurban
   */
  function update_user_zip_preferences(location_name, commsize, isurban, input_to_ignore) {
    // Reset global location_obj
    location_obj = {};

    var count_ignore_tr = 0;
    $("[id*=field-zip-code-values]").find("tr").each(function (index) {
      var $tr = $(this);
      var $zip_code_input = $tr.find(".field_zip_code");
      var zip_id = $zip_code_input.attr('id');
      var $field_suffix = $tr.find('.field-suffix');
      // Do not add items that have errored or are currently being changed
      if (zip_id == input_to_ignore || zip_id == null) {
        count_ignore_tr = count_ignore_tr + 1;
        return true; // Skip to next iteration
      }
      // If the field has an error, we still need to account for the delta, so don't add to count_ignore_tr
      if ($field_suffix.hasClass('error')) {
        return true; // Skip to next iteration
      }
      index = index - count_ignore_tr;
      var zip = $tr.find(".field_zip_code").val();
      var name = $field_suffix.text();
      var primary = $tr.find('.field-name-field-field-primary input').prop('checked');
      if (primary) {
        primary = 1;
      }
      else {
        primary = 0;
      }
      if (name != '' && zip != '') {
        // Check if name has been previously saved
        if (!location_obj[name]) {
          location_obj[name] = {};
        }
        // Store zip and primary
        location_obj[name][zip] = {};
        location_obj[name][zip].primary = primary;
        location_obj[name][zip].delta = index;
        // If this is the latest name, add community data
        if (name == location_name) {
          location_obj[name][zip].commsize = commsize;
          location_obj[name][zip].is_urban = isurban;
        }
      }
    });
    var json_value = JSON.stringify(location_obj);
    $('#edit-zip-mapping').val(json_value);
  }

  function check_duplicate(location_name, zip_val) {
    return (location_obj[location_name] && location_obj[location_name][zip_val]);
  }

  function updateCommunitySettings() {
    var primary_offset = /form-item-field-zip-code-und-(\d+)/.exec($(".zip-code-primary-select.selected").parent().parent()[0].className)[1];
    var primary_zip = $('#city-name-' + primary_offset);
    setCommunitySizeType(primary_zip.attr('commsize'), primary_zip.attr('isurban'));
  }

  function inString(str, substring) {
    return str.indexOf(substring) >= 0;
  }

  // When an error occurs, disabled removal/ addition of
  // rows except for the input that is errored
  function  disable_zip_buttons(input_to_ignore) {
    $('.remove-button').prop('disabled', true);
    $('input.field_zip_code').prop('disabled', true);
    if (input_to_ignore != "all") {
      var remove_to_ignore = input_to_ignore.closest('tr').find('.remove-button').attr('id');
      $('#' + remove_to_ignore).attr('disabled', false);
      input_to_ignore.closest('tr').find('.field_zip_code').prop('disabled', false);
    }
  }


  // Appends error message to given field suffix elem
  function print_error_message($field_suffix, message) {
    // Print error message
    lastVal = $field_suffix.prev().val();
    failedLookup = true;
    $field_suffix.addClass('error').html(message);
    $field_suffix.attr("id", "zip-code-error");
    $field_suffix.prev().attr("aria-describedby", "zip-code-error");
    are_there_errors = true;
    update_user_zip_preferences("", "", "", "");
    hideButtons();
  }

  function appendSelect(input_type, select, location_data, input) {
    var add_button = input.closest('td').find('.field-add-more-submit');
    var remove_button = input.closest('td').find('.remove-button');
    var primary_indicator = input.closest('td').find('.zip-code-primary-holder');
    var location = input.val();
    var field_suffix = input.next('.field-suffix');
    var label_select_string = "";
    var select;

    // replace input with select list
    add_button.hide();
    remove_button.hide();
    primary_indicator.hide();

    if (input_type == "zip") {
      label_select_string = 'Select a location for ' + input.val() + ':';
      select = $(location_data.city_select);
    }
    else {
      label_select_string = 'Select a zip code for ' + input.val() + ':';
      select = $(location_data.zip_select);
    }
    var label_select = $('<label id="zip-label" for="city-state-lookup-zips">' + label_select_string + '</label>');
    select.addClass('city-state-lookup-zips');
    // select.addClass('city-state-lookup-zips');
    var confirm = $('<button type="button" class="usa-button" id ="user-profile-select-zip">Select</button>');
    var back = $('<button type="button" class="usa-button-outline" id="user-profile-back-zip">Back</button>');
    input.prop("disabled", true);
    if (numSelects == 0) {
      input.after(label_select);
      label_select.after(select);
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
      //$('#profile-locations').find('#zip-label').remove();
      $('#profile-locations').find('#city-state-lookup-zips').remove();
      back.remove();
      confirm.remove();
      label_select.remove();
      select.remove();
      remove_button.show();
      add_button.show();
      primary_indicator.show();
      //TODO if they had valid input before reset to previous input
      field_suffix.addClass('error');
      field_suffix.html('Please update your location or remove this field before saving.');
      disable_zip_buttons(input);
      input.prop('disabled',false);
      input.focus();
      //processPrimaryFields();
    });
    confirm.on('click', function () {
      var input_value = input.val();
      var select_value = select.val();
      var location_name = '';
      var zip_val = '';
      var pop = '';
      var urban = '';
      var duplicate = false;
      back.remove();
      confirm.remove();
      if (input_type == 'zip') {
        location_name = select_value;
        zip_val = input_value;
        if (check_duplicate(location_name, zip_val)) {
          print_error_message(field_suffix, "Duplicate location name and zip code pairs are not allowed.");
          disable_zip_buttons(input);
          duplicate = true;
        } else {
          input.val(zip_val);
          field_suffix.html(location_name);
          if (location_data.zip_attr && zip_val in location_data.zip_attr) {
            pop = location_data.zip_attr[zip_val].pop;
            urban = location_data.zip_attr[zip_val].urban;
          }
          if (location_data.city_attr && location_name in location_data.city_attr) {
            pop = location_data.city_attr[location_name].pop;
          }
        }
      }
      else { // type city or tribe
        zip_val = select_value;
        location_name = location_data.zip_attr[select_value].city;
        // Set duplicate flag if the location and zip has already been entered.
        if (check_duplicate(location_name, zip_val)) {
          print_error_message(field_suffix, "Duplicate location name and zip code pairs are not allowed.");
          disable_zip_buttons(input);
          duplicate = true;
        } else {
          field_suffix.html(location_name);
          input.val(zip_val);
          if (location_data.zip_attr && zip_val in location_data.zip_attr) {
            pop = location_data.zip_attr[zip_val].pop;
            urban = location_data.zip_attr[zip_val].urban;
          }
          if (location_data.city_attr && location_name in location_data.city_attr) {
            pop = location_data.city_attr[location_name].pop;
          }
        }
      }

      label_select.remove();
      select.remove();
      remove_button.show();
      primary_indicator.show();
      numSelects = 0;

      if (!duplicate) {
        field_suffix.attr('commsize', pop);
        if (urban == "Urban") {
          field_suffix.attr('isurban', '1');
        } else if (urban == "Rural") {
          field_suffix.attr('isurban', '0');
        }
        // Update community/rural data
        updateCommunitySettings();
        // Update all location data
        update_user_zip_preferences(location_name, pop, urban, "");
        processPrimaryFields();
        if (!existingLocationErrors()) {
          resetButtons();
        }
      }

      input.prop("disabled", false);
      input.focus();

    });

  }

  function checkLocation(fieldToCheck, type) {
    var input;
    // Lock save and add as to not submit faulty data before processed
    if (type != 'button' && fieldToCheck.val() != '') {
      hideButtons();
    }

    if (type == 'button' || type == 'select') {
      var clicked_id = fieldToCheck.id;
      input = $(clicked_id).closest('td').find('.field_zip_code');
    }

    if (type == 'textfield') {
      // This is an override of the drupal add and save to allow the zip code data to process before saving
      input = fieldToCheck;
      var field_suffix = input.next('.field-suffix');
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
        disable_zip_buttons("all");
        Drupal.settings.locationInputEngine.lookUpLocation(input.val()).done(function (location_data) {
          var zip;
          var location_name;
          var pop = 0;
          var urban = "";
          var duplicate = false;

          // Update location data to check for duplicates, ignoring this input-
          update_user_zip_preferences("", "", "", input.attr('id'));

          // If zip codes, then returning zip code data for string input
          if (location_data.zip_codes) {
            // Lookup city, state - IF only one zip code, automatically input into input
            var count_zips_returned = location_data.zip_array.length;
            if (count_zips_returned > 1) {
              appendSelect("city", location_data.zip_select, location_data, input);
              return;
            }
            // Count zips returned isn't greater than 1
            zip = location_data.zip_array[0];
            location_name = location_data.city;

            input.val(zip);

            if (location_data.state != '') {
              // Add state information
              location_name = location_name + ', ' + location_data.state;
            }
            if (check_duplicate(location_name, zip)) {
              print_error_message(field_suffix, "Duplicate location name (" + location_name + ") and zip code pairs are not allowed.");
              disable_zip_buttons(input);
              duplicate = true;
            }
            if (!duplicate) {
              // Gather FRS location data for zip code
              if (location_data.zip_attr && zip in location_data.zip_attr) {
                pop = location_data.zip_attr[zip].pop;
                urban = location_data.zip_attr[zip].urban;
              }
              // If city population exists, override FRS zip population
              if (location_data.city_attr && location_name in location_data.city_attr) {
                pop = location_data.city_attr[location_name].pop;
              }
              field_suffix.html(location_name);
              field_suffix.attr('commsize', pop);
              if (urban == "Urban") {
                field_suffix.attr('isurban', '1');
              } else if (urban == "Rural") {
                field_suffix.attr('isurban', '0');
              }
              update_user_zip_preferences(location_name, pop, urban);
              updateCommunitySettings();
            }
          } // Ends if location_data.zip_codes
          else { // Returning zip codes for selection
            if (location_data.city_select) {// multiple zip codes found found
              appendSelect("zip", location_data.city_select, location_data, input);
              return;
            }

            if (location_data.zip) {
              zip = location_data.zip;
            } else {
              zip = location_data.zip_array[0];
            }
            location_name = location_data.city[0];
            if (check_duplicate(location_name, zip)) {
              print_error_message(field_suffix, "Duplicate location name (" + location_name + ") and zip code pairs are not allowed.");
              disable_zip_buttons(input);
              duplicate = true;
            }
            if (!duplicate) {
              field_suffix.html(location_name);
              if (location_data.zip_attr && zip in location_data.zip_attr) {
                pop = location_data.zip_attr[zip].pop;
                urban = location_data.zip_attr[zip].urban;
              }
              if (location_data.city_attr && location_name in location_data.city_attr) {
                pop = location_data.city_attr[location_name].pop;
              }
              field_suffix.attr('commsize', pop);
              if (urban == "Urban") {
                field_suffix.attr('isurban', '1');
              } else if (urban == "Rural") {
                field_suffix.attr('isurban', '0');
              }
              update_user_zip_preferences(location_name, pop, urban);
              updateCommunitySettings();
              $('.remove-button').prop("disabled", false);
            }
          }
          if (!existingLocationErrors()) {
            resetButtons();
          }
         // processPrimaryFields();
          moveAddButton();
          field_suffix.closest("td").find('.field_zip_code').focus();
        }).fail(function (location_data) {
          print_error_message(field_suffix, location_data.error_message);
          disable_zip_buttons(input);
        });
      }
    }
    //input.focus();
  } // End checkLocation

  // Enable Save button / plus button
  function resetButtons() {
    $('body').find('.field-add-more-submit').show();
    $('#edit-field-zip-code .field-add-more-submit').prop("disabled", false);
    $('#edit-submit').prop("disabled", false);
    $('#edit-submit--2').prop("disabled", false);
    $('#edit-delete').prop("disabled", false);
    $('.field_zip_code').prop("disabled", false);
    if (removedSelect == true || failedLookup == true) {
     // $('.remove-button').prop("disabled", false);
    }
  }

  // On an Drupal Ajax call- if there is an error, hide the actual Save and +
  function hideButtons() {
    $('#edit-field-zip-code').find('.field-add-more-submit').prop("disabled", true);
    $('#edit-submit').prop("disabled", true);
    $('#edit-submit--2').prop("disabled", true);
    $('#edit-delete').prop("disabled", true);
    if (removedSelect == true || failedLookup == true) {
    //  $('.remove-button').prop("disabled", false);
    }
  }

  /**
   * Check if error exists in zip code settings
   * @returns {boolean}
   */
  function existingLocationErrors() {
    var num_errors = $('#edit-field-zip-code').find('.error').length;
    return num_errors > 0;
  }

  $(document).ready(function () {

    $('body').find('.field-multiple-table').removeClass('sticky-enabled');
    $('#profile-locations').find('.sticky-header').remove();

    $(document).click(function (e) {
      // The latest element clicked
      mouse_click = $(e.target);
    });

    $('body').on('click', '.zip-code-primary-select', function () {
      $('.zip-code-primary-select.selected').removeClass('selected');
      $('.zip-code-primary-select').prop('title', 'Set to default location');
      $('.zip-code-primary-select').closest('td').find('input[type=checkbox]:checked').prop('checked', false);
      var original_star = $('.zip-code-primary-select').find('i');
      original_star.addClass('fa-star-o');
      original_star.removeClass('fa-star');
      var selected_icon = $(this);
      selected_icon.addClass('selected');
      selected_icon.prop('title', 'Default location');
      var selected_icon_star = selected_icon.find('i');
      selected_icon_star.removeClass('fa-star-o');
      selected_icon_star.addClass('fa-star');
      selected_icon_star.closest('td').find('input[type=checkbox]').prop('checked', true);
      var screenreader_indicator = $(this).find('.sr-only');
      screenreader_indicator.text('Default location');
      // get location offset by regexing the id
      var primary_offset = /form-item-field-zip-code-und-(\d+)/.exec(selected_icon.parent().parent()[0].className)[1];
      var primary_zip = $('#city-name-' + primary_offset);
      setCommunitySizeType(primary_zip.attr('commsize'), primary_zip.attr('isurban'));
      //update session data without adding new community data
      update_user_zip_preferences("", "", "");
    });

    $('body').on('click', '.zip-code-primary-select.selected', function () {
      $(this).removeClass('selected');
      $(this).prop('title', 'Set to default location');
      var selected_icon = $(this).find('i');
      selected_icon.removeClass('fa-star');
      selected_icon.addClass('fa-star-empty');
      selected_icon.closest('td').find('input[type=checkbox]').prop('checked', false);
      var screenreader_indicator = $(this).find('.sr-only');
      screenreader_indicator.text('Set to default location');
    });


    $('body').on('focus', '.field_zip_code', function () {
      lastVal = $(this).val();
      $('.field_zip_code').on('change', function () {
        $('.form-submit').prop("disabled", true);
        // $('.field-suffix').removeClass('error')
      });
      $(".field_zip_code").keyup(function (e) {
        if ($(this).val() != '' && (lastVal != $(this).val())) {
          hideButtons();
        }
      });
    });

    $('#user-profile-select-zip').on('keyup', function (e) {
      if (e.which == 13) { // Enter key
        $(this).trigger('click');
      }
    });

    $('body').on('blur', '.field_zip_code', function (e) {
      // Search for location on Enter click even if same value
      if (lastVal != $(this).val() || enter_pressed || show_locations_again) {
        fieldChanged = $(e.target);
        checkLocation(fieldChanged, "textfield");
        //fieldChanged.closest("td").find(".field_zip_code").focus();
        // Reset flags
        enter_pressed = false;
        show_locations_again = false;
      }
    });

    $('body').on('click', '.form-submit', function (e) {
      mouse_click = $(e.target);
      checkLocation(mouse_click, "button");
    });

    $('body').on('click', 'button', function (e) {
      mouse_click = $(e.target);
      checkLocation(mouse_click, "button");
      if ($('.field-suffix').hasClass('error')) {
        hideButtons();
      }
      mouse_click.closest("td").find(".field_zip_code").focus();
    });


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
          // Update zip session data
          update_user_zip_preferences("", "", "");
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
            parent_id = '#zipcode_description';
          }
          else {
            parent_id = '#links_description';
          }

          if (table_id != '') {
            placeAddAnotherButton(false, '#' + table_id, parent_id);
          }
          processPrimaryFields();
        }
        moveAddButton();
      });

      //Add hide and show functionality for the local government user options
      $org_select = $('#edit-field-organization select');

      $org_select.change(function () {
        $local_gov_opts = $('.local-government-options');
        if ($(this).find('option:selected').text() == 'Local government') {
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
        }
        placeAddAnotherButton(false, table_id, parent_id);
      };
      $('#profile-tabs').tabs();
      // Update session on page load for zip mapping
      update_user_zip_preferences("", "", "");
    }

    if (page == 'app-connect') {
      $('#app-connect-tabs').tabs();
    }


    // Delete user profile
    $('#edit-delete').click(function (e) {
      var delete_button = $(this);
      $.fancybox({
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

    $('.remove-button').click(function() {

    });

    processPrimaryFields();
    placeAddAnotherButton(false, '#field-zip-code-values', '#zipcode_description');
    $('#zipcode_description').show();
  });
})(jQuery);
