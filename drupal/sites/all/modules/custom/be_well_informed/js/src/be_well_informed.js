function showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
  resizeModal()
}

jQuery.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  jQuery.each(a, function() {
    objRoot = this.name.replace(/]/g, '')
      .split(/\[/g)
      .reduce(function(previous, current, cIndex, original) {
        var newObject = {}
        var property = original[original.length - 1 - cIndex]
        newObject[property] = previous
        return newObject;
      }, this.value);

    jQuery.extend(true, o, objRoot);
  });
  return o;
};

toggleSection = function() {
  var $this = $(this);
  var $arrow = $(this).find('i');

  $this.toggleClass('open close')
  // Reset all other arrows to right (default)
  /*$('.ui-accordion-header').not($(this)).find('i').removeClass('fa-caret-down').addClass('fa-caret-right');
   if ($arrow.hasClass("fa-caret-right")) {
   $arrow.removeClass('fa-caret-right').addClass('fa-caret-down');
   } else {
   $arrow.removeClass('fa-caret-down').addClass('fa-caret-right');
   }*/
  resizeModal()
}

function resizeModal() {
  jQuery('#be-well-informed-modal').dialog({
    position: {'my': 'center', 'at': 'center'}
  });
  if (jQuery('.be-well-informed-modal').css('top').replace('px', '') < 1) {
    jQuery('.be-well-informed-modal').css('top', 0)
  }
}

// Check Radio Mapping for checked radio values.
function checkRadioInputs(radioMapping) {
  var $ = jQuery;
  var $radioInput;
  $.each(radioMapping, function(symbol, radioName) {
    $radioInput = $("input[name='" + radioName + "']:checked");
    if ($radioInput.length > 0) {
      radioMapping[symbol] = $radioInput.val();
    } else {
      delete radioMapping[symbol];
    }
  });
  return radioMapping;
}

// Handle Serialized Form data for Be Well Informed consumption
function formatFormData(formData, convertNulls) {
  // Check for Ecoli/Total Coliform radio buttons
  // Map input Names to Unit names so we can set the presence attribute in the form
  var presenceRadioInputs = {Ecoli: 'Ecoli_G', Bac: 'Bac_G'}
  presenceRadioInputs = checkRadioInputs(presenceRadioInputs);

  Object.keys(formData).reduce(function(previous, current, cIndex, keys) {
    var previousKeys = [];
    if (typeof previous[keys[cIndex]] == 'object') {
      previousKeys = Object.keys(previous[keys[cIndex]]);
    }

    // Standardize all values to Type Ints. If the value is NULL or blank, send -9999
    if ((previousKeys.indexOf('Value') > -1) ) {
      // Check if presence radio has been inputed and set balue
      if (previous[keys[cIndex]].Symbol in presenceRadioInputs) {
        previous[keys[cIndex]].Presence = presenceRadioInputs[previous[keys[cIndex]].Symbol];
        delete previous[keys[cIndex]].Value;
      }
      if (convertNulls) {
        if (!isNaN(previous[keys[cIndex]].Value) && previous[keys[cIndex]].Value != "") {
          previous[keys[cIndex]].Value = parseFloat(previous[keys[cIndex]].Value);
        } else {
          previous[keys[cIndex]].Value = -9999;
        }
      } else {
        if ((previousKeys.indexOf('Value') > -1 && previous[keys[cIndex]].Value == "")) {
          delete previous[keys[cIndex]];
        }
      }
    }
    else if (['object'].indexOf(typeof previous[keys[cIndex]]) > -1) {
      previous[keys[cIndex]] = previousKeys.reduce(arguments.callee, previous[keys[cIndex]])
      if (Object.keys(previous[keys[cIndex]]).length == 0) {
        delete previous[keys[cIndex]];
      }
    }
    return previous
  }, formData);
  return formData;
}

var sampleData = function() {};

/**
 * Clear form inputs and hide warning messages
 */
function resetBWIForm() {
  var $ = jQuery;
  var $form = $('#water_analysis_results_form');
  $form.parsley().reset();
  $form.find('input[type=number]').val('');
  $form.find('input[type=radio]').prop('checked', false);
  $form.find('select option').prop('selected', false);
  $('.bs-callout-info').toggleClass('hidden', true);
  $('.bs-callout-warning').toggleClass('hidden', true);
}

(function($) {
  var sampleSetIndex = 0;
  // Flag for converting Null or blank inputs to -9999
  var convertNulls = false;
  sampleData = function(sample) {
    // lets us cycle through different sets of test data
    if (!sample) {
      // different handy test cases
      sampleSet = [
        {"CityName":"Amherst","RoutineContaminants":{"As":{"Symbol":"As","Name":"Arsenic","Value":"1234","Unit":"mg/L"},"Cl":{"Symbol":"Cl","Name":"Chloride","Value":"1234","Unit":"mg/L"},"Cu":{"Symbol":"Cu","Name":"Copper","Value":"1234","Unit":"mg/L"},"CuSt":{"Symbol":"CuSt","Name":"Copper, Stagnant","Value":"1234","Unit":"mg/L"},"Fl":{"Symbol":"Fl","Name":"Fluoride","Value":"1234","Unit":"mg/L"},"Har":{"Symbol":"Har","Name":"Hardness as CaCO3","Value":"1234","Unit":"mg/L"},"Fe":{"Symbol":"Fe","Name":"Iron","Value":"1234","Unit":"mg/L"},"Pb":{"Symbol":"Pb","Name":"Lead","Value":"1234","Unit":"mg/L"},"PbSt":{"Symbol":"PbSt","Name":"Lead, Stagnant","Value":"1234","Unit":"mg/L"},"Mn":{"Symbol":"Mn","Name":"Manganese","Value":"1234","Unit":"mg/L"},"NO3":{"Symbol":"NO3","Name":"Nitrate-N","Value":"1234","Unit":"mg/L"},"NO2":{"Symbol":"NO2","Name":"Nitrite-N","Value":"1234","Unit":"mg/L"},"pH":{"Symbol":"pH","Name":"pH","Value":"6.1","Unit":"units"},"Na":{"Symbol":"Na","Name":"Sodium","Value":"1234","Unit":"mg/L"}},"BacterialContaminants":{"Bac":{"Symbol":"Bac","Name":"Total Coliform","Value":"1234","Unit":"CFU/100 mL"},"Ecoli":{"Symbol":"Ecoli","Name":"E. Coli","Value":"1234","Unit":"CFU/100 mL"}},"Bac_G":"rdb_Bac_True","Ecoli_G":"rdb_Ecoli_True","RadionuclideContaminants":{"Rn":{"Symbol":"Rn","Name":"Radon","Value":"4321","Unit":"pCi/L"},"Ur":{"Symbol":"Ur","Name":"Uranium","Value":"4321","Unit":"μg/L"},"AGA":{"Symbol":"AGA","Name":"Gross Alpha","Value":"4321","Unit":"pCi/L"}},"InteractivePromptResponses":{"0":{"InteractionIdentifier":"Cl_True","Symbol":"Cl"},"1":{"InteractionIdentifier":"Har_True","Symbol":"Har"}}},
        {"CityName":"Portsmouth","RoutineContaminants":{"As":{"Symbol":"As","Name":"Arsenic","Value":"45","Unit":"mg/L"},"Cl":{"Symbol":"Cl","Name":"Chloride","Value":"2","Unit":"mg/L"},"Cu":{"Symbol":"Cu","Name":"Copper","Value":"54","Unit":"mg/L"},"CuSt":{"Symbol":"CuSt","Name":"Copper, Stagnant","Value":"5","Unit":"mg/L"},"Fl":{"Symbol":"Fl","Name":"Fluoride","Value":"22","Unit":"mg/L"},"Har":{"Symbol":"Har","Name":"Hardness as CaCO3","Value":"1234","Unit":"mg/L"},"Fe":{"Symbol":"Fe","Name":"Iron","Value":"87","Unit":"mg/L"},"Pb":{"Symbol":"Pb","Name":"Lead","Value":"43","Unit":"mg/L"},"PbSt":{"Symbol":"PbSt","Name":"Lead, Stagnant","Value":"1234","Unit":"mg/L"},"Mn":{"Symbol":"Mn","Name":"Manganese","Value":"1234","Unit":"mg/L"},"NO3":{"Symbol":"NO3","Name":"Nitrate-N","Value":"1234","Unit":"mg/L"},"NO2":{"Symbol":"NO2","Name":"Nitrite-N","Value":"1234","Unit":"mg/L"},"pH":{"Symbol":"pH","Name":"pH","Value":"6.1","Unit":"units"},"Na":{"Symbol":"Na","Name":"Sodium","Value":"1234","Unit":"mg/L"}},"BacterialContaminants":{"Bac":{"Symbol":"Bac","Name":"Total Coliform","Value":"1234","Unit":"CFU/100 mL"},"Ecoli":{"Symbol":"Ecoli","Name":"E. Coli","Value":"1234","Unit":"CFU/100 mL"}},"Bac_G":"rdb_Bac_True","Ecoli_G":"rdb_Ecoli_True","RadionuclideContaminants":{"Rn":{"Symbol":"Rn","Name":"Radon","Value":"4321","Unit":"pCi/L"},"Ur":{"Symbol":"Ur","Name":"Uranium","Value":"4321","Unit":"μg/L"},"AGA":{"Symbol":"AGA","Name":"Gross Alpha","Value":"4321","Unit":"pCi/L"}},"InteractivePromptResponses":{"0":{"InteractionIdentifier":"Cl_True","Symbol":"Cl"},"1":{"InteractionIdentifier":"Har_True","Symbol":"Har"}}},
        {"CityName":"Anonymous","RoutineContaminants":{"As":{"Symbol":"As","Name":"Arsenic","Value":"1","Unit":"mg/L"}}},
        {"CityName":"Amherst","BacterialContaminants":{"Bac":{"Symbol":"Bac","Name":"Total Coliform","Value":"1","Unit":"CFU/100 mL"}}},
        {"CityName": "Anonymous", "Bac_G": "rdb_Bac_True"},
        {"CityName":"Salem","RoutineContaminants":{"As":{"Symbol":"As","Name":"Arsenic","Value":"11","Unit":"mg/L"},"Cl":{"Symbol":"Cl","Name":"Chloride","Value":"4","Unit":"mg/L"},"Cu":{"Symbol":"Cu","Name":"Copper","Value":"54","Unit":"mg/L"},"CuSt":{"Symbol":"CuSt","Name":"Copper, Stagnant","Value":"5","Unit":"mg/L"},"Har":{"Symbol":"Har","Name":"Hardness as CaCO3","Value":"27","Unit":"mg/L"},"Fe":{"Symbol":"Fe","Name":"Iron","Value":"87","Unit":"mg/L"},"Pb":{"Symbol":"Pb","Name":"Lead","Value":"43","Unit":"mg/L"},"PbSt":{"Symbol":"PbSt","Name":"Lead, Stagnant","Value":"54","Unit":"mg/L"},"Mn":{"Symbol":"Mn","Name":"Manganese","Value":"1234","Unit":"mg/L"},"pH":{"Symbol":"pH","Name":"pH","Value":"6.1","Unit":"units"},"Na":{"Symbol":"Na","Name":"Sodium","Value":"9","Unit":"mg/L"}},"BacterialContaminants":{"Bac":{"Symbol":"Bac","Name":"Total Coliform","Value":"5","Unit":"CFU/100 mL"},"Ecoli":{"Symbol":"Ecoli","Name":"E. Coli","Value":"3","Unit":"CFU/100 mL"}},"Bac_G":"rdb_Bac_True","Ecoli_G":"rdb_Ecoli_True","RadionuclideContaminants":{"Rn":{"Symbol":"Rn","Name":"Radon","Value":"56","Unit":"pCi/L"},"Ur":{"Symbol":"Ur","Name":"Uranium","Value":"12","Unit":"μg/L"},"AGA":{"Symbol":"AGA","Name":"Gross Alpha","Value":"98","Unit":"pCi/L"}},"InteractivePromptResponses":{"0":{"InteractionIdentifier":"Cl_True","Symbol":"Cl"},"1":{"InteractionIdentifier":"Har_True","Symbol":"Har"}}},
        {"CityName":"Anonymous","BacterialContaminants":{"Ecoli":{"Symbol":"Ecoli","Name":"E. Coli","Value":"0","Unit":"CFU/100 mL"}}},
        {"CityName":"Anonymous","RoutineContaminants":{"Cl":{"Symbol":"Cl","Name":"Chloride","Value":"250","Unit":"mg/L"}}},
        {"CityName":"Anonymous","RoutineContaminants":{"Har":{"Symbol":"Har","Name":"Hardness as CaCO3","Value":"150","Unit":"mg/L"}}},
        {"CityName":"Anonymous","RoutineContaminants":{"Fe":{"Symbol":"Fe","Name":"Iron","Value":".3","Unit":"mg/L"}}},
        {"CityName":"Anonymous","RoutineContaminants":{"Mn":{"Symbol":"Mn","Name":"Manganese","Value":".05","Unit":"mg/L"}}},
        {"CityName":"Anonymous","RoutineContaminants":{"pH":{"Symbol":"pH","Name":"pH","Value":"8","Unit":"units"}}},
        {"CityName":"Anonymous","RadionuclideContaminants":{"AGA":{"Symbol":"AGA","Name":"Gross Alpha","Value":"15","Unit":"pCi/L"}}}
      ]
      sample = sampleSet[sampleSetIndex]
      sampleSetIndex = ++sampleSetIndex % sampleSet.length
    }

    resetBWIForm();

    for (var cat in sample) {
      if (typeof sample[cat] == 'object') {
        for (var field in sample[cat]) {
          if (typeof sample[cat][field] == 'object') {
            for (var prop in sample[cat][field]) {
              var selector = '[name="' + cat + '[' + field + '][' + prop + ']"]';
              $(selector).val(sample[cat][field][prop]);
            }
          }
        }
      }
      else {
        var selector = '[name="' + cat + '"]';
        $(selector + '[type=radio][value="' + sample[cat] + '"]').prop('checked', true)
        $('select' + selector).val(sample[cat])
      }
    }
  }

  $('#be-well-informed-modal')
    .html(Drupal.settings.be_well_informed.modal)
    .dialog({
      modal: true,
      width: "auto",
      title: "Be Well Informed Water Analysis Tool",
      position: {'my': 'center', 'at': 'center'},
      dialogClass: 'be-well-informed-modal',
      autoOpen: false,
      draggable: false,
      resizable: false,
      create: function(event, ui) {
        $('#bwi-tabs').tabs();
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
          resizeModal()
        });

        $(window).resize(function() {
          resizeModal();
        })
      },
      close: function(event, ui) {
        sampleSetIndex = 0;
        convertNulls = false;
        $('#be-well-informed-results-table, #be-well-informed-result-details-table').dataTable({bDestroy: true}).fnDestroy();
        $('#be-well-informed-results-table, #be-well-informed-result-details-table, #be-well-informed-results-table_wrapper, #be-well-informed-result-details-table_wrapper').remove();
        $('#routine-contaminants, .or').removeClass('hide')
        $('#interactive-prompts').html('')
        $('#interactive-prompts, #additional-contaminant-requests, .interactive-prompt, .additional-contaminant-requests').addClass('hide')
        $('treatment-header, .treatment-content, .treatment-step, .box-main, .instruction-icon, .caret').addClass('hide')
        showElementOutOfMany($('#be-well-informed-form-wrapper'), $('.be-well-informed-modal-wrapper'));
      }
    })

  $('#bwi-check-water-btn').click(function() {
    $('#be-well-informed-modal').dialog("open");
    resizeModal()
  });

  $('#be-well-informed-modal').on('click', '#water_analysis_submit', function() {
    var $form = $('#water_analysis_results_form');
    // If the form does not validate do not submit data.
    if (!$form.parsley().validate()) {
      return false;
    }

    var $loading_wrapper = $('#be-well-informed-loading-wrapper');
    var $results_wrapper = $('#be-well-informed-results-wrapper');
    var $form_wrapper = $('#be-well-informed-form-wrapper');
    var $all_wrappers = $('.be-well-informed-modal-wrapper');
    var formData = $form.serializeObject();


    var data = formatFormData(formData, convertNulls);

    showElementOutOfMany($loading_wrapper, $all_wrappers);
    $('#entry-tab').text('Entry');
    $.ajax({
      url: 'be_well_informed/form_submission',
      method: 'POST',
      data: data,
      success: function(be_well_response_json) {
        if (!be_well_response_json.error) {
          // reset the modal and return it to a 'default' state
          $('#routine-contaminants, .or').removeClass('hide')
          $('#interactive-prompts, #additional-contaminant-requests, .interactive-prompt, .additional-contaminant-requests').addClass('hide')
          $('treatment-header, .treatment-content, .treatment-step, .box-main, .instruction-icon, .caret, .system-type-house, .system-type-water').addClass('hide')
          $('#water_analysis_reset').addClass('invisible')
          $('.bs-callout-info, .bs-callout-warning').toggleClass('hidden', true)
          convertNulls = true;

          // Handle all the addition requests for the service
          if (!!be_well_response_json.data.InteractivePrompts.length || !!be_well_response_json.data.AdditionalContaminantRequests.length) {
            $('#routine-contaminants').addClass('hide')
            $interactive_prompts = $('#interactive-prompts');
            // Handle any interactive prompts that are returned from the service
            if (!!be_well_response_json.data.InteractivePrompts.length) {
              // We need build out the html and append it to the form
              be_well_response_json.data.InteractivePrompts.map(function(item, index, prompts) {
                // check if it already exists, skip it
                var interaction_string = item.Interaction.replace(/"/g, '');
                var $item = $('[data-interaction="' + interaction_string + '"]')
                var exists = !!$item.length
                if (!exists) {
                  // build the prompts ui if needed
                  var $prompt = $('<div class="section row interactive-prompt"></div>').attr('data-interaction', interaction_string)
                    .appendTo($interactive_prompts)
                  var $title = $('<div class="column usa-width-one-half"><p class="interaction">' + interaction_string + '</p></div>')
                    .appendTo($prompt)
                  var $inputs = $('<div class="column usa-width-one-half btn-group">' +
                    '<button for="" class="usa-button-outline" type="button"><input type="radio" value="true">Yes</button>' +
                    '<button for="" class="usa-button-outline" type="button"><input type="radio" value="false">No</button>' +
                    '</div>')
                    .appendTo($prompt)
                    .on('click', 'button', function(e) {
                      // toggle CSS classes to indicate which button has been clicked
                      $inputs.find('button').not(e.currentTarget).removeClass('usa-button-primary').addClass('usa-button-outline');
                      $(e.currentTarget).addClass('usa-button-primary').removeClass('usa-button-outline');

                      // select the appropriate radio element
                      $(this).find('input:radio').prop("checked", true);
                    })
                  $inputs.find('input').attr('name', 'InteractivePromptResponses[' + index + '][Interaction]')
                  var $hidden_symbol = $('<input type="hidden">')
                    .attr('name', 'InteractivePromptResponses[' + index + '][Symbol]')
                    .val(item.Symbol)
                    .prependTo($inputs)
                  var $hidden_identifier = $('<input type="hidden">')
                    .attr('name', 'InteractivePromptResponses[' + index + '][InteractionIdentifier]')
                    .val(item.InteractionIdentifier)
                    .prependTo($inputs)
                }
                else {
                  $item.removeClass('hide')
                }
              })
              $interactive_prompts.removeClass('hide')
            }
            // Handle any additional contaminant requests that are returned from the service
            if (!!be_well_response_json.data.AdditionalContaminantRequests.length) {
              // We need build out the html and append it to the form
              be_well_response_json.data.AdditionalContaminantRequests.map(function(item, index, prompts) {
                // check if it already exists, skip it
                var interaction_string = item.Interaction.replace(/"/g, '');
                var $item = $('[data-interaction="' + interaction_string + '"]')
                var exists = !!$item.length
                if (!exists) {
                  // build the prompts ui if needed
                  var $prompt = $('<div class="section row additional-contaminant-requests"></div>').attr('data-interaction', interaction_string)
                    .appendTo($interactive_prompts)
                  var $title = $('<div class="column usa-width-one-half"><p class="interaction">' + interaction_string + '</p></div>')
                    .appendTo($prompt)
                  var $column = $('<div class="column usa-width-one-half"></div>')
                    .appendTo($prompt)
                  var contaminantType = 'RoutineContaminants';
                  if (item.Symbol == 'Ecoli' || item.Symbol == 'Bac') {
                    contaminantType = 'BacterialContaminants';
                  } else if (item.Symbol == 'Ur') {
                    contaminantType = 'RadionuclideContaminants';
                  }
                  // we will use the existing form to submit the updated values
                  var $input = $('<input class="one-third offset-one-third" type="number" step="0.001">')
                    .on('change', function() {
                      $('[name="' + contaminantType + '[' + item.Symbol + '][Value]"]').val($(this).val())
                    })
                    .appendTo($column)

                  var $select = $('<select class="one-third" ></select>')
                    .html($('[name="' + contaminantType + '[' + item.Symbol + '][Unit]"]').html())
                    .on('change', function() {
                      $('[name="' + contaminantType + '[' + item.Symbol + '][Unit]"]').val($(this).val())
                    })
                    .appendTo($column)
                }
                else {
                  $item.removeClass('hide')
                }
              })
              $interactive_prompts.removeClass('hide')
            }
            showElementOutOfMany($form_wrapper, $all_wrappers);
            $('#entry-tab').text('Entry');
          }
          // If there are no additional questions we should have results
          else if (!!be_well_response_json.data.ResultEvaluations) {
            // Additional resets
            $('#interactive-prompts').html('');

            // Use two separate instances of Datatable configs for both datatables
            var default_datatable_result_details_options = {
              dom: 't',
              bLengthChange: false,
              bAutoWidth: false,
              bSort: false,
              columnDefs: [
                {className: "small-screen-td-header", "targets": [0]}
              ],
              createdRow: function(row, data, dataIndex) {
                // Add data-title attributes to row
                $(row).find('td:eq(0)').attr('data-title', 'Result');
                $(row).find('td:eq(1)').attr('data-title', 'Element');
                $(row).find('td:eq(2)').attr('data-title', 'Your Entry');
                $(row).find('td:eq(3)').attr('data-title', 'Limit');
                $(row).find('td:eq(4)').attr('data-title', 'About Your Well Water');
              },
              data: be_well_response_json.data.result_summary,
              paging: false
            };

            var default_datatable_result_summary_options = {
              dom: 't',
              bLengthChange: false,
              bAutoWidth: false,
              bSort: false,
              columnDefs: [
                {className: "small-screen-td-header", "targets": [0]}
              ],
              createdRow: function(row, data, dataIndex) {
                // Add data-title attributes to row
                $(row).find('td:eq(0)').attr('data-title', 'Result');
                $(row).find('td:eq(1)').attr('data-title', 'Element');
                $(row).find('td:eq(2)').attr('data-title', 'Your Entry');
                $(row).find('td:eq(3)').attr('data-title', 'Limit');
                $(row).find('td:eq(4)').attr('data-title', 'About Your Well Water');
              },
              data: be_well_response_json.data.result_summary,
              paging: false
            };

            $table = $('<table id="be-well-informed-results-table" class="eportal-responsive-table usa-table-borderless"> <thead> <tr> <th>Result</th> <th>Element</th> <th>Your Entry</th> <th>Limit</th> <th>About Your Well Water</th> </tr> </thead> <tbody></tbody> </table>')
            $table.appendTo('.be-well-informed-results').DataTable(default_datatable_result_summary_options);

            $table = $('<table id="be-well-informed-result-details-table" class="eportal-responsive-table usa-table-borderless"> <thead> <tr> <th>Result</th> <th>Element</th> <th>Your Entry</th> <th>Limit</th> <th>About Your Well Water</th> </tr> </thead> <tbody></tbody> </table>')
            $table.appendTo('.be-well-informed-result-details').DataTable(default_datatable_result_details_options);

            // Loop through and add trs to the summary table. Datatable does not support colspan
            var result;
            var row_index = 1;
            var titles = ['Interpretation of Results:', 'Health Concerns:', 'Treatment Options:']
            $.each(be_well_response_json.data.result_details, function(index, detail_obj) {
              result = detail_obj.result;
              if (detail_obj.data_array.length > 0) {
                for (var i = 0; i < detail_obj.data_array.length; i++) {
                  if (detail_obj.data_array[i] !== '') {
                    $('#be-well-informed-result-details-table')
                      .find('tr:eq(' + (row_index + index) + ')')
                      .after('<tr><td class="bwi-detail-td ' + result + '" colspan="5"><h4>' + titles[i] + '</h4>' + detail_obj.data_array[i] + '</td></tr>');
                    row_index++;
                  }
                }
              }
            });
            var steps_count = Object.keys(be_well_response_json.data.TreatmentSteps).length;
            // if we have values in the be_well_response_json.TreatmentSteps show the treatment steps section
            if (be_well_response_json.data.TreatmentSteps && steps_count > 0) {
              $('.treatment-header, .treatment-content').removeClass('hide');
              $('#treatment_order_title').show();
              // update title to include all contaminats that have TreatmentMessages != ''
              var contaminants = [];
              var excluded = ['Fe', 'NO2', 'Bac', 'Ecoli'];

              for (var contaminate in be_well_response_json.data.ResultEvaluations) {
                if (excluded.indexOf(contaminate) == -1 && be_well_response_json.data.ResultEvaluations[contaminate].GuidelineColor == "font-red") {
                  contaminants.push(be_well_response_json.data.ResultEvaluations[contaminate].ContaminantFullName)
                }
              }

              // handle multiple number of contaminats in the title
              if (contaminants.length > 1) {
                var last = contaminants.pop()
                var title = contaminants.join(', ')
                title += ' and ' + last
              }
              else {
                title = contaminants.pop()
              }
              $('.treatment-text').html(title)

              // update the steps labels to properly show the needed steps
              var step_label = 1;
              var toShow = [];
              for (var step in be_well_response_json.data.TreatmentSteps) {
                var $treatment = $('.treatment-step').eq(step);
                $treatment.find('.step span').show();
                $treatment.removeClass('hide')
                    .find('.step span')
                    .html('Step ' + step_label);

                if($treatment.find('.step span').hasClass('no-step')) {
                  $treatment.find('.step span').removeClass('no-step');
                  $treatment.find('.step span').addClass('fill-step');
                }

                //Hide label if results contain only one treatment step.
                if(steps_count <= 1) {
                  $treatment.find('.step span').removeClass('fill-step');
                  $treatment.find('.step span').addClass("no-step");
                  $treatment.find('.step span').html('');
                }

                be_well_response_json.data.TreatmentSteps[step].OrInstructions.map(function(item, index, list) {
                  $treatment.find('[title="' + item.Recommendation + '"]')
                    .removeClass('hide')
                  var cssClass = '.system-type-' + item.SystemType.toLowerCase()
                  if (toShow.indexOf(cssClass) == -1) {
                    toShow.push(cssClass)
                  }
                });
                step_label++;
                // update visibility of boxes and their instructions

              }

              // Hide the header if results contain only one treatment step
              if(steps_count <= 1) {
                $('#treatment_order_title').hide();
                //$("div .step span .treatment-icon .step-icon").hide();
              }

              $(toShow.join(', ')).removeClass('hide')

              jQuery('.or + .box-main.hide').each(function() {
                var $this = jQuery(this);
                $this.prev().addClass('hide')
              })
              $('.treatment-step:visible').eq(0).find('.caret').addClass('hide')

            }

            $('.contaminant-link').click(function() {
              var $this = $(this)
              $('[id=' + $this.attr('data-contaminant') + ']', $(this).parents('td')).slideToggle()
            })
            showElementOutOfMany($results_wrapper, $all_wrappers);
            $('#entry-tab').text('Results');
          }
          resizeModal();
        }
        else {
          showElementOutOfMany($results_wrapper, $all_wrappers);
          $('#entry-tab').text('Results');
        }
        resizeModal();
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

    $('#be-well-informed-results-table').DataTable().destroy();
    $('#be-well-informed-result-details-table').DataTable().destroy();
    $('#water_analysis_reset').removeClass('invisible')
    showElementOutOfMany($form_wrapper, $all_wrappers);
    $('#entry-tab').text('Entry');
    resizeModal();
    $("html, body").animate({scrollTop: $('.pane-be-well-informed').offset().top}, 500);
  });

})(jQuery);
