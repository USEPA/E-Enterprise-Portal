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

/*
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
*/

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

function populate_substance_modal(chemical_rules_response_json) {
  var $body = $('body');
  var json = chemical_rules_response_json;
  
  if(json.data !== null && json.error === false){
    $('#chemical-rules-modal').dialog('option','title', json.data.data.Substance.CASRegistryNumber + ': ' +  json.data.data.Substance.ChemicalSubstanceSystematicName + ' (' + json.data.data.Substance.EPAChemicalRegistryName + ')');
    
    // popluate our modal
    $body.find('.cr-chemical-name').text(json.data.data.Substance.EPAChemicalRegistryName);

    var $list = $body.find('#cr-laws-regs-substances');
    var $programs = $body.find('#cr-programs-list');
    var $synonyms = $body.find('#cr-synonyms-list');
    var $image = $body.find('.cr-structure_image');
    var $propertiestable = $body.find('#cr-properties-table > tbody');
    var $substance_lists = $body.find('#cr-substances-list');
    var srs_id = json.data.data.Substance.EPAChemicalInternalNumber;
    var lists = [];
    var cfrs = [];
    var html_to_add = [];
    var substance_lists = [];
        
    $body.find('#cr-save-chemical').data('srsid', srs_id).data('favtype', 'Chemicals');
    //console.log('srs id: ' + json.data.data.Substance.EPAChemicalInternalNumber);
    
    $list.html('');
    // Check whether Substance Lists exist.  
    // If so, for each, 
    //    1) get SubstanceList name data.SubstanceList[].substanceListName
    //    2) then get list of CFRs
    //    3) loop thru CFRs and look up CFR name and URL (LawsRegs.[variableforcfrnumber].cfrId, attributes.USC Citation, attributes.Title, attributes.URL

    var cfrNumToCheck = '';
    if(json.data.data.SubstanceList && json.data.data.SubstanceList !== ''){
      for(var listI in json.data.data.SubstanceList){
        if(Object.keys(json.data.data.SubstanceList[listI].cfrs).length > 0){
          html_to_add.push('<h3><span class="cr-laws-regs_count">' + json.data.data.SubstanceList[listI].cfrs.length + '</span> laws and regulations for ' + json.data.data.SubstanceList[listI].substanceListName + '</h3><ul class="cr-lists">');
          substance_lists.push('<li>'+ json.data.data.SubstanceList[listI].substanceListName +'</li>');          
          for (var index in json.data.data.SubstanceList[listI].cfrs) {
//             console.log("CFRs are: " + json.data.data.SubstanceList[listI].cfrs[index]); 
            cfrNumToCheck = json.data.data.SubstanceList[listI].cfrs[index];            
//             console.log("CFR ID: " + json.data.data.LawsRegs[cfrNumToCheck].cfrId);
//             console.log("CFR names / URLs are: " + json.data.data.LawsRegs[cfrNumToCheck].attributes.Title + ": " + json.data.data.LawsRegs[cfrNumToCheck].attributes.URL);            
            html_to_add.push('<li><a data-favtype="Laws" href="'+ json.data.data.LawsRegs[cfrNumToCheck].attributes.URL +'" target="_blank">' + json.data.data.LawsRegs[cfrNumToCheck].attributes["Citation"] + " &mdash; " + json.data.data.LawsRegs[cfrNumToCheck].attributes.Title+'</a><span class="law-citation">Authority: ' + json.data.data.LawsRegs[cfrNumToCheck].attributes["CFR Authority"] + '</span></li>');           
             
          }
          html_to_add.push('</ul>');
        }
      }
      $list.append(html_to_add.join(""));
    }  
    else {
      // No laws regulations found
      console.log("in else for substance lists");
    }
    
/*
    $programs.html('');
    if (json.data.Programs.length > 0) {
      $(json.data.Programs).each(function(index){
        //$('#cr-programs-count').text(json.data.Programs.length);        
        $programs.append('<li><a href="'+this.source+'" target="_blank">'+this.name+'</a></li>');
      });
    }
    else {
      // No programs found   
    }
*/
    
    $synonyms.html('');
    if (json.data.data.Substance.Synonym.length > 0) {
      $(json.data.data.Substance.Synonym).each(function(index) {
        //$('#cr-synonyms-count').text(json.data.data.Substance.Synonym.length);
        $synonyms.append('<li>'+this+'</li>');
      });
    }
    else {
      // No synonyms found
    }
    
    $image.html('');
    if (json.data.Image != null && json.data.Image != '') {
      $image.append('<img src="' + json.data.Image + '" alt="A structure of ' + json.data.data.Substance.EPAChemicalRegistryName + '"><p>Powered by <a href="https://pubchem.ncbi.nlm.nih.gov" rel="external" target="_blank">PubChem</a></p>');
    }
    else {
      // No synonyms found
    }
    
    var tr_start = '<tr><th scope="row">',
        tr_end = '</td></tr>';

    $propertiestable.html('');
    var properties = tr_start + "Molecular Weight <span class='cr-definition'></span></th><td>" + json.data.data.Substance.MolecularWeight + tr_end;
        properties += tr_start + "Solubility <span class='cr-definition'>The solubility of a substance is the amount of that substance that will dissolve in a given amount of solvent. The default solvent is water, if not indicated.</span></th><td>" + json.data.data.Substance.Solubility + tr_end;
        properties += tr_start + "Vapor Pressure <span class='cr-definition'>Vapor pressure is the pressure of a vapor in thermodynamic equilibrium with its condensed phases in a closed system.</span></th><td>" + json.data.data.Substance.VaporPressure + tr_end;
        properties += tr_start + "LogP <span class='cr-definition'>Octanol/Water Partition Coefficient, used as a measure of molecular lipophilicity</span></th><td>" + json.data.data.Substance.LogP + tr_end;
        properties += tr_start + "Stability <span class='cr-definition'>Tendency of a material to resist change or decomposition due to internal reaction, or due to the action of air, heat, light, pressure, etc. (See also Stability and Reactivity section under Safety and Hazards)</span></th><td>" + json.data.data.Substance.Stability + tr_end;
        properties += tr_start + "pKA <span class='cr-definition'></span></th><td>" + json.data.data.Substance.pKA + tr_end;
             
    $propertiestable.append(properties);
    
    $substance_lists.html('');
    if (Object.keys(json.data.data.SubstanceList).length > 0) {
      $(json.data.data.SubstanceList.substanceListName).each(function(index) {
        //$('#cr-synonyms-count').text(json.data.data.Substance.Synonym.length);
        //$substance_lists.append('<li>'+ this +'</li>');
        $substance_lists.append(substance_lists);
      });
    }
    else {
      console.log("no lists found");
      // No substance lists found
    }
    
    $('#chemical-rules-modal').dialog("open")
  }
  else {
    //@todo Add error msg for then there is bad data

  }

}

/**
 * Clear form inputs and hide warning messages
 */
function resetCRForm() {
  var $form = $('#cr-search_input');
  $form.val('');
}

(function($) {
  var $body = $('body'),
      $cr_tabs = $('#cr-tabs').tabs(),
      sampleSetIndex = 0,
      num_chem_faves = 0,
      num_rules_faves = 0,
      favs = [], // @TODO - Update this with Drupal.settings.favorites once profile JSON available
      laws = [], // @TODO - Update this with Drupal.settings.laws if LAWS are stored in separate profile JSON spot
      $cr_empty = $('.cr-tabs_favorites_empty'),
      $cr_avail = $('.cr-tabs_favorites_available');
  
  //var favs = Drupal.settings.chemical_rules.profile;
  
  // CHEMICAL ATTRIBUTES
  // ID = EPAChemicalInternalNumber
  // CAS = CASRegistryNumber
  // SysName = ChemicalSubstanceSystematicName (e.g., 2-Propanone)
  // CommonName = EPAChemicalRegistryName (e.g., Acetone)
  // LAW ATTRIBUTES
  // ID = LRS ID
  // Citation (e.g., 40 CFR 711)
  // Title (e.g., TSCA CHEMICAL DATA REPORTING REQUIREMENTS)
  // URL (e.g., https:\/\/gpo.gov...)
  var favs = {
    "Chemicals": [
      {ID: "4309", CAS: "67-64-1", SysName: "2-Propanone", CommonName: "Acetone"},
      {ID: "8979", CAS: "81-81-2", SysName: "2H-1-Benzopyran-2-one, 4-hydroxy-3-(3-oxo-1-phenylbutyl)-", CommonName: "Warfarin"},
      {ID: "1797023", CAS: "", SysName: "Alkyl alcohol reaction product with alkyl diisocyanate (generic) (P-08-0359)", CommonName: ""},
    ],
    "Laws": [
      {ID: "1234", Citation: "40 CFR 711", Title: "TSCA CHEMICAL DATA REPORTING REQUIREMENTS" , URL: "https:\/\/www.gpo.gov\/fdsys\/pkg\/CFR-2015-title40-vol31\/pdf\/CFR-2015-title40-vol31-part711.pdf"},
    ],
    "Programs": [
      
    ]
  }    

//@TODO 1) Get favorites
//      2) Add logic to count number of favorite Chemicals and Laws
  if (favs.Chemicals.length > 0) {
    num_chem_faves = favs.Chemicals.length;
    var favorite_chemicals = [];
    $body.find('#cr-count-chemicals').text(num_chem_faves);
    $.each(favs.Chemicals, function(index, val) {
      if (val.CAS != null && val.CAS != "") {
        var cas = val.CAS + ": ";
      }
      else {
        var cas = "";
      }
      favorite_chemicals.push('<li><a class="favorite-chemical" href="javascript:void(0);" data-favtype="Chemical" data-epaintnum="' + val.ID + '" data-commonname="' + val.CommonName + '">' + cas + val.SysName +' (' + val.CommonName + ')</a><a class="favorite-chemical-remove remove-link">Remove</a></li>');
    });
    $body.find('.cr-favorite-chemicals').append(favorite_chemicals);
  }
 
  else {
    $body.find('cr-favorites').hide();
    $body.find('cr-favorites-lists').hide();
  }
//console.log("num_chem_faves: " + num_chem_faves);
  
  if (favs.Laws.length > 0) {
    num_rules_faves = favs.Laws.length;
    var favorite_laws = [];
    $body.find('#cr-count-laws').text(num_rules_faves);
    $.each(favs.Laws, function(index, val) {
      console.log("val.URL: " + val.URL);
      favorite_laws.push('<li><a class="favorite-law" href="' + val.URL + '" data-favtype="Law" data-epaintnum="' + val.ID + '">' + val.Citation + ':  ' + val.Title + '</a><a class="favorite-law-remove remove-link">Remove</a></li>');
    });
    $body.find('.cr-favorite-laws').append(favorite_laws);
  }
  else {
    $body.find('cr-laws').hide();
    $body.find('cr-favorites-laws').hide();
  }
  
  // If no favorites exist, show Search tab
  if (num_chem_faves === 0 && num_rules_faves === 0) {
    $cr_empty.show();
    $cr_avail.hide();
  }
  else {
    $cr_empty.hide();
    $cr_avail.show();
    //@TODO Print Favorite Chemicals
    
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
    var chem_search_form_data = $('#chem_search_form').serialize(),
        chem_search_input = $body.find('#cr-search_input').val();
    
    if (chem_search_input !== '') {
      console.log(chem_search_input + ": " + (is_valid_cas_number(chem_search_input) ? "Valid CAS #" : "Invalid CAS #"));      
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
    var clickedFavoriteID = $(this).prev('.favorite-chemical').data('epachemintnum');
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

  if ($body.find('.save-favorite').length > 0) {
    $body.on('click', '.save-favorite', function(ev) {
    	//ev.preventDefault();
    	//alert("Clicked the favorite: " + $(this).data('chemicalid'));
      var favorite = {
      	ChemicalID: $(this).data('chemicalid'),
        Title: $(this).prev('.ui-dialog-title').text()
      }
//@TODO - favs["Chemical"].push(favorite);
//@TODO - use variable for chemical or law
// Add data-favtype to link and grab that
//var type = ... 
      favs[type].push(favorite);
      $.each(favs, function(index, val) {
          console.log(val.ChemicalID);
          console.log(val.Title);
      });
      Drupal.settings.chemical_rules.profile = favs;
/*
      $.ajax {
        
      }
*/
    });
  }
  
  if ($body.find('.remove-favorite').length > 0) {  
    $body.on('click', '.remove-favorite', function(ev) {
    	//ev.preventDefault();
      var idToRemove = $(this).data('epaintnum');
    	//splice delete favs.ChemicalID[idToRemove];
      $.each(favs, function(index, val) {
          console.log(val.epaintnum);
          console.log(val.Title);
      });
    });
  }

})(jQuery);
