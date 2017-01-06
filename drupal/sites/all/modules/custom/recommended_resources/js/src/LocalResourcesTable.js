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

(function($) {
  LocalResourcesTable = function($table_wrapper, ajax_url, table_type) {

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
      "fnCreatedRow": function(nRow, aData, iDataIndex) {
        // Refactor pipe delimited values to use commas and be on new lines
        var $tds = $('td:gt(1)', nRow);
        $tds.each(function() {
          $(this).html("<span>" + $(this).text().replace(/\|/g, '; </span><span>') + "</span>");
        });
        return nRow;
      },
      "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        var table = $(this).DataTable();
        var info = table.page.info();
        var pageNo = info.page + 1;

        if (info.pages > 1) {
          var $current_li = $('<li />', {
            class: 'pager-current'
          })
            .html(pageNo + ' of ' + info.pages);
          $table_wrapper.find('.dataTables_paginate li:first').after($current_li);
        }
        // Add needed classes after the table is rendered
        $('td:first-child', nRow.nTable).addClass("resource-title");
        $('td:nth-child(2)', nRow.nTable).addClass("resource-info");
        $('td:nth-child(3)', nRow.nTable).addClass("resource-source").attr('data-title', 'Source');
        $('td:nth-child(4)', nRow.nTable).addClass("resource-topic").attr('data-title', 'Topic');
        $('td:nth-child(5)', nRow.nTable).addClass("resource-category").attr('data-title', 'Category');
      },
      "columnDefs": [
        { // hide the following columns, they are only used for faceted filtering
          "targets": [5, 6, 7, 8],
          "visible": false
        },
        { // remove sorting for "Info" column
          "targets": [1],
          "orderable": false
        }
      ]
    };

    var cached = false;
    var datatable_id = '';
    var wrapper_id = $table_wrapper.attr('id');

    this.hideTable = function() {
      $table_wrapper.hide();
    };

    this.ajax_request = function(from_embedded_topics) {
      var topics = this.topics,
        $userFilters = $('#user-local-resources-wrapper').find('[id^=_yadcf-filter]');
      $.ajax({
        beforeSend: function() {
          var $table = $table_wrapper.find('.view-content');
          if ($table.length > 0) {
            $table.html('<p>Loading&hellip;</p>');
          } else {
            $table_wrapper.html('<p>Loading&hellip;</p>');
          }
          // Need to clear and freeze the filters while loading
          $userFilters.prop('checked', false).prop('disabled', true);
          $('#user-local-resources-wrapper').find('.your-selections .facet-topic-container').hide();
        },
        url: ajax_url,
        method: "POST",
        data: {filters: topics},

        success: function(table) {
          /**
           * TODO: refactor - duplicate code block in the following files:
           * other_items_of_interest/js/ItemsOfInterestTable.js
           * other_items_of_interest/js/other_items_of_interest.js
           */
          // alter the datatable id, one digit larger than the largest id
          var newId = 0;
          $("table[id^='datatable-']").each(function() {
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
            tableDT.columns().iterator('column', function (ctx, idx) {
              $(tableDT.column(idx).header()).append('<span class="sort-icon" />');
            });
            $table.removeClass("dataTable display no-footer").addClass('views-table eportal-responsive-table usa-table-borderless');

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
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|'

              },
              {
                column_number: 3,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .topic.facet',
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|'
              },
              {
                column_number: 4,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .category.facet',
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|'

              },
              {
                column_number: 5,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .tool-type.facet',
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|'

              },
              {
                column_number: 6,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .training-level.facet',
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|',
                data: ['High', 'Medium', 'Low'],
                sort_as: 'none'
              },
              {
                column_number: 7,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .data-requirements.facet',
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|',
                data: ['High', 'Medium', 'Low'],
                sort_as: 'none'
              },
              {
                column_number: 8,
                filter_type: 'multi_select',
                filter_container_selector: '#' + wrapperParentId + ' .relevance.facet',
                filter_match_mode: 'contains',
                filter_reset_button_text: false,
                text_data_delimiter: '|'

              }
            ]);
            $('#' + wrapperParentId).find('.facet select').each(function() {
              $(this).multiSelectToCheckboxes();
            });

            var your_selections = $('.your-selections');
            if (your_selections.find('.selection-lbl').length === 0) {
              var selection_lbl = "<div class='selection-lbl'>" + your_selections.html() + "</div>";
              your_selections.html(selection_lbl);
            }

            var $your_selections;
            if (table_type === 'my') {
              $your_selections = $wrapper_parent.find('.your-selections.my-resources');
            } else {
              $your_selections = $wrapper_parent.find('.your-selections.all-resources');
            }


            /**
             * Track the amount of common facets
             */
            var facet_topic_counts = {};
            $('div[id^="yadcf-filter-wrapper--' + wrapper_id + '-wrapper"]').find('li').each(function(index) {
              var facet_topic = $(this).find('label').html();
              if (!facet_topic_counts[facet_topic]) {
                facet_topic_counts[facet_topic] = 0;
              }
              facet_topic_counts[facet_topic]++;
            });

            // remove previously created facets
            // @see https://alm.cgifederal.com/projects/browse/EE-1361
            $your_selections.find('.facet-topic-container').remove();

            /*Iterate through Source facet, search for the number of occurrences of that facet in the data table and show
             *count next to each facet. TODO: put this in a function after the MVP is accepted.*/
            $('div[id^="yadcf-filter-wrapper--' + wrapper_id + '-wrapper"]').find('li').each(function(index) {
              if (index > 0) {
                var facet_type = $(this).closest('.facet').attr('class').replace('facet', '').trim();
                var facet_topic = $(this).find('label').html();
                var facet_type_text = "";
                var $selection = $('<span />', {
                  class: "facet-topic-container",
                  title: facet_topic,
              }).attr('data-facet-type', facet_type);


                // Switch hyphen to underscore for looking up column number
                var topic_config_str = facet_type.replace('-', '_');
                var column_number = yadtf_topic_configs[topic_config_str].column;
                var $label = $(this).find('label');
                $label.data('facet-type', facet_type);
                if (!$label.hasClass('counted_total_facets')) {
                  if (facet_topic_counts[facet_topic] > 1) {
                    facet_type_text = facet_type.replace('-', ' ') + ": ";
                  }
                  var $inner_selection = $('<span />', {
                    title: facet_topic,
                    text: shorten_string(facet_type_text + facet_topic, 40)
                  });
                  $inner_selection.html()
                  var $inner_anchor = $('<a />', {
                    href: "javascript:void(0)",
                  });
                  $inner_anchor.html("<span class='sr-only'>Remove " + facet_topic + "</span>");
                  $selection.append($inner_selection).append($inner_anchor);
                  $your_selections.append($selection);

                  var res_t = $.grep(tableDT.data(), function(n, i) {
                    return ($.inArray(facet_topic.trim(), n[column_number].split('|')) >= 0);
                  }, false);
                  $label.html(facet_topic + " (" + res_t.length + ")")
                    .addClass('counted_total_facets')
                    .attr('title', facet_topic)
                    .attr('data-facet-type', facet_type);
                }
              }
            });


            /*On Topic Facet click (select), show topic above data table and hide if the click event unchecks the
             *clicked checkbox TODO: put this in a function after the MVP is accepted.*/
            $('div[id^="yadcf-filter-wrapper--' + wrapperParentId + '"]').find('input').click(function(e) {
              // exact matching span selector
              var facet_type = $(this).next().data('facetType');
              var facet_title = $(this).next().attr('title');
              var $span_selector = $wrapper_parent.find('span.facet-topic-container[data-facet-type="' + facet_type + '"][title="' + facet_title + '"]');

              var $your_selections = $('.your-selections');
              var visible = $span_selector.is(":visible");
              // show label if checked
              if (!visible) {
                $span_selector.css('display', 'inline-block');
              } else {
                $span_selector.hide();
              }

              // This will toggle the visibility of the clear selected button
              if ($wrapper_parent.find('.your-selections span.facet-topic-container a:visible').length > 0) {
                $wrapper_parent.find('.clear-lgc-resources').removeClass('hidden');
              }
              else {
                $wrapper_parent.find('.clear-lgc-resources').addClass('hidden');
              }
            });


            /* On Close button click, mimic a checkbox click event. After modifying the "My Profile Topics" there is a
             * chance the close button can have multiply click events added to fake a click on the checkbox.  When an
             * even number of listeners are created, the button appears to fail.
             * */
            $wrapper_parent.find('.your-selections span.facet-topic-container a').unbind('click').click(function(e) {
              var $selection = $(this).parent();
              var selected_selection = $selection.attr('title');
              var facet_type = $selection.data('facetType');
              var selected_id = $wrapper_parent.find('.multiselect-to-checkboxes ul li label[data-facet-type="' + facet_type + '"][title=\'' + selected_selection + '\']').attr('for');
              $wrapper_parent.find("#" + selected_id).trigger('click');
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

            // Click handler for clicking 'i' icon - show modal
            // @see http://drupal.stackexchange.com/questions/88399/ctools-modals-without-ajax
            $('#local-resources-tabs').on('click', 'td.views-field-nothing a', function(ev) {
              this.focus();
              Drupal.CTools.Modal.show("ee-ctools-popup-style");
              $('#modal-title').html('Resource Info');
              $('#modal-content').html($(this).parent().find('div').text()).scrollTop(0);
              Drupal.attachBehaviors();
              ev.preventDefault();
            });

            var topics = Drupal.settings.recommended_resources.user_lgc_topics;
            var count = Object.keys(topics).length;
            if ($table_wrapper.attr('id') == 'user-local-resources') {
              // Hide all labels in the user-local-resources topics facet
              $('#user-local-resources-wrapper').find('.topic.facet label').hide();
              for (key in topics) {
                var $label = $('#user-local-resources-wrapper label[title="' + topics[key] + '"]');
                $label.show();
                if (count == 1) {
                  $label.trigger("click");
                  var inputSelector = "#" + $label.attr('for');
                  var $input = $(inputSelector);
                  $input.prop("disabled", "disabled");
                }
              }
            }


          }
          else {
            $table_wrapper.html('<div class="no-topics">You have not selected any local government interests. <a href="javascript:void(0);" id="add-more-topics">Add some here.</a></div>');
          }

          // Unfreeze filters
          $userFilters.prop('disabled', false);

          cached = true;
        }
      });
    };

    this.showTable = function() {
      if (!cached)
        this.ajax_request();
      $table_wrapper.show();
    };
    this.updateTopics = function(values, from_embedded_topics) {
      this.topics = values;
      if (from_embedded_topics) {
        this.ajax_request(from_embedded_topics);
      }
      else {
        this.ajax_request();
      }
    };
    this.filterTopics = function(topic_text) {
      if (datatable_id !== '') {
        var $table = $('#' + datatable_id);
        $table.DataTable().columns().search(topic_text).draw();
      }
    }

  };
})(jQuery);


