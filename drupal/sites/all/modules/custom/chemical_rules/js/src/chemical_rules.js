var originalDialog;

function cr_showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
  cr_resizeModal()
}

function cr_resizeModal() {
  jQuery('#chemical-rules-modal').dialog({
    position: { 'my': 'center', 'at': 'center' },
    width: $(window).width()-180,
    height: $(window).height()-180,
  });
  if(jQuery('.chemical-rules-modal').css('top').replace('px', '') < 1){
    jQuery('.chemical-rules-modal').css('top', 0)
  }
}

function cr_checkValues(previous, current, cIndex, keys) {
  var previousKeys = [];
  if(typeof previous[keys[cIndex]] == 'object'){
    previousKeys = Object.keys(previous[keys[cIndex]])
  }

  if ((previousKeys.indexOf('Value') > -1 && previous[keys[cIndex]].Value == "")) {
    delete previous[keys[cIndex]];
  }
  else if (['object'].indexOf(typeof previous[keys[cIndex]]) > -1) {
    previous[keys[cIndex]] = previousKeys.reduce(cr_checkValues, previous[keys[cIndex]])
    if (Object.keys(previous[keys[cIndex]]).length == 0) {
      delete previous[keys[cIndex]];
    }
  }
  return previous
}

/**
 * Clear form inputs and hide warning messages
 */
function resetCRForm() {
  var $form = $('#cr-search_input');
  $form.val('');
}

function populate_substance_modal(chemical_rules_response_json) {
  var $body = $('body');

  if(chemical_rules_response_json.data != null && chemical_rules_response_json.error == false){
    $('#chemical-rules-modal').dialog('option','title', chemical_rules_response_json.data.Substance.CASRegistryNumber + ': ' +  chemical_rules_response_json.data.Substance.ChemicalSubstanceSystematicName);
    
    // popluate our modal
    $body.find('.cr-chemical-name').text(chemical_rules_response_json.data.Substance.EPAChemicalRegistryName);

    var $list = $body.find('.cr-rules-regs_lists');
    var $programs = $body.find('#cr-programs-list');
    var $synonyms = $body.find('#cr-synonyms-list');
    var $image = $body.find('.cr-structure_image');
    var $propertiestable = $body.find('#cr-properties-table > tbody');
    var $substance_lists = $body.find('#cr-substances-list');
    var srs_id = chemical_rules_response_json.data.Substance.EPAChemicalInternalNumber;
    
    $body.find('#cr-save-chemical').attr('data-srsid', srs_id);
    console.log('srs id: ' + chemical_rules_response_json.data.Substance.EPAChemicalInternalNumber);
    
    $list.html('');
    if (chemical_rules_response_json.data.LawsRegs.length > 0) {
      $(chemical_rules_response_json.data.LawsRegs).each(function(index){
        $('.cr-laws-regs_count').text(chemical_rules_response_json.data.LawsRegs.length);
        $list.append('<li><a href="'+this.source+'" target="_blank">'+this.name+'</a></li>');
      });
    }
    else {
      // No laws regulations found
    }
    
    $programs.html('');
    if (chemical_rules_response_json.data.Programs.length > 0) {
      $(chemical_rules_response_json.data.Programs).each(function(index){
        //$('#cr-programs-count').text(chemical_rules_response_json.data.Programs.length);        
        $programs.append('<li><a href="'+this.source+'" target="_blank">'+this.name+'</a></li>');
      });
    }
    else {
      // No programs found   
    }
    
    $synonyms.html('');
    if (chemical_rules_response_json.data.Substance.Synonym.length > 0) {
      $(chemical_rules_response_json.data.Substance.Synonym).each(function(index) {
        //$('#cr-synonyms-count').text(chemical_rules_response_json.data.Substance.Synonym.length);
        $synonyms.append('<li>'+this+'</li>');
      });
    }
    else {
      // No synonyms found
    }
    
    $image.html('');
    if (chemical_rules_response_json.data.Image != null && chemical_rules_response_json.data.Image != '') {
      $image.append('<img src="' + chemical_rules_response_json.data.Image + '" alt="A structure of ' + chemical_rules_response_json.data.Substance.EPAChemicalRegistryName + '"><p>Powered by <a href="https://pubchem.ncbi.nlm.nih.gov" rel="external" target="_blank">PubChem</a></p>');
    }
    else {
      // No synonyms found
    }
    
    var tr_start = '<tr><th scope="row">',
        tr_end = '</td></tr>';

    $propertiestable.html('');
    var properties = tr_start + "Molecular Weight <span class='cr-definition'></span></th><td>" + chemical_rules_response_json.data.Substance.MolecularWeight + tr_end;
        properties += tr_start + "Solubility <span class='cr-definition'>The solubility of a substance is the amount of that substance that will dissolve in a given amount of solvent. The default solvent is water, if not indicated.</span></th><td>" + chemical_rules_response_json.data.Substance.Solubility + tr_end;
        properties += tr_start + "Vapor Pressure <span class='cr-definition'>Vapor pressure is the pressure of a vapor in thermodynamic equilibrium with its condensed phases in a closed system.</span></th><td>" + chemical_rules_response_json.data.Substance.VaporPressure + tr_end;
        properties += tr_start + "LogP <span class='cr-definition'>Octanol/Water Partition Coefficient, used as a measure of molecular lipophilicity</span></th><td>" + chemical_rules_response_json.data.Substance.LogP + tr_end;
        properties += tr_start + "Stability <span class='cr-definition'>Tendency of a material to resist change or decomposition due to internal reaction, or due to the action of air, heat, light, pressure, etc. (See also Stability and Reactivity section under Safety and Hazards)</span></th><td>" + chemical_rules_response_json.data.Substance.Stability + tr_end;
        properties += tr_start + "pKA <span class='cr-definition'></span></th><td>" + chemical_rules_response_json.data.Substance.pKA + tr_end;
             
    $propertiestable.append(properties);
    
    $substance_lists.html('');
    if (chemical_rules_response_json.data.SubstanceList.length > 0) {
      $(chemical_rules_response_json.data.SubstanceList).each(function(index) {
        //$('#cr-synonyms-count').text(chemical_rules_response_json.data.Substance.Synonym.length);
        $substance_lists.append('<li>'+this+'</li>');
      });
    }
    else {
      // No synonyms found
    }
    
    $('#chemical-rules-modal').dialog("open")
  }
  else {
    //@todo Add error msg for then there is bad data
  }



}

function is_valid_cas_number(stringToCheck) {
  var cas = /(\d{2,7}).{0,2}(\d{2}).{0,2}(\d)/g;
  var casgroup = cas.exec(stringToCheck);
  if(casgroup){
    var checkDigit = (casgroup[1] + casgroup[2]).split('').reduce(function(previousValue, currentValue, currentIndex, array) {
      return ((previousValue + (array[array.length - currentIndex -1] * (currentIndex + 1))) % 10)
    }, 0)
    return(checkDigit == casgroup[3])
  }
  return false
}

(function($) {
  var $body = $('body'),
      $cr_tabs = $('#cr-tabs').tabs(),
      sampleSetIndex = 0,
      num_chem_faves = 0,
      num_rules_faves = 0,
      $cr_empty = $('.cr-tabs_favorites_empty'),
      $cr_avail = $('.cr-tabs_favorites_available');
  
  //@TODO Add logic to count number of Chemical Favorites and Law / Rule Favorites
  //num_chem_faves = ...;
  //num_rules_faves = ...;
  
  // If no favorites exist, show Search tab
  num_chem_faves = 1;
  if (num_chem_faves === 0 && num_rules_faves === 0) {
    $cr_empty.show();
    $cr_avail.hide();
  }
  else {
    $cr_empty.hide();
    $cr_avail.show();
    //@TODO Print Favorite Chemicals
    //
    //@TODO Print Favorite Laws/Regs    
    //count
    //ul
  }

  // Initialize and open dialog
  $('#chemical-rules-modal')
    .html(Drupal.settings.chemical_rules.modal)
    .dialog({
      title: 'Results',
      modal: true,
      width: $(window).width()-180,
      height: $(window).width()-180,
      closeOnEscape: true,
      position: { 'my': 'left top', 'at': 'left top' },
      dialogClass: 'chemical-rules-modal',
      draggable: false,
      autoOpen: false,
      create: function(event, ui) {

      },
      close: function(event, ui) {
        resetCRForm();
        $('#chemical-rules-modal').html(originalDialog);
        //$('#chemical-rules-loading-wrapper').hide();
        //$(this).dialog('destroy');
      }
    });

  $body.on('click', '#cr-search-chems-btn', function(ev) {

    var chem_search_form_data = $('#chem_search_form').serialize();
    
    if ($body.find('#cr-search_input').val() !== '') {
      $.ajax({
        url: 'chemical_rules/form_submission',
        method: 'POST',
        data: chem_search_form_data,
        beforeSend: cr_showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('.chemical-rules-modal-wrapper')),
        complete: function() {
          cr_showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
          originalDialog = $body.find('#chemical-rules-modal').html();
        },
        success: populate_substance_modal
      })
  
      //ev.preventDefault();
      //ev.stopPropagation();
      var chemicalNameOrNum = $body.find('#cr-search_input').val();
      if ($body.find('#chemical-error').length > 0) {
        $body.find('#chemical-error').remove();
        $body.find('#cr-search_input').removeAttr('aria-describedby');
      }
    
      //@TODO - Samuel's logic to handle chemical regex and lookup
      
      //////
      
      var is_valid_chemical = true;
      if (!is_valid_chemical) {
        error = true;
        var error_message = '<p class="has-error" id="chemical-error">No results were found for <b>' + chemicalNameOrNum + '</b>.  Please try another variation.</p>';
        $(error_message).insertBefore('#cr-search_description');
        $body.find('#cr-search_input').attr('aria-describedby', 'chemical-error');
      }  
      
      // Simulate the loading results block switching to results block
      // @TODO - Change this once Ajax / JSON success call returned - 
      else {
        var toc = $("#cr-modal-toc-icons").toc({ 
          selectors: "h2",
          container: "#chemical-rules-modal",
          'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
            return $heading[0].tagName.toLowerCase();
          } 
        });
        // POST input field value to lookup service
        // Render out 
  
        cr_resizeModal();
      }
    } 
    else {
      // @TODO Error message - please enter value;
    }
    
  });   
  
  $('.favorite-chemical-remove').on('click', function(ev) {
    ev.preventDefault();
    var clickedFavoriteID = $(this).data("epachemintnum");
    alert("clicked favorite id is: " + clickedFavoriteID);    
    console.log("clickedFavorite is: " + clickedFavoriteID);
    
    //@TODO - Add Logic to find favorite chemical by SRS ID in Drupal and then remove from user's favorites
     
  }); 

  /**
   * Close Listener on Chemical Rules Modal
   * -  Remove Previous Results ?
   * -  Cancel Pending Form submission
   */
  $('#chemical-rules-modal').on('dialogclose', function() {
    var $chemical_loading = $('#chemical-rules-loading-wrapper');
    var $all_wrappers = $('.chemical-rules-modal-wrapper');

    cr_showElementOutOfMany($chemical_loading, $all_wrappers);
    cr_resizeModal();
  });

})(jQuery);
