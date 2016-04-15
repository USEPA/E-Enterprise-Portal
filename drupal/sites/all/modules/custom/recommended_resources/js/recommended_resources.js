(function ($) {

    var id = 0;

    var truncate_options = {
        ellipsis: '...',
        /*	How to cut off the text/html: 'word'/'letter'/'children' */
        wrap: 'word',
        /*	Wrap-option fallback to 'letter' for long words */
        fallbackToLetter: true,
        /*	Optionally set a max-height, can be a number or function.
         If null, the height will be measured. */
        height: 50,
        watch: 'window'
    };

    var LocalResourcesTable = function ($wrapper, ajax_url) {
        var datatable_options = {
            "bLengthChange": false,
            "sPageButton": "favorites-ignore",
            "iDisplayLength": 3,
            "oLanguage": {
                "sSearch": "Filter:"
            },
            "bSort" : false
            //      "fnRowCallback": dotdotdotInsert($wrapper.find('table'))
        };


        var cached = false;

        this.wrapper = $wrapper;

        this.hideTable = function () {
            $wrapper.hide();
        }


        this.ajax_request = function () {
            var topics = this.topics;
            $.ajax({

                beforeSend: function () {
                    $wrapper.html('<p>Loading&hellip;</p>');
                },
                url: ajax_url,
                method: "POST",
                data: {filters: topics},
                success: function (table) {
                    var table_id;
                    var $table;

                    $wrapper.html(table);
                    $table = $wrapper.find('table');
                    if ($table.length > 0) {
                        table_id = $table.attr('id');
                        $table.attr('id', table_id + id);
                        id++;
                        $table.find('.lgc-resource-description').dotdotdot(truncate_options);
                        $table.DataTable(datatable_options);
                        $table.on( 'draw.dt', function () {
                            $table.find('.lgc-resource-description').dotdotdot(truncate_options);
                        } );
                        $table.removeClass("dataTable display no-footer").addClass('views-table responsive-table usa-table-borderless');
                    }

                    cached = true;
                }
            });
        }

        this.showTable = function () {
            if (!cached)
                this.ajax_request();
            $wrapper.show();
        }
    }

    function dotdotdotInsert($table) {
        $table.find('.lgc-resource-description').dotdotdot({
            watch: true
        });
    }


    $(document).ready(function () {

        var guest_user = Drupal.settings.is_guest;
        var all_local_resources_table = new LocalResourcesTable($("#all-local-resources"), 'generateAllLocalResourcesTable');

        // Guest user can only view all the content, so they do not have tabs
        if (!guest_user) {
            var favorite_local_resources_table = new LocalResourcesTable($("#user-local-resources"), 'generateUserLocalResourcesTable');
            var $tabs = $("#local-resources-tabs");
            $tabs.tabs();
        }


// Enable filtering via selections made
        $(document).on('click', '#apply-lgc-topics', function () {
            var values_selected = $('#lgc-topics-select').val();
            all_local_resources_table.updateTopics(values_selected);
            all_local_resources_table.ajax_request();

        });

        $(document).on('click',
            '#all-local-resources-button, #restrict-to-local-resources-button', function() {
           $('.lgc-resource-description').dotdotdot(truncate_options);
        });

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
            }
        }

        $('#load_lgc_manage_topics.inactive').click(function() {
              $.ajax({
                url: 'manage_my_topics/load_view',
                success: function(html) {
                    $('#manage-topics-wrapper').html(html);
                    $('#local-resources-tables').hide();
                }
            })
        });



        $(document).on('ee:first_time_user_complete', function () {
            first_time_user_loading = false;
            if (!guest_user) {
                favorite_local_resources_table.showTable();
                all_local_resources_table.showTable();
            }
            else {
                all_local_resources_table.showTable();
            }
        });

    });
}(jQuery));