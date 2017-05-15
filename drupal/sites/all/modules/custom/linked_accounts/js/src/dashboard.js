/**
 * Created by bmatkin on 5/8/2017.
 */

/**
 * Generates and submits form based on user credentials
 */
function performHandoff() {
    var $ = jQuery;
    $.ajax({
        url:'/scs/handoff',
        type: 'JSON',
        success: function(handoff_data) {
            var $form = $('<form style="display:none" action="' + handoff_data['handoff_url'] + '" method="POST"></form>');
            $form.append('<input name="SCS_DATA" value="' + handoff_data['ip'] + '"/>');
            $form.append('<input name="token" value="'+ handoff_data['token'] +'"/>');
            $form.append('<input name="theme" value="demo"/>');
            $form.appendTo('body').submit();
        }
    })

}

(function ($) {

var links = $.get(window.location.href + "/links");

    links.done(function(links_return) {
        var $link_holder = $('#dashboard-links');
        if (links_return.links.length > 0) {
            $link_holder.html('');
            $.each(links_return.links, function (k, o) {
                $link_holder.append('<div ><a id="' + o.id + '" href="' + o.url + '">' + o.name + '</a></div>');
            });
        }
    })

    $('body').on('click', '#scs_handoff', function(e){
        e.preventDefault();
        performHandoff();
    });

})(jQuery)