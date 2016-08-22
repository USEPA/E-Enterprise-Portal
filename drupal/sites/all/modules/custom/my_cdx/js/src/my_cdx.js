(function ($) {
  var $table_wrapper = $('#my-cdx').find('table');
  var $tabs = $('#app-connect-tabs');
  $tabs.tabs();
  $tabs.find('.ui-corner-top').on('click', function (ev) {
    $(this).focus();
  });
  $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
  // If the datatables loading has an error gracefully handle with a message
  $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
    $('#my-cdx').find('.dataTables_empty').html("Unable to connect to service.");
    console.log(message);
  };
  $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
      "iStart": oSettings._iDisplayStart,
      "iEnd": oSettings.fnDisplayEnd(),
      "iLength": oSettings._iDisplayLength,
      "iTotal": oSettings.fnRecordsTotal(),
      "iFilteredTotal": oSettings.fnRecordsDisplay(),
      "iPage": oSettings._iDisplayLength === -1 ?
        0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
      "iTotalPages": oSettings._iDisplayLength === -1 ?
        0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength) - 1
    };
  };
  var datatable_options = {
    "ajax": Drupal.settings.basePath + 'my-cdx/links-json',
    "dom": 'tip',
    "bLengthChange": false,
    "iDisplayLength": 5,
    "columnDefs": [
      {"width": "40%", "targets": 0}, // First column width
      {"width": "30%", "targets": 1}, // Second column width
      {"width": "30%", "targets": 2}, // Second column width
    ],
    "bAutoWidth": false,
    "pagingType": "simple",
    "bSortable": true,
    "fnDrawCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var pageInfo = this.fnPagingInfo();
      var pageNo = pageInfo.iPage + 1;
      var totalPages = pageInfo.iTotalPages + 1;

      if (totalPages > 1) {
        var $current_li = $('<li />', {
          class: 'pager-current'
        }).html(pageNo + ' of ' + totalPages);
        $('.dataTables_paginate li:first').after($current_li);
      }
    }
  };
  $table_wrapper.DataTable(datatable_options);

  // Click handler for clicking a CDX role
  // @see http://drupal.stackexchange.com/questions/88399/ctools-modals-without-ajax
  $tabs.on('click', 'a.cdx-link', function (ev) {
    var roleID = $(this).data('roleId');
    var acronym = $(this).data('acronym');
    var roleDescription = $(this).data('roleDescription');
    var $modal_content = $('#my-cdx-modal-content')
      .html('<i class="my-cdx-loader  fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>')
      .dialog({
        dialogClass: 'my-cdx-modal-content',
        title: 'Application Profile Settings'
      });
    $.ajax({
      url: Drupal.settings.basePath + 'my-cdx/link-details-json/' + roleID,
      dataType: 'json',
      success: function (data) {
        if ($modal_content.is(':visible')) {
          // only do this if the user has not prematurely closed the modal

          data.roleDescription = roleDescription;
          // Access modal tpl @see my-cdx.module function my_cdx_block_view
          var myCDXModalTemplate = Drupal.settings.myCDXModalTemplate;
          $modal_content.html(myCDXModalTemplate).dialog();

          // Add acronym to modal
          $modal_content.find('.program-acronym').html(acronym);

          if (!instantConnect(data, $modal_content)) {
            // Parse data and create select operations
            myCDXLinkDetailsHandler(data);
          } else {
            // close this modal
            $modal_content.dialog('close');
          }

          // Close modal on clicking cancel
          $('.cancel').click(function () {
            $modal_content.dialog('close');
          });
          console.log('myCDXLinkDetails complete.');
        } else {
          console.log('myCDXLinkDetails aborted (modal closed?).');
        }
      }
    });

    ev.preventDefault();
  });

  /**
   * Creates Organization select and sets listener
   * @param linkDetailsJSON
   */
  function myCDXLinkDetailsHandler(linkDetailsJSON) {
    var $organizationSelect = $('.my-cdx-modal .organization-select');
    var $organizationName = $('.my-cdx-modal .organization-name');

    var first_selected_org_id = "";
    // Clear previous values
    $organizationSelect.html('');
    $organizationName.html('');
    if (linkDetailsJSON.orgCount === 0) {
      $organizationName.html("No Organizations found.");
      $organizationSelect.hide();
      myCDXLinkProgramClientHandler({clientCount: 0});
    } else {
      var $option;
      if (linkDetailsJSON.orgCount > 1) {
        $organizationSelect.show();
        $organizationName.hide();
      }
      $.each(linkDetailsJSON.organizations, function (orgId, orgObj) {
        if (linkDetailsJSON.orgCount === 1) {
          $organizationName.html(orgObj.orgName).show();
          $organizationSelect.hide();
          myCDXLinkProgramClientHandler(orgObj, linkDetailsJSON.roleDescription);
        } else {
          $option = $('<option />', {
            value: orgId,
            text: orgObj.orgName
          });
          first_selected_org_id = orgId;
          $organizationSelect.append($option);
        }
      });
      $organizationSelect.change(function () {
        var selectedOrgId = $(this).val();
        myCDXLinkProgramClientHandler(linkDetailsJSON.organizations[selectedOrgId], linkDetailsJSON.roleDescription);
      });
      if (first_selected_org_id !== "") {
        $organizationSelect.trigger('change');
      }
    }
  }

  /**
   * Creates Select for Program Clients based on what Organization has been selected
   * @param programClientsJson
   */

  function myCDXLinkProgramClientHandler(programClientsJson, roleDescription) {
    var $programClientsSelect = $('.my-cdx-modal .program-client-select');
    var $programClientName = $('.my-cdx-modal .program-client-name');
    // Clear previous values
    $programClientsSelect.html('');
    $programClientName.html('');

    if (programClientsJson.clientCount === 0) {
      $programClientsSelect.hide();
      $programClientName.html("No Program Clients found.");
    } else {
      var $option;
      if (programClientsJson.clientCount > 1) {
        $programClientsSelect.show();
        $programClientName.hide();
      }
      $.each(programClientsJson.programClients, function (clientId, clientObj) {
        if (programClientsJson.clientCount === 1) {
          $programClientName.html(roleDescription + ': ' + clientObj.clientName).show();
          $programClientsSelect.hide();
        } else {
          $option = $('<option />', {
            value: clientId,
            text: roleDescription + ': ' + clientObj.clientName
          });
          $programClientsSelect.append($option);
        }
      });
    }
  }


  /**
   * Inspect the user's organizations and roles. If we only have one of each, connect them instantly
   */
  function instantConnect(data, $modal_content) {
    var firstOrgClientCount;
    for (var key in data.organizations) {
      firstOrgClientCount = data.organizations[key].clientCount;
      break;
    }

    if (data.orgCount == 1 && firstOrgClientCount == 1) {
      appConnect('http://www.google.com', {}, $modal_content);
      return true;
    }
    return false;
  }

  /**
   * Connect to a CDX App
   */
  function appConnect(url, params, $modal) {
    console.log({
      "url": url,
      "params": params
    });
    // create a form which opens a new window when submitted
    var $form = $('<form action="' + url + '" method="post" target="_blank"></form>');

    // attach parameters to the form
    for (var key in params) {
      var value = params[key];
      $form.append('<input type="hidden" name="' + key + '" value="' + value + '" />');
    }

    // attach the form to the page and submit it
    $modal.append($form);
    $modal.find('form').submit();
  }
})(jQuery);
