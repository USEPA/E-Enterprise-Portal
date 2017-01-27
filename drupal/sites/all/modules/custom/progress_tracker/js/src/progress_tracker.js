(function($) {

  function openDetailsDialog($anchor_elem) {

    var title = $anchor_elem.data('title');
    var status = $anchor_elem.text();


    var status_note = $anchor_elem.data('statusNote');
    var modal_title = "Details for " + title;

    var modal_html = "";
    var $modal_content = $('#progress-tracker-modal-content').html(Drupal.settings.progressTrackerStatusModal);

    $modal_content.find('.pt-title').html(title);
    $modal_content.find('.pt-status-note').html(status_note);
    $modal_content.find('.pt-status').html(status);
    $modal_content.dialog({
      dialogClass: 'progress-tracker-modal-content',
      title: 'Details for ' + title,
      width: "auto",
      height: "auto",
      autoOpen: true,
      modal: true
    });
  }

  var $table_wrapper = $('#progress-tracker').find('table');
  $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
  $.fn.dataTableExt.oStdClasses.sTable = "eportal-responsive-table";

  // If the datatables loading has an error gracefully handle with a message
  $.fn.dataTable.ext.errMode = function(settings, helpPage, message) {
    $('#progress-tracker').find('.dataTables_empty').html("Unable to connect to service.");
    console.log(message);
  };

  var datatable_options = {
    "ajax": Drupal.settings.basePath + 'progress_tracker/load_data',
    "dom": 'trp',
    "order": [[4, "desc"]],
    "bLengthChange": false,
    "iDisplayLength": 3,
    "processing": true,
    "language": {
      "processing": ""
    },
    "columnDefs": [
      {"targets": [0, 5], "searchable": false, "orderable": false},
      // Hide last part code, and report type columns
      {"targets": [-1, -2, -3], "visible": false},
      {"targets": [2], className: "text-left"},
      {"targets": [1], "width": "150px", className: "small-screen-td-header text-left"},
      {"targets": [0], className: "skinny-col hidden-for-small-screen"}
    ],
    "autoWidth": false,
    "pagingType": "simple",
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      // Add data-titles for each column, Using Attribute to be picked up by CSS
      $('td:eq(2)', nRow).attr('data-title', "Domain");
      $('td:eq(3)', nRow).attr('data-title', "Status");
      $('td:eq(4)', nRow).attr('data-title', "Date");
      $('td:eq(5)', nRow).attr('data-title', "Actions");
    },
    "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var table = $(this).DataTable();
      var info = table.page.info();
      var pageNo = info.page + 1;


      if (info.pages > 1) {
        var $current_li = $('<li />', {
          class: 'pager-current'
        }).html(pageNo + ' of ' + info.pages);
        $('#progress-tracker').find('.dataTables_paginate li:first').after($current_li);
      }

      var data = table.ajax.json()
      if(data && data.cached) {
        var date = new Date(data.cached);
        var hour = (date.getHours() % 12 == 0)? 12 : date.getHours() % 12;
        var suffix = (date.getHours() > 11) ? ' PM' : ' AM';
        var last_update = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + hour + ':' + String("00" + date.getMinutes()).slice(-2) + suffix;
        $('#refresh-progress-tracker .last-updated').html(last_update);
      }

    },
    fnInitComplete: function() {
      //Initialize YADCF
      // Overriding datatable class to allow Eportal's custom datatable styling
      yadcf.init($table_wrapper.DataTable(),
        [
          {
            column_number: 2,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "progress-tracker-yadcf-filter-domain",
            filter_default_label: "- Any -"
          },
          {
            column_number: 6,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "progress-tracker-yadcf-filter-part-code",
            filter_default_label: "- Any -"
          },
          {
            column_number: 7,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "progress-tracker-yadcf-filter-subpart-code",
            filter_default_label: "- Any -"
          },
          {
            column_number: 8,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "progress-tracker-yadcf-filter-report-type",
            filter_default_label: "- Any -"
          }

        ],
        {
          cumulative_filtering: true
        }
      );


      $('#yadcf-filter-domain').show();
    }
  };

  // Create index column that updates on sorting
  var $table = $table_wrapper.DataTable(datatable_options);
  $table.columns().iterator('column', function(ctx, idx) {
    $($table.column(idx).header()).append('<span class="sort-icon" />');
  });

  $table.on('search.dt', function() {
    $table.column(0, {order: 'applied'}).nodes().each(function(cell, i) {
      cell.innerHTML = i + 1;
    });
  });

  $('#progress-tracker').on('click', '.pt-status', function() {
    openDetailsDialog($(this));
  });

  $('#progress-tracker-yadcf-filter-domain').on('change', 'select', function() {
    var selected_domain = $(this).val().toLowerCase();
    var $part_code_select = $('#progress-tracker-yadcf-filter-part-code');
    var $subpart_code_select = $('#progress-tracker-yadcf-filter-subpart-code');
    var $report_type_select = $('#progress-tracker-yadcf-filter-report-type');
    $part_code_select.hide().find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    $report_type_select.hide().find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    $subpart_code_select.hide().find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    if (selected_domain === "cedri") {
      $part_code_select.show();
    } else if (selected_domain === "lead") {
      $report_type_select.show();
    }
  });

  $('#progress-tracker-yadcf-filter-part-code').on('change', 'select', function() {
    var selected_part_code = $(this).val().toLowerCase();
    var $subpart_code_select = $('#progress-tracker-yadcf-filter-subpart-code');
    var $report_type_select = $('#progress-tracker-yadcf-filter-report-type');

    $subpart_code_select.find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    $report_type_select.find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    $report_type_select.hide();

    if (selected_part_code === "-1") {
      $subpart_code_select.hide();
    } else {
      $subpart_code_select.show();
    }

  });

  $('#progress-tracker-yadcf-filter-subpart-code').on('change', 'select', function() {
    var selected_subpart_code = $(this).val().toLowerCase();
    var $report_type_select = $('#progress-tracker-yadcf-filter-report-type');
    $report_type_select.find('option[value="-1"]').prop('selected', 'selected').trigger('change');

    if (selected_subpart_code === "-1") {
      $report_type_select.hide();
    } else {
      $report_type_select.show();
    }

  });


  $('#refresh-progress-tracker').click(function() {
    var $progress_tracker = $('#progress-tracker');
    // Reload datatable, forcing reload of data not using cache
    $table_wrapper.find('td').hide();
    $progress_tracker.find('.dataTables_processing').text("Loading...");
    //Remove data, pass false to not use cache
    $table_wrapper.DataTable().ajax.url(Drupal.settings.basePath + 'progress_tracker/load_data/false').load(function() {
      // Show table after successfully refreshing
      $table_wrapper.find('td').show();
      $progress_tracker.find('.dataTables_processing').text("");

    });
  });

})(jQuery);
