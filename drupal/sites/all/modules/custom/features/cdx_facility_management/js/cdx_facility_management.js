(function ($) {

    $(document).ready( function() {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.8;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.8;

        $('#view-facility-iframe').click(function () {
            var iframe = $('<span class="ui-helper-hidden-accessible"><input type="text"/></span><iframe class="WMAiframe" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
            //var iframeFooter = $("<div id='mapiFrameFooter' class='mapiFrameFooter'>Map Source: " + WMAorgalias + " - <a href='mailto:" + contactEmail + "'>Contact Map Owner</a> </div>");
            var dialog = $("<div id='mapiFrame' class='mapiFrame'></div>").append(iframe).appendTo("body").dialog({  //.append(iframeFooter).appendTo("body").dialog({
                autoOpen: false,
                modal: true,
                resizable: false,
                width: dWidth,
                height: dHeight,
                dialogClass: 'mapDialog',
                close: function () {
                    iframe.attr("src", "");
                },
                //workaround for using jQ UI and Bootstrap - close button won't show up in top right of dialog
                open: function () {
                    var closeBtn = $('.ui-dialog-titlebar-close');
                    //closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
                }
            });

            var src = '/cdx_facility_management_iframe';
            iframe.attr({
                width: '100%',
                height: '100%',
                src: src
            });
            console.log(dialog);
            dialog.dialog("open");
        });
    });
})(jQuery);