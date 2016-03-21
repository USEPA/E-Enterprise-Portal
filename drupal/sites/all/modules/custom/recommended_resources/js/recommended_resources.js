(function ($) {
    //function truncate(text, maxLength) {
    //    if (text.length <= maxLength) {
    //        return text;
    //    }
    //    var truncated = text.substr(0, maxLength);
    //    var spaceIndex = truncated.lastIndexOf(' ');
    //    if (spaceIndex === -1) {
    //        return truncated + '...';
    //    }
    //    return truncated.substring(0, spaceIndex) + '...';
    //}

    var LocalResourcesTable = function ($wrapper, ajax_url) {

        // $wrapper.hide();

        var datatable_options = {
            "bLengthChange": false,
            "sPageButton": "favorites-ignore",
            "iDisplayLength": 3,
						"oLanguage": {
							"sSearch": "Filter:"
       			},            
        };

        var cached = false;
        var topics = [];

        this.wrapper = $wrapper;
        this.ajax_url = ajax_url;

        this.hideTable = function () {
            $wrapper.hide();
        }


        this.ajax_request = function () {
            var topics = this.topics;
            $.ajax({

                beforeSend:  function() {
                    $wrapper.html('<p>Loading&hellip;</p>');
                },
                url: ajax_url,
                method: "POST",
                data: {filters: topics},
                success: function (table) {
                    $wrapper.html(table);
                    var $table = $wrapper.find('table');
                    if ($table.length > 0) {
                        $table.DataTable(datatable_options);
                        $table.removeClass("dataTable display no-footer").addClass('views-table responsive-table usa-table-borderless');
                     //   truncateWithEllipses("lgc-resource-description");
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
        this.updateTopics = function (values) {
            this.topics = values;
        }

    }


    $(document).ready(function () {

        var guest_user = Drupal.settings.is_guest;
        var location;
        var $lgc_filter = $('#lgc-topics-filter');
        var $filter_topics = $('#apply-lgc-topics');
        var $lgc_topics_select = $('#lgc-topics-select');

        var all_local_resources_table = new LocalResourcesTable($("#all-local-resources"), 'generateAllLocalResourcesTable');

        // Guest user can only view all the content, so they do not have tabs
        if (!guest_user) {
            var favorite_local_resources_table = new LocalResourcesTable($("#user-local-resources"), 'generateUserLocalResourcesTable');

            var $tabs = $("#local-resources-tabs");
            $tabs.tabs();

            //        $("#restrict-to-local-resources-button").click(function() {
            //            if ($(this).hasClass('inactive')){
            //                $(this).removeClass('inactive');
            //                $('#all-local-resources-button').addClass('inactive');
            //                $lgc_filter.show();
            //                all_local_resources_table.hideTable();
            //        favorite_local_resources_table.showTable();
            //    }
            //});
            //$('#all-local-resources-button').click(function () {
            //    if ($(this).hasClass('inactive')) {
            //        $(this).removeClass('inactive');
            //        $("#restrict-to-local-resources-button").addClass('inactive');
            //        favorite_local_resources_table.hideTable();
            //        $lgc_filter.hide();
            //        all_local_resources_table.showTable();
            //    }
            //});
        }

// Enable filtering via selections made
        $(document).on('click', '#apply-lgc-topics', function () {
            var values_selected = $('#lgc-topics-select').val();
            all_local_resources_table.updateTopics(values_selected);
            all_local_resources_table.ajax_request();

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
                favorite_local_resources_table.ajax_request();
            }
        }


        $(document).on('ee:first_time_user_complete', function () {
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

    });


    // Add ellipses functionality
    //$(document).on('click', '.view-recommended-resources .pager__link', function() {
    //    truncateWithEllipses("lgc-resource-description");
    //});

    //function truncateWithEllipses(class_name) {
    //    $("." + class_name).dotdotdot({
    //        //	configuration goes here
    //        /*	The text to add as ellipsis. */
    //        ellipsis: '... ',
    //        /*	How to cut off the text/html: 'word'/'letter'/'children' */
    //        wrap: 'word',
    //
    //        /*	Wrap-option fallback to 'letter' for long words */
    //        fallbackToLetter: true,
    //
    //        /*	Optionally set a max-height, can be a number or function.
    //         If null, the height will be measured. */
    //        height: 50
    //    });
    //}


}(jQuery));