(function ($) {
    Drupal.behaviors.locationInputEngine = {
        attach: function (context, settings) {
            // takes zip, or city, state
            // returns location data object
            settings.locationInputEngine = {
                lookUpLocation: function (location_input) {

                    var deferred = $.Deferred();
                    var error_message = '';
                    var error = false;
                    var location_data_return = {};

                    $.ajax({
                        url: '/return_location_data',
                        type: 'POST',
                        data: {location: location_input, initial_login: true},
                        success: function (data) {
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
                                    location_data_return.zip = parsed_data.zip;
                                    $.each(parsed_data.city, function (index, city) {
                                        city_select = city_select + '<option value="' + city + '">' + city + '</option>';
                                    });
                                    city_select = city_select + '</select>';
                                    location_data_return.city_select = city_select;
                                    location_data_return.zip_codes = false; // not returning list of zip codes
                                    location_data_return.city_attr = parsed_data.city_attr;
                                    location_data_return.zip_attr = parsed_data.zip_attr;
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
                                    var previous_city = "";
                                    var count = 0;
                                    if (parsed_data.zip_attr) {
                                        $.each(parsed_data.zip_attr, function (zip_code, zip_obj) {
                                            if (zip_obj.city != previous_city && parsed_data.state == "") {
                                                //if (count == 0) {
                                                //    zip_select = zip_select + '<option value="" disabled selected>' + zip_obj.city + '</option>';
                                                //    count = count + 1;
                                                //}
                                                //else
                                                zip_select = zip_select + '<option value="" disabled>' + zip_obj.city + '</option>';
                                                previous_city = zip_obj.city;
                                            }
                                            zip_select = zip_select + '<option value="' + zip_code + '">' + zip_code + '</option>';
                                        });
                                    }
                                    zip_select = zip_select + '</select>';
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