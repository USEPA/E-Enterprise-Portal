(function ($) {

    $(document).ready(function() {
        console.log('here');

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            console.log(position);
            console.log("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude);
        }

        getLocation();


        $('body').on('click', '#add-zip-code', function () {
            $(this).hide();
            $('#zip_container').append(newZipRow());
        });

        $('#change-location, #location-back-btn').click(function() {
            $('#zip_container').toggle();
            $('#new-location').toggle();
        });

        $('#add-location').click(function() {
            var location = $('#new-location-input').val();
            $.ajax({
                url: '/return_location_data',
                type: 'POST',
                data: {location: location},
                success: function(data) {
                    var parsed_data = $.parseJSON(data);
                    $('#nearest-location').text(parsed_data.string);
                    $('#zip_container').toggle();
                    $('#new-location').toggle();
                },
                failure: function() {
                    alert('Was unable to connect to service');
                }
            })
        });


        $('#save-preferences').click(function() {
            var zip_values = [];

            $('.new_zip').each(function() {
                zip_values.push($(this).val());
            });
            console.log(zip_values);
        });
        //function newZipRow() {
        //    var zip_row;
        //    zip_row = '<div class="col-xs-9"><div class="col-xs-4"><input class="new_zip"/></div>' +
        //    '<div class="col-xs-4"><button id="remove-zip-code" class="btn btn-danger">x</button></div>' +
        //    '<div class="col-xs-4"><button id="add-zip-code" class="btn btn-success">+</button></div></div>';
        //    return zip_row;
        //}




    });
})(jQuery);
