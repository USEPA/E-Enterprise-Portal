jQuery.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
  return {
    "iStart":         oSettings._iDisplayStart,
    "iEnd":           oSettings.fnDisplayEnd(),
    "iLength":        oSettings._iDisplayLength,
    "iTotal":         oSettings.fnRecordsTotal(),
    "iFilteredTotal": oSettings.fnRecordsDisplay(),
    "iPage":          oSettings._iDisplayLength === -1 ?
      0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
    "iTotalPages":    oSettings._iDisplayLength === -1 ?
      0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
  };
};

 var LocalResourcesTable = function ($wrapper, ajax_url) {

   $.fn.dataTableExt.oStdClasses.sPageButton="favorites-ignore fa";
        var datatable_options = {
            "bLengthChange": false,
            "iDisplayLength": 3,
            "oLanguage": {
                "sSearch": "Filter:"
            },
          "pagingType": "simple",
          "dom": 'iftp',
          "fnDrawCallback": function(oSettings) {
            var pageInfo = this.fnPagingInfo()
            var pageNo = pageInfo.iPage + 1;
            var totalPages = pageInfo.iTotalPages + 1;
            var $current_li = $('<li />', {
              class:'pager-current'})
              .html(pageNo + ' of '+totalPages);
            $wrapper.find('.dataTables_paginate li:first').after($current_li);

          }
        };

        var cached = false;

        this.wrapper = $wrapper;

        this.hideTable = function () {
            $wrapper.hide();
        };

        this.ajax_request = function () {
            var topics = this.topics;
            $.ajax({
                beforeSend: function () {
                    var $table = $wrapper.find('.view-content');
                    if ($table.length > 0) {
                        $table.html('<p>Loading&hellip;</p>');
                    } else {
                        $wrapper.html('<p>Loading&hellip;</p>');
                    }
                },
                url: ajax_url,
                method: "POST",
                data: {filters: topics},
                success: function (table) {
                    $wrapper.html(table);
                    var $table = $wrapper.find('table');
                    if ($table.length > 0) {
                        $table.dataTable(datatable_options);
                        $table.removeClass("dataTable display no-footer").addClass('views-table responsive-table usa-table-borderless');
                        //$wrapper.find('.dataTables_paginate li:first').after($current_page_li);
                    }
                    cached = true;
                }
            });
        };

        this.showTable = function () {
            if (!cached)
                this.ajax_request();
            $wrapper.show();
        };
        this.updateTopics = function (values) {
            this.topics = values;
        };
        this.topicView = function(tid) {
            this.topics = [tid];
            this.ajax_request();
        };
    };


