(function($) {



  $('#bwi-check-water-btn').click(function() {
    $('#be-well-informed-modal')
      .html(Drupal.settings.be_well_informed.modal_form)
      .dialog({
        width: 'auto',
        modal: true,
        dialogClass: 'be-well-informed-modal'
      });
  });

  $('#be-well-informed-modal').on('click', '#submit-form', function() {
    $.ajax({
      url: 'be_well_informed/form_submission',
      method: 'POST',
      data: $('#be-well-informed-form').serialize(),
      success: function(be_well_response_json) {
        if (!be_well_response_json.error) {
          $('#be-well-informed-modal').html(Drupal.settings.be_well_informed.modal_results);
          $('#be-well-informed-accordion').accordion();
          var $tbody = $('#be-well-informed-results-table').find('tbody');
          var $tr;
          $.each(be_well_response_json.data, function(index, water_result) {
            $tr = $('<tr />');
            $tr.append('<td>' + water_result.name + '</td>');
            $tr.append('<td>' + water_result.input + '</td>');
            $tr.append('<td>' + water_result.containment_level + '</td>');
            $tr.append('<td>' + water_result.message + '</td>');
            $tr.append('<td>' + water_result.level + '</td>');
            $tbody.append($tr);
          });
        }
      }
    })
  });

})(jQuery);
