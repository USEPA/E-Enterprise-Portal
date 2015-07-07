(function ($) {
  Drupal.behaviors.qtip_webform = {
    attach: function (context, settings) {
      /*
        form-text - works well
          Includes: textfield, email, number
        form-textarea - works, but width can throw off the tooltip
        form-select - works pretty well - overriding to use mouseenter and mouseleave for usability
      */

      // Elements where description is a sibling to the selected element
      $('.form-text.qtip-webform-description,' +
        '.form-select.qtip-webform-description').each(function() {
        description = $(this).siblings('.description');
        description.css('display', 'none');

        build_qtip(this, description.html());
      });

      // Elements where description is a sibling to the PARENT of the selected element
      $('.form-textarea.qtip-webform-description').each(function() {
        description = $(this).parent().siblings('.description');
        description.css('display', 'none');

        build_qtip(this, description.html());
      });

      // Elements that have custom text to display
      $('.qtip-webform-custom-text').each(function() {
        tooltip_title = false;

        build_qtip(this, $(this).data('qtip-webform-text'));
      });

      // If the administrator enabled the option to show qTip on empty required fields
      if (settings.qtip_webform.configure.required) {
        // Get all fields that are required
        $('.required').each(function() {
          // Set a variable that is set per element
          var api = "";
          $(this).blur(function() {
            // If the field (element) is empty
            if ($(this).val().length == 0) {
              // Generate the qtip - function returns the api object
              api = build_qtip_required($(this));
              // Show the qTip via the api since blur can't be used because that has already happened by the time to qTip has been built
              api.show();
            }
            else {
              // Check first to see if api has been set to prevent an error being thrown
              if (api) {
                // Since the field is not empty now, but was previously, destroy the associated qTip
                api.destroy();
              }
            }
          });
          $(this).focus(function() {
            // Check first to see if api has been set to prevent an error being thrown
            if (api) {
              // Since the field is not empty now, but was previously, destroy the associated qTip
              api.destroy();
            }
          });
        });
      }

      function build_qtip(el, desc) {
        var tooltip_text = desc ? desc : '';
        // By default, the description text is wrapped inside <p>
        // Since we are putting this in a tooltip we want to remove this
        // and any other tags that might possibly get set
        tooltip_text = tooltip_text.replace(/(<.*?>)/ig, "");
        // set_my = 'left center';
        // set_at = 'right center';

        var tooltip_instance = (settings.qtip_webform.configure.instance != undefined) ? settings.qtip_webform.configure.instance : 'default';
        var styles = $.parseJSON(settings.instances);
        var tooltip_settings = (styles[tooltip_instance] != undefined) ? styles[tooltip_instance] : '';

        if (tooltip_settings) {
          tooltip_settings['content'] = {
            // title: tooltip_title,
            text: tooltip_text,
          };
        }
        else {
          tooltip_settings = {
            content: {
              // title: tooltip_title,
              text: tooltip_text,
            }
          }
        }

        // For usability display the qTip on <select> elements on hover always
        if ($(el).hasClass('form-select')) {
          tooltip_settings['show']['event'] = 'mouseenter';
          tooltip_settings['hide']['event'] = 'mouseleave';
        }

        // Always have a focus show event for keyboard users using tab
        if (tooltip_settings['show']['event'] == 'mouseenter ') {
          tooltip_settings['show']['event'] += 'focus';
        }
        if (tooltip_settings['hide']['event'] == 'mouseleave ') {
          tooltip_settings['hide']['event'] += 'blur';
        }

        $(el).qtip(tooltip_settings);

        $(el).removeData('qtip'); // @see: http://nirodhasoftware.com/site/how-do-i-get-multiple-tooltips-using-qtip2/
      }

      function build_qtip_required(el) {
        var tooltip_text = (settings.qtip_webform.configure.required_text != '') ? settings.qtip_webform.configure.required_text : 'This field is required!';

        var tooltip_instance = (settings.qtip_webform.configure.required_instance != undefined) ? settings.qtip_webform.configure.required_instance : 'default';
        var styles = $.parseJSON(settings.instances);
        var tooltip_settings = (styles[tooltip_instance] != undefined) ? styles[tooltip_instance] : '';

        if (tooltip_settings) {
          tooltip_settings['content'] = {
            // title: tooltip_title,
            text: tooltip_text,
          };
        }
        else {
          tooltip_settings = {
            content: {
              // title: tooltip_title,
              text: tooltip_text,
            }
          }
        }

        // Override show and hide objects since this effect needs to be handles differently than normal
        delete tooltip_settings['show'];
        tooltip_settings['hide'] = {
          event: false,
        }

        var tooltip = $(el).qtip(tooltip_settings);
        var api = tooltip.qtip('api');
        return api;

        // var tooltip = $(el).qtip({
        //   content: {
        //     text: show_text,
        //   },
        //   position: {
        //     my: set_my, // my = speech bubble position on tooltip
        //     at: set_at, // at = where on link text tooltip will appear
        //   },
        //   style: {
        //     classes: 'qtip-red',
        //   },
        //   hide: {
        //     event: false,
        //   },
        // });

      }

    }
  };
})(jQuery);
