/**
 * Created by smolinsk on 5/2/2017.
 */

(function($, window, UNDEFINED){

  function close_state_selection() {
    // Capture the value of the state dropdown and populate the widget with the proper state content
    console.log('Populate Widget with state content')
    // Get the chosen state
    $state = $('#bwi-state').find('option:selected')
    $.ajax({
      url: 'be_well_informed/get_state_information',
      method: 'POST',
      data: {
        state: $state.val()
      },
      before: function() {
        console.log('before: get_state_information')
      },
      success: function(response_xml) {
        console.log('success get_state_information', response_xml);
        // Prepare the raw XML to be used to create the content for the widget
        //parser = new DOMParser();
        //xmlDoc = parser.parseFromString(response_xml,"text/xml");
        //xmlDoc = $.parseXML( response_xml )
        $xml = $( response_xml )
        // Manage the income XML and make the result globally available
        Drupal.settings.be_well_informed.state_xml = $xml
        build_widget_state_info()
        build_state_form()
        $('#be-well-informed-modal-state-selection').dialog('close');
      }
    })
  }

  function build_widget_state_info(){
    $state_xml = Drupal.settings.be_well_informed.state_xml
    if(!$state_xml){
      console.error('State XML does not exist. Expect Drupal.settings.be_well_informed.state_xml to have a value')
    }

    // Get html template and populate with custom state content
    $template = $(Drupal.settings.be_well_informed.templates.widget_state_content)
    $template.prepend($state_xml.find('State Widget Description').html())
    $template.prepend($state_xml.find('State Widget SourceLink').html())

    // Insert the content into the custom content area
    $widget_content_area = $('#bwi-widget-state-content')
    $widget_content_area.html($template);

    /*
     * @todo: There is a minor race condition that from the time the button is exposed when the #be-well-informed-modal-state-form is built.  A slow enough ajax response callback (build_state_form()) will expose page that is not ready.
     */
    // Adding actions to the content
    $('#bwi-check-water-btn').click(function() {
      $('#be-well-informed-modal-state-form').dialog("open");
      resizeModal();
    })
  }

  function build_state_form() {
    $.ajax({
      url: 'be_well_informed/generate_state_form',
      method: 'POST',
      data: {
        state_xml: Drupal.settings.be_well_informed.state_xml.text()
      },
      before: function() {
        console.log('before: generate_state_form')
      },
      success: function(state_form_html) {
        console.log('success: generate_state_form');

        $state_form_modal = $('#be-well-informed-modal-state-form')
        if(!$state_form_modal.length){
          $state_form_modal = $('<div id="be-well-informed-modal-state-form"></div>').appendTo('#be-well-informed-widget-template-wrapper')
        }

        $state_form_modal
          .html(state_form_html)
          .dialog({
            modal: true,
            width: "auto",
            title: "Be Well Informed Water Analysis Tool",
            position: {'my': 'center', 'at': 'center'},
            dialogClass: 'be-well-informed-modal-state-form',
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

              $(':radio[value=absent]').click(function() {
                $(this).parent().parent().parent().find('input.column').val("");
              });

              $('.microbiology input.column').on('keyup, keydown, click', function() {
                $(this).on('blur', function() {
                  if ($(this).val() > 0) {
                    $(this).siblings('.row').find(':radio[value=present]').prop('checked', true);
                  }
                });
              });

              $(window).resize(function() {
                resizeModal();
              })
            },
            close: function(event, ui) {
              /*sampleSetIndex = 0;
              convertNulls = false;
              $('#be-well-informed-results-table, #be-well-informed-result-details-table').dataTable({bDestroy: true}).fnDestroy();
              $('#be-well-informed-results-table, #be-well-informed-result-details-table, #be-well-informed-results-table_wrapper, #be-well-informed-result-details-table_wrapper').remove();
              $('#routine-contaminants, .or').removeClass('hide')
              $('#interactive-prompts').html('')
              $('#interactive-prompts, #additional-contaminant-requests, .interactive-prompt, .additional-contaminant-requests').addClass('hide')
              $('treatment-header, .treatment-content, .treatment-step, .box-main, .instruction-icon, .caret').addClass('hide')
              showElementOutOfMany($('#be-well-informed-form-wrapper'), $('.be-well-informed-modal-wrapper'));*/
            }
          })
      }
    })
  }

  // Initialize the state selection modal
  $('#be-well-informed-modal-state-selection')
    .html(Drupal.settings.be_well_informed.templates.state_selection)
    .dialog({
      modal: true,
      width: 360,
      title: "Be Well Informed - Area Selection",
      position: {'my': 'center', 'at': 'center'},
      dialogClass: 'be-well-informed-modal-state-selection',
      autoOpen: false,
      draggable: false,
      resizable: false,
      create: function(event, ui) {
        $('#bwi-state-confirm-button').click(function() {
          close_state_selection();
        });
        $(window).resize(function() {
          resizeModal();
        })
      },
      close: function(event, ui) {
        // Any tasks before closing the modal
      }
    })

  // Initialize the link on the widget to open the modal
  $('.state-selection-link').click(function() {
    console.log('state-selection-link')
    $('#be-well-informed-modal-state-selection').dialog("open")
  });



})(jQuery, window);