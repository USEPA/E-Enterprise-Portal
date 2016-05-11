var ItemsOfInterestTable;

(function($) {


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
        0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
  };


  ItemsOfInterestTable = function ($wrapper, ajax_url, location) {
    $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
    $wrapper.hide();

    var datatable_options = {
      "bLengthChange": false,
      "iDisplayLength": 3,
      "oLanguage": {
        "sSearch": "Filter:"
      },
      "pagingType": "simple",
      "dom": 'iftp',
      "fnDrawCallback": function (oSettings) {
        var pageInfo = this.fnPagingInfo();
        var pageNo = pageInfo.iPage + 1;
        var totalPages = pageInfo.iTotalPages + 1;
        var $current_li = $('<li />', {
          class: 'pager-current'
        })
          .html(pageNo + ' of ' + totalPages);
        $wrapper.find('.dataTables_paginate li:first').after($current_li);

      }
    };


    var cached = false;
    this.wrapper = $wrapper;
    this.ajax_url = ajax_url;

    if (location) {
      // find if in city, state code pattern
      if (location.indexOf(',') === -1)
        this.state_code = location;
      else
        this.state_code = $.trim(location.split(',')[1]);
    }
    else {
      this.state_code = false;
    }


    this.hideTable = function () {
      $wrapper.hide();
    }

    this.update_current_location = function (location) {
      // find if in city, state code pattern
      if (location.indexOf(',') === -1)
        this.state_code = location;
      else
        this.state_code = $.trim(location.split(',')[1]);
      this.ajax_request();
    }

    this.ajax_request = function () {
      var state_code = this.state_code;
      $.ajax({
        beforeSend: function () {
          $wrapper.html('<p>Loading&hellip;</p>');
        },
        url: ajax_url,
        method: "POST",
        data: {state: state_code},
        success: function (table) {
          $wrapper.html(table);
          var $table = $wrapper.find('table');
          if ($table.length > 0) {
            $table.dataTable(datatable_options);
            $table.removeClass("dataTable display no-footer").addClass('views-table responsive-table usa-table-borderless');
          }
          else {
            //         $wrapper.html('No resources found for ' + state_code + '.');
          }
          cached = true;
        }
      });
    }

    this.showTable = function () {
      if (cached) {
        $wrapper.show();
      }
      else {
        this.ajax_request();
        $wrapper.show();
      }
    }

  };

})(jQuery);