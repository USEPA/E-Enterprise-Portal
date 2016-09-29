(function($) {

  Drupal.behaviors.widgetRefreshByAjax = {
    attach: function (context) {
      $('body').once('widget-refresh-by-ajax', function () {
        $('#gridstack-pane-views-to_do-block_1, #gridstack-pane-views-progress_tracker-block_1').on('click', 'a.refresh', function(ev) {
          console.log('do not load link, perform ajax instead');
          var $refreshLink = $(this);
          $refreshLink.after('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');

          // 'todo/refresh' calls refresh_todo_list() in eenterprise_bridge_auth.pages.inc
          $.get('todo/refresh', function() {
            console.log('ajax complete, refresh the ctools forms to refresh the view');
            $refreshLink.parent().find('.ctools-auto-submit-click').click();
            $refreshLink.next('div.ajax-progress.ajax-progress-throbber').remove();
          });
          return false;
        });
      });
    }
  };

  // @see http://stackoverflow.com/questions/5641798/load-javascript-after-page-is-fully-rendered
  $(window).load(function() {
    $('#gridstack-pane-views-to_do-block_1').find('a.refresh').click();
    $('#gridstack-pane-views-progress_tracker-block_1').find('a.refresh').click();
  });
})(jQuery);
