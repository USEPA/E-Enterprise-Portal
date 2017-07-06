(function ($) {

    var ItemsOfInterestTable = function ($wrapper, rows, columns) {

        var cached = false;
        var location;
        var datatable_options = {
            data: rows,
            columns: columns,
            "bLengthChange": false,
            "iDisplayLength": 3,
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

        this.setLocation = function(new_location) {
            location = new_location;
        }


        this.updateCurrentLocation = function (new_location) {
            if (new_location != location) {
                location = new_location;
                // find if in city, state code pattern
                if (location.indexOf(',') >= 0) {
                    location = $.trim(location.split(',')[1]);
                }
                loadDataByLocation(location);
            }
        };

        var loadDataByLocation = function (location) {
            $.ajax({
                url: 'additional_resources/rows_by_location',
                method: "GET",
                data: {location: location},
                dataType: 'JSON',
                success: function (rows) {
                    updateDatatable(rows);
                }
            });
        };

        var createDatatable = function () {
            // alter the datatable id, one digit larger than the largest id
            var newId = 0;
            $("table[id^='datatable-']").each(function () {
                newId = Math.max(newId, parseInt($(this).attr('id').substr('datatable-'.length), 10));
            });
            newId++;
            var $table = $wrapper.find('table');
            $table.attr('id', 'datatable-' + newId);
            var tableDT = $table.DataTable(datatable_options);
            $table.removeClass("dataTable display no-footer");
            tableDT.columns().iterator('column', function (ctx, idx) {
                $(tableDT.column(idx).header()).append('<span class="sort-icon" />');
            });
        }

        var updateDatatable = function (rows) {
            var $table = $wrapper.find('table');
            var tableDT = $table.DataTable();
            tableDT.clear();
            tableDT.rows.add(rows);
            tableDT.draw();
        }

        $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
        createDatatable();
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
        current_location_table.setLocation(additional_resources.initial_location);
        if (!Drupal.settings.is_guest) {
            var user_locations_table = new ItemsOfInterestTable($("#favorite-state-resources"),
                additional_resources.user_resources, columns);
        }
        var all_resources_table = new ItemsOfInterestTable($("#all-state-resources"),
            additional_resources.all_resources, columns);
        // Generating EPA by using current location as EPA
        var epa_table = new ItemsOfInterestTable($("#epa-resources"),
            additional_resources.epa_resources, columns);

        $(document).on('ee:zipCodeQueried', function (e, queryResponse) {
            $('#restrict-to-current-button a').text(queryResponse.string);
            current_location_table.updateCurrentLocation(queryResponse.string);
        });

        // Dynamically set button text for currently selected location
        $('#restrict-to-current-button a').text(additional_resources.initial_location);

    });


}(jQuery));