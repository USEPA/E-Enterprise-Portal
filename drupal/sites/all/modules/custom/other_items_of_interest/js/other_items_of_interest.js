(function($) {

    $(document).ready(function() {

        var $tabs = $("#other-areas-tabs");
        $tabs.tabs();
        var favorite_cached = false;
        var all_states_cached = false;
        var $favorite_state_wrapper = $("#favorite-state-resources");
        var $all_state_resources_wrapper = $("#all-state-resources");
        var datatable_options = function($table_wrapper) {
            return {
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "oPaginate": {
                        sLast: ">>",
                        sNext: ">",
                        sFirst: "<<",
                        sPrevious: "<"
                    }
                },
                "bLengthChange": false,
                "sPageButton": "favorites-ignore",
                "iDisplayLength": 4,
                "fnDrawCallback": function () {
                    if ($table_wrapper.find('.paginate_button').length < 6) {
                        $table_wrapper.find('.dataTables_paginate')[0].style.display = "none";
                    }
                }
            };
        }


        function generateAllAreas() {
            if (!all_states_cached) {
                $.ajax({
                    beforeSend:  function() {
                        $all_state_resources_wrapper.show();
                        $all_state_resources_wrapper.html('Loading...');
                    },
                    url:'generateAllAreasOfInterestTable',
                    success: function (table) {
                        $all_state_resources_wrapper.html(table);
                        var $table = $all_state_resources_wrapper.find('table');
                        $table.DataTable(datatable_options($all_state_resources_wrapper));
                        all_states_cached = true;
                        $favorite_state_wrapper.hide();
                    }
                });
            }
            else {
                $all_state_resources_wrapper.show();
                $favorite_state_wrapper.hide();
            }
        }

        function generateFavoriteAreas() {
            if (!favorite_cached) {
                $.ajax({
                    beforeSend:  function() {
                        $favorite_state_wrapper.show();
                        $favorite_state_wrapper.html('Loading...');
                    },                    url: 'generateFavoriteAreasOfInterestTable',
                    success: function (table) {
                        $favorite_state_wrapper.html(table);
                        var $table = $favorite_state_wrapper.find('table');
                        $table.DataTable(datatable_options($favorite_state_wrapper));
                        favorite_cached = true;
                        $all_state_resources_wrapper.hide();
                    }
                });
            }
            else {
                $favorite_state_wrapper.show();
                $all_state_resources_wrapper.hide();
            }
        }

         $('#restrict-to-current-button a').text(location);

        $('#restrict-to-states-button').click(function() {
            if ($(this).hasClass('inactive')){
                $(this).removeClass('inactive');
                $("#all-states-button").addClass('inactive');
            }
            generateFavoriteAreas();
        });
        $("#all-states-button").click(function() {
            if ($(this).hasClass('inactive')){
                $(this).removeClass('inactive');
                $('#restrict-to-states-button').addClass('inactive');
            }
            generateAllAreas();
        });
        generateFavoriteAreas();

    } );


}(jQuery));