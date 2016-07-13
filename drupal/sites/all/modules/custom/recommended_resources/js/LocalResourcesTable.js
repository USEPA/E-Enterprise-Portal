// mapping of topic name to column number, can be expanded as needed
var yadtf_topic_configs = {
  source: {column: 2},
  topic: {column: 3},
  category: {column: 4},
  tool_type: {column: 5},
  training_level: {column: 6},
  data_requirements: {column: 7},
  relevance: {column: 8}
};


// @see https://gist.github.com/cman81/ef1ad79cff899c01160ba7d77f761f13
// @see https://gist.github.com/jmcd/2284550
(function ($) {

  var methods = {
    init: function () {
      var $ul = $("<ul/>").insertAfter(this);
      var $container = $ul.prev().andSelf().wrapAll("<div class='multiselect-to-checkboxes'></div>");
      var baseId = "_" + $(this).attr("id");
      $(this).children("option").each(function (index) {
        var $option = $(this);
        var id = baseId + index;
        var $li = $("<li/>").appendTo($ul);
        var $checkbox = $("<input type='checkbox' id='" + id + "'/>").appendTo($li).change(function () {
          var $option = $(this).parents('.multiselect-to-checkboxes').find('select option').eq(index);
          if ($(this).is(":checked")) {
            $option.prop("selected", true).parent().change();
          } else {
            $option.prop("selected", false).parent().change();
          }
        });
        if ($option.is(":selected")) {
          $checkbox.prop("checked");
        }
        $checkbox.after("<label for='" + id + "'>" + $option.text() + "</label>");

        // if this is a placeholder item, hide it so that it cannot be selected
        if (String($option.attr('data-placeholder')).toLowerCase() == 'true') {
          $li.hide();
        }
      });
      $(this).hide();
    }
  };

  $.fn.multiSelectToCheckboxes = function (method) {
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
        0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength) - 1
    };
  };


  LocalResourcesTable = function ($table_wrapper, ajax_url, table_type) {

    $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
    var datatable_options = {
      "bLengthChange": false,
      "iDisplayLength": 5,
      "bAutoWidth": false,
      "oLanguage": {
        "sSearch": "Filter:"
      },
      "pagingType": "simple",
      "dom": 'iftp',
      "fnDrawCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        var pageInfo = this.fnPagingInfo();
        var pageNo = pageInfo.iPage + 1;
        var totalPages = pageInfo.iTotalPages + 1;

        if (totalPages > 1) {
          var $current_li = $('<li />', {
            class: 'pager-current'
          })
            .html(pageNo + ' of ' + totalPages);
          $table_wrapper.find('.dataTables_paginate li:first').after($current_li);
        }
        // Add needed classes
        console.log('fnDrawCallback', nRow, aData, iDisplayIndex, iDisplayIndexFull,$('td', nRow.nTable))
        $('td:first-child', nRow.nTable).addClass( "resource-title" );
        $('td:nth-child(2)', nRow.nTable).addClass( "resource-info" );
        $('td:nth-child(3)', nRow.nTable).addClass( "resource-source" ).attr('data-title', 'Source');
        $('td:nth-child(4)', nRow.nTable).addClass( "resource-topic" ).attr('data-title', 'Topic');
        $('td:nth-child(5)', nRow.nTable).addClass( "resource-category" ).attr('data-title', 'Category');
        //$('td:eq(1),td:eq(2),td:eq(3)', nRow).addClass( "avo-light" );
      },
      // hide the following columns, they are only used for faceted filtering
      "columnDefs": [
        {
          "targets": [5, 6, 7, 8],
          "visible": false
        }
      ]
    };

    var cached = false;
    var datatable_id = '';
    var wrapper_id = $table_wrapper.attr('id');

    this.hideTable = function () {
      $table_wrapper.hide();
    };

    this.ajax_request = function (from_embedded_topics) {
      var topics = this.topics;
      $.ajax({
        beforeSend: function () {
          var $table = $table_wrapper.find('.view-content');
          if ($table.length > 0) {
            $table.html('<p>Loading&hellip;</p>');
          } else {
            $table_wrapper.html('<p>Loading&hellip;</p>');
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
          $table_wrapper.html($table.html()); // unwrap

          $table = $table_wrapper.find('table');
          if ($table.length > 0) {
            var tableDT = $table.DataTable(datatable_options);
            $table.removeClass("dataTable display no-footer").addClass('views-table responsive-table usa-table-borderless');
            // in embedded_lgc_topics_view.js
            updateDropdown($('#user-lgc-topics-small-view'));
            if (from_embedded_topics) {
              var $elem_id = "#embed-manage-lgc-" + topics[0];
              $($elem_id).addClass('selected');
            }

            // initialize faceted filtering using Yet Another DataTables Column Filter (yadcf) library
            // @see views-view--recommended-resources--block.tpl.php
            var wrapperParentId = $table_wrapper.parents('.local.resources.wrapper').attr('id');
            var $wrapper_parent = $('#' + wrapperParentId);

            // Remove all previous facets for initialization
            $('#' + wrapperParentId + ' .facet').html('');

            yadcf.init(tableDT, [
              {
                column_number: 2,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .source.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              },
              {
                column_number: 3,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .topic.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              },
              {
                column_number: 4,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .category.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              },
              {
                column_number: 5,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .tool-type.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              },
              {
                column_number: 6,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .training-level.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              },
              {
                column_number: 7,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .data-requirements.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              },
              {
                column_number: 8,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .relevance.facet',
                filter_match_mode: 'exact',
                filter_reset_button_text: false
              }
            ]);
            $('#' + wrapperParentId).find('.facet select').each(function () {
              $(this).multiSelectToCheckboxes();
            });

            var your_selections = $('.your-selections');
            if (your_selections.find('.selection-lbl').length == 0) {
              var selection_lbl = "<div class='selection-lbl'>" + your_selections.html() + "</div>";
              your_selections.html(selection_lbl);
            }

            var $your_selections;
            if (table_type === 'my') {
              $your_selections = $wrapper_parent.find('.your-selections.my-resources');
            } else {
              $your_selections = $wrapper_parent.find('.your-selections.all-resources');
            }

            /*Iterate through Source facet, search for the number of occurrences of that facet in the data table and show
             *count next to each facet. TODO: put this in a function after the MVP is accepted.*/
            $('div[id^="yadcf-filter-wrapper--' + wrapper_id + '-wrapper"]').find('li').each(function (index) {
              if (index > 0) {
                var facet_type = $(this).closest('.facet').attr('class').replace('facet', '').trim();
                var facet_topic = $(this).children('label').html();
                // Switch hyphen to underscore for looking up column number
                var topic_config_str = facet_type.replace('-', '_');
                var column_number = yadtf_topic_configs[topic_config_str].column;

                if ((facet_topic.indexOf("(")) < 0) {
                  $(this).children('label').attr('title', facet_topic);
                  var selection = "<span class='facet-topic-container' title='" + facet_topic + "'><span title = '" + facet_topic + "'>" + facet_topic + "</span><a href='javascript:void(0)'></a></span>";
                  if ($your_selections.find('span[title="' + facet_topic + '"]').length === 0) {
                    $your_selections.append(selection);
                    $your_selections.find('span.facet-topic-container').hide();
                  }
                }
                var res_t = $.grep(tableDT.data(), function (n, i) {
                  return (facet_topic.trim()) == (n[column_number]).trim();
                }, false);
                if ((facet_topic.indexOf("(")) < 0) {
                  $(this).children('label').html(facet_topic + " (" + res_t.length + ")");
                }
              }
            });


            /*On Topic Facet click (select), show topic above data table and hide if the click event unchecks the
             *clicked checkbox TODO: put this in a function after the MVP is accepted.*/
            $('div[id^="yadcf-filter-wrapper--' + wrapperParentId + '"]').find('input').click(function (e) {
              var $span_selector = $wrapper_parent.find('span.facet-topic-container[title="' + $(this).next().attr('title') + '"]');
              var $your_selections = $('.your-selections');
              var visible = $span_selector.is(":visible");
              // show label if checked
              if (!visible) {
                $span_selector.css('display', 'inline-block');
                $span_selector.find('span').html(shorten_string($(this).next().attr('title'), 40));
              } else {
                $span_selector.hide();
              }

            });



            /*On Close button click, mimick a checkbox click event.
             * */
            $wrapper_parent.find('.your-selections span.facet-topic-container a').click(function (e) {
                var selected_selection = $(this).parent().attr('title');
                var selected_id = $wrapper_parent.find('.multiselect-to-checkboxes ul li label[title=\'' + selected_selection + '\']').attr('for');
                simulateClick(e, $wrapper_parent.find("#" + selected_id));
            });

            function shorten_string(str, max_len) {
              if (str.length < max_len) {
                return str;
              }
              else {
                str = str.substr(0, max_len);
                str = str.substr(0, Math.min(str.length, str.lastIndexOf(" ")));
                return str + " ...";
              }
            }

            function simulateClick(event, obj) {
              if (obj.click) {
                obj.click()
              } else if (document.createEvent) {
                if (event.target !== obj) {
                  var evt = document.createEvent("MouseEvents");
                  evt.initMouseEvent("click", true, true, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                  var allowDefault = obj.dispatchEvent(evt);
                }
              }
            }


            // Click handler for clicking 'i' icon - show modal
            // @see http://drupal.stackexchange.com/questions/88399/ctools-modals-without-ajax
            $('#local-resources-tabs').on('click', 'td.views-field-nothing a', function (ev) {
              ev.preventDefault();
              Drupal.CTools.Modal.show("ee-ctools-popup-style");
              $('#modal-title').html('Resource Info');
              $('#modal-content').html($(this).parent().text()).scrollTop(0);
              Drupal.attachBehaviors();
            });

          }
          else {
            $table_wrapper.html('<div class="no-topics">You have not selected any local government interests. <a href="javascript:void(0);" id="add-more-topics">Add some here.</a></div>');
          }

          cached = true;
        }
      });
    };

    this.showTable = function () {
      if (!cached)
        this.ajax_request();
      $table_wrapper.show();
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


