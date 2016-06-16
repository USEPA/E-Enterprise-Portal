// @see https://gist.github.com/cman81/ef1ad79cff899c01160ba7d77f761f13
// @see https://gist.github.com/jmcd/2284550
(function($) {

  var methods = {
    init: function() {
      var $ul = $("<ul/>").insertAfter(this);
      var $container = $ul.prev().andSelf().wrapAll("<div class='multiselect-to-checkboxes'></div>");
      var baseId = "_" + $(this).attr("id");
      $(this).children("option").each(function(index) {
        var $option = $(this);
        var id = baseId + index;
        var $li = $("<li/>").appendTo($ul);
        var $checkbox = $("<input type='checkbox' id='" + id + "'/>").appendTo($li).change(function() {
          var $option = $(this).parents('.multiselect-to-checkboxes').find('select option').eq(index);
          if ($(this).is(":checked")) {
            $option.attr("selected", true).parent().change();
          } else {
            $option.attr("selected", false).parent().change();
          }
        });
        if ($option.is(":selected")) {
          $checkbox.attr("checked", "checked");
        }
        $checkbox.after("<label for='" + id + "'>" + $option.text() + "</label>");
      });
      $(this).hide();
    }
  };

  $.fn.multiSelectToCheckboxes = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.multiSelectToCheckboxes');
    }

  };

})(jQuery);

var LocalResourcesTable;

(function ($) {
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

  LocalResourcesTable = function ($wrapper, ajax_url) {

    $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
    var datatable_options = {
      "bLengthChange": false,
      "iDisplayLength": 3,
      "oLanguage": {
        "sSearch": "Filter:"
      },
      "pagingType": "simple",
      "dom": 'iftp',
      "fnDrawCallback": function () {
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
    var datatable_id = '';
    this.wrapper = $wrapper;

    this.hideTable = function () {
      $wrapper.hide();
    };

    this.ajax_request = function (from_embedded_topics) {
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
          /**
           * TODO: refactor - duplicate code block in the following files:
           * other_items_of_interest/js/ItemsOfInterestTable.js
           * other_items_of_interest/js/other_items_of_interest.js
           */
          // alter the datatable id, one digit larger than the largest id
          var newId = 0;
          $("table[id^='datatable-']").each(function () {
            newId = Math.max(newId, parseInt($(this).attr('id').substr('datatable-'.length), 10));
          });
          newId++;
          var $table = $('<div>' + table + '</div>'); // wrap contents in a div for now, will unwrap later
          datatable_id = 'datatable-' + newId;
          $table.find('table').attr('id', datatable_id);
          $wrapper.html($table.html()); // unwrap

          $table = $wrapper.find('table');
          if ($table.length > 0) {
            var tableDT = $table.DataTable(datatable_options);
            $table.removeClass("dataTable display no-footer").addClass('views-table responsive-table usa-table-borderless');
            // in embedded_lgc_topics_view.js
            updateDropdown($('#user-lgc-topics-small-view'));
            if (from_embedded_topics) {
              var $elem_id = "#embed-manage-lgc-" + topics[0];
              $($elem_id).addClass('selected');
            }

            yadcf.init(tableDT, [
              {
                column_number : 1,
                filter_type: 'multi_select',
                filter_container_selector: '#all-local-resources-wrapper .topic.facet'
              },
            ]);
            $('#all-local-resources-wrapper').find('.topic.facet select').multiSelectToCheckboxes();
          }
          else {
            $wrapper.html('<div class="no-topics">You have not selected any local government interests. <a href="javascript:void(0);" id="add-more-topics">Add some here.</a></div>')
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
    this.updateTopics = function (values, from_embedded_topics) {
      this.topics = values;
      if (from_embedded_topics) {
        this.ajax_request(from_embedded_topics);
      }
      else {
        this.ajax_request();
      }
    };
    this.filterTopics = function (topic_text) {
      if (datatable_id !== '') {
        var $table = $('#' + datatable_id);
        $table.DataTable().columns().search(topic_text).draw();
      }
    }

  };
})(jQuery);


