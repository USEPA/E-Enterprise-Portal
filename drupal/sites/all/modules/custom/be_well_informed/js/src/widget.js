/**
 * Created by smolinsk on 5/2/2017.
 */

(function($, window, UNDEFINED) {
  var convertNulls = false;
  var is_building_state_form = false;

  function get_state_selection() {
    // Capture the value of the state dropdown and populate the widget with the proper state content
    // Get the chosen state
    $state = $('#bwi-state').find('option:selected')
    if ($state.val()) {
      build_state_form($state.val())
    }
    // @todo Add Parsley flag on the text field to show it needs a selection
  }

  function build_widget_state_info() {
    $state_xml = Drupal.settings.be_well_informed.state_xml
    if (!$state_xml) {
      console.error('State XML does not exist. Expect Drupal.settings.be_well_informed.state_xml to have a value')
    }

    // Get html template and populate with custom state content
    $template = $(Drupal.settings.be_well_informed.templates.widget_state_content)
    $template.prepend($state_xml.find('State Widget Description').html())
    $template.prepend($state_xml.find('State Widget SourceLink').html())

    // Insert the content into the custom content area
    $widget_content_area = $('#bwi-widget-state-content')
    $widget_content_area.html($template);

  }

  function build_state_form(state_code) {
    $.ajax({
      url: 'be_well_informed/generate_state_form',
      method: 'POST',
      data: {
        state_code: state_code
      },
      before: function() {
        is_building_state_form = true;
      },
      success: function(state_form_html) {

        // Wipe the existing one
        // @todo if the state has not changed use existing form and just open the modal window
        $('#be-well-informed-modal-state-form').remove();
        $state_form_modal = $('<div id="be-well-informed-modal-state-form"></div>').appendTo('#be-well-informed-widget-template-wrapper')

        $state_form_modal
          .html(state_form_html)
          .dialog({
            modal: true,
            width: "auto",
            title: "Be Well Informed Water Analysis Tool",
            position: {'my': 'center', 'at': 'center'},
            dialogClass: 'be-well-informed-modal-state-form',
            autoOpen: true,
            draggable: false,
            resizable: false,
            create: function(event, ui) {
              $('#bwi-tabs').tabs();
              var $form = $('#water_analysis_results_form');
              $form
              /*.parsley({
                inputs: Parsley.options.inputs + ',[data-parsley-check-children]'
              })*/
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

              $(':radio[value=absent]').click(function() {
                $(this).parent().parent().parent().find('input.column').val("");
              });

              $('.microbiology input.column').on('keyup, keydown, click', function() {
                $(this).on('blur', function() {
                  if ($(this).val() > 0) {
                    $(this).siblings('.row').find(':radio[value=present]').prop('checked', true);
                  }
                  else {
                    $(this).siblings('.row').find(':radio').prop('checked', false);
                  }
                });
              });

              $('#water_analysis_submit').on('click', submit_water_sample);

              $(window).resize(function() {
                resizeModal();
              })
              is_building_state_form = false;
              $('#bwi-check-water-btn').prop('disabled', false).text('Check your water')
            },
            close: function(event, ui) {
              reset_form();
            }
          })
      }
    })
  }

  // Initialize the link on the widget to open the modal
  $('.state-selection-link').click(function() {
    $('#be-well-informed-modal-state-selection').dialog("open")
  });

  $('#bwi-state-selection-form').parsley()
    .on('form:submit', function() {
      if (!is_building_state_form) {
        $('#bwi-check-water-btn').prop('disabled', true).text('Loading...')
        get_state_selection();
      }
      return false; // Don't submit form
    })

  function submit_water_sample() {
    var $form = $('#water_analysis_results_form');
    // If the form does not validate do not submit data.
    if (!$form.parsley().validate()) {
      return false;
    }

    var $loading_wrapper = $('#be-well-informed-loading-wrapper');
    var $results_wrapper = $('#be-well-informed-results-wrapper');
    //var $results_wrapper = $('#be-well-informed-results-wrapper-pdf');
    var $form_wrapper = $('#be-well-informed-form-wrapper');
    var $all_wrappers = $('.be-well-informed-modal-wrapper');
    var formData = $form.serializeObject();

    var data = formatFormData(formData, convertNulls);

    bwi_log(JSON.stringify(data));

    showElementOutOfMany($loading_wrapper, $all_wrappers);
    $('#entry-tab').text('Entry');
    $.ajax({
      url: 'be_well_informed/form_submission',
      method: 'POST',
      data: data,
      success: function(be_well_response_json) {
        if (be_well_response_json.error) {
          $('bwi-api-status').removeClass('hide')
        }
        else {
          $('bwi-api-status').addClass('hide')
        }
        if (typeof be_well_response_json === 'string') {
          // Handle the insertion result HTML into the modal
          $results_wrapper.html(be_well_response_json);
          showElementOutOfMany($results_wrapper, $all_wrappers);
        } else if (!be_well_response_json.error) {
          // reset the modal and return it to a 'default' state
          $('#routine-contaminants, .or').removeClass('hide')
          $('#interactive-prompts, #additional-contaminant-requests, .interactive-prompt, .additional-contaminant-requests').addClass('hide')
          $('.treatment-header, .treatment-content, .treatment-step, .box-main, .instruction-icon, .caret, .system-type-house, .system-type-water').addClass('hide')
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
            $table.find('.bwi-hide-row').closest('tr').remove();
            $table.find('td:contains("Total Coliform (Bac)")').text('Total Coliform');  // Remove Bac symbol

            $table = $('<table id="be-well-informed-result-details-table" class="eportal-responsive-table usa-table-borderless"> <thead> <tr> <th>Result</th> <th>Element</th> <th>Your Entry</th> <th>Limit</th> <th>About Your Well Water</th> </tr> </thead> <tbody></tbody> </table>')
            $table.appendTo('.be-well-informed-result-details').DataTable(default_datatable_result_details_options);
            $table.find('td:contains("Total Coliform (Bac)")').text('Total Coliform');  // Remove Bac symbol

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
              var excluded = ['NO2', 'Bac', 'Ecoli'];

              for (var contaminate in be_well_response_json.data.ResultEvaluations) {
                if (excluded.indexOf(contaminate) == -1 && (be_well_response_json.data.ResultEvaluations[contaminate].GuidelineColor == "font-red" || be_well_response_json.data.ResultEvaluations[contaminate].TreatmentMessages)) {
                  contaminants.push(be_well_response_json.data.ResultEvaluations[contaminate].ContaminantFullName)
                }
              }

              //
              if (be_well_response_json.data.TreatmentSteps.hasOwnProperty(5)) {
                var tier_5a = be_well_response_json.data.TreatmentSteps[5].OrInstructions.reduce(function(p, c, i, a) {
                  return (c.Recommendation == "Point-of-Use (POU) Arsenic Adsorption Media Filter System") ? i : p;
                }, -1);
                var tier_5b = be_well_response_json.data.TreatmentSteps[5].OrInstructions.reduce(function(p, c, i, a) {
                  return (c.Recommendation == "Point-of-Use (POU) Reverse Osmosis (RO) System") ? i : p;
                }, -1);

                if (tier_5a != -1 && tier_5b != -1) {
                  // remove it from tier 5
                  be_well_response_json.data.TreatmentSteps[5].OrInstructions.splice(tier_5a, 1);
                  if (!be_well_response_json.data.TreatmentSteps[5].OrInstructions.length) {
                    delete be_well_response_json.data.TreatmentSteps[5]
                    steps_count = Object.keys(be_well_response_json.data.TreatmentSteps).length
                  }
                }
              }

              // # determine if there is no values in tier 3 & 4
              if (!(be_well_response_json.data.TreatmentSteps.hasOwnProperty(3) || be_well_response_json.data.TreatmentSteps.hasOwnProperty(4))
                && be_well_response_json.data.TreatmentSteps.hasOwnProperty(2) // # if tier 2 is only "Whole House Anion Exchange Water Treatment System followed by an Acid Neutralizer"
                && be_well_response_json.data.TreatmentSteps[2].OrInstructions.length == 1
                && be_well_response_json.data.TreatmentSteps[2].OrInstructions[0].Recommendation == "Whole House Anion Exchange Water Treatment System followed by an Acid Neutralizer"
                && be_well_response_json.data.TreatmentSteps.hasOwnProperty(5)) { // and tier 5 has "Point-of-Use (POU) Arsenic Adsorption Media Filter System"

                var index = be_well_response_json.data.TreatmentSteps[5].OrInstructions.reduce(function(p, c, i, a) {
                  return (c.Recommendation == "Point-of-Use (POU) Arsenic Adsorption Media Filter System") ? i : p;
                }, -1);
                if (index != -1) {
                  // copy it to tier 2
                  be_well_response_json.data.TreatmentSteps[2].OrInstructions.push(be_well_response_json.data.TreatmentSteps[5].OrInstructions[index]);

                  // remove it from tier 5
                  be_well_response_json.data.TreatmentSteps[5].OrInstructions.splice(index, 1);
                  // if it is empty after remoing the step, update the treatment steps
                  if (!be_well_response_json.data.TreatmentSteps[5].OrInstructions.length) {
                    delete be_well_response_json.data.TreatmentSteps[5]
                    steps_count = Object.keys(be_well_response_json.data.TreatmentSteps).length
                  }
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
              for (var tier in be_well_response_json.data.TreatmentSteps) {
                var $treatment = $('.treatment-step').eq(tier - 1);
                var $steps_span = $treatment.find('.step span');
                $steps_span.show();
                $treatment.removeClass('hide')
                  .find('.step span')
                  .html('Step ' + step_label);

                if ($steps_span.hasClass('no-step')) {
                  $steps_span.removeClass('no-step');
                  $steps_span.addClass('fill-step');
                }

                //Hide label if results contain only one treatment step.
                if (steps_count <= 1) {
                  $steps_span.removeClass('fill-step');
                  $steps_span.addClass("no-step");
                  $steps_span.html('');
                }

                be_well_response_json.data.TreatmentSteps[tier].OrInstructions.map(function(item, index, list) {
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
              if (steps_count <= 1) {
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
  }

  function reset_form() {

    // Handle the insertion result HTML into the modal
    convertNulls = false;
    jQuery("#water_analysis_results_form").find('input:not([type=hidden])').each(function(){$(this).val('')});
    jQuery('input[name$="[Interaction]"]').prop('checked', false);
    jQuery('input[name$="[Value]"]').val('');

  }

})(jQuery, window);