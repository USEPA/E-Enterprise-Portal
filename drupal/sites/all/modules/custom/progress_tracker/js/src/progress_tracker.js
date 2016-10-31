(function($) {

    function openDetailsDialog($anchor_elem) {

      var title = $anchor_elem.data('title');
      var status = $anchor_elem.text();


      var status_note = $anchor_elem.data('statusNote');
      var modal_title = "Details for " + title;

      var modal_html = ""
      var $modal_content = $('#progress-tracker-modal-content').html(Drupal.settings.progressTrackerStatusModal);

      $modal_content.find('.pt-title').html(title);
      $modal_content.find('.pt-status-note').html(status_note);
      $modal_content.find('.pt-status').html(status);
      $modal_content.dialog({
        dialogClass: 'progress-tracker-modal-content',
        title: 'Details for ' + title,
        width: "auto",
        height: "auto",
        autoOpen: true
      });
    }


    var $table_wrapper = $('#progress-tracker').find('table');
    $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
    //$.fn.dataTableExt.oStdClasses.sPaging = "eportal-pager ";
    $.fn.dataTableExt.oStdClasses.sTable = "eportal-datatable";

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
      "dom": 'tp',
      "order": [[ 4, "desc" ]],
      "bLengthChange": false,
      "iDisplayLength": 3,
      "columnDefs": [
        {"targets": [0, -3], "searchable": false, "orderable": false},
        // Hide last three rows (timestamp, part code, report type)
        {"targets": [-1, -2], "visible": false},
        {"targets": [1], "width": "150px"},
        {"targets": [0], className: "skinny-col"}
        // Sort date based off timestamp column
        //{"targets": [4], "orderData": [6]}
      ],
      "autoWidth": false,
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
        // Overriding datatable class to allow Eportal's custom datatable styling
        yadcf.init($table_wrapper.DataTable(), [
            {
              column_number: 2,
              filter_match_mode: 'contains',
              filter_reset_button_text: false,
              filter_container_id: "yadcf-filter-domain",
              filter_default_label: "- Any -"
            },
            {
              column_number: 6,
              filter_match_mode: 'contains',
              filter_reset_button_text: false,
              filter_container_id: "yadcf-filter-report-type",
              filter_default_label: "- Any -"
            },
            {
              column_number: 7,
              filter_match_mode: 'contains',
              filter_reset_button_text: false,
              filter_container_id: "yadcf-filter-part-code",
              filter_default_label: "- Any -"
            }

          ]
        );

        $('#yadcf-filter-domain').show();
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

    $('#yadcf-filter-domain').on('change', 'select', function() {
      var selected_domain = $(this).val().toLowerCase();
      var $part_code_select = $('#yadcf-filter-part-code');
      var $report_type_select = $('#yadcf-filter-report-type');
      $part_code_select.hide().find('option[value="-1"]').prop('selected', 'selected').trigger('change');
      $report_type_select.hide().find('option[value="-1"]').prop('selected', 'selected').trigger('change');
      if (selected_domain === "cedri") {
        $part_code_select.show();
      } else if (selected_domain === "lead") {
        $report_type_select.show();
      }
    });


  })(jQuery);
