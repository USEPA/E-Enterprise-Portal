(function ($) {

    $(document).ready(function () {


        // If first time user, show modal for profile saving options
        var first_time_user_block = $('#first-time-user-block');
        if (first_time_user_block.length > 0) {

            var selected_zip_code = '27705';
            var selected_city = 'Durham';
            var selected_state = 'NC';
            var selected_urban = 'Urban';
            var selected_pop = 228330;
            var preferred_name = 'Durham, NC';
            var nearest_zip = '27705';
            var nearest_city = 'Durham';
            var nearest_state = 'NC';
            var geolocation_used = 0;
            var all_city_attr = [];
            var all_zip_attr = [];

            var $org_select = $('#select-organization');
            var $zip_select =  $('#zip_container');
            var $nearest_location = $('#nearest-location');
            var $location_desc_user = $('#location-description-user');
            var $location_desc_na =  $('#location-description-na');
            var $loading_user_loc = $('#loading-user-location');
            var $new_loc_input = $('#new-location-input');
            var $loc_add_new = $('#location-add-new');
            var $choose_zip_holder =   $('#choose-zip-holder');
            var $cancel_zip = $('#cancel-zip-select');
            var $choose_city_holder =   $('#choose-city-holder');
            // Initialize  location with default information
            $nearest_location.text(selected_city + ', ' + selected_state + ' (' + selected_zip_code + ')');

            // Used if user did not allow geolocation
            function showDefaultData() {
                // show default data previously set
                $location_desc_user.show();
                $location_desc_na.show();
                $loading_user_loc.hide();
            }


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
                $location_desc_na.text('Until you choose a location, the default location will be the location detected by the browser.').show();
                nearest_city = location_data.city;
                nearest_state = location_data.state;
                nearest_zip = location_data.zip;
                preferred_name = nearest_city + ', ' + nearest_state;
                $nearest_location.text(nearest_city + ', ' + nearest_state + ' (' + nearest_zip + ')');
//                        $location_desc_na.hide();
                selected_zip_code = nearest_zip;
                selected_state = nearest_state;
                selected_city = nearest_city;
                geolocation_used = 1;
                $location_desc_user.show();
                $loading_user_loc.hide();
            }

            function setCommunitySizeType(zip) {
                // console.log(all_zip_attr);
                // console.log(all_city_attr);
                if(all_zip_attr) {
                    if(zip in all_zip_attr) {
                        if(all_zip_attr[zip]['urban']) {
                            if(preferred_name && all_city_attr) {
                                if(preferred_name in all_city_attr) {
                                    selected_pop = all_city_attr[preferred_name]['pop'];
                                } else {
                                    selected_pop = all_zip_attr[zip]['pop'];
                                }
                            } else {
                                selected_pop = all_zip_attr[zip]['pop'];
                            }
                            selected_urban = all_zip_attr[zip]['urban'];
                            if(selected_urban.toLowerCase() == "urban") {
                                $('input[name=community-type]:nth(1)').prop('checked', true);
                            } else {
                                $('input[name=community-type]:nth(0)').prop('checked', true);
                            }
                            if(selected_pop < 5000) {
                                $('#community-size option:contains(0 - 5,000)').prop('selected', true);
                            } else if(selected_pop < 10000) {
                                $('#community-size option:contains(5,000 - 10,000)').prop('selected', true);
                            } else if(selected_pop < 25000) {
                                $('#community-size option:contains(10,000 - 25,000)').prop('selected', true);
                            } else if(selected_pop < 100000) {
                                $('#community-size option:contains(25,000 - 100,000)').prop('selected', true);
                            } else if(selected_pop < 1000000) {
                                $('#community-size option:contains(100,000 - 1,000,000)').prop('selected', true);
                            } else {
                                $('#community-size option:contains(1,000,000+)').prop('selected', true);
                            }
                        } else {
                            // Reset options if not found in census data
                            $('input[name=community-type]').prop('checked', false);
                            $('#community-size').val('');
                        }
                    } else {
                        // Reset options if not found in census data
                        $('input[name=community-type]').prop('checked', false);
                        $('#community-size').val('');
                    }
                } else {
                    // Reset options if not found in census data
                    $('input[name=community-type]').prop('checked', false);
                    $('#community-size').val('');
                }

            }

            var countEnter = 0;
            $('.term-name-checkboxes').on('keyup', function (e) {
            	if ((e.which == 13) && (countEnter == 1)) { // Enter key
                $(this).trigger('click');
            	}
            	else if (e.which == 13 && countEnter == 0) {
	            	countEnter = countEnter + 1;
            	}
            });
        		
            // Show zip selection options
            $('#change-location').click(function () {
                $zip_select.hide();
                $new_loc_input.val('');
                $loc_add_new.show();
                $choose_zip_holder.hide();
                $cancel_zip.show();
                $choose_city_holder.hide();
                $('#new-location-input').focus();
                return false;
            });

            // User has found zip they want, show in selected/nearest data
            $('#confirm-zip-select').click(function () {
                selected_zip_code = $('#city-state-lookup-zips').val();
                var selected_location = all_zip_attr[selected_zip_code]['city'];
                setCommunitySizeType(selected_zip_code);
                $location_desc_user.show();
                $nearest_location.text(selected_location + ' (' + selected_zip_code + ')');
                $zip_select.show();
                $loc_add_new.hide();
                $('#nearest-location').prop('tabindex',0);
                $('#nearest-location').focus();
            });

            // User has found city they want, show in selected/nearest data
            $('#confirm-city-select').click(function () {
                preferred_name = $('#zip-lookup-city-state').val();
                var selected_location = $new_loc_input.val();
                setCommunitySizeType(selected_location);
                $location_desc_user.show();
                $nearest_location.text(preferred_name + ' (' + selected_location + ')');
                $zip_select.show();
                $loc_add_new.hide();
                $('#nearest-location').prop('tabindex',0);
                $('#nearest-location').focus();
            });

            //$('#revert-to-geo-location').click(function () {
            //    $nearest_location.text(nearest_city + ', ' + nearest_state + ' (' + nearest_zip + ')');
            //    selected_zip_code = nearest_zip;
            //    selected_state = nearest_state;
            //    selected_city = nearest_city;
            //});

            //Hide Zip selection options
            $cancel_zip.click(function () {
                $zip_select.show();
                $loc_add_new.hide();
                $choose_zip_holder.hide();
                $choose_city_holder.hide();
                clear_city_state_error();
                $cancel_zip.hide();
                $('#change-location').focus();
            });
            $('#add-location').click(function () {
                var location_input = $new_loc_input;
                var location = location_input.val();
                var is_valid_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{5}-\d{5}$)/.test(location);
                // regex for city, state code
                var is_city_state = /^[\w\s]+,\s*\w{2}$/.test(location);
                // if (!is_city_state && !is_valid_zip) {
                //     location_input.addClass('input-error');
                //     $('#location-error-message').remove();
                //     var error_message = '<span id="location-error-message">Please input a valid ZIP code or a city and state code separated by a comma (e.g., Durham, NC)</span>';
                //     $loc_add_new.append(error_message);
                // }
                //throw new Error();
                //else {
                    $('#location-error-message').remove();
                    location_input.removeClass('input-error');
                    lookupAndProcessLocation(location, location_input);
                //}
            });

            // accepts city, state or zipcodes.
            function lookupAndProcessLocation(location, location_input) {
                var error_message = '';
                $.ajax({
                    url: '/return_location_data',
                    type: 'POST',
                    data: {location: location, initial_login: true},
                    success: function (data) {
                        var parsed_data = $.parseJSON(data);
                        // zip code entered, returned city/state
                        if (parsed_data.name_city_state) {
                            var city_count = parsed_data.city.length;
                            if (city_count == 0) { //Unable to find data for that zip
                                error_message = '<span id="location-error-message">The ZIP code you entered could not be found.</span>';
                                $loc_add_new.append(error_message);
                                location_input.addClass('input-error');
                            }
                            else if (city_count == 1) { //Only one city/tribal area match
                                selected_state = parsed_data.state;
                                var parsed_zip = parsed_data.zip;
                                // Get city & zip attribute data
                                all_zip_attr = parsed_data.zip_attr;
                                all_city_attr = parsed_data.city_attr;
                                // Update form with new location
                                $nearest_location.text(parsed_data.city[0] + ' (' + parsed_zip + ')');
                                selected_zip_code = parsed_zip;
                                preferred_name = parsed_data.city[0];
                                // Set community size & type fields based on census data
                                setCommunitySizeType(selected_zip_code);
                                $zip_select.show();
                                $loc_add_new.hide();
                                $choose_city_holder.hide();
                            }
                            else { //More than one city/tribal area match
                                selected_zip_code = parsed_data.zip;
                                selected_state = parsed_data.state;
                                // Get city & zip attribute data
                                all_zip_attr = parsed_data.zip_attr;
                                all_city_attr = parsed_data.city_attr;
                                // Create a city dropdown for the user to select from
                                // Community size/type will be populated based on selection
                                var city_select = '<select id="zip-lookup-city-state">';
                                $.each(parsed_data.city, function (index, city) {
                                    city_select = city_select + '<option value="' + city + '">' + city + '</option>';
                                });
                                city_select = city_select + '</select>';
                                $new_loc_input.val(selected_zip_code);
                                $('#choose-city').html(city_select);
                                $('#typed-in-city-state').text(location);
                                $choose_city_holder.show();
                                $('#zip-lookup-city-state').focus();
                            }
                        }
                        else { //Still uses old FRS-style for doing city/state -> zip lookups (i.e. no census data or auto-populating community size/type)
                            var zip_array = parsed_data.zip_array;
                            var zip_count = zip_array.length;
                            if (zip_count == 0) {
                                error_message = '<span id="location-error-message">No ZIP codes returned. Are you sure the city and state code were entered correctly? (e.g., Durham, NC)</span>';
                                $loc_add_new.append(error_message);
                            }
                            else if (zip_count == 1) {
                                selected_city = parsed_data.city;
                                selected_state = parsed_data.state;
                                all_zip_attr = parsed_data.zip_attr;
                                all_city_attr = parsed_data.city_attr;
                                if (selected_state) {
                                    preferred_name = selected_city + ", " + selected_state;
                                } else {
                                    preferred_name = selected_city;
                                }
                                selected_zip_code = zip_array[0];
                                $location_desc_user.show();
                                $nearest_location.text(preferred_name + ' (' + selected_zip_code + ')');
                                setCommunitySizeType(selected_zip_code);
                                $zip_select.show();
                                $loc_add_new.hide();
                                $new_loc_input.val('');
                            }
                            else {
                                selected_city = parsed_data.city;
                                selected_state = parsed_data.state;
                                if (selected_state) {
                                    preferred_name = selected_city + ", " + selected_state;
                                } else {
                                    preferred_name = selected_city;
                                }
                                // Get city & zip attribute data
                                all_zip_attr = parsed_data.zip_attr;
                                all_city_attr = parsed_data.city_attr;
                                var zip_select = '<select id="city-state-lookup-zips">';
                                $.each(parsed_data.zip_array, function (index, zip_code) {
                                    zip_select = zip_select + '<option value="' + zip_code + '">' + zip_code + '</option>';
                                });
                                zip_select = zip_select + '</select>';
                                //$new_loc_input.val(selected_city + ', ' + selected_state);
                                $('#choose-zip').html(zip_select);
                                $('#typed-in-city-state').text(location);
                                $choose_zip_holder.show();
                                $('#city-state-lookup-zips').focus();
                            }
                        }
                    },
                    failure: function () {
                        alert('Was unable to connect to service');
                    }
                });
            }

            function clear_city_state_error() {
                $new_loc_input.removeClass('input-error');
                $('#location-error-message').remove();
            }


            $org_select.change(function() {
                var val = $(this).find('option:selected').text();

                $local_govern_opts = $('#local-government-options');
                if (val == 'Local government') {
                    $local_govern_opts.show();
                }
                else {
                    $local_govern_opts.hide();
                }

            });

            $('#skip-preferences').on('click', skipGettingStarted);
            $(first_time_user_block).on('keydown', function(e) {
	            if (e.which === 27) {
		            event.preventDefault();
		            skipGettingStarted();
		            first_time_user_block.dialog('close');
	            }
            });

            $('#save-preferences').click(function () {
                var interests = [];
                var org_val = $org_select.val();
                var org_text = $org_select.find('option:selected').text();
                var role_val = $('#select-role').val();
                var comm_size_val = 0;
                var comm_type_val = 0;
                if (org_text == 'Local government') {
                    var selected_size = $('#community-size').val();
                    var type_checkboxes = $('input[name=community-type]:checked');
                    if  (selected_size != '') {
                        comm_size_val = selected_size;
                    }
                    if (type_checkboxes.length > 0) {
                        comm_type_val = type_checkboxes.val();
                    }
                }

                // Collect interests from checkboxes

                $('.term-name-checkboxes:checked').each(function() {
                    var current_checkbox = $(this);
                    interests.push(current_checkbox.val());
                });

                $.ajax({
                    url: '/save_first_time_user_preferences',
                    type: 'POST',
                    data: {
                        skip: 0,
                        zip: selected_zip_code,
                        preferred_name: preferred_name,
                        geolocation_used: geolocation_used,
                        geolocation_zip: nearest_zip,
                        org: org_val,
                        role: role_val,
                        comm_size: comm_size_val,
                        comm_type: comm_type_val,
                        interests: interests
                    },
                    success: function (msg) {
                        var parsed_msg = $.parseJSON(msg);
                        $(document).trigger("ee:first_time_user_complete");
                        if (parsed_msg.success) {
                            $('#location-select').html('<option value="' + selected_zip_code + '" selected>' + preferred_name + ' (' + selected_zip_code + ')</option>').trigger('change');
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

            $('#switch-to-interests').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('.first-time-first-page').hide();
                $('.first-time-second-page').show();
                $('.term-name-checkboxes').filter(":first").focus();
                $('.term-name-checkboxes').filter(":first").attr('checked', false);
            });

            $('#switch-to-first-page').click(function() {
                $('.first-time-first-page').show();
                $('.first-time-second-page').hide();
                $org_select.focus();
            });


            $(window).resize(function () {
                first_time_user_block.dialog("option", "position", {my: "center", at: "center", of: window});
            });

            // After 5 seconds of inactivity from geolocation show the default
            var timeout = setTimeout(
                function () {
                    showDefaultData();
                }, 1000);
            // Try to get local settings via gelocation
            getLocation();
        }
        
        function skipGettingStarted() {
          // If user blocks location and skips Getting Started, leave zip and geolocation_zip blank
          if (geolocation_used == 0) {
            nearest_zip = '';
          }	            
            $.ajax({
                url: '/save_first_time_user_preferences',
                type: 'POST',
                data: {
                  skip: 1, 
                  zip: '', 
                  geolocation_used: geolocation_used, 
                  geolocation_zip: nearest_zip
                },
                success: function () {
                    $(document).trigger("ee:first_time_user_complete");
                    $('#location-select').html('<option value="' + nearest_zip + '" selected>' + nearest_city + ', ' + nearest_state + ' (' + nearest_zip +')</option>').trigger('change');
                   $('.pane-views-first-time-user-profile-block').dialog('close');
                }
            });
            return false;
        }
        
    });
})(jQuery);
