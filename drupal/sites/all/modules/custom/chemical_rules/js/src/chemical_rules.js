var originalDialog;
var favs = [];

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
  
  if(json.data !== null && json.data.error === false){
    if ($body.find('#search-message').length > 0) {
      $body.find('#cr-search_input').prop('aria-describedby', false);
      $body.find('#search-message').remove();
    }
    $('#chemical-rules-modal').dialog('option','title', json.data.data.Substance.CASRegistryNumber + ': ' +  json.data.data.Substance.ChemicalSubstanceSystematicName + ' (' + json.data.data.Substance.EPAChemicalRegistryName + ')');
    
    // popluate our modal
    $body.find('.cr-chemical-name').text(json.data.data.Substance.EPAChemicalRegistryName);

    var $list = $body.find('#cr-laws-regs-substances');
    var $programs = $body.find('#cr-programs-list');
    var $synonyms = $body.find('#cr-synonyms-list');
    var $image = $body.find('.cr-structure_image');
    var $propertiestable = $body.find('#cr-properties-table > tbody');
    var $substance_lists = $body.find('#cr-substances-list');
    var lists = [];
    var cfrs = [];
    var html_to_add = [];
    var substance_lists = [];
    
    //@TODO - Only show Save to My Chemicals link (#cr-save-favorite) if NOT in favs
    // LOOKUP LOGIC FOR CHECKING ARRAY FOR MATCHING ITEM BY ID    
    $body.find('#cr-save-favorite').data('epaintnum', json.data.data.Substance.EPAChemicalInternalNumber).data('favtype', 'Chemical').data('sysname', json.data.data.Substance.ChemicalSubstanceSystematicName);
    if (json.data.data.Substance.EPAChemicalRegistryName != null) {
      $body.find('#cr-save-favorite').data('commonname', json.data.data.Substance.EPAChemicalRegistryName);
    }
    if (json.data.data.Substance.CASRegistryNumber != null) {
      $body.find('#cr-save-favorite').data('casnum', json.data.data.Substance.CASRegistryNumber);
    }
    $body.find('#cr-remove-favorite').data('epaintnum', json.data.data.Substance.EPAChemicalInternalNumber).data('favtype', 'Chemical');
    
    //@TOTO - Only show Remove chemical  (#cr-remove-favorite) if IS in favs
    
/*
    if () {
      $body.find('#cr-save-favorite').show();      
      $body.find('#cr-remove-favorite').hide();
    }      
    else {
      $body.find('#cr-save-favorite').hide();
      $body.find('#cr-remove-favorite').show();      
    }
*/
    
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
            cfrNumToCheck = json.data.data.SubstanceList[listI].cfrs[index];            
            html_to_add.push('<li><a data-favtype="Law" href="'+ json.data.data.LawsRegs[cfrNumToCheck].attributes.URL +'" target="_blank">' + json.data.data.LawsRegs[cfrNumToCheck].attributes["Citation"] + " &mdash; " + json.data.data.LawsRegs[cfrNumToCheck].attributes.Title+'</a><span class="law-citation">Authority: ' + json.data.data.LawsRegs[cfrNumToCheck].attributes["CFR Authority"] + '</span></li>');           
             
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
    
/*  //@TODO Future - If Programs do Exist
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
    var synonym_list = [];    
    $synonyms.html('');
    if (json.data.data.Substance.Synonym.length > 0) {
      $(json.data.data.Substance.Synonym).each(function(index) {
        //$('#cr-synonyms-count').text(json.data.data.Substance.Synonym.length);
        synonym_list.push('<li>'+this+'</li>');
      });
      $synonyms.append(synonym_list.sort());
    }
    else {
      // No synonyms found
    }
    
    $image.html('');
    if (json.data.Image != null && json.data.Image != '') {
      $image.append('<img src="' + json.data.Image + '" alt="A structure of ' + json.data.data.Substance.EPAChemicalRegistryName + '"><p>Powered by <a href="https://pubchem.ncbi.nlm.nih.gov" rel="external" target="_blank">PubChem</a></p>');
    }
    else {
      // No images found
      $image.append('No image available for this substance.');
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
      $substance_lists.append(substance_lists.sort());
    }
    else {
      $substance_lists.html('<p>No substance lists found for this chemical.</p>');
    }
    
    $('#chemical-rules-modal').dialog("open")
  }
  else {
    //@TODO Add error msg for when there is bad data
    $body.find('#cr-search_description').before('<div id="search-message" class="has-error">' + json.data['error-messages'] + '</div>');
    $body.find('#cr-search_input').prop('aria-describedby', 'search-message');    
    $body.find('');
  }

}

function render_favorite_chemicals(favs) {

  if (favs.Chemicals.length > 0) {
    num_chem_faves = favs.Chemicals.length;
    var favorite_chemicals = [];
    var $body = $('body');
    $body.find('#cr-count-chemicals').text(num_chem_faves);
    $.each(favs.Chemicals, function(index, val) {
      if (val.CAS != null && val.CAS != "") {
        var cas = val.CAS + ": ";
      }
      else {
        var cas = "";
      }
      favorite_chemicals.push('<li><a class="favorite-chemical cr-favorite" href="javascript:void(0);" data-favtype="Chemical" data-epaintnum="' + val.ID + '" data-commonname="' + val.CommonName + '">' + cas + val.SysName +' (' + val.CommonName + ')</a><a class="favorite-chemical-remove remove-link" data-favtype="Chemical" data-epaintnum="' + val.ID + '" data-commonname="' + val.CommonName + '">Remove</a></li>');
    });
    $body.find('.cr-favorite-chemicals').append(favorite_chemicals);
  }
  
  else {
    $body.find('.cr-chemicals').hide();
    $body.find('.cr-favorite-chemicals').hide();
  }

}

function render_favorite_laws(favs) {

  if (favs.Laws.length > 0) {
    num_rules_faves = favs.Laws.length;
    var favorite_laws = [];
    var $body = $('body');    
    $body.find('#cr-count-laws').text(num_rules_faves);
    $.each(favs.Laws, function(index, val) {
      favorite_laws.push('<li><a class="favorite-law cr-favorite" href="' + val.URL + '" data-favtype="Law" data-epaintnum="' + val.ID + '">' + val.Citation + ':  ' + val.Title + '</a><a class="favorite-law-remove remove-link" data-favtype="Law" data-epaintnum="' + val.ID + '">Remove</a></li>');
    });
    $body.find('.cr-favorite-laws').append(favorite_laws);
  }
  else {
    $body.find('cr-laws').hide();
    $body.find('cr-favorites-laws').hide();
  }
  
}

/**
 * Clear form inputs and hide warning messages
 */
function reset_cr_form() {
  var $form = $('#cr-search_input');
  $form.val('');
}

function update_favorite_lists(type) {
  var clicked_favorite_type = type;
  if (clicked_favorite_type == 'Chemical') {
    render_favorite_chemicals(favs);
    console.log('would have re-rendered chemical');
  }
  else if (clicked_favorite_type == 'Law') {
    render_favorite_laws(favs);  
    console.log('would have re-rendered law');    
  }
  else {
    console.log("in updateFavoriteLists, not sure of type");
  }
  
}

(function($) {
  var $body = $('body'),
      $cr_tabs = $('#cr-tabs').tabs(),
      sampleSetIndex = 0,
      num_chem_faves = 0,
      num_rules_faves = 0,
      $cr_empty = $('.cr-tabs_favorites_empty'),
      $cr_avail = $('.cr-tabs_favorites_available');
  
  
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
  
  //@TODO - Get the favs array from the user profile and render them
  //var favs = Drupal.settings.chemical_rules.profile;
  favs = {
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
  
  num_chem_faves = favs.Chemicals.length;
  num_rules_faves = favs.Laws.length;
    
  // If no favorites exist, show Search tab
  if (num_chem_faves === 0 && num_rules_faves === 0) {
    $cr_empty.show();
    $cr_avail.hide();
  }
  else {
    $cr_empty.hide();
    $cr_avail.show();

    if (num_chem_faves > 0) {
      render_favorite_chemicals(favs);
    }
    if (num_rules_faves > 0) {
      render_favorite_laws(favs);
    }

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
        reset_cr_form();
        $('#chemical-rules-modal').html(originalDialog);
        //$('#chemical-rules-loading-wrapper').hide();
        //$(this).dialog('destroy');
      }
    });

  $body.on('click', '#cr-search-chems-btn', function(ev) {
    var chem_search_form_data = $('#chem_search_form').serialize(),
        chem_search_input = $body.find('#cr-search_input').val();
    
    if (chem_search_input !== '') {
      
      //********
      //@TODO - Call Create New Node function - may be part of form_submission
      //********
            
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
      });
  
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
  
  if ($body.find('.remove-link').length > 0) {
    $body.on('click', '.remove-link', function(ev) {
      ev.preventDefault();
      var clicked_favorite_ID = $(this).data('epaintnum');
      var clicked_favorite_type = $(this).data('favtype') + 's';
  
      console.log("clickedFavorite is: " + clicked_favorite_ID);
      console.log("clickedFavorite is: " + clicked_favorite_type);
      
      for (var i = 0; i < favs[clicked_favorite_type].length; i++) {
      	favID = favs[clicked_favorite_type][i].ID;
      	console.log('favorite ID is: ' + favID);
        if (favID == clicked_favorite_ID) {
        	if (clicked_favorite_type == 'Chemicals') {
          	console.log('found match: ' + favs[clicked_favorite_type][i].SysName);
          }
          else if (clicked_favorite_type == 'Laws') {
            console.log('found match: ' + favs[clicked_favorite_type][i].Title);
          }
      	  favs[clicked_favorite_type].splice(i, 1);
      	}
      }
       
  
      //@TODO - Add Logic to find favorite chemical by SRS ID in Drupal and then remove from user's favorites
      //chemical_rules/process_user_settings
  /*
      $.ajax({
        url: 'chemical_rules/process_user_settings',
        method: 'POST',
        data: favs,
        beforeSend: cr_showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('.chemical-rules-modal-wrapper')),
        complete: function() {
          cr_showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
          originalDialog = $body.find('#chemical-rules-modal').html();
        },
        success: update_favorite_lists
      })    
  */
       
    });
  }

  if ($body.find('.save-favorite').length > 0) {
    $body.on('click', '.save-favorite', function(ev) {
    	//ev.preventDefault();
    	//alert("Clicked the favorite: " + $(this).data('chemicalid'));
    	var type = $(this).data('favtype') + 's';

    	var favorite = [];    	
    	if (type == 'Chemicals') {
      	if ($(this).data('casnum') > 0) {
        	var cas_num = $(this).data('casnum');
      	}
      	else {
        	var cas_num = '';
      	}
      	if ($(this).data('commonname') > 0) {
        	var common_name = $(this).data('commonname');
      	}
      	else {
        	var common_name = '';
      	}
        favorite = {
        	ID: $(this).data('epaintnum'),
          CAS: cas_num,
          SysName: $(this).data('sysname'),
          CommonName: $(this).data('commonname')
        };
      }
      else if (type == 'Laws') {
        //@TODO - Add button holder container for favorite link heart like other links - or use FavoriteLink.js functionality        
        var law_text = $(this).closest("a:has(*[data-favtype])").text();
//        console.log("Law is: " + law_text);
        var law_pieces = law_text.split('&mdash;');
        var citation = law_pieces[0];
        var title = law_pieces[1];
        console.log("Citation is: " + citation);
        console.log("Title is: " + title);        
        favorite = {
        	ID: $(this).data('epaintnum'),
          Citation: citation,
          Title: title,
          URL: $(this).attr('href')
        };        
      }
      if (favorite != '') {
        Drupal.settings.chemical_rules.profile = favs;
    /*
        $.ajax({
          url: 'chemical_rules/process_user_settings',
          method: 'POST',
          data: favs,
          beforeSend: cr_showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('.chemical-rules-modal-wrapper')),
          complete: function() {
            cr_showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
            originalDialog = $body.find('#chemical-rules-modal').html();
          },
          success: update_favorite_lists
        });
    */
        favs[type].push(favorite);
      }
    });
  }

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
