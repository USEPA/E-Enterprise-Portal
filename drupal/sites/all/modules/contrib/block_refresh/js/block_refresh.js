(function($) {
  Drupal.behaviors.block_refresh = {
    attach: function(context) {
      $.each(Drupal.settings.block_refresh.settings, function(key, settings) {
        var element = settings.element;
        setBlockRefresh('#' + element, '.content', settings['auto'], settings['manual'], settings['init'], settings['timer'], settings['arguments'], settings['block']['block'], settings['block']['delta'], false);

        if (settings['panels']) {
          element = element.replace('block-', 'pane-');
          // Views blocks in panels need special treatment.
          // eg an element '#block-views-now-playing-block'
          // will be rendered as .pane-views.pane-now-playing
          if (element.search('-views-')) {
            element = element.replace('-block' , '');
            element = element.replace('-views-' , '-views.pane-');
          }
          setBlockRefresh('.' + element, '.pane-content', settings['auto'], settings['manual'], settings['init'], settings['timer'], settings['arguments'], settings['block']['block'], settings['block']['delta'], true);
        }
      });

      function setBlockRefresh(element, element_content, auto, manual, init, timer, arguments, block, delta, panels) {
        // Do not bother if no element exists or has already been processed.
        if (!$(element).length || $(element).hasClass('block-refresh-processed')) {
          return;
        }

        $(element).addClass('block-refresh-processed');

        //Get argument from referring page and append to end of load request
        args = '';
        query = '';
        if (arguments) {
          $.each(Drupal.settings.block_refresh.args, function(index, arg) {
            args += '/' + arg;
          });
          query = Drupal.settings.block_refresh.query;
        }
        var path = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'block_refresh/' + block + '/' + delta + args + query;
        if (auto && context == document) {
          setInterval(function() {
            BlockRefreshContent(path, element, element_content, panels);
          }, timer * 1000); // We need to multiply by 1000 because the admin enters a number in seconds,  but the setInterval() function expects milliseconds
        }
        if (manual) {
          addBlockRefreshButton(element, element_content);
        }
        if (init && context == document) {
          BlockRefreshContent(path, element, element_content, panels);
        }

        $('.block-refresh-button').click(function() {
          $(this).addClass('block-refresh-button-throbbing');
          BlockRefreshContent(path, element, element_content, panels);
        });
      }

      function addBlockRefreshButton(element, element_content) {
        var refresh_link = '<div class="block-refresh-button">' + Drupal.t('Refresh') + '</div>';
        // We'll attach the refresh link to the header if it exists...
        if ($(element + ' h2').length) {
          $(element + ' h2').before(refresh_link);
        }
        // ...otherwise we will attach it to the content
        else {
          $(element + ' ' + element_content).before(refresh_link);
        }
      }

      function BlockRefreshContent(path, element, element_content, panels) {
        $.get(path, function(data) {
          var contents = $(data).html();
          // if this is a panel, preserve panel title.
          var oldh2 = $(element + ' h2.pane-title');
          $(element).html(contents);
          if (panels) {
            if (oldh2.length) {
              $(element + ' h2:first-child').replaceWith(oldh2);
            }
            else {
              $(element + ' h2:first-child').remove();
            }
            //panels renders block content in a 'pane-content' wrapper.
            $(element + ' .content').removeClass('content').addClass('pane-content');
          }
          $(element).removeClass('block-refresh-processed');
          Drupal.attachBehaviors(this);
        });
      }
    }
  };
})(jQuery);
