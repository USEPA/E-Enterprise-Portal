(function($) {

  // takes zip, or city, state
  // returns location data object
  function lookUpLocation(location_input) {
    var error_message;
    var error;
    var is_valid_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{5}-\d{5}$)/.test(location);
    var location_data_return = {};
    // regex for city, state code
    var is_city_state = /^[\w\s]+,\s*\w{2}$/.test(location);
    if (!is_city_state && !is_valid_zip) {
      error_message = 'Please input a valid ZIP code or a city and state code separated by a comma (e.g., Durham, NC)';
      error = true;
    }
    else {
      $.ajax({
        url: Drupal.settings.basePath + 'return_location_data',
        type: 'POST',
        data: {location: location},
        success: function(data) {
          var parsed_data = $.parseJSON(data);
          var location_data = {};
          if (parsed_data.name_city_state) { // zip code entered, returned city/state
            location_data_return.city = parsed_data.city;
            if (location_data_return.city == '') { //Unable to find data for that zip
              error_message = 'The ZIP code you entered could not be found.';
              error = true;
            }
            else {
              location_data_return.state = parsed_data.state;
              location_data_return.zip = parsed_data.zip;
            }
          }
          else {
            location_data_return.zip_array = parsed_data.zip_array;
            if (location_data_return.zip_array.length == 0) {
              error_message = 'No ZIP codes returned. Are you sure the city and state code were entered correctly? (e.g., Durham, NC)';
              error = true;
            }
            else {
              location_data_return.city = parsed_data.city;
              location_data_return.state = parsed_data.state;
              var zip_select = '<select id="city-state-lookup-zips">';
              $.each(parsed_data.zip_array, function(index, zip_code) {
                zip_select = zip_select + '<option value="' + zip_code + '">' + zip_code + '</option>';
              });
              zip_select = zip_select + '</select>';
              location_data_return.zip_select = zip_select;
            }
          }

          return location_data_return;
        }

      });

    }
  }

})(jQuery);
