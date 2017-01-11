function show_needed_cgp_div($wrapper_to_show, $common_selector, modal_title) {
  $common_selector = ($common_selector) ? $common_selector : jQuery('.construction-permits-modal-wrapper');
  $common_selector.hide();
  $wrapper_to_show.show();
  // Adjust the modal title
  modal_title = (modal_title) ? modal_title : "Results for Construction General Permits Search";
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
    "iDisplayLength": 3,
    "processing": true,
    "language": {
      "processing": ""
    },
    "autoWidth": false,
    "pagingType": "simple",
    "fnDrawCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      // .fnPagingInfo() is depreciated
      // https://datatables.net/reference/api/page.info()
      var table = $(this).DataTable();
      var info = table.page.info();
      // var pageInfo = this.fnPagingInfo();
      var pageNo = info.page + 1;

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
      $('td:nth-child(2)', nRow.nTable).addClass('first-column').attr('data-title', 'Master Permit #').each(function() {
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
              $modal = $('#construction-permits-modal');
              $toc_bottom = $('#cgp-general');

              // Setup table of contents (toc) and the stickyness in the modal
              //$modal.parent().css('position', 'fixed');
              $modal.scroll(function() {
                $m = $('#construction-permits-modal');
                $toc = $('#cgp-general');
                $modal_header = $('#cgp-header');
                var sticky_gap = $toc.offset().top;

                if ($m.scrollTop() > sticky_gap) {
                  $modal_header.addClass('sticky-toc');
                  $modal_header.css('width', $m.width()+6).css('top', $m.offset().top);
                }
                else {
                  $modal_header.removeClass('sticky-toc').removeAttr('style');
                }
              });
            return false;
          }
        );
      });
      $('td:nth-child(3)', nRow.nTable).addClass('first-column').attr('data-title', 'NPDES ID');
      $('td:nth-child(4)', nRow.nTable).attr('data-title', 'Owner/Operator');
      $('td:nth-child(5)', nRow.nTable).attr('data-title', 'Site Name');
      $('td:nth-child(6)', nRow.nTable).attr('data-title', 'Site State');
      $('td:nth-child(7)', nRow.nTable).attr('data-title', 'Site City');

      $('td:nth-child(8)', nRow.nTable).attr('data-title', 'Status').each(function() {
        var $this = $(this);
        var statusText = $this.attr('data-status');
        if (!statusText) {
          statusText = $this.html();
          $this.attr('data-status', statusText);
        }
        var formatted_status = statusText.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
        $this.html(formatted_status);
      });

      $('td:nth-child(9)', nRow.nTable).attr('data-title', 'Submitted').each(function() {
        var $this = $(this);
        var dateText = $this.attr('data-date');
        if (!dateText) {
          dateText = $this.html();
          $this.attr('data-date', dateText)
        }
        var d = new Date(dateText);
        $this.html([d.getMonth() + 1, d.getUTCDate(), d.getUTCFullYear()].join('/'));
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

}

/**
 * Clear form inputs and hide warning messages
 */
function reset_cgp_form() {
  var $form = jQuery('#cgp-form');
  $form.parsley().reset();
  $form.find('input[type=number]').val('');
  $form.find('input[type=radio]').prop('checked', false);
  $form.find('select option').prop('selected', false);
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
        $template.attr('title', "Details for " + permit.masterPermitNumber + " - " + permit.projectSiteInformation.siteName)
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
        cgp_jump($(this).val());
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

  cp_iife.adjustType = function(prop) {
    return prop.replace(/Of/g, 'of').replace(/_/g, ' ');
  }

  cp_iife.fullName = function(prop) {
    return [prop.firstName, prop.middleInitial, prop.lastName].reduce(function(p, c) {
      (c) ? p.push(c) : 0;
      return p
    }, []).join(' ')
  }

  cp_iife.address = function(prop, prefix) {
    var country = (prop[prefix + 'County'] && prop[prefix + 'County'] != 'string') ? ' ' + prop[prefix + 'County'] : '';
    var lineAddress = (prop[prefix + 'Address2'] && prop[prefix + 'Address2'] != 'string') ? prop[prefix + 'Address'] + '<br>' + prop[prefix + 'Address2'] : prop[prefix + 'Address'];
    return lineAddress + '<br/>' + prop[prefix + 'City'] + ', ' + prop[prefix + 'StateCode'] + ' ' + prop[prefix + 'ZipCode'] + country;
  }

  cp_iife.latlong = function(prop) {
    //projectSiteInformation.siteLocation
    return prop['latitude'] + '&deg;' + 'N,' + prop['longitude'] + '&deg;' + 'E' + '<br><span class="cgp-latlongsource">Source: ' + prop['latLongDataSource'] + '</span>';
  }

  cp_iife.dateRange = function(prop, prefix) {
    //projectSiteInformation and LEW
    return cp_iife.dateFormat(prop[prefix + 'ProjectStart']) + ' &mdash; ' + cp_iife.dateFormat(prop[prefix + 'ProjectEnd']);
  }

  cp_iife.fullPhone = function(prop) {
    return phone = (prop['phoneExtension'] && prop['phoneExtension'] != '') ? prop['phone'] + ' x' + prop['phoneExtension'] : prop['phone'];
  }

  cp_iife.appendixDCriteriaMet = function(prop) {
    return 'N/A';
  }

  cp_iife.dischargePoints = function(prop) {
    var r = '';
    var $this = $(this);
    if (prop.length && prop != '') {
      // Add header
      var header = [
        '<div class="line header">',
        '<div class="col-md-2">Discharge Point</div>',
        '<div class="col-md-2">Location</div>',
        '<div class="col-md-2">Receiving Water</div>',
        '<div class="col-md-2">Pollutants</div>',
        '<div class="col-md-2">Tier</div>',
        '<div class="col-md-2">TMDL</div>',
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
          '<div class="col-md-2" title="Discharge Point">', c.description, '</div>',
          '<div class="col-md-2" title="Location">', c.location.latitude + '&deg;N, ' + c.location.longitude + '&deg;E<br><span class="cgp-latlongsource">Source: ' +
          c.location.latLongDataSource + '</span><br><span class="cgp-refdatum">Horizontal Reference Datum: ' + c.location.horizontalReferenceDatum + '</span>', '</div>',
          '<div class="col-md-2" title="Receiving Water">', c.firstWater.listedWaterName, '</div>',
          '<div class="col-md-2" title="Pollutant(s)">', polluntants.join(', '), '</div>',
          '<div class="col-md-2" title="Tier 2, 2.5 or 3">', c.tier, '</div>',
          '<div class="col-md-2" title="TMDL">', tmdls.join(', '), '</div>',
          '</div>',
        ].join('')
      })
    }
    else {
      r += '<p>No discharge points.</p>'
    }
    return r;
  };

  cp_iife.dateFormat = function(prop) {
    var d = new Date(prop);
    return [d.getMonth() + 1, d.getUTCDate(), d.getUTCFullYear()].join('/')
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

    return r;
  };

  // Helper functions END

  if (!Drupal.settings.construction_permits.response_data) {
    // Parsley validation
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

        }
      })

    $('#construction-permits-modal')
      .html(Drupal.settings.construction_permits.cgp_modal)
      .dialog({
        modal: true,
        width: $(window).width()-180,
        height: $(window).height()-180,
        closeOnEscape: true,
        title: "Results for Construction General Permits Search",
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
      $('#construction-permits-results-table').DataTable().destroy();
      $('#construction-permits-result-details-table').DataTable().destroy();
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
