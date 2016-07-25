(function ($) {
    var $table_wrapper =  $('#my-cdx').find('table');
    $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
    $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
        return {
            "iStart": oSettings._iDisplayStart,
            "iEnd": oSettings.fnDisplayEnd(),
            "iLength": oSettings._iDisplayLength,
            "iTotal": oSettings.fnRecordsTotal(),
            "iFilteredTotal": oSettings.fnRecordsDisplay(),
            "iPage": oSettings._iDisplayLength === -1 ?
                0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
            "iTotalPages": oSettings._iDisplayLength === -1 ?
                0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength) - 1
        };
    };
    var datatable_options = {
        "ajax": Drupal.settings.basePath + 'my-cdx/json',
        "dom": 'tip',
        "bLengthChange": false,
        "iDisplayLength": 5,
        "columnDefs": [
            { "width": "70%", "targets": 0 }, // First column width
            { "width": "30%", "targets": 1 } // Second column width
        ],
        "pagingType": "simple",
        "bSortable": true,
        "fnDrawCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var pageInfo = this.fnPagingInfo();
            var pageNo = pageInfo.iPage + 1;
            var totalPages = pageInfo.iTotalPages + 1;

            if (totalPages > 1) {
                var $current_li = $('<li />', {
                    class: 'pager-current'
                }).html(pageNo + ' of ' + totalPages);
                $('.dataTables_paginate li:first').after($current_li);
            }
        }
    };

    $table_wrapper.DataTable(datatable_options);
})(jQuery);
