function showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
}


(function($) {

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


  $.fn.serializeObject = function()
  {
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
    var previousKeys = Object.keys(previous[keys[cIndex]])
    console.log(previous, current, cIndex, keys)
    console.log(keys[cIndex], previous[keys[cIndex]], typeof previous[keys[cIndex]])
    console.log(previousKeys)

    if((previousKeys.indexOf('Value') > -1 && previous[keys[cIndex]].Value == "")){
      delete previous[keys[cIndex]];
    }
    else if (['object'].indexOf(typeof previous[keys[cIndex]]) > -1){
      previous[keys[cIndex]] = previousKeys.reduce(checkValues, previous[keys[cIndex]])
      if(Object.keys(previous[keys[cIndex]]).length == 0) {
        delete previous[keys[cIndex]];
      }
    }
    return previous
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
            // AJAX call
            // use this for the data value
            Object.keys(formData).reduce(checkValues, formData);

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


})(jQuery);
