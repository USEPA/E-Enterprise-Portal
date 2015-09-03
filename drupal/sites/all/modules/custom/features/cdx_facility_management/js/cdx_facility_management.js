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
                naas_token = parsed_json.token;
                naas_ip = parsed_json.server_ip;
            }
        });


        function createProgramSelect(roles_obj) {
            var program_filter_select = $('#fmw-program-select');
            var program_filter_select_holder = $('#fmw-program-select-holder');
            var program_single = $('#fmw-program-single');
            var type_filter_select_holder = $('#fmw-type-select-holder');
            var management_button = $('#launch-facility-management');


            var first_name;
            var count = 0;
            program_filter_select.html('<option value="">Select a Dataflow</option>');
            $.each(roles_obj, function (name, roles) {
                program_filter_select.append('<option value="' + name + '" >' + name + '</option>');
                count = count + 1;
                first_name = name; // unused if count > 1
            });
            if (count > 1) {
                program_filter_select.show();
                program_single.hide();
            }
            else {
                program_filter_select.val(first_name).hide();
                program_single.html(first_name).show();
                createFilterSelect(roles_obj[first_name]);
            }
            program_filter_select_holder.show();

            program_filter_select.unbind('change').change(function () {
                var selected_program = $(this).val();
                management_button.hide();
                type_filter_select_holder.hide();
                if (selected_program != '') {
                    createFilterSelect(roles_obj[selected_program]);
                }
            });
        }

        function createFilterSelect(type_obj) {
            var type_filter_select = $('#fmw-type-select');
            var type_single = $('#fmw-type-single');
            var type_filter_select_holder = $('#fmw-type-select-holder');
            var count = 0;
            var first_userRoleId;
            var first_type;
            var management_button = $('#launch-facility-management');

            type_filter_select.html('<option value="">Select a Role Type</option>');

            $.each(type_obj, function (index, type_array) {
                type_filter_select.append('<option value="' + type_array.userRoleId + '" >' + type_array.type + '</option>');
                count = count + 1;
                first_userRoleId = type_array.userRoleId;
                first_type = type_array.type;
            });

            if (count > 1) {
                type_filter_select.show();
                type_single.hide();
            }
            else {
                type_filter_select.val(first_userRoleId).hide();
                type_single.html(first_type).show();
                management_button.show();
            }

            type_filter_select.unbind('change').change(function () {
                if ($(this).val() == '') {
                    management_button.hide();
                }
                else {
                    management_button.show();
                }
            });
            type_filter_select_holder.show();

        }


        function generateUserData() {
            $.ajax({
                url: '/retrieve_cdx_user_data',
                success: function (json) {
                    var parsed_json = $.parseJSON(json);
                    console.log(parsed_json);
                    if (!parsed_json.error) {
                        console.log(parsed_json);
                        var org_to_roles = parsed_json.organizations_to_roles;
                        //initialize filters object
                        var org_filter_select_holder = $('#fmw-organization-select-holder');
                        var org_filter_select = $('#fmw-organization-select');
                        var org_single = $('#fmw-org-single');
                        var orgs_num = org_to_roles.length;
                        var management_button = $('#launch-facility-management');

                        var type_filter_select_holder = $('#fmw-type-select-holder');

                        var program_filter_select_holder = $('#fmw-program-select-holder');


                        // First connect to widget initially to start CDX session;
                        var temp = 0;
                        $.each(org_to_roles, function (org_id, role_object) {
                            $.each(role_object.roles, function (dataflow, role_array) {
                                if (temp == 0) {
                                    var initial_user_role_id = role_array[0].userRoleId;
                                    updateWidget(initial_user_role_id, naas_token, naas_ip);
                                    temp = 1;
                                }
                            });
                        });

                        org_filter_select.append('<option value="">Select an Organization</option>');
                        $.each(org_to_roles, function (org_id, org_obj) {
                            org_filter_select.append('<option value="' + org_id + '" >' + org_obj.name + '</option>');
                        });

                        org_filter_select.change(function () {
                            var selected_org = $(this).val();
                                program_filter_select_holder.hide()
                                type_filter_select_holder.hide();
                                management_button.hide();
                                if (selected_org != '') {
                                    createProgramSelect(org_to_roles[selected_org].roles);
                                }
                        });

                    }
                    else {
                        alert('unable to recieve user data');
                    }

                    management_button.click(function () {
                        var user_role_id = $('#fmw-type-select').val();
                        updateWidget(user_role_id, naas_token, naas_ip);
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
                title: 'My Facility Manager',
                modal: true,
                autoOpen: false,
                width: 'auto',
                height: 'auto',
                maxWidth: '1000px',
                minWidth: '1000px',
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
            success: function (json) {
                var configs = $.parseJSON(json);
                cdx_resource_url = configs.url;
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
                onInvalidSession: function () {
                    alert('CDX Session ended.');
                    window.location.href = '/user/logout';
                },
                onServiceCall: function () {
                    cdx_facility_management_block.dialog("option", "position", {
                        my: "center",
                        at: "center",
                        of: window
                    });
                }
            });
            //cdx_facility_management_block.dialog("option", "position", {my: "center", at: "center", of: window});

        }

        generateUserData();
    });
})
(jQuery);
