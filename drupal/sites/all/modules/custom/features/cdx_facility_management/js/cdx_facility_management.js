(function ($) {

    $(document).ready(function () {
        // Chris user_role_id 80172
        var user_role_id = 86357; //user role id for Green olive
        var naas_token;// = 'Mary Cheat Token - FIX ASAP!!!!!!';
        var naas_ip;// = '65.248.159.78';
        // Look up functionality for session expiring. On expired session, recreate token, reinitialize widget.

        $.ajax({
            url: '/return_cdx_facility_management_token',
            success: function (json) {
                var parsed_json = $.parseJSON(json);
                console.log(parsed_json);
                naas_token = parsed_json.token;
                naas_ip = parsed_json.server_ip;
            }
        });

        function generateUserData() {
            $.ajax({
                url: '/retrieve_cdx_user_data',
                success: function (json) {
                    var parsed_json = $.parseJSON(json);
                    if (!parsed_json.error) {
                        console.log(parsed_json);
                        var organizations = parsed_json.organizations;
                        var org_to_roles = parsed_json.organizations_to_roles;
                        //initialize filters object
                        var filters = {organization: '', program: ''};
                        var org_filter_select_holder = $('#fmw-organization-select-holder');
                        var program_filter_select_holder = $('#fmw-program-select-holder');
                        var org_filter_select = $('#fmw-organization-select');
                        var program_filter_select = $('#fmw-program-select');
                        var orgs_num = organizations.length;
                        // Only allow org filtering if there's more than one org
                        if (orgs_num > 1) {
                            org_filter_select_holder.show();
                            org_filter_select.append('<option value=""></option>').show();
                        }
                        // populate organizations select
                        $.each(organizations, function (key, value) {
                            org_filter_select.append('<option value="' + value.userOrganizationId + '" >' + value.organizationName + '</option>');
                        });

                        org_filter_select.change(function () {
                            var selected_org = $(this).val();
                            filters.organization = selected_org;
                          if (selected_org == '') {
                              filters.program = '';
                              program_filter_select_holder.hide();
                                program_filter_select.val('');
                            }
                            else {
                                // recreate program select with org programs (roles)
                                var roles = org_to_roles[selected_org];
                              program_filter_select_holder.show();

                              program_filter_select.html('').append('<option value=""></option>');
                                $.each(roles, function (index, value) {
                                    program_filter_select.append('<option value="' + value.userRoleId + '">' + value.dataflow + '</option>');
                                });
                            }
                            createCDXFacilityTable(organizations, org_to_roles, filters);
                        });

                        program_filter_select.change(function () {
                            var selected_user_role_id = $(this).val();
                            filters.program = selected_user_role_id;
                            filters.organization = org_filter_select.val();
                            createCDXFacilityTable(organizations, org_to_roles, filters)
                        });
                        if (orgs_num == 1) {
                            org_filter_select.trigger('change');
                        }


                            //    var selected_org;
                        //    $.each(organizations, function (key, value) {
                        //        selected_org = value.userOrganizationId;
                        //    });
                        //    var roles = org_to_roles[selected_org];
                        //    program_filter_select.html('').append('<option value=""></option>').show();
                        //    $.each(roles, function (index, value) {
                        //        program_filter_select.append('<option value="' + value.userRoleId + '">' + value.dataflow + '</option>');
                        //    });
                        //    createCDXFacilityTable(organizations, org_to_roles, filters)
                        //}
                        //org_filter_select.trigger('change');
                    }
                    else {
                        alert('unable to recieve user data');
                    }

                }
            });
        }


        /*
         Takes users CDX organizations and the mapping to user roles and creates table
         */
        function createCDXFacilityTable(organizations, org_to_roles, filters) {
            console.log(filters);
            var table = '<table id="cdx_facility_management_organizations"><thead><th>Organization</th><th>Address</th><th>Phone</th><th>Status</th><th>Program</th><th>Subject</th></thead>';
            var allow_all_orgs = false;
            var allow_all_roles = false;
            $.each(organizations, function (index, org) {
                if (index == 0) {
                    table = table + '<tbody>';
                }
                // check if org is selected
                if (filters.organization == '') { // zero filters applied
                    allow_all_orgs = true;
                }
                if (filters.program == '') {
                    allow_all_roles = true;
                }
                console.log('FILTERS', filters);
                if (org.userOrganizationId == filters.organization || allow_all_orgs) {
                    var org_roles = org_to_roles[org.userOrganizationId];
                    $.each(org_roles, function (index, role) {
                        if (role.userRoleId == filters.program || allow_all_roles) {
                            table = table + '<tr><td>' + org.organizationName + '</td><td>' + org.mailingAddress1 + ' ' +
                            org.mailingAddress2 + ', ' + org.city + ', ' + org.state.code + ', ' + org.zip + '</td>';
                            table = table + '<td>' + org.phone + '</td><td>' + org.cdxEsaStatus + '</td>';
                            table = table + '<td>' + role.dataflow + '</td><td>' + role.subject + '</td>';
                            table = table + '<td><button id=' + role.userRoleId + ' class="manage_facilities_button">Manage Facilities</button></td></tr>';
                        }
                    });
                }
            });

            table = table + '</tbody></table>';
            console.log(table);
            $('#facility-widget-orgs-table').html(table);


            var tablePaginationObj =
            {
                table: $('#facility-widget-orgs-table'),
                numPerPage: 5,
                showTopPageNumbers: false,
                showBottomPageNumbers: true,
                limitPagesShown: true,
                numPagesShown: 5,
                isSortable: true,
                ignoreColumns: [1] //Check box column
            };
            buildPagination(tablePaginationObj);


            $('.manage_facilities_button').click(function() {
                var role_id = $(this).attr('id');
                updateWidget(role_id, naas_token, naas_ip);
                cdx_facility_management_block.dialog('open');

            })
        }

        var cdx_facility_management_block = $('#facility-widget');
        if (cdx_facility_management_block.length > 0) {
            cdx_facility_management_block.dialog({
                title: 'CDX Facility Management',
                modal: true,
                autoOpen: false,
                width: 'auto',
                height: 'auto',
                maxWidth: 1400,
                minWidth: '1400px',
                dialogClass: 'cdx_facility_management_block',
                resizable: false,
                position: {my: "center", at: "center", of: window}
            });

        }

        $('body').on('click', '#facility-widget input, #facility-widget a, #facility-widget button, #facility-widget .ui-accordion-header', function () {
            cdx_facility_management_block.dialog("option", "position", {my: "center", at: "center", of: window});
        });



        $(window).resize(function () {
            cdx_facility_management_block.dialog("option", "position", {my: "center", at: "center", of: window});
        });
        //$(window).scroll(function(){
        //    cdx_facility_management_block.dialog( "option", "position", { my: "center", at: "center", of: window } );
        //});
        //updateWidget(user_role_id, naas_token, naas_ip);

        function updateWidget(user_role_id, naas_token, naas_ip) {
            console.log(user_role_id);
            console.log(naas_token);
            console.log(naas_ip);
            $('#facility-widget').html('');
            $.initFacilityManagementWidget({
                autoScroll: false,
                widgetDisplayType: "Edit My Facilities",
                baseServiceUrl: 'https://dev.epacdx.net/FrsPhase2',
                ImagesFolderPath: "https://dev.epacdx.net/FrsPhase2/content/v3/FRS%20Widget/images", //static
                // Hard coded to Chris' CEDRI role currently. Have to find user CDX role ID's and pass one at a time here on selection.
                userRoleId: user_role_id,
                NASSToken: naas_token,
                NAASip: naas_ip
            });
        }

        generateUserData();
    });
})
(jQuery);
