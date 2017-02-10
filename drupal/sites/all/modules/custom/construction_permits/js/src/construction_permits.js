function show_needed_cgp_div($wrapper_to_show, $common_selector, modal_title) {
  $common_selector = ($common_selector) ? $common_selector : jQuery('.construction-permits-modal-wrapper');
  $common_selector.hide();
  $wrapper_to_show.show();
  // Adjust the modal title
  modal_title = modal_title || "Results for CGP Search";
  jQuery('#construction-permits-modal').dialog({
    title: modal_title,
    close: function(event, ui) {
      jQuery('body').removeClass('fixed-modal-open');
    }
  });
  cgp_resize_modal();
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

function cgp_jump(h){

  $cgp_m = jQuery('#construction-permits-modal');
  $cgp_select = jQuery('#cgp-header');
  var jumpto = '#' + h;

  // Scroll the modal to the anchor clicked
  if (!$cgp_select.hasClass('sticky-toc')) {
    $cgp_select.addClass('sticky-toc');
    $cgp_select.css({
      'width': $cgp_m.width(),
      'top': $cgp_m.offset().top
    });
  }
  // Use the Laws and Regs heading as a landmark for gauging offset and scrolled amount
  var toc_bottom = jQuery('#cgp-general').offset().top + 100;
  var target_top = jQuery(jumpto).offset().top;
  var scroll_amount = toc_bottom - target_top;
  $cgp_m.animate({ scrollTop: scroll_amount}, 500);
}

function cgp_resize_modal() {
  jQuery('#construction-permits-modal').dialog({
    position: {'my': 'center', 'at': 'center'},
    width: jQuery(window).width()-180,
    height: jQuery(window).height()-180
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
    "iDisplayLength": 10,
    "processing": true,
    "language": {
      "processing": ""
    },
    "order": [[ 8, "desc" ]],
    "autoWidth": false,
    "pagingType": "simple",
    "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      // .fnPagingInfo() is depreciated
      // https://datatables.net/reference/api/page.info()
      var table = $(this).DataTable();
      var info = table.page.info();
      // var pageInfo = this.fnPagingInfo();
      var pageNo = info.page + 1;
      var row = 1;

      // Modify the first column to link to the respective form
      // Add data attributes to allow column identification in mobile format
      $('td:first-child', nRow.nTable).addClass('permit_id').each(function() {
        var $this = $(this);
        var form_id = $this.attr('title');
        if (!form_id) {
          form_id = $this.html();
          $this.attr('title', form_id)
        }
      });
      $('td:nth-child('+(++row)+')', nRow.nTable).addClass('first-column').attr('data-title', 'NPDES ID').each(function() {
        var $this = $(this);
        var form_id = $this.parent().find('.permit_id').attr('title');
        var mpn = $this.attr('title');
        if (!mpn) {
          mpn = $this.html();
          $this.attr('title', mpn)
        }
        $this.html('<a href="#id-' + form_id + '">' + mpn + '</a>')
          .find('a').click(
            function(e) {
              e.stopImmediatePropagation();
              show_needed_cgp_div($('#construction-permits-details-wrapper, #id-' + form_id), $('.construction-permits-modal-wrapper, .permit-wrapper'), $("#id-" + form_id).attr('title'));
              $('body').addClass('fixed-modal-open');
              cgp_resize_modal();

            return false;
          }
        );
      });

      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Type').each(function() {
        var $this = $(this);
        var form_type = $this.attr('title');
        if (!form_type) {
          form_type = $this.html().replace(/_/g, ' ').replace(/Of/g, 'of');
          $this.attr('title', form_type)
        }
        $this.html(form_type);
      })
      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Owner/Operator');
      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Site Name');
      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Site State');
      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Site City');

      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Status').each(function() {
        var $this = $(this);
        var statusText = $this.attr('data-status');
        if (!statusText) {
          statusText = $this.html();
          $this.attr('data-status', statusText);
        }
        var formatted_status = statusText.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
        $this.html(formatted_status);
      });

      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Submitted').each(function() {
        var $this = $(this);
        var dateText = $this.attr('data-date');
        if (!dateText) {
          dateText = $this.html();
          $this.attr('data-date', dateText)
        }
        if (moment(dateText).isValid()) {
          $this.html(moment(dateText).format('l'));
        } else {
          $this.html('N/A');
        }
      });

      $('td:nth-child('+(++row)+')', nRow.nTable).attr('data-title', 'Date of Coverage').each(function() {
        var $this = $(this);
        var dateText = $this.attr('data-date');
        if (!dateText) {
          dateText = $this.html();
          $this.attr('data-date', dateText)
        }
        if (moment(dateText).isValid()) {
          $this.html(moment(dateText).format('l'));
        } else if(dateText == '‐') {
          return '‐';
        } else {
          return 'N/A;';
        }
      });


      if (info.pages > 1) {
        var $current_li = $('<li />', {
          class: 'pager-current'
        }).html(pageNo + ' of ' + info.pages);
        $('#construction-permits-results-wrapper').find('.dataTables_paginate li:first').after($current_li);
      }
    }
  };

  // Create index column that updates on sorting
  var dtTable = $table.DataTable(datatable_options);
  dtTable.columns().iterator('column', function(ctx, idx) {
    if($(dtTable.column(idx).header()).find('.sort-icon').length == 0){
      $(dtTable.column(idx).header()).append('<span class="sort-icon" />');
    }
  });
}

/**
 * Clear form inputs and hide warning messages
 */
function reset_cgp_form() {
  var $ = jQuery;
  var $form = $('#cgp-form');
  $form.parsley().reset();
  $form.find('input[type=number]').val('');
  $form.find('input[type=text]').val('');
  $form.find('input[type=radio]').prop('checked', false);
  $form.find('select option').prop('selected', false);
  $('#cgp-tribal-lands').show();
  $('#cgp-tribal-lands-hide').hide();
  $('.tribalIndicator').prop('disabled', false);
  $('#cgp-tribal-lands').prop('disabled', false);
  $('#cgp-permit-state').attr('data-current-value', '');
  $('#cgp-project-county').find('option').not(':first').remove();
  $('#cgp-tribal-lands').find('option').not(':first').remove();
}

(function($) {
  var cp_iife = {};
  var sampleSetIndex = 0;
  var $body = $('body');
  // Flag for converting Null or blank inputs to -9999
  var convertNulls = false;

  // Helper functions

  function create_detail_results(response_json) {
    $details = $('#construction-permits-details-wrapper').html('');
    if (Array.isArray(response_json.data)) {
      response_json.data.map(function(permit, index, array) {
        var type = permit.type.toLowerCase();
        $template = $(Drupal.settings.construction_permits.permit_templates['notice_of_intent']);
        $template.find('[data-cgp-property]').each(function() {
          var $this = $(this),
            property_path = $this.attr('data-cgp-property'),
            property_null = $this.attr('data-cgp-null'),
            property_option = getStringToJson($this.attr('data-cgp-options')),
            custom_function = $this.attr('data-cgp-function'),
            function_params = getStringToJson($this.attr('data-cgp-params')),
            $value = $this.find('.value');
          var prop = (property_path.length) ? getProperty(permit, property_path) : permit;

          if (custom_function && prop != undefined) {
            var anex = cp_iife[custom_function].apply($this, Array.prototype.concat([prop], function_params));
            ($value.length) ? $value.html(anex) : $this.append(anex)
          }
          else if(prop != undefined) {
            prop = (property_option.length) ? property_option[prop + 0] : prop
            prop = (property_null && !prop) ? property_null : prop
            $value.html(prop)
          }
          else {
            $this.parents('.line').remove()
          }
        })
        $template.addClass(type)
        $template.attr('id', 'id-' + permit.id)
        var name  = (permit.projectSiteInformation.siteName) ? " - " + permit.projectSiteInformation.siteName : '';
        $template.attr('title', "Details for " + permit.npdesId + name)
        $details.append($template)
      });
      $details.prepend(Drupal.settings.construction_permits.cgp_modal_header);

      $('#back-to-results-button').on('click', function(ev) {
        $('body').removeClass('fixed-modal-open');
        show_needed_cgp_div($('#construction-permits-results-wrapper'));
        cgp_resize_modal();
        return false;
      });
      $('#cgp-shortcut').on('change', function(ev) {
        //cgp_jump($(this).val());
      });
    }
  }

  function getStringToJson(params_string) {
    return (params_string) ? JSON.parse(params_string.replace(/'/g, '"')) : [];
  }

  function getProperty(permit, property) {
    return property.split('.').reduce(function(p, c) {
      return (p != undefined && p[c] != undefined) ? p[c] : undefined;
    }, permit);
  }

  cp_iife.array_join = function(prop, glue) {
    return prop.join(glue) || 'N/A';
  }

  cp_iife.adjustType = function(prop) {
    return prop.replace(/Of/g, 'of').replace(/_/g, ' ');
  }

  cp_iife.address = function(prop, prefix) {
    var address = '';
    var city_state_zip_country = ''
    if(prop[prefix + 'Address'] || prop[prefix + 'Address2']) {
      address += (prop[prefix + 'Address2']) ? prop[prefix + 'Address'] + '<br>' + prop[prefix + 'Address2'] : prop[prefix + 'Address'];
    }
    if(prop[prefix + 'City']) {
      address += (address.length) ? '<br>' + prop[prefix + 'City'] : prop[prefix + 'City'];
    }
    if(prop[prefix + 'StateCode']) {
      address += (address.length) ? ', ' + prop[prefix + 'StateCode'] : prop[prefix + 'StateCode'];
    }
    if(prop[prefix + 'ZipCode']) {
      address += (address.length) ? ' ' + prop[prefix + 'ZipCode'] : prop[prefix + 'ZipCode'];
    }
    if(prop[prefix + 'County']) {
      address += (address.length) ? ' ' + prop[prefix + 'County'] : prop[prefix + 'County'];
    }
    return address || 'N/A';
  }

  cp_iife.fullName = function(prop) {
    return [prop.firstName, prop.middleInitial, prop.lastName].reduce(function(p, c) {
      (c) ? p.push(c) : 0;
      return p
    }, []).join(' ') || 'N/A';
  }

  cp_iife.dateRange = function(prop, prefix) {
    //projectSiteInformation and LEW
    var start = (prop[prefix + 'ProjectStart']) ? cp_iife.dateFormat(prop[prefix + 'ProjectStart']) : 'N/A';
    var end = (prop[prefix + 'ProjectEnd']) ? cp_iife.dateFormat(prop[prefix + 'ProjectEnd']) : 'N/A';
    return (start != 'N/A' || end != 'N/A') ? start + ' &mdash; ' + end : 'N/A';
  }

  cp_iife.fullPhone = function(prop) {
    return phone = (prop['phoneExtension'] && prop['phoneExtension'] != '') ? prop['phone'] + ' x' + prop['phoneExtension'] : prop['phone'] || 'N/A';
  }
  
  cp_iife.siteConstructionTypes = function(prop) {
    return prop.join('<br>') || 'N/A';
  }

  cp_iife.latlong = function(prop) {
    //projectSiteInformation.siteLocation
    var latlong = '';
    if((prop['latitude'] != null || prop['longitude'] != null)) {
      var NS = (prop['latitude'] == 0) ? '&deg;' : ((prop['latitude'] > 0) ? '&deg;N,' : '&deg;S,');
      var WE = (prop['longitude'] == 0) ? '&deg;' : ((prop['longitude'] > 0) ? '&deg;E' : '&deg;W');
      latlong = [Math.abs(prop['latitude']), NS, Math.abs(prop['longitude']), WE, '<br><span class="cgp-latlongsource">Source: ' + (prop['latLongDataSource'] || 'N/A') + '</span>'].join(' ')
    }
    return latlong || 'N/A';
  }

  cp_iife.appendixDCriteria = function(prop) {
    var $criteria = prop['criterion'];
    if ($criteria == 'Criterion_A') {
      return '<strong>Criterion A:</strong><br>' + '<span class=\"criterion-description\">No ESA-listed species and/or designated critical habitat present in action area.</span> Using the process outlined in Appendix D of this permit, you certify that ESA-listed species and designated critical habitat(s) under the jurisdiction of the USFWS or NMFS are not likely to occur in your site\'s \"action area\" as defined in Appendix A of this permit. <strong>[A basis statement supporting the selection of this criterion should identify the USFWS and NMFS information sources used. Attaching aerial image(s) of the site to this NOI is helpful to EPA, USFWS, and NMFS in confirming eligibility under this criterion. Please Note: NMFS\' jurisdiction includes ESA-listed marine and estuarine species that spawn in inland rivers.]</strong>';
    }
    else if ($criteria == 'Criterion_B') {
      return '<strong>Criterion B:</strong><br>' + '<span class=\"criterion-description\">Eligibility requirements met by another operator under the 2017 CGP.</span> The construction site\'s discharges and discharge-related activities were already addressed in another operator\'s valid certification of eligibility for your \"action area\" under eligibility Criterion A, C, D, E, or F of the 2017 CGP and you have confirmed that no additional ESA-listed species and/or designated critical habitat under the jurisdiction of USFWS and/or NMFS not considered in the that certification may be present or located in the "action area."  To certify your eligibility under this criterion, there must be no lapse of NPDES permit coverage in the other CGP operator\'s certification.  By certifying eligibility under this criterion, you agree to comply with any conditions upon which the other CGP operator\'s certification was based.  You must include in your NOI the NPDES ID from the other 2017 CGP operator\'s notification of authorization under this permit. If your certification is based on another 2017 CGP operator\'s certification under criterion C, you must provide EPA with the relevant supporting information required of existing dischargers in criterion C in your NOI form. <strong>[A basis statement supporting the selection of this criterion should identify the eligibility criterion of the other CGP NOI, the authorization date, and confirmation that the authorization is effective.]</strong>';
    }
    else if ($criteria == 'Criterion_C') {
      return '<strong>Criterion C:</strong><br>' + '<span class=\"criterion-description\">Discharges not likely to adversely affect ESA-listed species and/or designated critical habitat.</span>  ESA-listed species and/or designated critical habitat(s) under the jurisdiction of the USFWS and/or NMFS are likely to occur in or near your site\'s \"action area,\" and you certify that your site\'s discharges and discharge-related activities are not likely to adversely affect ESA-listed threatened or endangered species and/or designated critical habitat.  This certification may include consideration of any stormwater controls and/or management practices you will adopt to ensure that your discharges and discharge-related activities are not likely to adversely affect ESA-listed species and/or designated critical habitat.  To certify your eligibility under this criterion, indicate:<ol class=\"cgp-criteria-list\"><li>the ESA-listed species and/or designated habitat located in your \"action area\" using the process outlined in Appendix D of this permit;</li><li>the distance between the site and the listed species and/or designated critical habitat in the action area (in miles); and</li><li>a rationale describing specifically how adverse effects to ESA-listed species will be avoided from the discharges and discharge-related activities.  You must also include a copy of your site map from your SWPPP showing the upland and in-water extent of your \"action area\" with this NOI. </li></ol><strong>[A basis statement supporting the selection of this criterion should identify the information resources and expertise (e.g., state or federal biologists) used to arrive at this conclusion. Any supporting documentation should explicitly state that both ESA-listed species and designated critical habitat under the jurisdiction of the USFWS and/or NMFS were considered in the evaluation. Attaching aerial image(s) of the site to this NOI is helpful to EPA, USFWS, and NMFS in confirming eligibility under this criterion.]</strong>';
    }
    else if ($criteria == 'Criterion_D') {
      return '<strong>Criterion D:</strong><br>' + '<span class=\"criterion-description\">Coordination with USFWS and/or NMFS has successfully concluded.</span>  The coordination must have addressed the effects of your site\'s discharges and discharge-related activities on ESA-listed species and/or designated critical habitat under the jurisdiction of USFWS and/or NMFS, and resulted in a written concurrence from USFWS and/or NMFS that your site\'s discharges and discharge-related activities are not likely to adversely affect listed species and/or critical habitat.  You must include copies of the correspondence with the participating agencies in your SWPPP and this NOI. <br><strong>[A basis statement supporting the selection of this criterion should identify whether USFWS or NMFS or both agencies participated in coordination, the field office/regional office(s) providing that coordination, and the date that coordination concluded.]</strong>';
    }
    else if ($criteria == 'Criterion_E') {
      return '<strong>Criterion E:</strong><br>' + '<span class=\"criterion-description\">ESA Section 7 consultation between a Federal Agency and the USFWS and/or NMFS has successfully concluded.</span>  The consultation must have addressed the effects of the construction site\'s discharges and discharge-related activities on ESA-listed species and/or designated critical habitat under the jurisdiction of USFWS and/or NMFS.  To certify eligibility under this criterion, Indicate the result of the consultation:<ul class=\"cgp-criteria-list\"><li>biological opinion from USFWS and/or NMFS that concludes that the action in question (taking into account the effects of your site\'s discharges and discharge-related activities) is not likely to jeopardize the continued existence of listed species, nor the destruction or adverse modification of critical habitat; or</li><li>written concurrence from USFWS and/or NMFS with a finding that the site\'s discharges and discharge-related activities are not likely to adversely affect ESA-listed species and/or designated critical habitat.</li></ul>You must include copies of the correspondence between yourself and the USFWS and/or NMFS in your SWPPP and this NOI. <br><strong>[A basis statement supporting the selection of this criterion should identify the federal action agencie(s) involved, the field office/regional office(s) providing that consultation, any tracking numbers of identifiers associated with that consultation (e.g., IPaC number, PCTS number), and the date the consultation was completed.]</strong>';
    }
    else if ($criteria == 'Criterion_F') {
      return '<strong>Criterion F:</strong><br>' + '<span class=\"criterion-description\">Issuance of section 10 permit.</span> Potential take is authorized through the issuance of a permit under section 10 of the ESA by the USFWS and/or NMFS, and this authorization addresses the effects of the site\'s discharges and discharge-related activities on ESA-listed species and designated critical habitat.  You must include copies of the correspondence between yourself and the participating agencies in your SWPPP and your NOI. <br><strong>[A basis statement supporting the selection of this criterion should identify whether USFWS or NMFS or both agencies provided a section 10 permit, the field office/regional office(s) providing permit(s), any tracking numbers of identifiers associated with that consultation (e.g., IPaC number, PCTS number), and the date the permit was granted.]</strong>';
    }
    else {
       return 'N/A';
    }
  }

  cp_iife.dischargePoints = function(prop) {
    var r = '';
    var $this = $(this);
    if (prop.length && prop != '') {
      // Add header
      var header = [
        '<div class="line header">',
          '<div class="col-md-2">Discharge Point</div>',
          //'<div class="col-md-2">Location</div>',
          '<div class="col-md-2">Receiving Water</div>',
          '<div class="col-md-2">Pollutants</div>',
          '<div class="col-md-2">TMDL</div>',
          '<div class="col-md-2">Tier</div>',
        '</div>'
      ]
      r += header.join('');
      // Handled the discharge points
      prop.map(function(c, i, a) {
        var even = (i % 2) ? ' even' : '';
        var polluntants = c.firstWater.pollutants.map(function(c){ return c.pollutantName; }, []);
        var tmdls = c.firstWater.pollutants.map(function(c){ return c.tmdl.name; }, []);
        r += [
          '<div class="line row-item' + even + '">',
            //@TODO - Description may be optional - add logic if needed to show blank if user did not complete description - would Dave return false or blank string
            '<div class="col-md-2" title="Discharge Point">', c.description, '</div>',
            //'<div class="col-md-2" title="Location">', c.location.latitude + '&deg;N, ' + c.location.longitude + '&deg;E<br><span class="cgp-latlongsource">Source: ' +
            //c.location.latLongDataSource + '</span><br><span class="cgp-refdatum">Horizontal Reference Datum: ' + c.location.horizontalReferenceDatum + '</span>', '</div>',
            '<div class="col-md-2" title="Receiving Water">', c.firstWater.listedWaterName, '</div>',
            '<div class="col-md-2" title="Pollutant(s)">', polluntants.join(', '), '</div>',
            '<div class="col-md-2" title="TMDL">', tmdls.join(', '), '</div>',
            '<div class="col-md-2" title="Tier 2, 2.5 or 3">', c.tier, '</div>',
          '</div>',
        ].join('')
      })
    }
    else {
      r += '<p>No discharge points.</p>'
    }
    return r || 'N/A';
  };

  cp_iife.dateFormat = function(prop) {
    if (moment(prop).isValid()) {
      return moment(prop).format('l');
    } else if(prop == '‐') {
      return '‐';
    } else {
      return 'N/A;';
    }
  };

  cp_iife.attachments = function(permit) {
    var prop = permit.attachments
    var r = ''
    var $this = $(this)
    if (prop.length) {
      // Add header
      var header = [
        '<div class="line header">',
        '<div class="col-md-3">File Name</div>',
        '<div class="col-md-3">File Size</div>',
        '<div class="col-md-3">File Section</div>',
        '<div class="col-md-3">Date uploaded</div>',
        '</div>'
      ];
      r += header.join('');
      // Handled the discharge points
      prop.map(function(c, i, a) {
        var link = [Drupal.settings.construction_permits.cgp_api_endpoint, 'form', permit.id, 'attachment', c.id].join('/');
        var even = (i % 2) ? ' even' : '';
        r += [
          '<div class="line row-item' + even + '">',
          '<div class="col-md-3" title="File Name">',
          '<a href="' + link + '" target="">', c.name, '</a></div>',
          '<div class="col-md-3" title="File Size">', c.size, ' bytes</div>',
          '<div class="col-md-3" title="File Section">', c.category, '</div>',
          '<div class="col-md-3" title="Date uploaded">', cp_iife.dateFormat(c.createdDate), '</div>',
          '</div>',
        ].join('');
      });
    }
    else {
      r += '<p>No Attachments.</p>'
    }

    return r || 'N/A';
  };

  // Helper functions END

  // Initialize page
  if (!Drupal.settings.construction_permits.response_data) {
    // Parsley validation
    // Widget Setup
    // Status
    $.ajax({
      url: Drupal.settings.construction_permits.cgp_api_endpoint + '/reference/formStatus',
      method: 'GET',
      dataType: 'json',
      success: function(cgp_reponse_json) {
        if(Array.isArray(cgp_reponse_json)) {
          $('.cgp-api-status').addClass('hide')
          $status = $('#cgp-status').prop('disabled', false)
          if(cgp_reponse_json.length) {
            // grab current value if exists
            current_value = $status.val()
            $options = cgp_reponse_json.reduce(function(p, c, i, a){
              p.push("<option value='"+ c +"'>"+ c +"</option>")
              return p;
            }, ["<option value=''>All</option>"])

            $status.html($options.join(''))
            $status.find('option[value="'+current_value+'"]').prop('selected', true);
          }
          else {
            $status.val('')
            $status.html('').prop('disabled', true)
          }
        }
        else {
          $('.cgp-api-status').removeClass('hide')
        }
      },
      error: function(){
        $('.cgp-api-status').removeClass('hide')
      }
    });
    $.ajax({
      url: Drupal.settings.construction_permits.cgp_api_endpoint + '/reference/formType',
      method: 'GET',
      dataType: 'json',
      success: function(cgp_reponse_json) {
        if(Array.isArray(cgp_reponse_json)) {
          $('.cgp-api-status').addClass('hide')
          $applicationType = $('#cgp-type').prop('disabled', false)
          if(cgp_reponse_json.length) {
            // grab current value if exists
            current_value = $applicationType.val()
            $options = cgp_reponse_json.reduce(function(p, c, i, a){
              p.push("<option value='"+ c +"'>"+ c.replace(/_/g, ' ') +"</option>")
              return p;
            }, ["<option value=''>All</option>"])

            $applicationType.html($options.join(''))
            $applicationType.find('option[value="'+current_value+'"]').prop('selected', true);
          }
          else {
            $applicationType.val('')
            $applicationType.html('').prop('disabled', true)
          }
        }
        else {
          $('.cgp-api-status').removeClass('hide')
        }
      },
      error: function(){
        $('.cgp-api-status').removeClass('hide')
      }
    });
    $('#cgp-permit-state').on('change', function(){
      var $this = $(this);
      var current_value = $this.attr('data-current-value');
      var new_value = $this.val();
      if(new_value && current_value != new_value) {
        $this.attr('data-current-value', new_value);
        $.ajax({
          url: Drupal.settings.construction_permits.cgp_api_endpoint + '/reference/counties/' + new_value,
          method: 'GET',
          dataType: 'json',
          success: function(cgp_reponse_json) {
            if(Array.isArray(cgp_reponse_json)) {
              $('.cgp-api-status').addClass('hide')
              $counties = $('#cgp-project-county').prop('disabled', false)
              if(cgp_reponse_json.length) {
                // grab current value if exists
                current_value = $counties.val()
                $options = cgp_reponse_json.reduce(function(p, c, i, a){
                  p.push("<option value='"+ c.countyName +"'>"+ c.countyName +"</option>")
                  return p;
                }, ["<option value=''>All</option>"])

                $counties.html($options.join(''));
                $counties.find('option[value="'+current_value+'"]').prop('selected', true);
              }
              else {
                $counties.val('')
                $counties.html('').prop('disabled', true)
              }
            }
            else {
              $('.cgp-api-status').removeClass('hide')
            }
          },
          error: function(){
            $('.cgp-api-status').removeClass('hide')
          }
        });
        $.ajax({
          url: Drupal.settings.construction_permits.cgp_api_endpoint + '/reference/tribes/' + new_value,
          method: 'GET',
          dataType: 'json',
          success: function(cgp_reponse_json) {
            if(Array.isArray(cgp_reponse_json)) {
              $('.cgp-api-status').addClass('hide');
              $tribes = $('#cgp-tribal-lands').prop('disabled', false);
              $('.tribalIndicator').prop('disabled', false);
              $('.tribalIndicator').prop('checked', false);
              $tribes.show();
              $('#cgp-tribal-lands-hide').hide();
              if(cgp_reponse_json.length) {
                // grab current value if exists
                current_value = $tribes.val();

                $options = cgp_reponse_json.reduce(function(p, c, i, a){
                  p.push("<option value='"+ c[0].tribalName +"'>"+ c[0].tribalName +"</option>")
                  return p;
                }, ["<option value=''>All</option>"])

                $tribes.html($options.join(''))
                $tribes.find('option[value="'+current_value+'"]').prop('selected', true);
              }
              else {
                $('#cgp-tribal-lands-hide').show();
                $('#cgp-tribal-lands').hide();
                $('.tribalIndicator').prop('disabled', true);
                $tribes.prop('disabled', true);
              }
            }
            else {
              $('.cgp-api-status').removeClass('hide');
            }
          },
          error: function(){
            $('.cgp-api-status').removeClass('hide')
          }
        });
      } else if(new_value.length == 0) {
        $this.attr('data-current-value', '');
        $('.tribalIndicator').prop('checked', false);
        $('#cgp-tribal-lands').prop('disabled', false);
        $('#cgp-tribal-lands').show();
        $('#cgp-tribal-lands-hide').hide();
        $('#cgp-project-county').find('option').not(':first').remove();
        $('#cgp-tribal-lands').find('option').not(':first').remove();
      }
    })

    $('#cgp-tribal-lands-hide').hide();
    $('input[type=radio][name=tribalIndicator]').change(function() {
        if (this.value == 'true') {
          $('#cgp-tribal-lands-hide').hide();
          $('#cgp-tribal-lands').show();
          $('#cgp-tribal-lands').val($('#cgp-tribal-lands option:first').val());
          $('#cgp-tribal-lands').prop("disabled", false);
        } else if (this.value == 'false') {
          $('#cgp-tribal-lands-hide').show();
          $('#cgp-tribal-lands').hide();
          $('#cgp-tribal-lands').prop("disabled", true);
        }
    });

    $('#cgp-form').parsley().on('field:validated', function() {
      var ok = $('.parsley-error').length === 0;
      $('.cgp-callout-info').toggleClass('hide', !ok);
      $('.cgp-callout-warning').toggleClass('hide', ok);
    });

    $('#status-definitions').click(function() {
      $('#construction-permits-status-definitions').dialog('open')
    })

    $('#construction-permits-status-definitions')
      .html(Drupal.settings.construction_permits.status_definition)
      .dialog({
        modal: true,
        width: "auto",
        title: "Status Definitions",
        position: {'my': 'center', 'at': 'center'},
        dialogClass: 'construction-permits-modal-status_definition',
        autoOpen: false,
        draggable: false,
        resizable: false,
        close: function(event, ui) {
          console.log('Close construction-permits-status-definitions')
        }
      })

    $('#construction-permits-modal')
      .html(Drupal.settings.construction_permits.cgp_modal)
      .dialog({
        modal: true,
        width: $(window).width()-180,
        height: $(window).height()-180,
        closeOnEscape: true,
        title: "Results for CGP Search",
        position: {'my': 'center', 'at': 'center'},
        dialogClass: 'construction-permits-modal',
        autoOpen: false,
        draggable: false,
        resizable: false,
        create: function(event, ui) {
          var $form = $('#cgp-form');

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
          console.log('Close construction-permits-modal')
          var $table = $('#construction-permits-results-wrapper').find('table');
          sampleSetIndex = 0;
          convertNulls = false;
          $table.dataTable({bDestroy: true}).fnDestroy();
        }
      })

    // Create the advanced settings section on the widget
    $('#cgp-advanced-elements-toggle').on('click', function() {
      var $this = $(this).find('img');
      var toggleOff = $this.hasClass('toggleOff');
      var path = 'sites/all/modules/custom/construction_permits/images/';
      // If it is off turn it on
      if (toggleOff) {
        $this.attr('src', path + 'arrow-down.png').attr('alt', 'Advanced search criteria expanded. Click to collapse.').toggleClass('toggleOff')
      }
      else {
        $this.attr('src', path + 'arrow-right.png').attr('alt', 'Advanced search criteria collapsed. Click to expand.').toggleClass('toggleOff')
      }
      $('#cgp-advanced-elements').toggleClass('hide');
      return false;
    });

    // Update the date to/from field names
    $('#cgp-date-type').on('change', function() {
      var $this = $(this);
      var c_value = $this.val();
      var dateTo = 'submittedDateTo';
      var dateFrom = 'submittedDateFrom';
      if (c_value != 'date-submitted') {
        dateTo = 'updatedDateTo';
        dateFrom = 'updatedDateFrom';
      }
      $('#cgp-date-to').attr('name', dateTo)
      $('#cgp-date-from').attr('name', dateFrom)
    });
    $("#cgp-date-from, #cgp-date-to").datepicker({});

    // Search button functionality
    $body.on('click', '#cgp-search-button', function() {
      var $form = $('#cgp-form');
      // If the form does not validate do not submit data.
      if (!$form.parsley().validate()) {
        return false;
      }

      var $cgp_loading_wrapper = $('#construction-permits-loading-wrapper');
      var $cgp_results_wrapper = $('#construction-permits-results-wrapper');
      var $cgp_details_wrapper = $('#construction-permits-details-wrapper');
      var $cgp_noresults_wrapper = $('#construction-permits-noresults-wrapper');
      var cgpFormData = $form.serializeObject();

      $('#construction-permits-modal').dialog('open');
      //@TODO var data = format_cgp_form_data(cgpFormData, convertNulls);
      show_needed_cgp_div($cgp_loading_wrapper);

      // Prepare data to be sent

      $.ajax({
        url: Drupal.settings.basePath + 'construction_permits/form_submission',
        method: 'POST',
        data: cgpFormData,
        success: function(cgp_reponse_json) {
          if (cgp_reponse_json.error) {
            // reset the modal and return it to a 'default' state
            convertNulls = true;
            cgp_resize_modal();
          }
          else if (cgp_reponse_json.data == '') {
            show_needed_cgp_div($cgp_noresults_wrapper);
          }
          else {
            create_search_results(cgp_reponse_json);
            create_detail_results(cgp_reponse_json);
            show_needed_cgp_div($cgp_results_wrapper);
          }
          cgp_resize_modal();
        }
      });
    });

    /**
     * Close Listener on Construction Permits Modal
     * -  Destroy Datatables
     */
    $('#construction-permits-modal').on('dialogclose', function() {

      var $table = $('#construction-permits-results-wrapper').find('table');
      $table.dataTable({bDestroy: true}).fnDestroy();
      // $('#construction-permits-results-table').DataTable().destroy();
      // $('#construction-permits-result-details-table').DataTable().destroy();
      cgp_resize_modal();
      $('body').removeClass('fixed-modal-open');
      $("html, body").animate({scrollTop: $('.pane-construction-permits').offset().top}, 500);
    });

  } else {
    var response_data = Drupal.settings.construction_permits.response_data;
   // TODO Expand on error checking, requirements for when no results are shown.
    // This is a temp measure to make sure user is not confused.
    if (response_data.error) {
      $('#construction-permits-details-wrapper').append('<div></div>').html("Unable to process search request.")
    } else if (response_data.data.length === 0) {
      $('#construction-permits-details-wrapper').append('<div></div>').html("No results returned for tracking id.")
    } else {
      create_detail_results(Drupal.settings.construction_permits.response_data);
    }
  }
})(jQuery);
