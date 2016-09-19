function showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
}


(function($) {

  var datatable_options = {
    data: {},
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
      width: '90%',
      modal: true,
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
            //return false; // Don't submit form for this demo
          });

        $('#water_analysis_submit').click(function() {
          //$form.trigger('submit');
          //return false;
        });

        $('#water_analysis_reset').click(function() {
          var $form = $('#water_analysis_results_form');
          $form.parsley().reset();
          $form.find('input[type=number]').val('');
          $form.find('input[type=radio]').prop('checked', false);
          $form.find('select option').prop('selected', false);
          $('.bs-callout-info').toggleClass('hidden', true);
          $('.bs-callout-warning').toggleClass('hidden', true);
          return false;
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
    var $loading_wrapper = $('#be-well-informed-loading-wrapper');
    var $results_wrapper = $('#be-well-informed-results-wrapper');
    var $all_wrappers = $('.be-well-informed-modal-wrapper');

    $.ajax({
      url: 'be_well_informed/form_submission',
      method: 'POST',
      data: $('#be-well-informed-form').serialize(),
      beforeSend: function() {
        showElementOutOfMany($loading_wrapper, $all_wrappers);
      },
      success: function(be_well_response_json) {
        if (!be_well_response_json.error) {
          datatable_options.data = be_well_response_json.data.result_summary;
          $('#be-well-informed-results-table').DataTable(datatable_options);
          showElementOutOfMany($results_wrapper, $all_wrappers);
        }
        else {
          showErrorView($results_wrapper, $all_wrappers);
        }
      }
    })
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
