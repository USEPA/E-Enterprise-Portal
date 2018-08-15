/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

    'use strict';

    Drupal.behaviors.bootstrap_barrio_subtheme = {
        attach: function(context, settings) {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 50) {
                    $('body').addClass("scrolled");
                } else {
                    $('body').removeClass("scrolled");
                }
            });

        }
    };

})(jQuery, Drupal);