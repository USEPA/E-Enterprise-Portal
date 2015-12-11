(function($) {




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
        var $preview = $('#new-state-url-preview');
        if ($preview.length > 0) {
            var $url_input = $('#edit-field-source-url-und-0-value');
            if ($url_input.val() == '') {
                $preview.hide();
            }

            $url_input.change(function () {
                if ($.trim($url_input.val()) != '') {
                    $preview.show();
                }
                else {
                    $preview.hide();
                }
            });

            $preview.click(function () {
                var href = $url_input.val();
                var htt = href.split(':')[0];
                if (htt == 'https') {
                    openDialog(href);
                }
                else {
                    window.open(
                        href,
                        '_blank');// <- This is what makes it open in a new window.
                }
            });
        }
    });



}(jQuery));