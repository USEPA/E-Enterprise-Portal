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
    var roleIds = $(this).data('roleIds');
    var acronym = $(this).data('acronym');
    var roleDescription = $(this).data('roleDescription');
    var $modal_content = $('#my-cdx-modal-content')
      .html('<i class="my-cdx-loader  fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>')
      .dialog({
        dialogClass: 'my-cdx-modal-content',
        title: 'Application Profile Settings'
      });
    $.ajax({
      url: Drupal.settings.basePath + 'my-cdx/link-details-json/' + roleIds,
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
          $('.proceed').click(function () {
            var org_index = 0;
            var prog_index = 0;
            /*Determine the user role id based on what the user selected from org and program drop down list box.
            * If one or both are invisible, just use the default value, 0*/
            if($modal_content.find(".organization-select").is(":visible")){
              org_index = $(".organization-select option:selected").index();
            }
            if($modal_content.find(".program-client-select").is(":visible")){
              prog_index = $(".program-client-select option:selected").index();
            }
            var handOffRoleId = data.organizations[org_index].programClients[prog_index].userRoleId;
            performMyCDXHandoff(handOffRoleId);
          });

        } else {
          console.log('myCDXLinkDetails aborted (modal closed?).');
        }
      }
    });

    ev.preventDefault();
  });

  /*
  * Performs final handoff to a CDX link retrieved from server side via ajax call.
  * */
  function performMyCDXHandoff(roleId){
    $.ajax({
      url: Drupal.settings.basePath + 'my-cdx/link-json-handoff/' + roleId,
      dataType: 'json',
      success: function (data) {
        var url = data.linkHandOff.HandOffUrl;
        var $form = $('<form action="' + url + '" method="POST" target="_blank"></form>');
        $.each( data.parameter, function (key, val){
          $form.append('<input type="hidden" name="' + val.Name + '" value="' + val.Value + '" />');
        });
        var $modal = $('#my-cdx-modal-content');
        $modal.append($form);
        $modal.find('form').submit();
      }
    });
  }

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
        var programClientName = clientObj.roleName + ': ' + clientObj.clientName;
        if (programClientsJson.clientCount === 1) {
          $programClientName.html(programClientName).show();
          $programClientsSelect.hide();
        } else {
          $option = $('<option />', {
            value: clientId,
            text: programClientName
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
      performMyCDXHandoff(data.organizations[0].programClients[0].userRoleId);
      return true;
    }
    return false;
  }

})(jQuery);
