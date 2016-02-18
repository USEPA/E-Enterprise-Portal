(function($) {
    function truncate(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        var truncated = text.substr(0, maxLength);
        var spaceIndex = truncated.lastIndexOf(' ');
        if (spaceIndex === -1) {
            return truncated + '...';
        }
        return truncated.substring(0, spaceIndex) + '...';
    }

    var LocalResourcesTable = function($wrapper, ajax_url) {

        $wrapper.hide();

        var datatable_options =  {
            "bLengthChange": false,
            "sPageButton": "favorites-ignore",
            "iDisplayLength": 3
        };

        var cached = false;
        this.wrapper = $wrapper;
        this.ajax_url = ajax_url;

        this.hideTable = function() {
            $wrapper.hide();
        }


        this.ajax_request = function() {
            var state_code = this.state_code;
            $.ajax({
                beforeSend:  function() {
                    $wrapper.html('Loading...');
                },
                url: ajax_url,
                method: "POST",
                data: {state: state_code},
                success: function (table) {
                    $wrapper.html(table);
                    var $table = $wrapper.find('table');
                    if ($table.length > 0) {
                        $table.DataTable(datatable_options);
                        $table.removeClass("dataTable no-footer").addClass('views-table cols-3 responsive-table');
                    }
                    else {
                        //         $wrapper.html('No resources found for ' + state_code + '.');
                    }
                    cached = true;
                }
            });
        }

        this.showTable = function() {
            if (cached) {
                $wrapper.show();
            }
            else {
                this.ajax_request();
                $wrapper.show();
            }
        }

    }



    $(document).ready(function() {

        var guest_user = Drupal.settings.is_guest;
        var location;


        var all_local_resources_table = new LocalResourcesTable($("#all-local-resources"), 'generateAllLocalResourcesTable');

        // Guest user can only view all the content, so they do not have tabs
        if (!guest_user) {
            var favorite_local_resources_table = new LocalResourcesTable($("#user-local-resources"), 'generateUserLocalResourcesTable');

            var $tabs = $("#local-resources-tabs");
            $tabs.tabs();

            $("#restrict-to-local-resources-button").click(function() {
                if ($(this).hasClass('inactive')){
                    $(this).removeClass('inactive');
                    $('#all-local-resources-button').addClass('inactive');
                    all_local_resources_table.hideTable();
                    favorite_local_resources_table.showTable();
                }
            });
            $('#all-local-resources-button').click(function () {
                if ($(this).hasClass('inactive')) {
                    $(this).removeClass('inactive');
                    $("#restrict-to-local-resources-button").addClass('inactive');
                    all_local_resources_table.hideTable();
                    favorite_local_resources_table.showTable();
                }
            });
        }




        // Restrict loading to after first time user preferences if applicable
        var first_time_user_loading = false;
        var first_time_user_block = $('#first-time-user-block');
        if (first_time_user_block.length > 0) {
            first_time_user_loading = true;
        }


        if (!first_time_user_loading) {
            if (!guest_user) {
                favorite_local_resources_table.showTable();
                all_local_resources_table.ajax_request();
            }
            else {
                all_local_resources_table.showTable();
                favorite_local_resources_table.ajax_request();
            }
        }

        $(document).on('ee:first_time_user_complete', function() {
            first_time_user_loading = false;
            if (!guest_user) {
                favorite_local_resources_table.showTable();
                all_local_resources_table.ajax_request();
            }
            else {
                all_local_resources_table.showTable();
                favorite_local_resources_table.ajax_request();
            }
        });

    } );


}(jQuery));