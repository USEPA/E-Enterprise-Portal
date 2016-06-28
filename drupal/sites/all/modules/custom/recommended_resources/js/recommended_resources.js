var favorite_local_resources_table, all_local_resources_table;
var pane_class = ".pane-views-recommended-resources-block";
var manage_components_title = "Manage my Topics";

(function ($) {
  var $localResourcesTabs = $('#local-resources-tabs');

  function showLGCResourcesView() {
    $('#user-lgc-topics-small-view').find('label').removeClass('selected');
    favorite_local_resources_table.updateTopics([]);
    favorite_local_resources_table.showTable();
    $('#manage-my-topics-wrapper').hide();
    $('.lgc-header').text('');
    $('.back-to-lgc-widget').hide();
    $('.unfollow-lgc-topic').hide();
    $localResourcesTabs.show();
    $(pane_class).find('.pane-title').show();
    $(pane_class).find('.ui-tabs-nav').show();
  }


  /**
   * Loads manage topics view via an ajax request
   */
  function loadManageTopicsView() {
    $.ajax({
      url: "manage_my_topics/load_view",
      beforeSend: function () {
        $localResourcesTabs.hide();
        $(pane_class).find('.pane-title').hide();
        $('.unfollow-lgc-topic').hide();
        $('.back-to-lgc-widget').show();
        $('.lgc-header').text(manage_components_title).show();
        $('#manage-my-topics-wrapper').html('Loading...').show();
      },
      success: function (html_view) {
        $('#manage-my-topics-wrapper').html(html_view);
      }
    });
  }

  function showFocusedTopicView($lgc_topic_elem) {
    $lgc_topic_elem.addClass('selected');
    $(pane_class).find('.pane-title').hide();
    $(pane_class).find('.ui-tabs-nav').hide();
    var id = $lgc_topic_elem.attr('id');
    var title = $lgc_topic_elem.text();
    var tid_array = id.split('-');
    var tid = tid_array[tid_array.length - 1];
    $('.lgc-header').text(title);
    $('.back-to-lgc-widget').show();
    $('.unfollow-lgc-topic').attr('id', 'unfollow-lgc-' + tid).show();
    favorite_local_resources_table.filterTopics(title);
  }


  $(document).ready(function () {
    var $body = $('body');
    var guest_user = Drupal.settings.is_guest;

    all_local_resources_table = new LocalResourcesTable($("#all-local-resources"), 'generateAllLocalResourcesTable');
    // Guest user can only view all the content, so they do not have tabs
    if (!guest_user) {
      favorite_local_resources_table = new LocalResourcesTable($("#user-local-resources"), 'generateUserLocalResourcesTable');

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
        all_local_resources_table.showTable();
        favorite_local_resources_table.ajax_request();
      }
      else {
        all_local_resources_table.showTable();
      }
    }

    $(document).on('ee:first_time_user_complete', function () {
      first_time_user_loading = false;
      if (!guest_user) {
        all_local_resources_table.showTable();
        favorite_local_resources_table.ajax_request();
      }
      else {
        all_local_resources_table.showTable();
      }
    });

    $body.on('click', '#user-lgc-topics-small-view label', function () {
      showFocusedTopicView($(this));
    });

    $body.on('click', '#user-lgc-topics-small-view .grid-selector, #add-more-topics', function () {
      loadManageTopicsView();
    });

    $body.on('click', '.back-to-lgc-widget a, .back-to-lgc-widget .left-arrow',
      function () {
        showLGCResourcesView();
      });

    $body.on('click', '#restrict-to-local-resources-button', function () {
      updateDropdown($('#user-lgc-topics-small-view'));
    });

    // Toggle sidebar expanded / collapsed view
    $body.on('click', '#local-resources-tabs .faceted-filters .toggle', function() {
      var $localResources = $(this).parents('.local.resources');
      var expandedWidth = parseInt($localResources.width() * 0.65);
      $localResources.find('.faceted-filters').toggle();

      // expose/remove extra columns, resize, and redraw datetable
      var $table = $localResources.find('table');
      var datatable = $table.DataTable();
      $table.width('auto'); // needed since datatables manipulates inline styles
      if ($(this).parent().hasClass('on')) {
        $localResources.find('.your-selections, .dataTables_wrapper').width('auto');
        datatable.columns([3, 4]).visible(true, false);
      } else {
        // apparently using CSS - width: 65%; - is no good
        $localResources.find('.your-selections, .dataTables_wrapper').width(expandedWidth);
        datatable.columns([3, 4]).visible(false, false);
      }
      datatable.columns.adjust().draw(false); // adjust column sizing and redraw
    });

    // Toggle facet expanded / collapsed view
    $body.on('click', '#local-resources-tabs h3', function() {
      $(this).next().toggle();
      $(this).find('span').toggleClass('on off');
    });

    // Set default width for Your Selections
    // apparently using CSS - width: 65%; - is no good
    $localResourcesTabs.find('.your-selections').width(parseInt($localResourcesTabs.width() * 0.65));
  });
}(jQuery));