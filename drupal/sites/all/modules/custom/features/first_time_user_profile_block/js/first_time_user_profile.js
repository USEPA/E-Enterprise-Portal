(function ($) {

    $(document).ready(function () {
        var selected_zip_code = '27705';
        var selected_city = 'Durham';
        var selected_state = 'NC';
        var nearest_zip = '27705';
        var nearest_city = 'Durham';
        var nearest_state = 'NC';
        var geolocation_used = false;

        $('#nearest-location').text(selected_city + ', ' + selected_state + ' (' + selected_zip_code + ')');

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
            $('#location-description-geo').html("Your location* <br/> Based on your service provider's location.");
            lookupAndProcessCityState(latitude, longitude);
        }


        function lookupAndProcessCityState(latitude, longitude) {
            var location_data;
            $.ajax({
                url: '/return_location_data_lat_long',
                type: 'GET',
                async: false,
                data: {latitude: latitude, longitude: longitude},
                success: function (location_data) {
                    location_data = $.parseJSON(location_data);
                    if (!location_data.error) {
                        nearest_city = location_data.city;
                        nearest_state = location_data.state;
                        nearest_zip = location_data.zip;
                        $('#nearest-location').text(nearest_city + ', ' + nearest_state + ' (' + nearest_zip + ')');
                        selected_zip_code = nearest_zip;
                        selected_state = nearest_state;
                        selected_city = nearest_city;
                        geolocation_used = true;
                    }
                    return location_data;
                },
                failure: function () {
                    alert('Unable to connect to service');
                }
            });
            return location_data;
        }

        getLocation();


        //$('body').on('click', '#add-zip-code', function () {
        //    $(this).hide();
        //    $('#zip_container').append(newZipRow());
        //});

        $('#change-location, #location-back-btn').click(function () {
            $('#zip_container').toggle();
            $('#new-location').toggle();
            $('#cancel-zip-select').toggle();

        });

        $('#confirm-zip-select').click(function () {
            selected_zip_code = $('#city-state-lookup-zips').val();
            var selected_location = $('#new-location-input').val();
            $('#nearest-location').text(selected_location + ' (' + selected_zip_code + ')');
            $('#new-location').hide();
            $('#zip_container').toggle();
            $('#choose-zip-holder').toggle();
            $('#cancel-zip-select').toggle();
        });

        $('#revert-to-geo-location').click(function () {
            $('#location-description-user').hide();
            $('#location-description-geo').show();
            $('#nearest-location').text(nearest_city + ', ' + nearest_state + ' (' + nearest_zip + ')');
            selected_zip_code = nearest_zip;
            selected_state = nearest_state;
            selected_city = nearest_city;
        });

        $('#cancel-zip-select').click(function () {
            $('#zip_container').show();
            $('#new-location').hide();
            $('#choose-zip-holder').hide();
            $(this).hide();
        });
        $('#add-location').click(function () {
            var location_input =  $('#new-location-input');
            var location = location_input.val();
            var is_valid_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{5}-\d{5}$)/.test(location);
            // regex for city, state code
            var is_city_state = /^[\w\s]+,\s*\w{2}$/.test(location);
            console.log(is_city_state);
            if (!is_city_state || !is_valid_zip) {
                location_input.addClass('input-error');

            }//console.log(isValidZip);
            throw new Error();
            $.ajax({
                url: '/return_location_data',
                type: 'POST',
                data: {location: location},
                //async: false,
                success: function (data) {
                    var parsed_data = $.parseJSON(data);
                    selected_city = parsed_data.city;
                    selected_state = parsed_data.state;
                    if (parsed_data.name_city_state) { // zip code entered, returned city/state
                        var parsed_zip = parsed_data.zip;
                        $('#nearest-location').text(parsed_data.city + ', ' + parsed_data.state + ' (' + parsed_zip + ')');
                        selected_zip_code = parsed_zip;
                        $('#zip_container').toggle();
                        $('#new-location').toggle();
                        $('#location-description-user').show();
                        $('#location-description-geo').hide();
                        $('#cancel-zip-select').toggle();
                    }
                    else {
                        var zip_select = '<select id="city-state-lookup-zips">';
                        $.each(parsed_data.zip_array, function (index, zip_code) {
                            zip_select = zip_select + '<option value="' + zip_code + '">' + zip_code + '</option>';
                        });
                        zip_select = zip_select + '</select>';
                        $('#new-location-input').val(parsed_data.city + ', ' + parsed_data.state);
                        $('#choose-zip').html(zip_select);
                        //$('#new-location').hide();
                        $('#typed-in-city-state').text(location);
                        $('#choose-zip-holder').show();
                    }
                },
                failure: function () {
                    alert('Was unable to connect to service');
                }
            });
        });


        $('#skip-preferences').click(function () {
            $.ajax({
                url: '/save_first_time_user_preferences',
                type: 'GET',
                data: {skip: 1, zip: '', geolocation_used: geolocation_used, geolocation_zip: nearest_zip},
                success: function () {
                    $('#location-select').append('<option value="' + nearest_zip + '" selected>' + nearest_city + ', ' + nearest_state + '</option>').trigger('change');
                    $('.pane-views-first-time-user-profile-block').dialog('close');
                }
            });
        });

        $('#save-preferences').click(function () {
            //var zip_values = [];
            var term_names = [];
            //
            //$('.new_zip').each(function() {
            //    zip_values.push($(this).val());
            //});
            $('.term-name-checkboxes:checked').each(function () {
                term_names.push($(this).val());
            });
            $.ajax({
                url: '/save_first_time_user_preferences',
                type: 'GET',
                data: {
                    skip: 0,
                    zip: selected_zip_code,
                    term_names: term_names,
                    geolocation_used: geolocation_used,
                    geolocation_zip: nearest_zip
                },
                success: function (msg) {
                    console.log(msg);
                    var parsed_msg = $.parseJSON(msg);
                    if (parsed_msg.success) {
                        $('#location-select').append('<option value="' + selected_zip_code + '" selected>' + selected_city + ', ' + selected_state + '</option>').trigger('change');
                        $('.pane-views-first-time-user-profile-block').dialog('close');
                    }
                    else {
                        console.log(parsed_msg.error_msg);
                    }
                }
            })
        });

        // If first time user, show modal for profile saving options
        var first_time_user_block = $('#first-time-user-block');
        if (first_time_user_block.length > 0) {
            first_time_user_block.dialog({
                modal: true,
                autoOpen: true,
                width: 1100,
                height: 750,
                dialogClass: 'first-time-user-dialog'
            });
        }

        //function newZipRow() {
        //    var zip_row;
        //    zip_row = '<div class="col-xs-9"><div class="col-xs-4"><input class="new_zip"/></div>' +
        //    '<div class="col-xs-4"><button id="remove-zip-code" class="btn btn-danger">x</button></div>' +
        //    '<div class="col-xs-4"><button id="add-zip-code" class="btn btn-success">+</button></div></div>';
        //    return zip_row;
        //}


    });
})(jQuery);
