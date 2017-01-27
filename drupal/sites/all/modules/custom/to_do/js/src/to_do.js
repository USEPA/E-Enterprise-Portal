(function($) {

  function clearDTSearches(dtTable) {
    dtTable.search('')
      .columns().search('')
      .draw();
  }

  function openDetailsDialog($anchor_elem) {

    var title = $anchor_elem.data('title');


    var status_note = $anchor_elem.data('statusNote');
    var due_date = $anchor_elem.data('dueDate');
    var modal_title = "Details for " + title;

    var modal_html = ""
    var $modal_content = $('#to-do-modal-content').html(Drupal.settings.toDoStatusModal);

    $modal_content.find('.td-title').html(title);
    $modal_content.find('.td-status-note').html(status_note);
    $modal_content.find('.td-due-date').html(due_date);
    $modal_content.dialog({
      dialogClass: 'to-do-modal-content',
      title: 'Details for ' + title,
      width: "auto",
      height: "auto",
      autoOpen: true,
      modal: true
    });
  }


  var $table_wrapper = $('#to-do').find('table');
  $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
  $.fn.dataTableExt.oStdClasses.sTable = "eportal-responsive-table";

  // If the datatables loading has an error gracefully handle with a message
  $.fn.dataTable.ext.errMode = function(settings, helpPage, message) {
    $('#progress-tracker').find('.dataTables_empty').html("Unable to connect to service.");
    console.log(message);
  };

  var datatable_options = {
    "ajax": Drupal.settings.basePath + 'to_do/load_data',
    "dom": 'trp',
    "order": [[3, "asc"]],
    "bLengthChange": false,
    "iDisplayLength": 3,
    "processing": true,
    "language": {
      "processing": ""
    },
    "columnDefs": [
      // Hide last 4 rows (timestamp, part code, sub part code, and report type)
      {"targets": [-1, -2, -3, -4], "visible": false},
      {"targets": [2], className: "text-left"},
      {"targets": [1], "width": "300px", className: "small-screen-td-header text-left"},
      {
        "targets": [0],
        className: "skinny-col hidden-for-small-screen vertical-top",
        "searchable": false,
        "orderable": false
      }
    ],
    "autoWidth": false,
    "pagingType": "simple",
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      // Add data-titles for each column
      $('td:eq(2)', nRow).attr('data-title', "Domain");
      $('td:eq(3)', nRow).attr('data-title', "Due");
    },
    "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var table = $(this).DataTable();
      var info = table.page.info();
      var pageNo = info.page + 1;

      if (info.pages > 1) {
        var $current_li = $('<li />', {
          class: 'pager-current'
        }).html(pageNo + ' of ' + info.pages);
        $('#to-do').find('.dataTables_paginate li:first').after($current_li);
      }

      var data = table.ajax.json()
      if (data && data.cached) {
        var date = new Date(data.cached);
        var hour = (date.getHours() % 12 == 0)? 12 : date.getHours() % 12;
        var suffix = (date.getHours() > 11)? ' PM' : ' AM';
        var last_update = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + hour + ':' + String("00" + date.getMinutes()).slice(-2) + suffix;
        $('#refresh-to-do .last-updated').html(last_update);
      }
    },
    fnInitComplete: function() {
      //Initialize YADCF
      // Overriding datatable class to allow Eportal's custom datatable styling
      yadcf.init($table_wrapper.DataTable(), [
          {
            column_number: 4,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "to-do-yadcf-filter-part-code",
            filter_default_label: "- Any -"
          },
          {
            column_number: 5,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "to-do-yadcf-filter-subpart-code",
            filter_default_label: "- Any -"
          },
          {
            column_number: 6,
            filter_match_mode: 'contains',
            filter_reset_button_text: false,
            filter_container_id: "to-do-yadcf-filter-report-type",
            filter_default_label: "- Any -"
          },
        ],
        {
          cumulative_filtering: true
        }
      );

      $('#yadcf-filter-domain').show();
    }
  };

  // Create index column that updates on sorting
  var dtTable = $table_wrapper.DataTable(datatable_options);
  dtTable.columns().iterator('column', function(ctx, idx) {
    $(dtTable.column(idx).header()).append('<span class="sort-icon" />');
  });

  dtTable.on('search.dt', function() {
    dtTable.column(0, {order: 'applied'}).nodes().each(function(cell, i) {
      cell.innerHTML = i + 1;
    });
  });

  $('#to-do').on('click', '.td-status', function() {
    openDetailsDialog($(this));
  });


  $('#to-do-yadcf-filter-part-code').on('change', 'select', function() {
    var selected_part_code = $(this).val().toLowerCase();
    var $subpart_code_select = $('#to-do-yadcf-filter-subpart-code');
    var $report_type_select = $('#to-do-yadcf-filter-report-type');

    $subpart_code_select.find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    $report_type_select.find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    $report_type_select.hide();

    if (selected_part_code === "-1") {
      $subpart_code_select.hide();
    } else {
      $subpart_code_select.show();
    }

  });

  $('#to-do-yadcf-filter-subpart-code').on('change', 'select', function() {
    var selected_subpart_code = $(this).val().toLowerCase();
    var $report_type_select = $('#to-do-yadcf-filter-report-type');
    $report_type_select.find('option[value="-1"]').prop('selected', 'selected').trigger('change');
    if (selected_subpart_code === "-1") {
      $report_type_select.hide();
    } else {
      $report_type_select.show();
    }
  });


  $('#refresh-to-do').click(function() {
    var $to_do = $('#to-do');
    // Reload datatable, forcing reload of data not using cache
    $table_wrapper.find('td').hide();
    $to_do.find('.dataTables_processing').text("Loading...");
    //Remove data, pass false to not use cache
    dtTable.ajax.url(Drupal.settings.basePath + 'to_do/load_data/false').load(function() {
      // Show table after successfully refreshing
      $table_wrapper.find('td').show();
      $to_do.find('.dataTables_processing').text("");
    });

  });

  // Filter results based on "" (blank for all, is default), next_week, this_week, and beyond
  $('.todo_filter_button a').on('click keydown', function(event) {
    event.stopImmediatePropagation();
    var $this = $(this);
    var $parent = $this.parents('ul.ui-tabs-nav'),
      $target_tab = $this.parent(),
      selected_index = $target_tab.index(),
      number_of_tabs = $parent.find('.todo_filter_button').length,
      search_criteria;

    if(event.keyCode) {
      switch (event.keyCode) {
        case $.ui.keyCode.RIGHT:
        case $.ui.keyCode.DOWN:
          selected_index++;
          event.preventDefault();
          break;
        case $.ui.keyCode.UP:
        case $.ui.keyCode.LEFT:
          selected_index--;
          event.preventDefault();
          break;
        default:
          break;
      }
      $target_tab = $parent.find('li').eq((selected_index + number_of_tabs) % number_of_tabs);
      search_criteria = $target_tab.data('search');
    }

    if (!$target_tab.hasClass('filter-applied')) {
      clearDTSearches(dtTable);
      if(!search_criteria) {
        search_criteria = $target_tab.data('search');
      }
      // Column 7 contains time frame information
      dtTable.search('')
        .columns(7).search(search_criteria)
        .draw();
      $('.todo_filter_button').removeClass('filter-applied').find('a').prop('tabindex', -1);
      $target_tab.addClass('filter-applied').find('a').prop('tabindex', 0);
    }
    $target_tab.find('a').trigger('focus');
  });

})(jQuery);