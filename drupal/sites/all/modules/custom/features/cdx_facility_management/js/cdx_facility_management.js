(function ($) {

    $(document).ready( function() {
        // Chris user_role_id 80172
        var role_id = 80172;
        var naas_token = 'Mary Cheat Token - FIX ASAP!!!!!!';
        var naas_ip = '65.248.159.78';

        //$.ajax({
        //    url: '/frs_naas_autentication?json=true',
        //    success: function(json) {
        //        console.log(json);
        //        var parsed_json = $.parseJSON(json);
        //        naas_token = parsed_json.token;
        //        naas_ip = parsed_json.ip;
        //        updateWidget(role_id, naas_token, naas_ip);
        //    }
        //});
        var cdx_facility_management_block = $('#facility-widget');
        if (cdx_facility_management_block.length > 0) {
            cdx_facility_management_block.dialog({
                //title: '<span>Getting Started</span>What matters to you?',
                modal: true,
                autoOpen: false,
                width: 'auto',
                height: 'auto',
                maxWidth: 1400,
                minWidth: '1400px',
                dialogClass: 'cdx_facility_management_block',
                resizable: false,
                position: { my: "center", at: "center", of: window }
            });

        }

        $('body').on('click', '#facility-widget input, #facility-widget a, #facility-widget button, #facility-widget .ui-accordion-header', function() {
            cdx_facility_management_block.dialog( "option", "position", { my: "center", at: "center", of: window } );
        });

        $('#view-facility-iframe').click( function() {
            cdx_facility_management_block.dialog('open');
        });

        $(window).resize(function(){
            cdx_facility_management_block.dialog( "option", "position", { my: "center", at: "center", of: window } );
        });
        //$(window).scroll(function(){
        //    cdx_facility_management_block.dialog( "option", "position", { my: "center", at: "center", of: window } );
        //});
        updateWidget(role_id, naas_token, naas_ip);

        function updateWidget(role_id, naas_token, naas_ip) {
            $('#facility-widget').html('');
            $.initFacilityManagementWidget({
                autoScroll: false,
                widgetDisplayType: "Edit My Facilities",
                baseServiceUrl: 'https://dev.epacdx.net/FrsPhase2',
                ImagesFolderPath: "https://dev.epacdx.net/FrsPhase2/content/v3/FRS%20Widget/images", //static
                // Hard coded to Chris' CEDRI role currently. Have to find user CDX role ID's and pass one at a time here on selection.
                userRoleId: role_id,
                NASSToken: naas_token,
                NAASip: naas_ip
            });
        }


    });
})(jQuery);
