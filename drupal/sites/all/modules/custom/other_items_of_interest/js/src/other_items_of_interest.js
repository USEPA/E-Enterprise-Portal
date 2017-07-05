(function ($) {

    var ItemsOfInterestTable = function ($wrapper, rows, columns) {

        $wrapper.hide();
        this.wrapper = $wrapper;
        this.state_code = false;

        var cached = false;

        var datatable_options = {
            data: rows,
            columns: columns,
            "bLengthChange": false,
            "iDisplayLength": 3,
            "sPageButton": "favorites-ignore",
            "oLanguage": {
                "sSearch": "Filter:"
            },
            "pagingType": "simple",
            "dom": 'iftp',
            "fnDrawCallback": function () {
                var table = $(this).DataTable();
                var info = table.page.info();
                var pageNo = info.page + 1;

                if (info.pages > 1) {
                    var $current_li = $('<li />', {
                        class: 'pager-current'
                    })
                        .html(pageNo + ' of ' + info.pages);
                    $wrapper.find('.dataTables_paginate li:first').after($current_li);
                }
            }
        };


        this.hideTable = function () {
            $wrapper.hide();
        };

        this.update_current_location = function (location) {
            // find if in city, state code pattern
            if (location.indexOf(',') === -1) {
                this.state_code = location;
            }
            else {
                this.state_code = $.trim(location.split(',')[1]);
            }
            this.ajax_request();
        };

        this.ajax_request = function () {
            var state_code = this.state_code;
            $.ajax({
                beforeSend: function () {
                    $wrapper.html('<p>Loading&hellip;</p>');
                },
                url: ajax_url,
                method: "POST",
                data: {state: state_code},
                success: function (table) {
                    // alter the datatable id, one digit larger than the largest id
                    var newId = 0;
                    $("table[id^='datatable-']").each(function () {
                        newId = Math.max(newId, parseInt($(this).attr('id').substr('datatable-'.length), 10));
                    });
                    newId++;
                    var $table = $('<div>' + table + '</div>'); // wrap contents in a div for now, will unwrap later
                    $table.find('table').attr('id', 'datatable-' + newId);
                    $wrapper.html($table.html()); // unwrap
                    $wrapper.addClass('eportal-datatable-wrapper');
                    $table = $wrapper.find('table');
                    if ($table.length > 0) {
                        $table.DataTable(datatable_options);
                        $table.removeClass("dataTable display no-footer").addClass('views-table eportal-responsive-table usa-table-borderless');
                    }
                }
            });
        };

        this.showTable = function () {
            $wrapper.show();
        }

        // alter the datatable id, one digit larger than the largest id
        var newId = 0;
        $("table[id^='datatable-']").each(function () {
            newId = Math.max(newId, parseInt($(this).attr('id').substr('datatable-'.length), 10));
        });
        newId++;
        var $table = $wrapper.find('table');
        $table.attr('id', 'datatable-' + newId);
        $table.DataTable(datatable_options);
        $table.removeClass("dataTable display no-footer");
    }


    function return_location_name(location) {
        var index = location.indexOf('(');
        if (index > 0) {
            return $.trim(location.substr(0, location.indexOf('(')));
        }
        else {
            return location;
        }
    }


    $(document).ready(function () {

        var $tabs = $("#other-areas-tabs");
        $tabs.tabs();
        $tabs.find('.ui-corner-top').on('click', function (ev) {
            $(this).focus();
        });
        var additional_resources = Drupal.settings.additional_resources;
        var columns = additional_resources.columns;
        var current_location_table = new ItemsOfInterestTable($("#current-state-resources"),
            additional_resources.initial_location_resources, columns);
        if (!Drupal.settings.is_guest) {
            var user_locations_table = new ItemsOfInterestTable($("#favorite-state-resources"),
                additional_resources.user_resources, columns);
        }
        var all_resources_table = new ItemsOfInterestTable($("#all-state-resources"),
            additional_resources.all_resources, columns);
        // Generating EPA by using current location as EPA
        var epa_table = new ItemsOfInterestTable($("#epa-resources"),
            additional_resources.epa_resources, columns);

        // $(document).on('ee:zipCodeQueried', function (e, queryResponse) {
        //     location = queryResponse.string;
        //     $('#restrict-to-current-button a').text(location);
        //     current_location_table.update_current_location(location);
        //     current_location_table.ajax_request();
        // });

        if (!Drupal.settings.is_guest) {
            $('#restrict-to-states-button').click(function () {
                if ($(this).hasClass('inactive')) {
                    $(this).removeClass('inactive');
                    $("#all-states-button").addClass('inactive');
                    $('#restrict-to-current-button').addClass('inactive');
                    $("#epa-button").addClass('inactive');
                    all_resources_table.hideTable();
                    current_location_table.hideTable();
                    epa_table.hideTable();
                    user_locations_table.showTable();
                }
            });
        }

        $("#all-states-button").click(function () {
            if ($(this).hasClass('inactive')) {
                $(this).removeClass('inactive');
                $('#restrict-to-states-button').addClass('inactive');
                $('#restrict-to-current-button').addClass('inactive');
                $("#epa-button").addClass('inactive');

                all_resources_table.showTable();
                current_location_table.hideTable();
                if (!Drupal.settings.is_guest) {
                    user_locations_table.hideTable();
                }
                epa_table.hideTable();
            }
        });

        $('#restrict-to-current-button').click(function () {
            if ($(this).hasClass('inactive')) {
                $(this).removeClass('inactive');
                $('#restrict-to-states-button').addClass('inactive');
                $("#all-states-button").addClass('inactive');
                $("#epa-button").addClass('inactive');
                current_location_table.showTable();
                if (!Drupal.settings.is_guest) {
                    user_locations_table.hideTable();
                }
                all_resources_table.hideTable();
                epa_table.hideTable();
            }
        });

        $('#epa-button').click(function () {
            if ($(this).hasClass('inactive')) {
                $(this).removeClass('inactive');
                $('#restrict-to-states-button').addClass('inactive');
                $('#restrict-to-current-button').addClass('inactive');
                $("#all-states-button").addClass('inactive');
                current_location_table.hideTable();
                if (!Drupal.settings.is_guest) {
                    user_locations_table.hideTable();
                }
                all_resources_table.hideTable();
                epa_table.showTable();
            }
        });


        // Dynamically set button text for currently selected location
        $('#restrict-to-current-button a').text(Drupal.settings.additional_resources.initial_location);

        current_location_table.showTable();

    });


}(jQuery));