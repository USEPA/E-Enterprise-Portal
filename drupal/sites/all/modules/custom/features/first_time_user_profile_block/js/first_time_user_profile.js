(function ($) {

    $(document).ready(function () {


        // If first time user, show modal for profile saving options
        var first_time_user_block = $('#first-time-user-block');
        if (first_time_user_block.length > 0) {

            var selected_zip_code = '27705';
            var selected_city = 'Durham';
            var selected_state = 'NC';
            var nearest_zip = '27705';
            var nearest_city = 'Durham';
            var nearest_state = 'NC';
            var geolocation_used = false;

            // Initialize  location with default information
            $('#nearest-location').text(selected_city + ', ' + selected_state + ' (' + selected_zip_code + ')');

            // After 5 seconds of inactivity from geolocation show the default
            var timeout = setTimeout(
                function () {
                    showDefaultData();
                }, 1000);
            // Try to get local settings via gelocation
            getLocation();


            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            }

            function showPosition(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                // cancel showing default timeout
                clearTimeout(timeout);
                lookupAndProcessCityState(latitude, longitude);
            }


            function lookupAndProcessCityState(latitude, longitude) {
                $.ajax({
                    url: '/return_location_data_lat_long',
                    type: 'GET',
                    async: false,
                    data: {latitude: latitude, longitude: longitude},
                    success: function (location_data) {
                        var location_data = $.parseJSON(location_data);

                        if (!location_data.error) {
                            showUserLocalData(location_data);
                        }
                        else {
                            showDefaultData();
                        }
                        return location_data;
                    },
                    failure: function () {
                        alert('Unable to connect to service');
                    }
                });
            }

            function showUserLocalData(location_data) {
                // Reset nearest/selected to user's location data
                $('#location-description-na').text('Until you choose a location, the default location will be the location detected by the browser.').show();
                nearest_city = location_data.city;
                nearest_state = location_data.state;
                nearest_zip = location_data.zip;
                $('#nearest-location').text(nearest_city + ', ' + nearest_state + ' (' + nearest_zip + ')');
//                        $('#location-description-na').hide();
                selected_zip_code = nearest_zip;
                selected_state = nearest_state;
                selected_city = nearest_city;
                geolocation_used = true;
                $('#location-description-user').show();
                $('#loading-user-location').hide();
            }

            // Used if user did not allow geolocation
            function showDefaultData() {
                // show default data previously set
                $('#location-description-user').show();
                $('#location-description-na').show();
                $('#loading-user-location').hide();
            }


            // Show zip selection options
            $('#change-location').click(function () {
                $('#zip_container').hide();
                $('#new-location-input').val('');
                $('#location-add-new').show();
                $('#choose-zip-holder').hide();
                $('#cancel-zip-select').show();
                return false;
            });

            // User has found zip they want, show in selected/nearest data
            $('#confirm-zip-select').click(function () {
                selected_zip_code = $('#city-state-lookup-zips').val();
                var selected_location = $('#new-location-input').val();
                $('#location-description-user').show();
                $('#nearest-location').text(selected_location + ' (' + selected_zip_code + ')');
                $('#zip_container').show();
                $('#location-add-new').hide();
            });

            //$('#revert-to-geo-location').click(function () {
            //    $('#nearest-location').text(nearest_city + ', ' + nearest_state + ' (' + nearest_zip + ')');
            //    selected_zip_code = nearest_zip;
            //    selected_state = nearest_state;
            //    selected_city = nearest_city;
            //});

            //Hide Zip selection options
            $('#cancel-zip-select').click(function () {
                $('#zip_container').show();
                $('#location-add-new').hide();
                $('#choose-zip-holder').hide();
                clear_city_state_error();
                $(this).hide();
            });
            $('#add-location').click(function () {
                var location_input = $('#new-location-input');
                var location = location_input.val();
                var is_valid_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{5}-\d{5}$)/.test(location);
                // regex for city, state code
                var is_city_state = /^[\w\s]+,\s*\w{2}$/.test(location);
                if (!is_city_state && !is_valid_zip) {
                    location_input.addClass('input-error');
                    $('#location-error-message').remove();
                    var error_message = '<span id="location-error-message">Please input a valid ZIP code or a city and state code separated by a comma (e.g., Durham, NC)</span>';
                    $('#location-add-new').append(error_message);
                }
                //throw new Error();
                else {
                    $('#location-error-message').remove();
                    location_input.removeClass('input-error');
                    lookupAndProcessLocation(location, location_input);
                }
            });

            // accepts city, state or zipcodes.
            function lookupAndProcessLocation(location, location_input) {
                var error_message = '';
                $.ajax({
                    url: '/return_location_data',
                    type: 'POST',
                    data: {location: location},
                    success: function (data) {
                        var parsed_data = $.parseJSON(data);
                        console.log(parsed_data);
                        // zip code entered, returned city/state
                        if (parsed_data.name_city_state) {
                            selected_city = parsed_data.city;
                            if (selected_city == '') { //Unable to find data for that zip
                                error_message = '<span id="location-error-message">The ZIP code you entered could not be found.</span>';
                                $('#location-add-new').append(error_message);
                                location_input.addClass('input-error');
                            }
                            else {
                                selected_state = parsed_data.state;
                                var parsed_zip = parsed_data.zip;
                                $('#nearest-location').text(parsed_data.city + ', ' + parsed_data.state + ' (' + parsed_zip + ')');
                                selected_zip_code = parsed_zip;
                                $('#zip_container').show();
                                $('#location-add-new').hide();
                                $('#choose-zip-holder').hide();
                            }
                        }
                        else {
                            var zip_array = parsed_data.zip_array;
                            var zip_count = zip_array.length;
                            if (zip_count == 0) {
                                error_message = '<span id="location-error-message">No ZIP codes returned. Are you sure the city and state code were entered correctly? (e.g., Durham, NC)</span>';
                                $('#location-add-new').append(error_message);
                            }
                            else if (zip_count == 1) {
                                selected_city = parsed_data.city;
                                selected_state = parsed_data.state;
                                selected_zip_code = zip_array[0];
                                $('#location-description-user').show();
                                $('#nearest-location').text(selected_city + ', ' + selected_state + ' (' + selected_zip_code + ')');
                                $('#zip_container').show();
                                $('#location-add-new').hide();
                                $('#new-location-input').val('');
                            }
                            else {
                                selected_city = parsed_data.city;
                                selected_state = parsed_data.state;
                                var zip_select = '<select id="city-state-lookup-zips">';
                                $.each(parsed_data.zip_array, function (index, zip_code) {
                                    zip_select = zip_select + '<option value="' + zip_code + '">' + zip_code + '</option>';
                                });
                                zip_select = zip_select + '</select>';
                                $('#new-location-input').val(selected_city + ', ' + selected_state);
                                $('#choose-zip').html(zip_select);
                                $('#typed-in-city-state').text(location);
                                $('#choose-zip-holder').show();
                            }
                        }
                    },
                    failure: function () {
                        alert('Was unable to connect to service');
                    }
                });
            }

            function clear_city_state_error() {
                $('#new-location-input').removeClass('input-error');
                $('#location-error-message').remove();
            }

            $('#skip-preferences').click(function () {
                $.ajax({
                    url: '/save_first_time_user_preferences',
                    type: 'GET',
                    data: {skip: 1, zip: '', geolocation_used: geolocation_used, geolocation_zip: nearest_zip},
                    success: function () {
                        $('#location-select').html('<option value="' + nearest_zip + '" selected>' + nearest_city + ', ' + nearest_state + '</option>').trigger('change');
                        $('.pane-views-first-time-user-profile-block').dialog('close');
                    }
                });
                return false;
            });

            $('#save-preferences').click(function () {
                $.ajax({
                    url: '/save_first_time_user_preferences',
                    type: 'GET',
                    data: {
                        skip: 0,
                        zip: selected_zip_code,
                        geolocation_used: geolocation_used,
                        geolocation_zip: nearest_zip
                    },
                    success: function (msg) {
                        var parsed_msg = $.parseJSON(msg);
                        if (parsed_msg.success) {
                            $('#location-select').html('<option value="' + selected_zip_code + '" selected>' + selected_city + ', ' + selected_state + '</option>').trigger('change');
                        }
                        else {
                            console.log(parsed_msg.error_msg);
                        }
                        first_time_user_block.dialog('close');

                    }
                })
            });

            first_time_user_block.dialog({
                title: '<span>Getting Started</span>What matters to you?',
                modal: true,
                autoOpen: true,
                width: 1100,
                height: 600,
                //height: auto,
                dialogClass: 'first-time-user-dialog'
            });


            $(window).resize(function () {
                first_time_user_block.dialog("option", "position", {my: "center", at: "center", of: window});
            });
        }
    });
})(jQuery);
