(function ($) {


    var LocalResourcesTable = function ($wrapper, ajax_url) {

        var datatable_options = {
            "bLengthChange": false,
            "sPageButton": "favorites-ignore",
            "iDisplayLength": 3,
            "oLanguage": {
                "sSearch": "Filter:"
            },
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

})(jQuery);