function show_needed_cgp_div($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
  cgp_resize_modal()
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
  $('.ui-accordion-header').not($(this)).find('i').removeClass('fa-caret-down').addClass('fa-caret-right');
  if ($arrow.hasClass("fa-caret-right")) {
    $arrow.removeClass('fa-caret-right').addClass('fa-caret-down');
  }
  else {
    $arrow.removeClass('fa-caret-down').addClass('fa-caret-right');
  }
  cgp_resize_modal();
}

function cgp_resize_modal() {
  jQuery('#construction-permits-modal').dialog({
    position: {'my': 'center', 'at': 'center'}
  });
  if (jQuery('.construction-permits-modal').css('top').replace('px', '') < 1) {
    jQuery('.construction-permits-modal').css('top', 0)
  }
}

/**
 * Create search results datatable
 * @param search_results_json
 */
function create_search_results(search_results_json) {
  var $ = jQuery;
  var $table = $('#construction-permits-results-wrapper').find('table');
  var datatable_options = {
    "data": search_results_json.datatable,
    "dom": 'ftrp',
    "bLengthChange": false,
    "iDisplayLength": 3,
    "processing": true,
    "language": {
      "processing": ""
    },
    "autoWidth": false,
    "pagingType": "simple",
    "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var pageInfo = this.fnPagingInfo();
      var pageNo = pageInfo.iPage + 1;
      var totalPages = pageInfo.iTotalPages + 1;

      if (totalPages > 1) {
        var $current_li = $('<li />', {
          class: 'pager-current'
        }).html(pageNo + ' of ' + totalPages);
        $('#to-do').find('.dataTables_paginate li:first').after($current_li);
      }
    }
  };

  // Create index column that updates on sorting
  var dtTable = $table.DataTable(datatable_options);
}

/**
 * Clear form inputs and hide warning messages
 */
function reset_cgp_form() {
  var $form = $('#cgp-results-form');
  $form.parsley().reset();
  $form.find('input[type=number]').val('');
  $form.find('input[type=radio]').prop('checked', false);
  $form.find('select option').prop('selected', false);
}

(function($) {
  var cp = this;
  var sampleSetIndex = 0;
  var $body = $('body');
  // Flag for converting Null or blank inputs to -9999
  var convertNulls = false;

  $('#construction-permits-modal')
    .html(Drupal.settings.construction_permits.cgp_modal)
    .dialog({
      modal: true,
      width: "auto",
      title: "Results for Construction General Permits Search",
      position: {'my': 'center', 'at': 'center'},
      dialogClass: 'construction-permits-modal',
      autoOpen: false,
      draggable: false,
      resizable: false,
      create: function(event, ui) {
        $('#cgp-tabs').tabs();
        var $form = $('cgp-form');

        //@TODO Use Parsley to validate form if needed

        $('#cgp-reset-button').click(function() {
          reset_cgp_form();
          cgp_resize_modal()
        });

        $(window).resize(function() {
          cgp_resize_modal();
        })
      },
      close: function(event, ui) {
        var $table = $('#construction-permits-results-wrapper').find('table');
        sampleSetIndex = 0;
        convertNulls = false;
        $table.dataTable({bDestroy: true}).fnDestroy();
        show_needed_cgp_div($('#construction-permits-form-wrapper'), $('.construction-permits-modal-wrapper'));
      }
    })

  $('#construction-permits-results-table').on('click', 'a', function() {
    show_needed_cgp_div($('chemical-rules-details-wrapper'), $('.construction-permits-modal-wrapper'));
    cgp_resize_modal();
  });

  $body.on('click', '#cgp-search-button', function() {
    console.log("Search button clicked");
    var $form = $('#cgp-form');
    // If the form does not validate do not submit data.
    if (!$form.parsley().validate()) {
      return false;
    }

    var $cgp_loading_wrapper = $('#construction-permits-loading-wrapper');
    var $cgp_results_wrapper = $('#construction-permits-results-wrapper');
    var $cgp_details_wrapper = $('#construction-permits-details-wrapper');
    var $cgp_form_wrapper = $('#construction-permits-form-wrapper');
    var $cgp_all_wrappers = $('.construction-permits-modal-wrapper');
    var cgpFormData = $form.serializeObject();

    $('#construction-permits-modal').dialog('open');
    //@TODO var data = format_cgp_form_data(cgpFormData, convertNulls);
    show_needed_cgp_div($cgp_loading_wrapper, $cgp_all_wrappers);

    $.ajax({
      url: 'construction_permits/form_submission',
      method: 'POST',
      data: cgpFormData,
      success: function(cgp_reponse_json) {
        if (cgp_reponse_json.error) {
          // reset the modal and return it to a 'default' state
          convertNulls = true;
          cgp_resize_modal();
        }
        else {
          create_search_results(cgp_reponse_json);
          create_detail_results(cgp_reponse_json);
          show_needed_cgp_div($cgp_results_wrapper, $cgp_all_wrappers);
          console.log('BUILD SECTIONS')
        }
        cgp_resize_modal();
      }
    });


    //show_needed_cgp_div($cgp_results_wrapper, $cgp_all_wrappers);


  });

  /**
   * Close Listener on BWI Modal
   * -  Destroy Datatables
   * -  Cancel Pending Form submission
   */
  $('#construction-permits-modal').on('dialogclose', function() {
    var $cgp_form_wrapper = $('#construction-permits-form-wrapper');
    var $cgp_all_wrappers = $('.construction-permits-modal-wrapper');

    $('#construction-permits-results-table').DataTable().destroy();
    $('#construction-permits-result-details-table').DataTable().destroy();
    $('#water_analysis_reset').removeClass('invisible')
    show_needed_cgp_div($cgp_form_wrapper, $cgp_all_wrappers);
    $('#entry-tab').text('Entry');
    cgp_resize_modal();
    $("html, body").animate({scrollTop: $('.pane-construction-permits').offset().top}, 500);
  });

  // .apply(property, params)
  // Helper functions for the dynamic form

  /**
   *
   */
  function create_detail_results(reponse_json) {
    if(Array.isArray(response_json.data)) {
      response_json.data.map(function(permit, index, array) {
        $template = $(Drupal.settings.construction_permits.permits_template[current.type.lowercase()]);
        $template.find('[data-cgp-property]').each(function() {
          var $this = $(this);
          var propertyPath = $this.attr('data-cgp-property')
          var prop = getProperty(permit, propertyPath)
        })
      });
    }
  }

  function getProperty(permit, property) {
    return property.split('.').reduce(function(p, c, i, a) {
      console.log(p, c, i, a)
      return p[c];
    }, permit);
  }

  var fullName = function(prop) {
    return [prop.firstName, prop.middleInitial, prop.lastName].reduce(function(p, c){ (c) ? p.push(c): 0; return p}, []).join(' ')
  }

  var operatorAddress = function(prop) {
    var country = (prop.operatorCounty && prop.operatorCounty != 'string') ? ' ' + prop.operatorCounty : '';
    return prop.operatorAddress + '<br/>' + prop.operatorCity + ', ' + prop.operatorStateCode + ' ' + prop.operatorZipCode + country;
  }

  var address = function(prop, prefix) {
    var country = (prop[prefix+'County'] && prop[prefix+'County'] != 'string') ? ' ' + prop[prefix+'County'] : '';
    return prop[prefix+'Address'] + '<br/>' + prop[prefix+'City'] + ', ' + prop[prefix+'StateCode'] + ' ' + prop[prefix+'ZipCode'] + country;
  }

  var appendixDCriteriaMet = function(prop) {
    return 'N/A';
  }

  var dischargePoints = function(prop) {
    var $this = $(this);
    // Add header
    var header = [
      '<div class="row header">',
      '<div class="col-md-2">Surface water(s) to which you discharge</div>',
      '<div class="col-md-2">Impaired Water</div>',
      '<div class="col-md-2">Listed Water Pollutant(s)</div>',
      '<div class="col-md-2">Tier 2, 2.5 or 3</div>',
      '<div class="col-md-2">Source</div>',
      '<div class="col-md-2">TMDL Name and Pollutant</div>',
      '</div>'
    ]
    $node.append(header.join(''));
    // Handled the discharge points
    this.map(function(c, i, a){
      $node.append([
        '<div class="row">',
        '<div class="col-md-2" title="Surface water(s) to which you discharge">', c.firstWater, '</div>',
        '<div class="col-md-2" title="Impaired Water">', 'N/A', '</div>',
        '<div class="col-md-2" title="Listed Water Pollutant(s)">', c.pollutants.join(', '), '</div>',
        '<div class="col-md-2" title="Tier 2, 2.5 or 3">', 'N/A', '</div>',
        '<div class="col-md-2" title="Source">', 'N/A', '</div>',
        '<div class="col-md-2" title="TMDL Name and Pollutant">', c.tier, '</div>',
        '</div>',
      ].join(''))
    })
  }

  var dateFormat = function(prop) {
    var d = new Date(this);
    return [d.getMonth()+1, d.getUTCDate(), d.getUTCFullYear()].join('/')
  }

  var attachments = function(prop) {
    // Add header
    var header = [
      '<div class="row header">',
      '<div class="col-md-2">File Name</div>',
      '<div class="col-md-2">File Size</div>',
      '<div class="col-md-2">File Section</div>',
      '<div class="col-md-2">Date uploaded</div>',
      '</div>'
    ]
    $node.append(header.join(''));
    // Handled the discharge points
    this.map(function(c, i, a){
      $node.append([
        '<div class="row">',
        '<div class="col-md-2" title="File Name">', c.name, '</div>',
        '<div class="col-md-2" title="File Size">', 'N/A', '</div>',
        '<div class="col-md-2" title="File Section">', 'N/A', '</div>',
        '<div class="col-md-2" title="Date uploaded">', c.createdDate, '</div>',
        '</div>',
      ].join(''))
    })
  }


})(jQuery);
