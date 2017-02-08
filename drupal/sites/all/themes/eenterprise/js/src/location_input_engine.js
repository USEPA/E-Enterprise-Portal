(function($) {
  Drupal.behaviors.locationInputEngine = {
    attach: function(context, settings) {
      // takes zip, or city, state
      // returns location data object
      settings.locationInputEngine = {
        lookUpLocation: function(location_input, existing_locations) {

          var deferred = $.Deferred();
          var error_message = '';
          var error = false;
          var location_data_return = {};

          $.ajax({
            url: Drupal.settings.basePath + 'return_location_data',
            type: 'POST',
            data: {location: location_input, initial_login: true},
            success: function(data) {
              var parsed_data = $.parseJSON(data);
              if (parsed_data.name_city_state) { // zip code entered, returned city/state
                var city_count = parsed_data.city.length;
                location_data_return.city = parsed_data.city;

                if (city_count == 0) { //Unable to find data for that zip
                  error_message = 'The ZIP code you entered could not be found.';
                  error = true;
                } else if (city_count == 1) {
                  location_data_return.zip = parsed_data.zip;
                  location_data_return.city_select = false;
                  location_data_return.zip_codes = false; // not returning list of zip codes
                  location_data_return.city_attr = parsed_data.city_attr;
                  location_data_return.zip_attr = parsed_data.zip_attr;
                } else {
                  var all_city_attr = parsed_data.city_attr;
                  var city_select = '<select id="zip-lookup-city-state">';
                  var no_options = true;
                  location_data_return.zip = parsed_data.zip;
                  $.each(parsed_data.city, function(index, city) {
                    if ($.isArray(existing_locations[location_data_return.zip]) && $.inArray(city, existing_locations[location_data_return.zip]) == -1) {
                      city_select = city_select + '<option value="' + city + '">' + city + '</option>';
                      no_options = false;
                    }
                  });
                  city_select = city_select + '</select>';
                  if (no_options) {
                    error_message = 'All of the locations for the given zip code have been used.';
                    error = true;
                  }
                  location_data_return.city_select = city_select;
                  location_data_return.zip_codes = false; // not returning list of zip codes
                  location_data_return.city_attr = parsed_data.city_attr;
                  location_data_return.zip_attr = parsed_data.zip_attr;
                }
              }
              else {
                location_data_return.zip_array = parsed_data.zip_array;
                if (location_data_return.zip_array && location_data_return.zip_array.length == 0) {
                  error_message = 'No ZIP codes returned. Are you sure the city and state code were entered correctly? (e.g., Durham, NC)';
                  error = true;
                }
                else {
                  location_data_return.city = parsed_data.city;
                  location_data_return.state = parsed_data.state;
                  var location_name;
                  var zip_select = '<select id="city-state-lookup-zips">';
                  var previous_city = "";
                  var count = 0;
                  var no_options = true;
                  if (parsed_data.zip_attr) {
                    $.each(parsed_data.zip_attr, function(zip_code, zip_obj) {
                      location_name = zip_obj.city;
                      // Checks for tribes and adds disabled Tribe name into Zip Code select list
                      if (zip_obj.city != previous_city && parsed_data.state == "") {
                        zip_select = zip_select + '<option value="" disabled>' + zip_obj.city + '</option>';
                        previous_city = zip_obj.city;
                      }
                      if ($.inArray(location_name, existing_locations[zip_code]) == -1) {
                        zip_select = zip_select + '<option value="' + zip_code + '">' + zip_code + '</option>';
                        no_options = false;
                      }
                    });
                  }
                  zip_select = zip_select + '</select>';
                  if (no_options) {
                    error_message = 'All of the zip codes for the given location have been used.';
                    error = true;
                  }
                  location_data_return.zip_select = zip_select;
                  location_data_return.zip_codes = true;
                  location_data_return.city_attr = parsed_data.city_attr;
                  location_data_return.zip_attr = parsed_data.zip_attr;
                }
              }

              location_data_return.error = error;
              location_data_return.error_message = error_message;

              if (error) {
                deferred.reject(location_data_return);
              } else {
                deferred.resolve(location_data_return);
              }
            }
          });
          return deferred.promise();
        }
      }
    }
  }
})(jQuery);
