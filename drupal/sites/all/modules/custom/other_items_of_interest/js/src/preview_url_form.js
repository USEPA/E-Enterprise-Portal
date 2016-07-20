(function($) {

    function openDialog(url) {
        var iframe = $('<iframe class="modal-iframe" src="' + url + '"  class="modal-iframe" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
        var dialog = $("<div></div>").append(iframe).appendTo("body").dialog({
            autoOpen: true,
            modal: true,
						dialogClass: 'other-items-form',                        
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

    function validateAndPreviewURL(url) {
        $field_description = $('#edit-field-source-url .description');
        // reg ex for url with http or https
        var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
        var regex = new RegExp(expression);
        if (url.match(regex) )
        {
            $field_description.text('Website address for resource.').removeClass('error');
            var htt = url.split(':')[0];
                        if (htt == 'https') {
                            openDialog(url);
                        }
                        else {
                            window.open(
                                url,
                                '_blank');// <- This is what makes it open in a new window.
                        }
        } else {
            $field_description.text('Invalid Web URL (include http or https prefix).').addClass('error');
        }
    }

    $(document).ready(function() {
        var $preview = $('#new-state-url-preview');
        if ($preview.length > 0) {
            var $url_input = $('#edit-field-source-url-und-0-value');
            $preview.click(function (e) {
                //first validate url
                var href = $url_input.val();
                validateAndPreviewURL(href);
                // Stop screen from scrolling up
                e.preventDefault();
            });
        }
    });



}(jQuery));