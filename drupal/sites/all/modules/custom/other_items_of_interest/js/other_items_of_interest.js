(function($) {

    $(document).ready(function() {
        var favorites_table;
        var all_states_table;
        var favorite_cached = false;
        var all_states_cached = false;
        var datatable_options = {
            "bPaginate": true,
            "sPaginationType": "full_numbers",
            "iDisplayLength": 3,
            "fnDrawCallback": function () {
                if ($('#other-areas-of-interest-table_wrapper .paginate_button').length < 6) {
                    $('#other-areas-of-interest-table_wrapper .dataTables_paginate')[0].style.display = "none";
                    $('#other-areas-of-interest-table_length')[0].style.display = "none";
                }
            }
        };

        function generateAllAreas() {
            if (!all_states_cached) {
                $.ajax({
                    beforeSend:  function() {
                        $('#other-items-table-wrapper').html('Loading...');
                    },
                    url:'generateAllAreasOfInterestTable',
                    success: function (table) {
                        $('#other-items-table-wrapper').html(table);
                        $('#other-areas-of-interest-table').DataTable(datatable_options);
                        all_states_table = $('#other-items-table-wrapper').html();
                        all_states_table = table;
                        all_states_cached = true;
                    }
                });
            }
            else {
                $('#other-items-table-wrapper').html(all_states_table);
                $('#other-areas-of-interest-table').DataTable(datatable_options);
            }
        }

        function generateFavoriteAreas() {
            if (!favorite_cached) {
                $.ajax({
                    beforeSend:  function() {
                        $('#other-items-table-wrapper').html('Loading...');
                    },                    url: 'generateFavoriteAreasOfInterestTable',
                    success: function (table) {
                        $('#other-items-table-wrapper').html(table);
                        $('#other-areas-of-interest-table').DataTable(datatable_options);
                        favorites_table = table;
                        favorite_cached = true;
                    }
                });
            }
            else {
                $('#other-items-table-wrapper').html(favorites_table);
                $('#other-areas-of-interest-table').DataTable(datatable_options);
            }
        }

        $('#restrict-to-states-button').click(function() {
           generateFavoriteAreas();
        });
        $("#all-states-button").click(function() {
            generateAllAreas();
        });
        generateFavoriteAreas();

    } );


}(jQuery));