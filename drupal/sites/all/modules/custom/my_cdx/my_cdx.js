(function ($) {
    var $table_wrapper =  $('#my-cdx').find('table');
    var $tabs = $('#app-connect-tabs');
    $tabs.tabs();
    $tabs.find('.ui-corner-top').on('click', function(ev) {
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
        "ajax": Drupal.settings.basePath + 'my-cdx/json',
        "dom": 'tip',
        "bLengthChange": false,
        "iDisplayLength": 5,
        "columnDefs": [
            { "width": "70%", "targets": 0 }, // First column width
            { "width": "30%", "targets": 1 } // Second column width
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
    $('#local-resources-tabs').on('click', 'td.views-field-nothing a', function (ev) {
var theJsonWeAreWorkingWith = [
    {
        'orgName': 'org abc',
        'orgId': 1234,
        'programClients': [
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
            {
                'clientName': 'client abc',
                'clientId': 1234
            }
        ]
    },
    {
        'orgName': 'org abc',
        'orgId': 1234,
        'programClients': [
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
            {
                'clientName': 'client abc',
                'clientId': 1234
            }
        ]
    },
    {
        'orgName': 'org abc',
        'orgId': 1234,
        'programClients': [
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
            {
                'clientName': 'client abc',
                'clientId': 1234
            },
        ]
    },
];


var programAcronym = 'PSP';
        Drupal.CTools.Modal.show("ee-ctools-popup-style");
        $('#modal-title').html('Application Profile Settings');
        var theContent = '\
        <div class="cdx-role-modal">\
          <div>Organization Name</div>\
          <div>' + orgSelect(theJsonWeAreWorkingWith) + '</div>\
          <div>Program Client ID</div>\
          <div>' + programClientSelect(theJsonWeAreWorkingWith) + '</div>\
          <div>Program</div>\
          <div>' + programAcronym + '</div>\
          <div class="operations">\
            <a href="#" class="proceed">Proceed</a>\
            <a href="#" class="cancel">Cancel</a>\
          </div>\
        </div>\
        \
        ';
        $('#modal-content').html(theContent).scrollTop(0);
        Drupal.attachBehaviors();
        ev.preventDefault();
    });

    $('.cdx-role-modal .org').change(function() {
        // ajax here to update the list of program clients
    });
})(jQuery);
