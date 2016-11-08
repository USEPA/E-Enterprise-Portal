var originalDialog;
var favs = Drupal.settings.chemical_rules.profile;

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
    jQuery('.chemical-rules-modal').css('top', 0);
  }
  if (jQuery('.sticky-toc').length > 0) {
    jQuery('#cr-modal-toc-icons').css('width', jQuery('#chemical-rules-modal').width()+6);
  }
}

function create_favlaw_heart(epaintnum) {

  var law_in_favorites = find_matching_favorites(epaintnum, "Laws");
  var fav_law_holder = '';

  if (law_in_favorites === false) {
    fav_law_holder = '<a href="javascript:void(0);" class="fa fa-heart empty save-favorite" data-epaintnum="' + epaintnum + '" data-favtype="Law"><span class="sr-only">Click to favorite.</span></a>';
  }
  else {
    fav_law_holder = '<a href="javascript:void(0);" class="fa fa-heart filled remove-link remove-favorite" data-epaintnum="' + epaintnum + '" data-favtype="Law"><span class="sr-only">Favorited. Click to unfavorite.</span></a>';
  }

  return fav_law_holder;

}

function find_matching_favorites(check_id, check_type) {
  var match_found = false;
  for (var i = 0; i < favs[check_type].length; i++) {
  	favID = favs[check_type][i].ID;
    if (favID == check_id) {
      match_found = true;
  	  return i;
  	}
  }
  if (match_found == false) {
  	return false;
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

function lookup_chemical(lookup_value) {
  
  var chem_search_form_data = lookup_value;
  var $body = $('body');
  
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

}

function populate_substance_modal(chemical_rules_response_json) {
  var $body = $('body');
  var json = chemical_rules_response_json;

  if(json.data !== null && json.error === false){
    if ($body.find('#search-message').length > 0) {
      $body.find('#cr-search_input').prop('aria-describedby', false);
      $body.find('#search-message').remove();
    }
    
    if (json.data.Substance.CASRegistryNumber !== '' && json.data.Substance.CASRegistryNumber !== null) {
      var cas_reg_num = json.data.Substance.CASRegistryNumber + ': ';
    }
    else {
      var cas_reg_num = '';
      //$('#chemical-rules-modal').dialog('option','title', json.data.Substance.ChemicalSubstanceSystematicName + ' (' + json.data.Substance.EPAChemicalRegistryName + ')');      
    }
    if (json.data.Substance.EPAChemicalRegistryName !== null && json.data.Substance.EPAChemicalRegistryName !== '') {
      var chem_reg_name = " (" + json.data.Substance.EPAChemicalRegistryName + ")";
    }
    else {
      var chem_reg_name = '';
    }
    //$('#chemical-rules-modal').dialog('option','title', cas_reg_num + json.data.Substance.ChemicalSubstanceSystematicName + chem_reg_name);
    
    // popluate our modal
    $body.find('.cr-chemical-name').text(json.data.Substance.EPAChemicalRegistryName);

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
    var favorite_exists = find_matching_favorites(json.data.Substance.EPAChemicalInternalNumber, "Chemicals");
    var count_all_cfrs = 0;
    
    //@TODO - Only show Save to My Chemicals link (#cr-save-favorite) if NOT in favs

    $body.find('#cr-save-favorite').attr('data-epaintnum', json.data.Substance.EPAChemicalInternalNumber).attr('data-sysname', json.data.Substance.ChemicalSubstanceSystematicName);
    $body.find('#metadata-sys-name').text(json.data.Substance.ChemicalSubstanceSystematicName);
    if (json.data.Substance.EPAChemicalRegistryName !== null) {
          $body.find('#cr-save-favorite').attr('data-commonname', json.data.Substance.EPAChemicalRegistryName);
          $body.find('#metadata-common-name').text(json.data.Substance.EPAChemicalRegistryName);
    }
    if (json.data.Substance.CASRegistryNumber !== null) {
          $body.find('#cr-save-favorite').attr('data-casnum', json.data.Substance.CASRegistryNumber);
          $body.find('#metadata-cas-num').text(json.data.Substance.CASRegistryNumber);
    }
    $body.find('#cr-remove-favorite').attr('data-epaintnum', json.data.Substance.EPAChemicalInternalNumber).attr('data-favtype', 'Chemical');

    if (favorite_exists === false) {
      $body.find('#cr-save-favorite').parent('li').show();
      $body.find('#cr-remove-favorite').parent('li').hide();
    }
    else {
      $body.find('#cr-save-favorite').parent('li').hide();
      $body.find('#cr-remove-favorite').parent('li').show();
    }

    $list.html('');
    // Check whether Substance Lists exist.
    // If so, for each,
    //    1) get SubstanceList name data.SubstanceList[].substanceListName
    //    2) then get list of CFRs
    //    3) loop thru CFRs and look up CFR name and URL (LawsRegs.[variableforcfrnumber].cfrId, attributes.USC Citation, attributes.Title, attributes.URL

    var cfr_id = '';
    if(json.data.SubstanceList && json.data.SubstanceList !== ''){
      for(var listI in json.data.SubstanceList){
        if(Object.keys(json.data.SubstanceList[listI].cfrs).length > 0){
          count_all_cfrs += Object.keys(json.data.SubstanceList[listI].cfrs).length;
          html_to_add.push('<h3><span class="cr-laws-regs_count">' + json.data.SubstanceList[listI].cfrs.length + '</span> laws and regulations for ' + json.data.SubstanceList[listI].substanceListName + '</h3><ul class="cr-lists">');
          substance_lists.push('<li>'+ json.data.SubstanceList[listI].substanceListName +'</li>');
          for (var index in json.data.SubstanceList[listI].cfrs) {
            cfr_id = json.data.SubstanceList[listI].cfrs[index];
            fav_holder = create_favlaw_heart(cfr_id);
            html_to_add.push('<li><a data-favtype="Law" data-epaintnum="' + cfr_id + '" href="'+ json.data.LawsRegs[cfr_id].attributes.URL +'" target="_blank">' + json.data.LawsRegs[cfr_id].attributes["Citation"] + " &mdash; " + json.data.LawsRegs[cfr_id].attributes.Title+'</a>' + fav_holder + '<span class="law-citation">Authority: ' + json.data.LawsRegs[cfr_id].attributes["CFR Authority"] + '</span></li>');
          }
          html_to_add.push('</ul>');
        }
      }
      $list.append(html_to_add.join(""));
      $body.find('#count-all-cfrs').text(count_all_cfrs);      
    }
    else {
      // No laws regulations found

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
    if (json.data.Substance.Synonym.length > 0) {
      $(json.data.Substance.Synonym).each(function(index) {
        //$('#cr-synonyms-count').text(json.data.Substance.Synonym.length);
        synonym_list.push('<li>'+this+'</li>');
      });
      $synonyms.append(synonym_list.sort());
    }
    else {
      // No synonyms found
    }
    
    $image.html('');
    if (json.data.Image != null && json.data.Image != '') {
      $image.append('<img src="' + json.data.Image + '" alt="A structure of ' + json.data.Substance.EPAChemicalRegistryName + '"><p>Powered by <a href="https://pubchem.ncbi.nlm.nih.gov" rel="external" target="_blank">PubChem</a></p>');
    }
    else {
      // No images found
      $image.append('No image available for this substance.');
    }
    
    var tr_start = '<tr><th scope="row">',
        tr_end = '</td></tr>';

    $propertiestable.html('');
    var properties = tr_start + "Molecular Weight <span class='cr-definition'></span></th><td>" + json.data.Substance.MolecularWeight + tr_end;
        properties += tr_start + "Solubility <span class='cr-definition'>The solubility of a substance is the amount of that substance that will dissolve in a given amount of solvent. The default solvent is water, if not indicated.</span></th><td>" + json.data.Substance.Solubility + tr_end;
        properties += tr_start + "Vapor Pressure <span class='cr-definition'>Vapor pressure is the pressure of a vapor in thermodynamic equilibrium with its condensed phases in a closed system.</span></th><td>" + json.data.Substance.VaporPressure + tr_end;
        properties += tr_start + "LogP <span class='cr-definition'>Octanol/Water Partition Coefficient, used as a measure of molecular lipophilicity</span></th><td>" + json.data.Substance.LogP + tr_end;
        properties += tr_start + "Stability <span class='cr-definition'>Tendency of a material to resist change or decomposition due to internal reaction, or due to the action of air, heat, light, pressure, etc. (See also Stability and Reactivity section under Safety and Hazards)</span></th><td>" + json.data.Substance.Stability + tr_end;
        properties += tr_start + "pKA <span class='cr-definition'></span></th><td>" + json.data.Substance.pKA + tr_end;
             
    $propertiestable.append(properties);
    
    $substance_lists.html('');
    if (Object.keys(json.data.SubstanceList).length > 0) {
      $substance_lists.append(substance_lists.sort());
    }
    else {
      $substance_lists.html('<p>No substance lists found for this chemical.</p>');
    }
    
    $body.addClass('fixed-modal-open');
  }
  else {
    //@TODO Add error msg for when there is bad data
    $body.find('#cr-search_description').before('<div id="search-message" class="has-error">No chemicals found.  Please try a different name or CAS #.</div>');
    $body.find('#cr-search_input').prop('aria-describedby', 'search-message');
  }

}

function render_favorite_chemicals(favs) {

  var $body = $('body');
  if (favs.Chemicals.length > 0) {
    num_chem_faves = favs.Chemicals.length;
    var favorite_chemicals = [];
    $body.find('#cr-count-chemicals').text(num_chem_faves);
    $.each(favs.Chemicals, function(index, val) {
      var cas = '';
      if (val.CAS != null && val.CAS != "") {
        cas = val.CAS;
        var link_casnum = " data-casnum='" + cas + "' ";
        cas = cas + ": ";
      }
      else {
        link_casnum = '';
      }
      var include_commonname = '';
      if (val.CommonName != null && val.CommonName != '') {
        include_commonname = ' ('+ val.CommonName + ')';
      }
      favorite_chemicals.push('<li><a class="favorite-chemical cr-favorite" href="javascript:void(0);" data-favtype="Chemical" data-epaintnum="' + val.ID + '" ' + link_casnum + 'data-commonname="' + val.CommonName + '">' + cas + val.SysName + include_commonname +'</a><a class="favorite-chemical-remove remove-link" data-favtype="Chemical" data-epaintnum="' + val.ID + '" data-commonname="' + val.CommonName + '">Remove<span class="sr-only"> ' + val.SysName + ' from favorites</span></a></li>');
    });
    $body.find('.cr-chemicals').show();
    $body.find('.cr-favorite-chemicals').html(favorite_chemicals).show();
  }

  else {
    $body.find('.cr-chemicals').hide();
    $body.find('.cr-favorite-chemicals').html('').hide();
  }

}

function render_favorite_laws(favs) {

  var $body = $('body');
  if (favs.Laws.length > 0) {
    num_rules_faves = favs.Laws.length;
    var favorite_laws = [];
    $body.find('#cr-count-laws').text(num_rules_faves);
    $.each(favs.Laws, function(index, val) {
      favorite_laws.push('<li><a class="favorite-law cr-favorite" href="' + val.URL + '" data-favtype="Law" data-epaintnum="' + val.ID + '" target="_blank">' + val.Citation + ':  ' + val.Title + '</a><a class="favorite-law-remove remove-link" data-favtype="Law" data-epaintnum="' + val.ID + '">Remove<span class="sr-only"> ' + val.Title + ' from favorites</span></a></li>');
    });
    $body.find('.cr-laws').show();
    $body.find('.cr-favorite-laws').html(favorite_laws).show();
  }
  else {
    $body.find('.cr-laws').hide();
    $body.find('.cr-favorite-laws').html('').hide();
  }

}

/**
 * Clear form inputs and hide warning messages
 */
function reset_cr_form() {
  var $form = $('#cr-search_input');
  $form.val('');
}

/**
 * Manually trigger qTip that holds favorite heart icon to improve accessibility
 */
function trigger_law_qTip(findLink, hideQtip) {
    try {
        if (hideQtip == true) {
            $(findLink).trigger('mouseover');
            findQtip = '#' + $(findLink).attr('aria-describedby');
            return findQtip;
        }
        else {
            $(findLink).trigger('mouseout');
        }
    }
    catch (err) {
        //console.log("Error on triggerQtip: " + err);
    }
}

function update_clicked_heart(this_link, filled_if_true) {

  if (filled_if_true === true) {
    this_link.removeClass('empty save-favorite');
    this_link.addClass('filled remove-favorite remove-link'); 
  }
  else if (filled_if_true === false) {
    this_link.addClass('empty save-favorite');
    this_link.removeClass('filled remove-favorite remove-link');     
  }
  
}

function update_favorite_lists(type) {
  var clicked_favorite_type = type;
  if (clicked_favorite_type == 'Chemical') {
    render_favorite_chemicals(favs);
  }
  else if (clicked_favorite_type == 'Law') {
    render_favorite_laws(favs);
  }
  else {

  }

}

function isValidCasNumber(stringToCheck) {
  var cas = /(\d{2,7}).{0,2}(\d{2}).{0,2}(\d)/g;
  var casgroup = cas.exec(stringToCheck);
  if(casgroup){
    var checkDigit = (casgroup[1] + casgroup[2]).split('').reduce(function(previousValue, currentValue, currentIndex, array) {
      return ((previousValue + (array[array.length - currentIndex -1] * (currentIndex + 1))) % 10)
    }, 0)
    return(checkDigit == casgroup[3])
  }
  console.log('invalid string')
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
  

  // CHEMICAL ATTRIBUTES
  // ID = EPAChemicalInternalNumber
  // CAS = CASRegistryNumber
  // SysName = ChemicalSubstanceSystematicName (e.g., 2-Propanone)
  // CommonName = EPAChemicalRegistryName (e.g., Acetone)

  // LAW ATTRIBUTES
  // ID = LRS ID = cfrID (e.g., 3874781)
  // Citation (e.g., 40 CFR 711)
  // Title (e.g., TSCA CHEMICAL DATA REPORTING REQUIREMENTS)
  // URL (e.g., https:\/\/gpo.gov...)

//   var favs = Drupal.settings.chemical_rules.profile;

  // 1) Get favorites
  // 2) Count number of favorite Chemicals and Laws

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
        $(window).resize(function(){cr_resizeModal();})
      },
      open: function(event, ui) {
        $('#chemical-rules-modal').parent().css('position', 'fixed');
      },
      close: function(event, ui) {
        reset_cr_form();
        $('#chemical-rules-modal').html(originalDialog);
        $body.removeClass('fixed-modal-open');
      }
    });

  // Handle Search chemicals button click
  $body.on('click', '#cr-search-chems-btn', function(ev) {
    var chem_search_form_data = $('#chem_search_form').serialize(),
        chem_search_input = $body.find('#cr-search_input').val();
    ev.preventDefault();
    ev.stopPropagation();

    if (chem_search_input !== '') {

      //********
      //@TODO - Call Create New Node function - may be part of form_submission
      //********

      $.ajax({
        url: 'chemical_rules/form_submission',
        method: 'POST',
        data: chem_search_form_data,
        beforeSend: function() {
          $('#chemical-rules-modal').dialog('option','title', 'Searching for ' + chem_search_input);
          $body.find('#searching-chemical-name').text(chem_search_input);      
          $('#chemical-rules-modal').dialog("open");          
          cr_showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('.chemical-rules-modal-wrapper'));    
        },
        complete: function() {
          $('#chemical-rules-modal').dialog('option','title', 'Search results for ' + chem_search_input);
          cr_showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
          originalDialog = $body.find('#chemical-rules-modal').html();
        },
        success: populate_substance_modal
      });
  
      var chemicalNameOrNum = $body.find('#cr-search_input').val();
      if ($body.find('#chemical-error').length > 0) {
        $body.find('#chemical-error').remove();
        $body.find('#cr-search_input').removeAttr('aria-describedby');
      }
      
      var is_valid_chemical = true;
      if (!is_valid_chemical) {
        error = true;
        var error_message = '<p class="has-error" id="chemical-error">No results were found for <b>' + chemicalNameOrNum + '</b>.  Please try another variation.</p>';
        $(error_message).insertBefore('#cr-search_description');
        $body.find('#cr-search_input').attr('aria-describedby', 'chemical-error');
      }  
      
      cr_resizeModal();
    } 
    else {
      // @TODO Error message - please enter value;
    }
    
  });   
  
  if ($body.find('.favorite-chemical').length > 0) {
    $body.on('click', '.favorite-chemical', function(ev) {
      var cas_clicked = $(this).attr('data-casnum');
      if (typeof cas_clicked !== typeof undefined && cas_clicked !== false) {
        lookup_chemical($(this).attr('data-casnum'));
      }
      else {
        var chem_name = $(this).text();
        lookup_chemical(chem_name); 
      }
      $('#chemical-rules-modal').dialog("open");
      $('#searching-chemical-name').text($(this).text());
      $('#chemical-rules-modal').dialog("option", "title", $(this).text());      
      $body.addClass('fixed-modal-open');
    });
  }
  
  if ($body.find('.remove-link').length > 0) {
    $body.on('click', '.remove-link', function(ev) {
      ev.preventDefault();
      var clicked_favorite_ID = $(this).data('epaintnum');
      var clicked_favorite_type = $(this).data('favtype') + 's';

      var match_index = find_matching_favorites(clicked_favorite_ID, clicked_favorite_type);
      if (match_index !== false) {
        favs[clicked_favorite_type].splice(match_index, 1);
        if (clicked_favorite_type == 'Chemicals') {
          render_favorite_chemicals(favs);
        }
        else if (clicked_favorite_type == 'Laws') {
          render_favorite_laws(favs);
        }
      }
      else {
      }

// $.each is For Testing Purposes Only
/*
      $.each(favs[clicked_favorite_type], function(index, val) {
        console.log("favorite is: " + val.ID);
        console.log("Finished each");
      });
*/
      if ($(this).attr('id') == 'cr-remove-favorite') {
        $body.find('#cr-save-favorite').parent('li').show();
        $body.find('#cr-remove-favorite').parent('li').hide();
      }
      else if ($(this).hasClass('fa-heart')) {
        update_clicked_heart($(this), false);
      }

      // Post updated array to Profile and re-render lists
      $.ajax({
        method: "POST",
        url: Drupal.settings.basePath + "chemical_rules/update_chem_profile",
        dataType: 'json',
        data: {
          profile: favs
        },
      }).done(function() {
        console.log('done', arguments)
        render_favorite_chemicals(favs);
        render_favorite_laws(favs);
        // @TODO - Update Modal List - call populate_substance_modal or subset of it!

      }).fail(function() {
        console.log('fail', arguments)
      });

    });
  }

  if ($body.find('.save-favorite').length > 0) {
    $body.on('click', '.save-favorite', function(ev) {
    	//ev.preventDefault();
    	//alert("Clicked the favorite: " + $(this).data('chemicalid'));
    	var type = $(this).data('favtype') + 's';

    	var favorite = [];
    	if (type == 'Chemicals') {
      	if (($(this).data('casnum') !== '') && ($(this).data('casnum') !== null)) {
        	var cas_num = $(this).data('casnum');
      	}
      	else {
        	var cas_num = '';
      	}
      	if (($(this).data('commonname') !== '') && ($(this).data('commonname') !== null)) {
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
        if ($(this).attr('id') == 'cr-save-favorite') {
          $body.find('#cr-save-favorite').parent('li').hide();
          $body.find('#cr-remove-favorite').parent('li').show();
        }
      }
      else if (type == 'Laws') {
        //@TODO - Add button holder container for favorite link heart like other links - or use FavoriteLink.js functionality
        var law_text = $(this).prev("a").text();
        var law_pieces = law_text.split('\u2014');
        var citation = law_pieces[0].trim();
        var title = law_pieces[1].trim();
        favorite = {
        	ID: $(this).data('epaintnum'),
          Citation: citation,
          Title: title,
          URL: $(this).prev("a").attr('href')
        };
        update_clicked_heart($(this), true);
      }
      if (favorite != '') {
        favs[type].push(favorite);
//         Drupal.settings.chemical_rules.profile = favs;

        $.ajax({
          method: "POST",
          url: Drupal.settings.basePath + "chemical_rules/update_chem_profile",
          dataType: 'json',
          data: {
            profile: favs
          },
        }).done(function() {
          console.log('done', arguments)
          render_favorite_chemicals(favs);
          render_favorite_laws(favs);
          // @TODO - Update Modal List - call populate_substance_modal or subset of it!

        }).fail(function() {
          console.log('fail', arguments)
        });

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

  var sticky_gap = $('#cr-modal-toc-icons').offset().top;
  $('#chemical-rules-modal').scroll(function() {
    if ($('#chemical-rules-modal').scrollTop() > sticky_gap) {
      $('#cr-modal-toc-icons').addClass('sticky-toc');
      $('#cr-modal-toc-icons').css('width', $('#chemical-rules-modal').width()+6).css('top', $('#chemical-rules-modal').offset().top);
    } 
    else {
      $('#cr-modal-toc-icons').removeClass('sticky-toc').removeAttr('style');
    }
  });
  
  var sticky_gap = $('#cr-modal-toc-icons').offset().top;
  $('#cr-modal-toc-icons li a').on('click', function() {
    if ($body.find('.anchor-spacing').length > 0) {
      $('#chemical-rules-modal').find('h2').removeClass('anchor-spacing');
    }
    // Add extra spacing to get past fixed header; last section doesn't need it
    if ($(this).attr('href') != '#cr-lists') {
      $('#chemical-rules-modal').find($(this).attr('href')).addClass('anchor-spacing');
    }
    if ($('#chemical-rules-modal').scrollTop() > sticky_gap) {
      $('#cr-modal-toc-icons').addClass('sticky-toc');
      $('#cr-modal-toc-icons').css('width', $('#chemical-rules-modal').width()).css('top', $('#chemical-rules-modal').offset().top);
    } 
    else {
      $('#cr-modal-toc-icons').removeClass('sticky-toc').removeAttr('style');    
    }
  });
  

})(jQuery);

