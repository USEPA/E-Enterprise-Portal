(function($) {



    function previewButton(elem) {
        var url = elem.text();
        var htt = url.split(':')[0];
        var button = $("<button class='preview_button'>Preview</button>");
        button.click(function() {
            if (htt == 'https') {
                openDialog(url);
            }
            else {
                window.open(
                   url,
                    '_blank' // <- This is what makes it open in a new window.
                );

            }
        });
        return button;

    }

    function openDialog(url) {
        var iframe = $('<iframe class="modal-iframe" src="' + url + '"  class="modal-iframe" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
        var dialog = $("<div></div>").append(iframe).appendTo("body").dialog({
            autoOpen: true,
            modal: true,
            resizable: false,
            width: "90%",
            height: "90%",
            position: {
                    my: "center",
                    at: "center",
                    of: window
            },
            close: function () {
                iframe.attr("src", "");
                $(this).dialog("destroy").remove();
            }
        });

    }

    $(document).ready(function() {
        var $urls = $('td.views-field.views-field-field-source-url a');
        $.each($urls, function() {
                var _this = $(this);
            $(this).qtip({ // Grab some elements to apply the tooltip to
                content: {
                    text: previewButton(_this)
                },
              //  content: $('<iframe class="preview-iframe" src="'+ _this.text() + '" />'),

                hide: {
                    fixed: true,
                    delay: 300
                },
            //    show: true,
                position: {
                    my: 'left center',  // Position my top left...
                    at: 'right center', // at the bottom right of...
                    target: $(this) // my target
                },
                style: {
                    classes: 'transparent-qtip',
                    width: "auto"
                }
            });

        });

    });


}(jQuery));