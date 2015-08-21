(function ($) {

    $(document).ready( function() {

        var cdx_facility_management_block = $('#facility-widget');
        if (cdx_facility_management_block.length > 0) {
            cdx_facility_management_block.dialog({
                title: 'CDX Facility Management',
                modal: true,
                autoOpen: false,
                width: 'auto',
                height: 'auto',
                dialogClass: 'cdx_facility_management_block',
                resizable: false
            });
        }

        $('#view-facility-iframe').click( function() {
            cdx_facility_management_block.dialog('open');
        });

        $(window).resize(function(){
            cdx_facility_management_block.dialog( "option", "position", { my: "center", at: "center", of: window } );
        });
        $(window).scroll(function(){
            cdx_facility_management_block.dialog( "option", "position", { my: "center", at: "center", of: window } );
        });

    });
})(jQuery);
