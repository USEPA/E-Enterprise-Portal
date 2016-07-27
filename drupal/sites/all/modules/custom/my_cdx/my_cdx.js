(function ($) {
    var $table_wrapper = $('#my-cdx').find('table');
    var $tabs = $('#app-connect-tabs');
    $tabs.tabs();
    $tabs.find('.ui-corner-top').on('click', function (ev) {
        $(this).focus();
    });
    $.fn.dataTableExt.oStdClasses.sPageButton = "favorites-ignore fa";
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
        "ajax": Drupal.settings.basePath + 'my-cdx/links_json',
        "dom": 'tip',
        "bLengthChange": false,
        "iDisplayLength": 5,
        "columnDefs": [
            {"width": "70%", "targets": 0}, // First column width
            {"width": "30%", "targets": 1} // Second column width
        ],
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
        var theJsonWeAreWorkingWith =
        {
            orgCount: 4,
            organizations: {
                1234: {
                    'orgName': 'org abc',
                    'clientCount': 4,
                    'programClients': {
                        1234: {
                            'clientName': 'client1 abc'
                        },
                        1235: {
                            'clientName': 'client2 abc'
                        },
                        1236: {
                            'clientName': 'client3 abc'
                        },
                        1237: {
                            'clientName': 'client4 abc'
                        }
                    }
                },
                1236: {
                    'orgName': 'org 2',
                    'clientCount': 4,
                    'programClients': {
                        1234: {
                            'clientName': 'Aclient abc'
                        },
                        1235: {
                            'clientName': 'Bclient abc'
                        },
                        1236: {
                            'clientName': 'Cclient abc'
                        },
                        1237: {
                            'clientName': 'Dclient abc'
                        }
                    }
                },
                Single_Client: {
                    'orgName': 'SINGLE',
                    'clientCount': 1,
                    'programClients': {
                        1234: {
                            'clientName': 'Hans Solo'
                        }
                    }
                }
            }
        };


        var programAcronym = 'PSP';
        Drupal.CTools.Modal.show("ee-ctools-popup-style");
        $('#modal-title').html('Application Profile Settings')
        var myCDXModalTemplate = Drupal.settings.myCDXModalTemplate;

        $('#modal-content').html(myCDXModalTemplate).scrollTop(0);
        myCDXLinkDetailsHandler(theJsonWeAreWorkingWith);
        Drupal.attachBehaviors();
        ev.preventDefault();
    });


    function myCDXLinkDetailsHandler(linkDetailsJSON) {
        var $organizationSelect = $('.my-cdx-modal .organization-select');
        var $organizationName = $('.my-cdx-modal .organization-name');

        // Clear previous values
        $organizationSelect.html('');
        $organizationName.html('');
        if (linkDetailsJSON.orgCount === 0) {
            $organizationName.html("No Organizations found.");
            $organizationSelect.hide();
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
                    myCDXLinkProgramClientHandler(orgObj);
                } else {
                    $option = $('<option />', {
                        value: orgId,
                        text: orgObj.orgName
                    });
                    $organizationSelect.append($option);
                }
            });
            $organizationSelect.change(function () {
                var selectedOrgId = $(this).val();
                myCDXLinkProgramClientHandler(linkDetailsJSON.organizations[selectedOrgId]);
            });
        }
    }

    function myCDXLinkProgramClientHandler(programClientsJson) {
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
                    $programClientName.html(clientObj.clientName).show();
                    $programClientsSelect.hide();
                } else {
                    $option = $('<option />', {
                        value: clientId,
                        text: clientObj.clientName
                    });
                    $programClientsSelect.append($option);
                }
            });
        }
    }
})(jQuery);
