(function ($) {

    $(document).ready(function () {
        // Chris user_role_id 80172
        var user_role_id;
        var naas_token;
        var naas_ip;
        var cdx_resource_url;
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
                        var roles_to_types;
                        //initialize filters object
                        var org_filter_select_holder = $('#fmw-organization-select-holder');
                        var program_filter_select_holder = $('#fmw-program-select-holder');
                        var type_filter_select_holder = $('#fmw-type-select-holder');
                        var org_filter_select = $('#fmw-organization-select');
                        var org_single = $('#fmw-org-single');
                        var program_filter_select = $('#fmw-program-select');
                        var program_single = $('#fmw-program-single');
                        var type_filter_select = $('#fmw-type-select');
                        var type_single = $('#fmw-type-single');
                        var orgs_num = organizations.length;
                        var management_button =  $('#launch-facility-management');

                        // First connect to widget initially to start CDX session;
                        var temp = 0;
                        $.each(org_to_roles, function(key, value) {
                            if (temp == 0) {
                                var initial_user_role_id = value[0].userRoleId;
                                updateWidget(initial_user_role_id, naas_token, naas_ip);
                                temp = 1;
                            }
                        });

                        // Only allow org filtering if there's more than one org
                        if (orgs_num > 1) {
                            org_filter_select.append('<option value=""></option>').show();
                        }
                        // populate organizations select
                        $.each(organizations, function (key, value) {
                            org_filter_select.append('<option value="' + value.userOrganizationId + '" >' + value.organizationName + '</option>');
                        });

                        org_filter_select.change(function () {
                            var selected_org = $(this).val();
                            if (selected_org == '') {
                                program_filter_select_holder.hide();
                                program_filter_select.val('');
                                type_filter_select_holder.hide();
                                type_filter_select.val('');
                                management_button.hide();
                            }
                            else {
                                // recreate program select with org programs (roles)
                                type_filter_select_holder.hide();
                                type_filter_select.val('');
                                var roles = org_to_roles[selected_org];
                                program_filter_select.html('').append('<option value=""></option>');
                                var used_roles = [];
                                $.each(roles, function (index, value) {
                                    if ($.inArray(value.dataflow, used_roles) < 0) {
                                        program_filter_select.append('<option value="' + value.dataflow + '">' + value.dataflow + '</option>');
                                        used_roles.push(value.dataflow);
                                    }
                                });
                                if (used_roles.length == 1) {
                                    program_filter_select.val(used_roles[0]);
                                    program_filter_select.hide().trigger('change');
                                    program_single.html(used_roles[0]);
                                }
                                else {
                                    program_filter_select.show();
                                    program_single.html('');
                                }
                                program_filter_select_holder.show();

                            }

                            //createCDXFacilityTable(organizations, org_to_roles, filters);
                        });

                        program_filter_select.change(function () {

                            var selected_dataflow = $(this).val();
                            var roles = org_to_roles[org_filter_select.val()];
                            if (selected_dataflow == '') {
                                type_filter_select_holder.hide();
                                type_filter_select.val('');
                                management_button.hide();
                            }
                            else {
                                // recreate type select with org programs (roles)
                                //var types = org_to_roles[selected_org];
                                type_filter_select.html('').append('<option value=""></option>');
                                var used_types = [];
                                var initialize_count = 0;
                                $.each(roles, function (index, value) {
                                    if (value.dataflow = selected_dataflow) {
                                        type_filter_select.append('<option value="' + value.userRoleId + '">' + value.type.description + '</option>');
                                        used_types.push(value.type.description);
                                    }
                                });
                                if (used_types.length == 1) {
                                    type_filter_select.trigger('change').hide();
                                    type_single.html(used_types[0]);
                                }
                                else {
                                    type_single.html('');
                                    type_filter_select.show();
                                }
                                type_filter_select_holder.show();
                            }

                        });


                        type_filter_select.change(function() {
                            var user_role_id = $(this).val();
                            if (user_role_id == '') {
                                management_button.hide();
                            }
                            else {
                                updateWidget(user_role_id, naas_token, naas_ip);
                                management_button.show();
                            }
                        });
                        // Write text if not configuration possible
                        if (orgs_num == 1) {
                            org_filter_select.trigger('change').hide();
                            org_single.html(org_filter_select.text());
                        }
                        else {
                            org_single.html('');
                            org_filter_select_holder.show();
                        }
                    }
                    else {
                        alert('unable to recieve user data');
                    }

                    management_button.click(function() {
                        cdx_facility_management_block.dialog('open');
                    });

                }
            });
        }


        /*
         Takes users CDX organizations and the mapping to user roles and creates table
         */
        function createCDXFacilityTable(organizations, org_to_roles, filters) {
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

        // Pull in user NAAS Token
        $.ajax({
            url: '/cdx_facility_configurations',
            success: function(json) {
                var configs = $.parseJSON(json);
                cdx_resource_url = configs.url;
                console.log(cdx_resource_url);
            }
        });

        function updateWidget(user_role_id, naas_token, naas_ip) {
            console.log(user_role_id);
            console.log(naas_token);
            console.log(naas_ip);
            $('#facility-widget').html('');
            $.initFacilityManagementWidget({
                autoScroll: false,
                widgetDisplayType: "Edit My Facilities",
                baseServiceUrl: cdx_resource_url,
                ImagesFolderPath: cdx_resource_url + '/ContentFramework/FRS%20Widget/images', //static
                userRoleId: user_role_id,
                NASSToken: naas_token,
                NAASip: naas_ip,
                onInvalidSession: function() {
                    alert('CDX Session ended.');
                    window.location.href = '/user/logout';
               }
            });
            //cdx_facility_management_block.dialog("option", "position", {my: "center", at: "center", of: window});

        }

        generateUserData();
    });
})
(jQuery);
