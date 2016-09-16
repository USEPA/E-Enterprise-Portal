function showLoadingView() {
  $('.be-well-informed-modal-wrapper').hide();
  $('#be-well-informed-loading-wrapper').show();

}

function showFormView() {
  $('.be-well-informed-modal-wrapper').hide();
  $('#be-well-informed-form-wrapper').show();
}

function showErrorView() {
  $('.be-well-informed-modal-wrapper').hide();
  $('#be-well-informed-error-wrapper').show();
}

function showResultsView() {
  $('.be-well-informed-modal-wrapper').hide();
  $('#be-well-informed-results-wrapper').show();
}

(function($) {


  var datatable_options = {
    data: {},
    "dom": 't',
    "bLengthChange": false,
    "bAutoWidth": false,
    "bSort": false,
    "columnDefs": [
      { className: "be-well-results-first-column", "targets": [ 0 ] }
    ]
  };

  $('#bwi-check-water-btn').click(function() {
    $('#be-well-informed-modal')
      .html(Drupal.settings.be_well_informed.modal)
      .dialog({
        width: '90%',
        modal: true,
        dialogClass: 'be-well-informed-modal'
      });
    $('#be-well-informed-accordion').accordion( {
      collapsible: true,
      heightStyle: "content"
    });
  });

  $('#be-well-informed-modal').on('click', '#submit-form', function() {
    showLoadingView();
    $.ajax({
      url: 'be_well_informed/form_submission',
      method: 'POST',
      data: $('#be-well-informed-form').serialize(),
      success: function(be_well_response_json) {
        if (!be_well_response_json.error) {
          datatable_options.data = be_well_response_json.data.result_summary;
          $('#be-well-informed-results-table').DataTable(datatable_options);
          showResultsView();
        }
        else {
          showErrorView();
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
