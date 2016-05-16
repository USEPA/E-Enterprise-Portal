(function ($) {

    var cdx_facility_management_block;
    var widget_updating = false;
    var must_update_widget = false;
    var user_role_waiting;

    // Look up functionality for session expiring. On expired session, recreate token, reinitialize widget.
    function createNewToken() {
        var token_data = {};
        $.ajax({
            url: '/return_cdx_facility_management_token',
            async: false,
            success: function (json) {
                var parsed_json = $.parseJSON(json);
                if (parsed_json.expired) {
                    token_data.expired = true;
                }
                else {
                    token_data.token = parsed_json.token;
                    token_data.expired = false;
                    token_data.ip = parsed_json.server_ip;
                    token_data.url = parsed_json.url;
                    token_data.user_session_logout = parsed_json.user_session_logout;
                    token_data.user_login_time = parsed_json.user_login_time;
                }
            }
        });
        // Set global naas token instance
        return token_data;
    }


    function createProgramSelect(roles_obj) {
        var program_filter_select = $('#fmw-program-select');
        var program_filter_select_holder = $('#fmw-program-select-holder');
        var program_single = $('#fmw-program-single');
        var type_filter_select_holder = $('#fmw-type-select-holder');
        var management_button = $('#launch-facility-management');

        var first_name;
        var count = 0;
        program_filter_select.html('<option value="">Select&hellip;</option>');
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
                if (!parsed_json.error) {
                    var org_to_roles = parsed_json.organizations_to_roles;
                    if (org_to_roles.length == 0) {
                        // User does not manage any facilities
                        var zero_facilities_msg = "<p>You do not have any facilities to manage in CDX through this widget at this time.</p>";
                        $('#fmw-organization-select-holder').html(zero_facilities_msg);
                    }
                    else {

                        //initialize filters object
                        var org_filter_select_holder = $('#fmw-organization-select-holder');
                        var org_filter_select = $('#fmw-organization-select');
                        var org_single = $('#fmw-organization-single');
                        var management_button = $('#launch-facility-management');

                        var type_filter_select_holder = $('#fmw-type-select-holder');

                        var program_filter_select_holder = $('#fmw-program-select-holder');
                        var token_data = createNewToken();
                        if (!token_data.expired) {
                            var token = token_data.token;
                            var naas_ip = token_data.ip;
                            var resource_url = token_data.url;
                            var time_logged_in = token_data.user_login_time;
                            var time_threshold = token_data.user_session_logout;
                            // First connect to widget initially to start CDX session;
                            var temp = 0;
                            $.each(org_to_roles, function (org_id, role_object) {
                                if (role_object.roles) {
                                    $.each(role_object.roles, function (dataflow, role_array) {
                                        if (temp == 0) {
                                            var initial_user_role_id = role_array[0].userRoleId;
                                            updateWidget(initial_user_role_id, token, naas_ip, resource_url, time_logged_in, time_threshold, 0);
                                            temp = 1;
                                        }
                                    });
                                }
                            });

                            org_filter_select.append('<option value="">Select an Organization</option>');
                            var count = 0;
                            var first_org_id;
                            var first_org_name;
                            $.each(org_to_roles, function (org_id, org_obj) {
                                if (org_obj.roles) {
                                    org_filter_select.append('<option value="' + org_id + '" >' + org_obj.name + '</option>');
                                    count = count + 1;
                                    first_org_id = org_id; // unused if count > 1
                                    first_org_name = org_obj.name;
                                }
                            });

                            if (count == 1) {
                                org_filter_select.val(first_org_id).hide();
                                org_single.html(first_org_name).show();
                                createProgramSelect(org_to_roles[first_org_id].roles);
                            }
                            else {
                                org_filter_select.show();
                            }


                            org_filter_select.change(function () {
                                var selected_org = $(this).val();
                                program_filter_select_holder.hide()
                                type_filter_select_holder.hide();
                                management_button.hide();
                                if (selected_org != '') {
                                    createProgramSelect(org_to_roles[selected_org].roles);
                                }
                            });

                            management_button.click(function () {
                                var user_role_id = $('#fmw-type-select').val();
                                updateWidget(user_role_id, token, naas_ip, resource_url, time_logged_in, time_threshold, 0);
                                if ($('#facility-widget').length > 0) {
                                    cdx_facility_management_block.dialog('open');
                                }
                            });

                        }
                        else {
                            userMustLogin();
                        }
                    }
                } else {
                    console.log("CDX Error", parsed_json);
                    $('#fmw-organization-select-holder').html("Unable to receive user data.");
                }
            }
        });
    }


    function updateWidget(user_role_id, naas_token, naas_ip, resource_url, time_logged_in, time_threshold, number_attempts) {
        $('#facility-widget').html('');

        // For IE8 and below
        if (!Date.now) {
            Date.now = function () {
                return new Date().getTime();
            }
        }
        var current_time = Date.now();
        // convert php timestamp to miliseconds
        var time_logged_in_mili = time_logged_in * 1000;
        // Find time diff in minutes (millisecond * 1000 = seconds * 60 = minutes);
        var time_diff = Math.abs((current_time - time_logged_in_mili) / (60 * 1000));
        if (time_diff >= time_threshold) {
            userMustLogin();
            cdx_facility_management_block.remove();
            return;
        }

        if (widget_updating) {
            user_role_waiting = user_role_id;
            must_update_widget = true;
            return;
        }

        widget_updating = true;
        $.initFacilityManagementWidget({
            autoScroll: false,
            widgetDisplayType: "Edit My Facilities",
            baseServiceUrl: resource_url,
            ImagesFolderPath: resource_url + '/ContentFramework/FRS%20Widget/images', //static
            userRoleId: user_role_id,
            NASSToken: naas_token,
            NAASip: naas_ip,
            onInvalidSession: function () {
                var new_token_return = createNewToken();
                if (new_token_return.expired)
                    userMustLogin();
                else {
                    var new_naas_token = new_token_return.token;
                    if (new_naas_token == '')
                        unableToConnectWidget("CDX Facility- Blank Token");
                    else if (number_attempts > 2)
                        unableToConnectWidget("CDX Facility- Max attempts.");
                    else {
                        widget_updating = false;
                        updateWidget(user_role_id, new_naas_token, naas_ip, resource_url, time_logged_in, time_threshold, number_attempts + 1);
                    }
                }
            },
            onServiceCall: function () {
                cdx_facility_management_block.dialog("option", "position", {
                    my: "center",
                    at: "center",
                    of: window
                });
            },
            onWidgetDataLoaded: function() {
                widget_updating = false;
                if (must_update_widget) {
                    updateWidget(user_role_waiting, naas_token, naas_ip, resource_url, time_logged_in, time_threshold, number_attempts);
                    must_update_widget = false;
                }
            }
        });
    }

    function userMustLogin() {
        var logged_in_view = $('#cdx-logged-in-options');
        var logged_out_view = $('#cdx-logged-out-options');
        var logged_out_view_button = $('#cdx-logged-out-log-out');
        logged_in_view.remove();
        logged_out_view.show();
        logged_out_view_button.click(function () {
            window.location.href = '/user/logout';
        });
    }

    function unableToConnectWidget(error) {
        console.log(error)
        var logged_in_view = $('#cdx-logged-in-options');
        var error_view = $('#cdx-unable-to-load');
        logged_in_view.remove();
        error_view.show();
    }


    $(document).ready(function () {
        cdx_facility_management_block = $('#facility-widget');
        var first_time_user_block = $('#first-time-user-block');


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


        $(window).resize(function () {
            cdx_facility_management_block.dialog("option", "position", {my: "center", at: "center", of: window});
        });


        if (first_time_user_block.length > 0) {
            $(document).on('ee:first_time_user_complete', function () {
                generateUserData();
            });
        }
        else
            generateUserData();

    });

})
(jQuery);
