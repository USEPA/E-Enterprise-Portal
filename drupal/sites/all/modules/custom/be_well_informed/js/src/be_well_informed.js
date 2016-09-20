function showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
}


(function($) {

  var formAjaxRequest;

  var default_datatable_result_details_options = {
    dom: 't',
    bLengthChange: false,
    bAutoWidth: false,
    bSort: false,
    columnDefs: [
      {className: "be-well-results-first-column", "targets": [0]}
    ],
    createdRow: function(row, data, dataIndex) {
      // Add data-title attributes to row
      $(row).find('td:eq(0)').attr('data-title', 'Result');
      $(row).find('td:eq(1)').attr('data-title', 'Element');
      $(row).find('td:eq(2)').attr('data-title', 'Your Entry');
      $(row).find('td:eq(3)').attr('data-title', 'Limit');
      $(row).find('td:eq(4)').attr('data-title', 'About Your Well Water');
    }
  };

  var default_datatable_result_summary_options = {
    dom: 't',
    bLengthChange: false,
    bAutoWidth: false,
    bSort: false,
    columnDefs: [
      {className: "be-well-results-first-column", "targets": [0]}
    ],
    createdRow: function(row, data, dataIndex) {
      // Add data-title attributes to row
      $(row).find('td:eq(0)').attr('data-title', 'Result');
      $(row).find('td:eq(1)').attr('data-title', 'Element');
      $(row).find('td:eq(2)').attr('data-title', 'Your Entry');
      $(row).find('td:eq(3)').attr('data-title', 'Limit');
      $(row).find('td:eq(4)').attr('data-title', 'About Your Well Water');
    }
  };


  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      objRoot = this.name.replace(/]/g, '')
        .split(/\[/g)
        .reduce(function(previous, current, cIndex, original) {
          var newObject = {}
          var property = original[original.length - 1 - cIndex]
          newObject[property] = previous
          return newObject;
        }, this.value);

      $.extend(true, o, objRoot);
    });
    return o;
  };

  function checkValues(previous, current, cIndex, keys) {
    var previousKeys = Object.keys(previous[keys[cIndex]]);

    if ((previousKeys.indexOf('Value') > -1 && previous[keys[cIndex]].Value == "")) {
      delete previous[keys[cIndex]];
    }
    else if (['object'].indexOf(typeof previous[keys[cIndex]]) > -1) {
      previous[keys[cIndex]] = previousKeys.reduce(checkValues, previous[keys[cIndex]])
      if (Object.keys(previous[keys[cIndex]]).length == 0) {
        delete previous[keys[cIndex]];
      }
    }
    return previous
  }

  /**
   * Clear form inputs and hide warning messages
   */
  function resetBWIForm() {
    var $form = $('#water_analysis_results_form');
    $form.parsley().reset();
    $form.find('input[type=number]').val('');
    $form.find('input[type=radio]').prop('checked', false);
    $form.find('select option').prop('selected', false);
    $('.bs-callout-info').toggleClass('hidden', true);
    $('.bs-callout-warning').toggleClass('hidden', true);
  }

  Parsley.addValidator('checkChildren', {
    messages: {en: 'You must correctly give value or choose a whether the microbe was present!'},
    requirementType: 'integer',
    validate: function(_value, requirement, instance) {
      for (var i = 1; i <= requirement; i++)
        if (i == 1 && instance.$element.find('input').val() // If block-1 has any value in the input box
          || i == 2 && instance.$element.find('[type=radio]:checked').length) { // or if block-2 has any radio buttons checked
          return true; // One section is filled, this check is valid
        }
      return false; // No section is filled, this validation fails
    }
  });



  $('#be-well-informed-modal')
    .html(Drupal.settings.be_well_informed.modal)
    .dialog({
      modal: true,
      width: "90%",
      position: {
        my: "center top",
        at: "center top",
        of: window,
        collision: "none"
      },
      dialogClass: 'be-well-informed-modal',
      autoOpen: false,
      create: function(event, ui) {
        var $form = $('#water_analysis_results_form');
        $form
          .parsley({
            inputs: Parsley.options.inputs + ',[data-parsley-check-children]'
          })
          .on('field:validated', function() {
            var ok = $('.parsley-error').length === 0;
            $('.bs-callout-info').toggleClass('hidden', !ok);
            $('.bs-callout-warning').toggleClass('hidden', ok);
          })
          .on('form:submit', function() {
            return false; // Don't submit form for this demo
          });

        $('#water_analysis_reset').click(function() {
          resetBWIForm();
        });

        $('#be-well-informed-accordion').accordion({
          collapsible: true,
          heightStyle: "content"
        });
      }
    });

  $('#bwi-check-water-btn').click(function() {
    $('#be-well-informed-modal').dialog("open")
  });

  $('#be-well-informed-modal').on('click', '#water_analysis_submit', function() {
    var $form = $('#water_analysis_results_form');
    // If the form does not validate do not submit data.
    if (!$form.parsley().validate()) {
      return false;
    }

    var $loading_wrapper = $('#be-well-informed-loading-wrapper');
    var $results_wrapper = $('#be-well-informed-results-wrapper');
    var $all_wrappers = $('.be-well-informed-modal-wrapper');
    var formData = $form.serializeObject();

    // Show Loading view
    showElementOutOfMany($loading_wrapper, $all_wrappers);
    formAjaxRequest = $.ajax({
      url: 'be_well_informed/form_submission',
      method: 'POST',
      data: Object.keys(formData).reduce(checkValues, formData),
      success: function(be_well_response_json) {
        if (!be_well_response_json.error) {

          // Use two separate instances of Datatable configs for both datatables
          default_datatable_result_details_options.data = be_well_response_json.data.result_summary;
          default_datatable_result_summary_options.data = be_well_response_json.data.result_summary;

          $('#be-well-informed-results-table').DataTable(default_datatable_result_summary_options);

          $('#be-well-informed-result-details-table').DataTable(default_datatable_result_details_options);
          showElementOutOfMany($results_wrapper, $all_wrappers);

          // Loop through and add trs to the summary table. Datatable does not support colspan
          var result;
          var row_index = 1;
          $.each(be_well_response_json.data.result_details, function(index, detail_obj) {
            result = detail_obj.result;
            if (detail_obj.data_array.length > 0) {
              for (var i = 0; i < detail_obj.data_array.length; i++) {
                if (detail_obj.data_array[i] !== '') {
                  $('#be-well-informed-result-details-table')
                    .find('tr:eq(' + (row_index + index) + ')')
                    .after('<tr><td class="bwi-detail-td ' + result + '" colspan="5">' + detail_obj.data_array[i] + '</td></tr>');
                  row_index++;
                }
              }
            }
          });

        }
        else {
          showElementOutOfMany($results_wrapper, $all_wrappers);
        }
      }
    });

  });

  /**
   * Close Listener on BWI Modal
   * -  Destroy Datatables
   * -  Cancel Pending Form submission
   */
  $('#be-well-informed-modal').on('dialogclose', function() {
    var $form_wrapper = $('#be-well-informed-form-wrapper');
    var $all_wrappers = $('.be-well-informed-modal-wrapper');
    if (formAjaxRequest) {
      formAjaxRequest.abort();
    }
    $('#be-well-informed-results-table').DataTable().destroy();
    $('#be-well-informed-result-details-table').DataTable().destroy();
    showElementOutOfMany($form_wrapper, $all_wrappers);
  });

  $('#be-well-informed-modal').on('click', '.ui-accordion-header', function() {
    var $arrow = $(this).find('i');
    // Reset all other arrows to right (default)
    $('.ui-accordion-header').not($(this)).find('i').removeClass('fa-caret-down').addClass('fa-caret-right');
    if ($arrow.hasClass("fa-caret-right")) {
      $arrow.removeClass('fa-caret-right').addClass('fa-caret-down');
    } else {
      $arrow.removeClass('fa-caret-down').addClass('fa-caret-right');
    }
  });

})(jQuery);
