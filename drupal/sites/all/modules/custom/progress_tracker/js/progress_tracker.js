function openDetailsDialog($anchor_elem) {
  var title = $(this).data('title');
  var status = $(this).text();
  var status_note = $(this).data('statusNote');



}

(function($) {

  var $table_wrapper = $('#progress-tracker').find('table');
  $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
  // If the datatables loading has an error gracefully handle with a message
  $.fn.dataTable.ext.errMode = function(settings, helpPage, message) {
    $('#progress-tracker').find('.dataTables_empty').html("Unable to connect to service.");
    console.log(message);
  };
  $.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
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
    "ajax": Drupal.settings.basePath + 'progress_tracker/load_data',
    "dom": 'tip',
    "bLengthChange": false,
    "iDisplayLength": 5,
    "columnDefs": [
      { "targets": [0], "searchable": false, "orderable": false, "visible": true }

    ],
    "bAutoWidth": false,
    "pagingType": "simple",
    "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
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

  // Create index column that updates on sorting
  var $table = $table_wrapper.DataTable(datatable_options);
  //$table.on('search.dt', function() {
  //  $table.column(0, {order: 'applied'}).nodes().each(function(cell, i) {
  //    cell.innerHTML = i + 1;
  //  });
  //});

  $('#progress-tracker').on('click', '.status', function() {
    openDetailsDialog($(this));
  });


})(jQuery);
