(function ($) {

    $(document).ready(function () {
        // Chris user_role_id 80172
        var user_role_id = 86357; //user role id for Green olive
        var naas_token;// = 'Mary Cheat Token - FIX ASAP!!!!!!';
        var naas_ip;// = '65.248.159.78';

        $.ajax({
            url: '/return_cdx_facility_management_token',
            success: function (json) {
                console.log(json);
                var parsed_json = $.parseJSON(json);
                naas_token = parsed_json.token;
                naas_ip = parsed_json.server_ip;
            }
        });

        $.ajax({
            url: '/retrieve_cdx_user_data',
            success: function (json) {
                var parsed_json = $.parseJSON(json);
                console.log(parsed_json);
                var organizations = parsed_json.organizations;
                var orgs_to_roles = parsed_json.organizations_to_roles;
                $('#fmw-organization-select').html('');
                $.each(organizations, function (key, value) {
                    $('#fmw-organization-select').append('<option value="' + value.userOrganizationId + '" >' + value.organizationName + '</option>');
                });
                $('#fmw-organization-select').change(function () {
                    var roles = orgs_to_roles[$(this).val()];
                    $('#fmw-program-select').html('');
                        $.each(roles, function (index, value) {
                            $('#fmw-program-select').append('<option value="' + value.userRoleId + '">' + value.dataflow + '</option>');
                        });
                });
                $('#fmw-program-select').change(function() {
                    var selected_user_role_id = $(this).val();
                    updateWidget(selected_user_role_id, naas_token, naas_ip);
                });
                $('#fmw-organization-select').trigger('change');
            }
        });

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

        $('#view-facility-iframe').click(function () {
            cdx_facility_management_block.dialog('open');
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


    });
})(jQuery);
