(function($) {

  Drupal.behaviors.widgetRefreshByAjax = {
    attach: function (context) {
      $('body').once('widget-refresh-by-ajax', function () {
        $('#gridstack-pane-views-to_do-block_1, #gridstack-pane-views-progress_tracker-block_1').on('click', 'a.refresh', function(ev) {
          var $refreshLink = $(this);
          $refreshLink.parent().addClass('loading')
          $refreshLink.after('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div> Refreshing...</div>');

          // 'todo/refresh' calls refresh_todo_list() in eenterprise_bridge_auth.pages.inc
          $.get('todo/refresh', function() {
            $refreshLink.parent().triggerHandler('RefreshView');
            $refreshLink.next('div.ajax-progress.ajax-progress-throbber').remove();
          });
          return false;
        });
      });
    }
  };

  // @see http://stackoverflow.com/questions/5641798/load-javascript-after-page-is-fully-rendered
  $(window).load(function() {
    // only perform an initial refresh if we have never done this before (e.g.: after logging in, but NOT after refreshing the page)
    if (!(Drupal.settings.eactivity_dataflow.todo_refresh_count > 0)) {
      // TODO: hide using CSS?
      $('#gridstack-pane-views-to_do-block_1').find('div.view').first().addClass('loading');
      $('#gridstack-pane-views-progress_tracker-block_1').find('div.view').first().addClass('loading');

      $('#gridstack-pane-views-to_do-block_1').find('a.refresh').click();
      $('#gridstack-pane-views-progress_tracker-block_1').find('a.refresh').click();
    }
  });
})(jQuery);
