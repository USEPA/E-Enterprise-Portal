var originalDialog;
var favs = (Drupal.settings.chemical_rules.profile) ? Drupal.settings.chemical_rules.profile : {'Chemicals':[],'Laws':[], 'NAICS':[]};

function repair_chemical_rules_profile() {

}

function cr_showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
  cr_resizeModal();
}

function cr_resizeModal() {
  jQuery('#chemical-rules-modal').dialog({
    position: { 'my': 'center', 'at': 'center' },
    width: jQuery(window).width()-180,
    height: jQuery(window).height()-180,
  });
  if(jQuery('.chemical-rules-modal').css('top').replace('px', '') < 1){
    jQuery('.chemical-rules-modal').css('top', 0);
  }
  if (jQuery('.sticky-toc').length > 0) {
    jQuery('#cr-modal-toc-icons').css('width', jQuery('#chemical-rules-modal').width()+6);
  }
}

function cr_resizeLMModal() {
  jQuery('#chemical-rules-learnmore').dialog({
    position: { 'my': 'center', 'at': 'center' },
    width: 0.75 * (jQuery(window).width()),
    height: 'auto',
  });
  if(jQuery('.chemical-rules-modal').css('top').replace('px', '') < 1){
    jQuery('.chemical-rules-modal').css('top', 0);
  }
}

function cr_resizeGuestModal() {
  jQuery('#chemical-guest-options').dialog({
    position: { 'my': 'center', 'at': 'center' },
    width: 'auto',
    height: 'auto',
  });
  if(jQuery('.chemical-guest-options').css('top').replace('px', '') < 1){
    jQuery('.chemical-guest-options').css('top', 0);
  }
}

function create_favlaw_heart(epaintnum) {

  var favs = (Drupal.settings.chemical_rules.profile) ? Drupal.settings.chemical_rules.profile : {'Chemicals':[],'Laws':[], 'NAICS':[]};
  var law_in_favorites = (Object.keys(favs.Laws).length > 0) ? find_matching_favorites(epaintnum, "Laws") : false;
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
  var match_found = false,
    favs = (Drupal.settings.chemical_rules.profile) ? Drupal.settings.chemical_rules.profile : {'Chemicals':[],'Laws':[], 'NAICS':[]};
  var length = (favs[check_type]) ? favs[check_type].length : 0;

  for (var i = 0; i < length; i++) {
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

  var $ = jQuery;
  var $body = jQuery('body');
  var chem_search_input = lookup_value;
  
  $.ajax({
      url: Drupal.settings.basePath + 'chemical_rules/form_submission',
      method: 'POST',
      data: {'cr-search_input': lookup_value},
      beforeSend: function() {
        $('#chemical-rules-modal').dialog('option','title', 'Searching for "' + chem_search_input + '"');
        $body.find('#searching-chemical-name').text(chem_search_input);      
        $('#chemical-rules-modal').dialog("open");          
        cr_showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('.chemical-rules-modal-wrapper'));    
      },
      complete: function() {
        $('#chemical-rules-modal').dialog('option','title', 'Search results for "' + chem_search_input + '"');
        cr_showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
        originalDialog = $body.find('#chemical-rules-modal').html();
      },
      success: populate_substance_modal
    });
  
}

function populate_substance_modal(chemical_rules_response_json) {
  var $body = jQuery('body');
  var json = chemical_rules_response_json;
  var cas_reg_num = 'n/a';
  var chem_reg_name = 'n/a';

  if(json.data !== null && json.error === false){
    if ($body.find('#search-message').length > 0) {
      $body.find('#cr-search_input').prop('aria-describedby', false);
      $body.find('#search-message').remove();
    }
    
    if (json.data.substance.cas_number !== '' && json.data.substance.cas_number !== null) {
      cas_reg_num = json.data.substance.cas_number + ': ';
    }
    
    // populate our modal
    $body.find('.cr-chemical-name').text(json.data.substance.chemical_substance_systematic_name);

    var $list = $body.find('#cr-laws-regs-substances');
    var $programs = $body.find('#cr-programs-list');
    var $synonyms = $body.find('#cr-synonyms-list');
    var $image = $body.find('.cr-structure_image');
    var $substance_lists = $body.find('#cr-substances-list');
    var lists = [];
    var cfrs = [];
    var html_to_add = [];
    var substance_lists = [];
    var favorite_exists = (Object.keys(favs.Chemicals).length > 0) ? find_matching_favorites(json.data.substance.epa_chemical_internal_number, "Chemicals") : false;
    var count_all_cfrs = 0;
    
    $body.find('#cr-save-favorite').attr('data-epaintnum', json.data.substance.epa_chemical_internal_number).attr('data-sysname', json.data.substance.chemical_substance_systematic_name);
    $body.find('#metadata-sys-name').text(json.data.substance.chemical_substance_systematic_name);
    if (json.data.substance.epa_chemical_registry_name !== null) {
      $body.find('#cr-save-favorite').attr('data-commonname', json.data.substance.epa_chemical_registry_name);
      $body.find('#metadata-common-name').text(json.data.substance.epa_chemical_registry_name);
    }
    else {
      $body.find('#cr-save-favorite').attr('data-commonname', false);
      $body.find('#metadata-common-name').text('n/a');  
    }
    if (json.data.substance.cas_number !== null) {
      $body.find('#cr-save-favorite').attr('data-casnum', json.data.substance.cas_number);
      $body.find('#metadata-cas-num').text(json.data.substance.cas_number);
    }
    else {
      $body.find('#cr-save-favorite').attr('data-casnum', false);
      $body.find('#metadata-cas-num').text('n/a');      
    }
    if (json.data.substance.iupac_name !== null) {
      $body.find('#metadata-iupac-num').text(json.data.substance.iupac_name);
    }
    else {
      $body.find('#metadata-iupac-num').text('n/a');
    }
     
    $body.find('#cr-remove-favorite').attr('data-epaintnum', json.data.substance.epa_chemical_internal_number).attr('data-favtype', 'Chemical');

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
    //    1) get SubstanceList name data.substance_list[].substance_list_name
    //    2) then get list of CFRs
    //    3) loop thru CFRs and look up CFR name and URL (laws_regs.[variableforcfrnumber].cfr_id, attributes.usc_citation, attributes.title, attributes.url

    var cfr_id = '';
    if(!!json.data.substance_list && Object.keys(json.data.substance_list).length && !!json.data.laws_regs && Object.keys(json.data.laws_regs).length) {
        html_to_add.push('<ul class="cr-lists">');        
        for(var index in json.data.laws_regs) {
          cfr_id = json.data.laws_regs[index].cfr_id;
          fav_holder = create_favlaw_heart(cfr_id);
          html_to_add.push('<li><span class="law-entry"><a data-favtype="Law" data-epaintnum="' + cfr_id + '" href="'+ json.data.laws_regs[index].attributes.url +'" target="_blank">' + json.data.laws_regs[index].attributes.citation + " &mdash; " + 
              json.data.laws_regs[index].attributes.title + 
              ' (' + json.data.laws_regs[index].meta_data.year + ')</a>' + fav_holder + '</span>');
          html_to_add.push('<span class="law-citation">Authority: ' + json.data.laws_regs[index].attributes.cfr_authority + '</span>');
          html_to_add.push('<span class="law-lists">Substance Lists: ' + json.data.laws_regs[index].substance_list.join(', ') + '</span></li>');
        }
      html_to_add.push('</ul>');
      $list.append(html_to_add.join(""));
      $body.find('#count-all-cfrs').text(Object.keys(json.data.laws_regs).length);
      $body.find('#results-intro').text('  Relevant laws and regulations include:');
    }
    else {
      // No laws regulations found
      $body.find('#count-all-cfrs').text('No');
      $body.find('#results-intro').text('');
    }

    $programs.html('');
    var program_info = [];
    if (Object.keys(json.data.program_list).length > 0) {
      jQuery.each(json.data.program_list, function(index){
        program_info = json.data.program_list[index];
        $programs.append('<li><a href="' + program_info.program_website + '" target="_blank">' + program_info.program_name + '</a></li>');
      });
    }
    else {
      $programs.html("<p>No programs found</p>");
    }
    var synonym_list = [];
    $synonyms.html('');
    if (json.data.substance.synonyms.length > 0) {
      jQuery(json.data.substance.synonyms).each(function(index) {
        //$('#cr-synonyms-count').text(json.data.substance.synonyms.length);
        synonym_list.push('<li>'+this+'</li>');
      });
      $synonyms.append(synonym_list.sort());
    }
    else {
      // No synonyms found
    }
    
    $image.html('');
    $body.find('.cr-footnote').remove();
    if (json.data.substance["2d-structure"] != null && json.data.substance["2d-structure"] != '') {
      $image.append('<img src="' + json.data.substance["2d-structure"] + '" alt="A structure of ' + json.data.substance.epa_chemical_registry_name + '"><div class="cr-structure_name"><p>' + json.data.substance.molecular_formula + '</p></div>');
      $body.find('#cr-laws-regs_structure').append('<p class="cr-footnote">Powered by <a href="https://pubchem.ncbi.nlm.nih.gov" rel="external" target="_blank">PubChem</a> and EPA\'s <a href="https://opendata.epa.gov/home.xhtml?view" rel="external" target="_blank">Linked Open Data Service</a></p>');
    }
    else {
      // No images found
      $image.append('No image available for this substance.');
    }
/*
    var $molecular_weight = $body.find('.cr-structure_molecular-weight');
    $molecular_weight.html('');
    if (json.data.substance.molecular_weight != null && json.data.substance.molecular_weight != '') {
      $molecular_weight.append('<p>Molecular Weight: ' + json.data.substance.molecular_weight + '</p>');
    }
*/
    
    var tr_start = '<tr><th scope="row">',
        tr_end = '</td></tr>';
    
    $substance_lists.html('');
    if (Object.keys(json.data.substance_list).length > 0) {
      jQuery(Object.keys(json.data.substance_list)).each(function(index) {
          var substance_list_obj = json.data.substance_list[this];
          substance_lists.push('<li>'+ this +'</li>');
      });
      $substance_lists.append(substance_lists.sort());
    }
    else {
      $substance_lists.html('<p>No substance lists found for this chemical.</p>');
    }
    
    $body.addClass('fixed-modal-open');
  }
  else {
    //@TODO Add error msg for when there is bad data
    jQuery('#chemical-rules-modal').dialog("close");
    if (!$body.find('#search-message').length > 0) {
      $body.find('#cr-search_description').before('<div id="search-message" class="has-error">No chemicals found.  Please try a different name or CAS #.</div>');
      $body.find('#cr-search_input').prop('aria-describedby', 'search-message');
    }
  }

}

function render_favorite_chemicals(favs) {

  var $ = jQuery;
  var $body = $('body');
  var num_chem_faves = (favs.Chemicals) ? favs.Chemicals.length: 0;
    
  if (num_chem_faves) {
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
      favorite_chemicals.push('<li><a class="favorite-chemical cr-favorite" href="javascript:void(0);" data-favtype="Chemical" data-sysname="' + val.SysName + '" data-epaintnum="' + val.ID + '" ' + link_casnum + 'data-commonname="' + val.CommonName + '">' + cas + val.SysName + include_commonname +'</a><a class="favorite-chemical-remove remove-link" data-favtype="Chemical" data-epaintnum="' + val.ID + '" data-commonname="' + val.CommonName + '">Remove<span class="sr-only"> ' + val.SysName + ' from favorites</span></a></li>');
    });
    if ($body.find('#favorite-chemicals').length > 0) {
      if (num_chem_faves === 0) {
        $body.find('#favorite-chemicals').hide();
      }
      else {
        $body.find('#favorite-chemicals').show();
      }
    }
    $body.find('.cr-chemicals').show();
    $body.find('.cr-favorite-chemicals').html(favorite_chemicals).show();
  }
  else {
    // If the favorite-chemicals div exists, and no faves exist, hide it
    if ($body.find('#favorite-chemicals').length > 0) {
      $body.find('#favorite-chemicals').hide();
    }
    $body.find('.cr-chemicals').hide();
    $body.find('.cr-favorite-chemicals').html('').hide();
  }
}

function render_naics_codes(favs) {
  var $body = $('body');
  var num_naics_faves = (favs.NAICS) ? favs.NAICS.length : 0;
  if(num_naics_faves) {
    var favorite_codes = [];
    $.each(favs.NAICS, function(index, val) {
      favorite_codes.push('<li><a class="favorite-code cr-favorite" href="' + val.URL + '" data-favtype="Code" target="_blank">' + val.ID + '</a></li>');
    });
    if ($body.find('#favorite-naics').length > 0) {
      $body.find('#favorite-naics').show();
    }
    $body.find('.cr-codes').show();
    $body.find('.cr-naics-codes').html(favorite_codes).show();
  } 
  else {
    if ($body.find('#favorite-naics').length > 0) {
      $body.find('#favorite-naics').hide();
    }    
    $body.find('.cr-codes').hide();
    $body.find('.cr-naics-codes').html('').hide();
  }
}

function render_favorite_laws(favs) {

  var $ = jQuery;
  var $body = $('body');
  var num_rules_faves = (favs.Laws) ? favs.Laws.length : 0;

  if (num_rules_faves) {
    var favorite_laws = [];
    $body.find('#cr-count-laws').text(num_rules_faves);
    $.each(favs.Laws, function(index, val) {
      favorite_laws.push('<li><a class="favorite-law cr-favorite" href="' + val.URL + '" data-favtype="Law" data-epaintnum="' + val.ID + '" target="_blank">' + val.Citation + ':  ' + val.Title + '</a><a class="favorite-law-remove remove-link" data-favtype="Law" data-epaintnum="' + val.ID + '">Remove<span class="sr-only"> ' + val.Title + ' from favorites</span></a></li>');
    });
    if ($body.find('#favorite-laws').length > 0) {
      if (num_rules_faves === 0) {
        $body.find('#favorite-laws').hide();
      }
      else {
        $body.find('#favorite-laws').show();
      }
    }
    $body.find('.cr-laws').show();
    $body.find('.cr-favorite-laws').html(favorite_laws).show();
  }
  else {
    if ($body.find('#favorite-laws').length > 0) {
      $body.find('#favorite-laws').hide();
    }
    $body.find('.cr-laws').hide();
    $body.find('.cr-favorite-laws').html('').hide();
  }
}

/**
 * Clear form inputs and hide warning messages
 */
function reset_cr_form() {
  var $form = jQuery('#cr-search_input');
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
  if (type == 'Chemical') {
    render_favorite_chemicals(Drupal.settings.chemical_rules.profile);
  }
  else if (type == 'Law') {
    render_favorite_laws(Drupal.settings.chemical_rules.profile);
  }
  else {
    //render_naics_codes(Drupal.settings.chemical_rules.profile);
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
      sampleSetIndex = 0,
      num_chem_faves = 0,
      num_rules_faves = 0;

  var guest_user = Drupal.settings.is_guest;

  if ($body.find('#cr-tabs').length > 0) {
    $cr_tabs = $('#cr-tabs').tabs();
    if (guest_user) {
      $body.find('.cr-tabs_favorites_empty p').html('<p>To save items as favorites, you must first log in.</p>');
    }
  }

  if ($body.find('#chem_search_form').length > 0) {
    $('#chem_search_form').on('submit', function() {
      $('#cr-search-chems-btn').trigger('click');
      return false;
    });
  }

  // CHEMICAL ATTRIBUTES
  // ID = EPAChemicalInternalNumber
  // CAS = CASRegistryNumber
  // SysName = ChemicalSubstanceSystematicName (e.g., 2-Propanone)
  // CommonName = epa_chemical_registry_name (e.g., Acetone)

  // LAW ATTRIBUTES
  // ID = LRS ID = cfr_id (e.g., 3874781)
  // Citation (e.g., 40 CFR 711)
  // Title (e.g., TSCA CHEMICAL DATA REPORTING REQUIREMENTS)
  // URL (e.g., https:\/\/gpo.gov...)

//   var favs = Drupal.settings.chemical_rules.profile;

  // 1) Get favorites
  // 2) Count number of favorite Chemicals and Laws

  var render_favorites = function(favs) {
    num_chem_faves = (favs.Chemicals) ? favs.Chemicals.length : 0;
    num_rules_faves = (favs.Laws) ? favs.Laws.length : 0;
    $cr_empty = $('.cr-tabs_favorites_empty');
    $cr_avail = $('.cr-tabs_favorites_available');
    
    var path = window.location.pathname;
    var page = path.split('/')[1];

    if (num_chem_faves === 0 && num_rules_faves === 0) {
      $cr_empty.show();
      $cr_avail.hide();
      if (page === 'user') {
        $body.find('#favorite-chemicals').hide();
        $body.find('#favorite-laws').hide();
      }
    }
    else {
      $cr_empty.hide();
      $cr_avail.show();
      if (page === 'user') {
        if (num_chem_faves === 0) {
          $body.find('#favorite-chemicals').hide();
        }
        if (num_rules_faves === 0) {
          $body.find('#favorite-laws').show();
        }
      }

      render_favorite_chemicals(favs);
      render_favorite_laws(favs);
    }
  }

  render_favorites(favs);

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
      resizable: false,      
      create: function(event, ui) {
        $(window).resize(function(){cr_resizeModal();});
      },
      open: function(event, ui) {
        $('#chemical-rules-modal').parent().css('position', 'fixed');
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
        $('#cr-modal-toc-icons li a').on('click', function(ev) {
          ev.preventDefault();
          // Scroll the modal to the anchor clicked
          if (!$('#cr-modal-toc-icons').hasClass('sticky-toc')) {
            $('#cr-modal-toc-icons').addClass('sticky-toc');
            $('#cr-modal-toc-icons').css('width', $('#chemical-rules-modal').width()).css('top', $('#chemical-rules-modal').offset().top);
          }
          // Use the Laws and Regs heading as a landmark for gauging offset and scrolled amount
          var toc_bottom = $('#cr-laws-regs').offset().top;
          var target_top = $(this.hash).offset().top;
          var scroll_amount = target_top - toc_bottom;
          $("#chemical-rules-modal").animate({ scrollTop: scroll_amount}, 500);
        });
        if (guest_user) {
          $('#close-favorite-msg').waitUntilExists(function() {
            $('#close-favorite-msg').on('click', function () {
              $('#chemical-guest-options').dialog("close");
            });
          });
        }
      },
      close: function(event, ui) {
        reset_cr_form();
        $('#chemical-rules-modal').html(originalDialog);
        $body.removeClass('fixed-modal-open');
      }
    });

  if (Drupal.settings.chemical_rules.learnmore) {
    $('#chemical-rules-learnmore')
      .html(Drupal.settings.chemical_rules.learnmore)
      .dialog({
        title: 'How the Chemical Laws and Regulations Widget Works',
        modal: true,
        width: 'auto',
        height: 'auto',
        closeOnEscape: true,
        position: { 'my': 'center top', 'at': 'center top' },
        dialogClass: 'chemical-rules-learnmore',
        draggable: false,
        autoOpen: false,
        resizable: false,  
        create: function(event, ui) {
          $(window).resize(function(){cr_resizeLMModal();});
        },          
        open: function(event, ui) {
          cr_resizeLMModal();
        }
    }); 
    $body.find('#learnmore-link').html('<a href="javascript:void(0)" id="cr-learnmore">Learn how it works</a>.');
  }

  if (guest_user) {
    if (Drupal.settings.chemical_rules.guestfavorite) {
      $('#chemical-guest-options')
        .html(Drupal.settings.chemical_rules.guestfavorite)
        .dialog({
          title: 'To Use Favorites',
          modal: true,
          width: 'auto',
          height: 'auto',
          closeOnEscape: true,
          position: { 'my': 'center top', 'at': 'center top' },
          dialogClass: 'chemical-guest-options',
          draggable: false,
          autoOpen: false,
          resizable: false,
          create: function(event, ui) {
            $(window).resize(function(){cr_resizeGuestModal();});
          },
          open: function(event, ui) {
            cr_resizeGuestModal();
          }
        });
    }
  }

  // Handle Search chemicals button click
  $body.on('click', '#cr-search-chems-btn', function(ev) {
//     var chem_search_form_data = $('#chem_search_form').serialize();
    var chem_search_input = $body.find('#cr-search_input').val();
    ev.preventDefault();
    ev.stopPropagation();

    if (chem_search_input !== '') {

      var is_valid_chemical = true;
      lookup_chemical(chem_search_input);
        
      var chemicalNameOrNum = $body.find('#cr-search_input').val();
      if ($body.find('#chemical-error').length > 0) {
        $body.find('#chemical-error').remove();
        $body.find('#cr-search_input').removeAttr('aria-describedby');
      }
      
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
  
  if (!guest_user) {
    if ($body.find('.favorite-chemical').length > 0) {
      $body.on('click', '.favorite-chemical', function(ev) {
        var cas_clicked = $(this).attr('data-casnum');
        if (typeof cas_clicked !== typeof undefined && cas_clicked !== false) {
          lookup_chemical($(this).attr('data-casnum'));
        }
        else {
          //var chem_name = $(this).text();
          lookup_chemical($(this).attr('data-sysname')); 
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
        var updatedFavs = Drupal.settings.chemical_rules.profile[clicked_favorite_type].reduce(function(before, item, index, array){
          (item.ID != clicked_favorite_ID) ? before.push(item) : before;
          return before;
        }, []);
  
        Drupal.settings.chemical_rules.profile[clicked_favorite_type] = (updatedFavs) ? updatedFavs : [];
  
        if ($(this).attr('id') == 'cr-remove-favorite') {
          $body.find('#cr-save-favorite').parent('li').show();
          $body.find('#cr-remove-favorite').parent('li').hide();
        }
        else if ($(this).hasClass('fa-heart')) {
          update_clicked_heart($(this), false);
        }
  
        // Post updated array to Profile and re-render lists
        render_favorites(Drupal.settings.chemical_rules.profile);
        update_chem_profile(Drupal.settings.chemical_rules.profile);
  
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
          if (!Drupal.settings.chemical_rules.profile) {
            Drupal.settings.chemical_rules.profile = {'Chemicals':[],'Laws':[]};
            update_chem_profile(Drupal.settings.chemical_rules.profile);
          }        
          if(Drupal.settings.chemical_rules.profile[type] === undefined) {
            Drupal.settings.chemical_rules.profile[type] = [];
            update_chem_profile(Drupal.settings.chemical_rules.profile);          
          }
          Drupal.settings.chemical_rules.profile[type].push(favorite);
          update_chem_profile(Drupal.settings.chemical_rules.profile);
          render_favorites(Drupal.settings.chemical_rules.profile);
        }
      });
    }
  }
  // Otherwise, if guest user, prompt if they click favorites
  else {
    if ($body.find('.favorite-chemical').length > 0) {
      $body.on('click', '.favorite-chemical', function (ev) {
        $('#chemical-guest-options').dialog('open');
      });
    }
    if ($body.find('.save-favorite').length > 0) {
      $body.on('click', '.save-favorite', function (ev) {
        $('#chemical-guest-options').dialog('open');
      });
    }
  }

  update_chem_profile = function(profile) {
    $.ajax({
      method: "POST",
      url: Drupal.settings.basePath + "chemical_rules/update_chem_profile",
      dataType: 'json',
      data: {
        profile: JSON.stringify(profile)
      },
    }).done(function() {
      console.log('done', arguments)
      render_favorites(Drupal.settings.chemical_rules.profile);
      //render_favorite_chemicals(favs);
      //render_favorite_laws(favs);
      //render_naics_codes(favs);
      // @TODO - Update Modal List - call populate_substance_modal or subset of it!

    }).fail(function() {
      console.log('fail', arguments)
    });
  };

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
  
  if ($body.find('#cr-learnmore').length > 0) {
    $('#cr-learnmore').on('click', function() {
      $('#chemical-rules-learnmore').dialog("open");
    });
  }

})(jQuery);
