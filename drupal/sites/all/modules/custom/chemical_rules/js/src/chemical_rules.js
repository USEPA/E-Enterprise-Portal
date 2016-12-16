var cr_originalDialog,
    cr_favs = new Chemical_Rule_Profile(Drupal.settings.chemical_rules.profile);

function cr_showElementOutOfMany($wrapper_to_show, $common_selector) {
  $wrapper_to_show.show();
  $common_selector.hide();
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
  if (jQuery('.sticky-toc').length) {
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

(function($) {
  var $results_template = $(Drupal.settings.chemical_rules.modal_result_template);
  var guest_user = Drupal.settings.is_guest;

  var $body = $('body'),
      sampleSetIndex = 0,
      num_chem_faves = 0,
      num_rules_faves = 0;

  // build related tabs
  $('#cr-tabs').tabs();
  if (guest_user) {
    $body.find('.cr-tabs_favorites_empty p').html('<p>To save items as favorites, you must first <a href="/new-users">log in.</a></p>');
  }

  render_favorites();

  // Behaviors for the favorite chemicals
  $body.on('click', '.favorite-chemical', function(ev) {
    var cas_clicked = $(this).attr('data-casnum');
    if (typeof cas_clicked !== typeof undefined && cas_clicked !== false) {
      lookup_chemical($(this).attr('data-casnum'));
    }
    else {
      lookup_chemical($(this).attr('data-sysname'));
    }
    $('#chemical-rules-modal').dialog("open");
    $('#searching-chemical-name').text($(this).text());
    $('#chemical-rules-modal').dialog("option", "title", $(this).text());
    $body.addClass('fixed-modal-open');
  });

  // Remove favorite behavior
  $body.on('click', '.remove-link', function(ev) {
    ev.preventDefault();

    // if sucessfully removed, run updates
    if(cr_favs.remove({
      ID: $(this).data('epaintnum'),
      Type: $(this).data('favtype') + 's',
    })) {
      if ($(this).attr('id') == 'cr-remove-favorite') {
        $body.find('#cr-save-favorite').parent('li').show();
        $body.find('#cr-remove-favorite').parent('li').hide();
      }
      else if ($(this).hasClass('fa-heart')) {
        update_clicked_heart($(this), false);
      }

      // Post updated array to Profile and re-render lists
      render_favorites();
      update_chem_profile();
    }
  });

  // Save Favorite behavior
  $body.on('click', '.save-favorite', function(ev) {
    if (!guest_user) {
      var favorite = {
        ID: $(this).data('epaintnum'),
        CAS: $(this).data('casnum'),
        Type: $(this).data('favtype') + 's'
      };
  
      if (favorite.Type == 'Chemicals') {
        favorite.SysName = $(this).data('sysname');
        favorite.CommonName = $(this).data('commonname');
  
        if ($(this).attr('id') == 'cr-save-favorite') {
          $body.find('#cr-save-favorite').parent('li').hide();
          $body.find('#cr-remove-favorite').parent('li').show();
        }
      }
      else if (favorite.Type == 'Laws') {
        var law_text = $(this).prev("a").text();
        var law_pieces = law_text.split('\u2014');
  
        favorite.Citation = law_pieces[0].trim();
        favorite.Title = law_pieces[1].trim();
        favorite.URL = $(this).prev("a").attr('href');
  
        update_clicked_heart($(this), true);
      }
  
      if(cr_favs.add(favorite)) {
        update_chem_profile();
        render_favorites();
      };
    }
    else {
      $('#chemical-guest-options').dialog('open');
    }
  });

  // Handle search form submit actions
  $body.on('click', '#cr-search-chems-btn', form_submission)
    .on('submit', '#chem_search_form', form_submission);

  var $modal = $('#chemical-rules-modal')
  // Initialize dialog
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
        $modal.find('#chemical-rules-results-wrapper').html('').append($results_template);
      },
      open: function(event, ui) {
        var $modal = $('#chemical-rules-modal');
        var $toc_icons = $('#cr-modal-toc-icons');

        // Setup table of contents (toc) and the stickyness in the modal
        $modal.parent().css('position', 'fixed');
        $modal.scroll(function() {
          var sticky_gap = $toc_icons.offset().top;
          if ($modal.scrollTop() > sticky_gap) {
            $toc_icons.addClass('sticky-toc');
            $toc_icons.css('width', $modal.width()+6).css('top', $modal.offset().top);
          }
          else {
            $toc_icons.removeClass('sticky-toc').removeAttr('style');
          }
        });
        $toc_icons.find('li a').on('click', function(ev) {
          ev.preventDefault();
          // Scroll the modal to the anchor clicked
          if (!$toc_icons.hasClass('sticky-toc')) {
            $toc_icons.addClass('sticky-toc');
            $toc_icons.css({
              'width': $modal.width(),
              'top': $modal.offset().top
            });
          }
          // Use the Laws and Regs heading as a landmark for gauging offset and scrolled amount
          var toc_bottom = $('#cr-laws-regs').offset().top;
          var target_top = $(this.hash).offset().top;
          var scroll_amount = target_top - toc_bottom;
          $modal.animate({ scrollTop: scroll_amount}, 500);
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
        $modal.html(cr_originalDialog);
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

  // 'Learn More' button action
  $body.find('#cr-learnmore').on('click', function() {
    $('#chemical-rules-learnmore').dialog("open");
  });

  // Collection of Chemical Rule specific functions are here so they don't pollute the global scope

  function create_favlaw_heart(epaintnum) {

    var law_in_favorites = find_matching_favorites(epaintnum, "Laws") || false;
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
    return Array.prototype.some.apply(cr_favs[check_type], [function(element, index, array) {
      return check_id == element.ID
    }]);
  }

  /**
   * Callback function to handles the submmission of the form from various events
   * @param ev
   */
  function form_submission(ev) {
    // Get the search value and cleans it a bit
    var chem_search_input = $body.find('#cr-search_input').val().trim();
    ev.preventDefault();
    ev.stopPropagation();

    if (chem_search_input) {
      lookup_chemical(chem_search_input);

      // Clear any existing errors and messages
      if ($body.find('#chemical-error').length) {
        $body.find('#chemical-error').remove();
        $body.find('#cr-search_input').removeAttr('aria-describedby');
      }

      cr_resizeModal();
    }
    else {
      // @TODO Error message - please enter value;
    }
  }

  /**
   * Determines if the text provided has some kind of CAS number formatted in it.
   * http://www.cas.org/content/chemical-substances/checkdig
   * @param stringToCheck
   * @returns {boolean}
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

  /**
   * Handles the toggling of the loading indicator while the ajax call is made and sending the results from the search
   * to populate the modal
   * @param lookup_value
   */
  function lookup_chemical(lookup_value) {
    $.ajax({
      url: Drupal.settings.basePath + 'chemical_rules/form_submission',
      method: 'POST',
      data: {'cr-search_input': lookup_value},
      beforeSend: function() {
        $('#chemical-rules-modal').dialog('option','title', 'Searching for "' + lookup_value + '"');
        $body.find('#searching-chemical-name').text(lookup_value);
        $('#chemical-rules-modal').dialog("open");
        cr_showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('.chemical-rules-modal-wrapper'));
      },
      complete: function() {
        $('#chemical-rules-modal').dialog('option','title', 'Search results for "' + lookup_value + '"');
        cr_showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
        cr_originalDialog = $body.find('#chemical-rules-modal').html();
      },
      success: populate_substance_modal
    });
  }

  /**
   * creates the content for the modal after receiving the response
   * @param chemical_rules_response_json
   */
  function populate_substance_modal(chemical_rules_response_json) {
    var $modal = $('#chemical-rules-modal');
    var $results_template = $(Drupal.settings.chemical_rules.modal_result_template);
    var $body = $('body');
    var json = chemical_rules_response_json;
    var chem_reg_name = 'n/a';

    $modal.find('#chemical-rules-results-wrapper').html('').append($results_template);
    if(json.data !== null && json.error === false){
      // Remove previous messages
      $body.find('#cr-search_input').prop('aria-describedby', false);
      $body.find('#search-message').remove();

      // populate our modal
      $body.find('.cr-chemical-name').text(json.data.substance.chemical_substance_systematic_name);

      var $list = $body.find('#cr-laws-regs-substances');
      var $programs = $body.find('#cr-programs-list');
      var $synonyms = $body.find('#cr-synonyms-list');
      var $image = $body.find('#cr-structure_image');
      var $substance_lists = $body.find('#cr-substances-list');
      var lists = [];
      var cfrs = [];
      var html_to_add = [];
      var substance_lists = [];
      var favorite_exists = find_matching_favorites(json.data.substance.epa_chemical_internal_number, "Chemicals");
      var count_all_cfrs = 0;

      // Assign values in the modal heading
      $body.find('#cr-save-favorite')
        .attr('data-epaintnum', json.data.substance.epa_chemical_internal_number)
        .attr('data-sysname', json.data.substance.chemical_substance_systematic_name);
      $body.find('#metadata-sys-name').text(json.data.substance.chemical_substance_systematic_name || 'n/a');
      $body.find('#cr-save-favorite').attr('data-commonname', json.data.substance.epa_chemical_registry_name || false);
      $body.find('#metadata-common-name').text(json.data.substance.epa_chemical_registry_name || 'n/a');
      $body.find('#cr-save-favorite').attr('data-casnum', json.data.substance.cas_number || false);
      $body.find('#metadata-cas-num').text(json.data.substance.cas_number || 'n/a');
      $body.find('#metadata-iupac-num').text(json.data.substance.iupac_name || 'n/a');

      $body.find('#cr-remove-favorite').attr('data-epaintnum', json.data.substance.epa_chemical_internal_number).attr('data-favtype', 'Chemical');

      $body.find('#cr-save-favorite').parent('li').toggle(!favorite_exists);
      $body.find('#cr-remove-favorite').parent('li').toggle(favorite_exists);

      if(!!json.data.substance_list
        && Object.keys(json.data.substance_list).length
        && !!json.data.laws_regs
        && Object.keys(json.data.laws_regs).length
      ) {
        html_to_add.push('<ul class="cr-lists">');
        for(var index in json.data.laws_regs) {
          var cfr_id = json.data.laws_regs[index].cfr_id;
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

      // Create the Program list
      if (Array.isArray(json.data.program_list)) {
        json.data.program_list.map(function(current, index, array){
          $programs.append('<li><a href="' + current.program_website + '" target="_blank">' + current.program_name + '</a></li>');
        });
      }
      else {
        $programs.html("<p>No programs found</p>");
      }

      // Create the Synonyms list
      if (json.data.substance.synonyms.length) {
        json.data.substance.synonyms.sort().map(function(current, index, array){
          $synonyms.append('<li>'+current+'</li>');
        });
      }

      // Create the Image
      $body.find('.cr-footnote').remove();
      if (!!json.data.substance["2d-structure"]) {
        $image.html('<img src="' + json.data.substance["2d-structure"] + '" alt="A structure of ' + json.data.substance.epa_chemical_registry_name + '"><div class="cr-structure_name"><p>' + json.data.substance.molecular_formula + '</p></div>');
        $body.find('#cr-laws-regs_structure').append('<p class="cr-footnote">Powered by <a href="https://pubchem.ncbi.nlm.nih.gov" rel="external" target="_blank">PubChem</a> and EPA\'s <a href="https://opendata.epa.gov/home.xhtml?view" rel="external" target="_blank">Linked Open Data Service</a></p>');
      }

      // Create the Substance List
      if (Object.keys(json.data.substance_list).length) {
        // json.data.substance_list.map(function(current, index, array){
        //   console.log("array is: " + array);
        //   $substance_lists.append('<li>'+ index +'</li>');
        // });
        jQuery(Object.keys(json.data.substance_list)).each(function(index) {
          var substance_list_obj = json.data.substance_list[this];
          substance_lists.push('<li>' + this + '</li>');
          $substance_lists.append(substance_lists.sort());
        });
      }
      else {
        $substance_lists.html('<p>No substance lists found for this chemical.</p>');
      }

      // Modal is available
      $body.addClass('fixed-modal-open');
    }
    else {
      //@TODO Add error msg for when there is bad data
      $('#chemical-rules-modal').dialog("close");
      if (!$body.find('#search-message').length) {
        $body.find('#cr-search_description').before('<div id="search-message" class="has-error">No chemicals found.  Please try a different name or CAS #.</div>');
        $body.find('#cr-search_input').prop('aria-describedby', 'search-message');
      }
    }
  }

  function render_favorite_chemicals() {

    var $ = jQuery;
    var $body = $('body');
    var num_chem_faves = cr_favs.Chemicals.length;

    if (num_chem_faves) {
      var favorite_chemicals = [];
      $body.find('#cr-count-chemicals').text(num_chem_faves);
      $.each(cr_favs.Chemicals, function(index, val) {
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
      if ($body.find('#favorite-chemicals').length) {
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
      if ($body.find('#favorite-chemicals').length) {
        $body.find('#favorite-chemicals').hide();
      }
      $body.find('.cr-chemicals').hide();
      $body.find('.cr-favorite-chemicals').html('').hide();
    }
  }

  function render_favorite_laws() {

    var $ = jQuery;
    var $body = $('body');
    var num_rules_faves = cr_favs.Laws.length;

    if (num_rules_faves) {
      var favorite_laws = [];
      $body.find('#cr-count-laws').text(num_rules_faves);
      $.each(cr_favs.Laws, function(index, val) {
        favorite_laws.push('<li><a class="favorite-law cr-favorite" href="' + val.URL + '" data-favtype="Law" data-epaintnum="' + val.ID + '" target="_blank">' + val.Citation + ':  ' + val.Title + '</a><a class="favorite-law-remove remove-link" data-favtype="Law" data-epaintnum="' + val.ID + '">Remove<span class="sr-only"> ' + val.Title + ' from favorites</span></a></li>');
      });
      if ($body.find('#favorite-laws').length) {
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
      if ($body.find('#favorite-laws').length) {
        $body.find('#favorite-laws').hide();
      }
      $body.find('.cr-laws').hide();
      $body.find('.cr-favorite-laws').html('').hide();
    }
  }

  function render_favorites() {
    num_chem_faves = cr_favs.Chemicals.length;
    num_rules_faves = cr_favs.Laws.length;
    $cr_empty = $('.cr-tabs_favorites_empty');
    $cr_avail = $('.cr-tabs_favorites_available');

    var path = window.location.pathname;
    var page = path.split('/')[1];

    if (!num_chem_faves && !num_rules_faves) {
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
        if (!num_chem_faves) {
          $body.find('#favorite-chemicals').hide();
        }
        if (!num_rules_faves) {
          $body.find('#favorite-laws').show();
        }
      }

      render_favorite_chemicals();
      render_favorite_laws();
    }
  }

  function render_naics_codes() {
    var $body = $('body');
    var num_naics_faves = cr_favs.NAICS.length;
    if(num_naics_faves) {
      var favorite_codes = [];
      $.each(cr_favs.NAICS, function(index, val) {
        favorite_codes.push('<li><a class="favorite-code cr-favorite" href="' + val.URL + '" data-favtype="Code" target="_blank">' + val.ID + '</a></li>');
      });
      if ($body.find('#favorite-naics').length) {
        $body.find('#favorite-naics').show();
      }
      $body.find('.cr-codes').show();
      $body.find('.cr-naics-codes').html(favorite_codes).show();
    }
    else {
      if ($body.find('#favorite-naics').length) {
        $body.find('#favorite-naics').hide();
      }
      $body.find('.cr-codes').hide();
      $body.find('.cr-naics-codes').html('').hide();
    }
  }

  /**
   * Clear form inputs and hide warning messages
   */
  function reset_cr_form() {
    $('#cr-search_input').val('');
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

  /**
   * Handles the update of favorites hearts
   * @param this_link
   * @param filled_if_true
   */
  function update_clicked_heart($this_link, filled_if_true) {

    if (filled_if_true === true) {
      $this_link.removeClass('empty save-favorite');
      $this_link.addClass('filled remove-favorite remove-link');
    }
    else if (filled_if_true === false) {
      $this_link.addClass('empty save-favorite');
      $this_link.removeClass('filled remove-favorite remove-link');
    }

  }

  /**
   * Wrapper for ajax call to update the chem profile
   * @param profile
   */
  function update_chem_profile() {
    $.ajax({
      method: "POST",
      url: Drupal.settings.basePath + "chemical_rules/update_chem_profile",
      dataType: 'json',
      data: {
        profile: JSON.stringify(cr_favs)
      },
    }).done(function() {
      render_favorites();
      // @TODO - Update Modal List - call populate_substance_modal or subset of it!
    }).fail(function() {
      console.log('fail', arguments)
    });
  }

  /**
   * Re-renders the favorite list based on the type passed
   * @param type
   */
  function update_favorite_lists(type) {
    if (type == 'Chemical') {
      render_favorite_chemicals();
    }
    else if (type == 'Law') {
      render_favorite_laws();
    }
    else {
      //render_naics_codes();
    }

  }

})(jQuery);
