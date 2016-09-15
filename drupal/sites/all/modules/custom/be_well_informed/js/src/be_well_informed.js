(function($) {

  Parsley.addValidator('checkChildren', {
    messages: {en: 'You must correctly give value or choose a whether the microb was present!'},
    requirementType: 'integer',
    validate: function(_value, requirement, instance) {
      for(var i = 1; i <= requirement; i++)
        if(i == 1 && instance.$element.find('input').val()) {
          return true; // One section is filled, this check is valid
        }
        else if(i == 2 && instance.$element.find('[type=radio]:checked').length){
          return true; // One section is filled, this check is valid
        }
      return false; // No section is filled, this validation fails
    }
  });

  $('#be-well-informed-modal')
    .html(Drupal.settings.be_well_informed.modal)
    .dialog({
      width: 'auto',
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
            return false; // Don't submit form for this demo
          });

        $('#water_analysis_submit').click(function() {
          $form.trigger('submit');
          return false;
        })

        $('#water_analysis_reset').click(function() {
          var $form = $('#water_analysis_results_form');
          $form.parsley().reset();
          $form.find('input[type=number]').val('');
          $form.find('input[type=radio]').prop('checked', false);
          $form.find('select option').prop('selected', false);
          $('.bs-callout-info').toggleClass('hidden', true);
          $('.bs-callout-warning').toggleClass('hidden', true);
          return false;
        })
      }
    });


  $('#bwi-check-water-btn').click(function() {
    $('#be-well-informed-modal').dialog("open")
  });


})(jQuery);
