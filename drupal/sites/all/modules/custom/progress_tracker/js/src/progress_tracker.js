
(function($) {

  function openDetailsDialog($anchor_elem) {

    var domain = $anchor_elem.data('domain');
    var title = $anchor_elem.data('title');
    var status = $anchor_elem.text();
    if (domain === "CEDRI") {

    } else {
      var status_note = $anchor_elem.data('statusNote');
      var modal_title = "Details for " + title;
    }
    var modal_html = ""
    var $modal_content = $('#progress-tracker-modal-content').html(Drupal.settings.progressTrackerStatusModal);
    $modal_content.find('.pt-status-note').html(status_note);
    $modal_content.find('.pt-status').html(status);
    $modal_content.dialog({
        dialogClass: 'progress-tracker-modal-content',
        title: 'Details for ' + title,
        autoOpen: true
      });
  }


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

    },
    fnInitComplete: function() {
      //Initialize YADCF
      console.log("INITIALIZING----");
      yadcf.init(this, [
        {
          column_number: 3,
          filter_type: 'multi_select',
          //filter_container_selector: '#' + wrapperParentId + ' .source.facet',
          filter_match_mode: 'contains',
          filter_reset_button_text: false,
          text_data_delimiter: '|'
        }]);
    }
  };

  // Create index column that updates on sorting
  var $table = $table_wrapper.DataTable(datatable_options);
  $table.on('search.dt', function() {
    $table.column(0, {order: 'applied'}).nodes().each(function(cell, i) {
      cell.innerHTML = i + 1;
    });
  });

  $('#progress-tracker').on('click', '.pt-status', function() {
    openDetailsDialog($(this));
  });


})(jQuery);
