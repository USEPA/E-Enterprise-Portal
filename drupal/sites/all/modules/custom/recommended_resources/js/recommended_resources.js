(function ($) {

  /**
   * Loads manage topics view via an ajax request
   */
  function loadManageTopicsView() {
    $.ajax({
      url: "manage_my_topics/load_view",
       success: function(html_view) {
        $('.pane-views-recommended-resources-block').append(html_view);
      }
    });
  }

  $(document).ready(function () {

    var guest_user = Drupal.settings.is_guest;
    var all_local_resources_table = new LocalResourcesTable($("#all-local-resources"), 'generateAllLocalResourcesTable');

    // Guest user can only view all the content, so they do not have tabs
    if (!guest_user) {
      var favorite_local_resources_table = new LocalResourcesTable($("#user-local-resources"), 'generateUserLocalResourcesTable');
      var $tabs = $("#local-resources-tabs");
      $tabs.tabs();
    }

    // Restrict loading to after first time user preferences if applicable
    var first_time_user_loading = false;
    var first_time_user_block = $('#first-time-user-block');
    if (first_time_user_block.length > 0) {
      first_time_user_loading = true;
    }

    if (!first_time_user_loading) {
      if (!guest_user) {
        favorite_local_resources_table.showTable();
        all_local_resources_table.ajax_request();
      }
      else {
        all_local_resources_table.showTable();
      }
    }

    $(document).on('ee:first_time_user_complete', function () {
      first_time_user_loading = false;
      if (!guest_user) {
        favorite_local_resources_table.showTable();
        all_local_resources_table.ajax_request();
      }
      else {
        all_local_resources_table.showTable();
      }
    });

    $('body').on('click', '#user-lgc-topics-small-view label', function () {
      var id = $(this).attr('id');
      var tid_array = id.split('-');
      var tid = tid_array[tid_array.length - 1];
      var title = $(this).text();
      $('.lgc-header').text(title);
      $('.back-to-lgc-widget').show();
      favorite_local_resources_table.topicView(tid);
    });

    $('body').on('click', '#user-lgc-topics-small-view .grid-selector', function() {
        loadManageTopicsView();
    });


  });

}(jQuery));