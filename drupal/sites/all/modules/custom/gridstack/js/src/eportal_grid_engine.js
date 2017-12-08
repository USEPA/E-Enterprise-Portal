/**
 * Created by bmatkin on 5/4/2017.
 */
(function ($) {

  Drupal.behaviors.initializeGridstack = {
    attach: function (context) {
      $('body').once(function () {
  var previous_grid_settings;
  var cellHeight = 10;
  var verticalMargin = 10;
  var is_saving = false;
  var allowed_drag = false;


  function createGrid() {
    var serialization = GridStackUI.Utils.sort(Drupal.settings.gridstack_user_settings);
    previous_grid_settings = serialization;
    var $grid_container = $('.grid-stack');
    var options = {
      vertical_margin: verticalMargin,
      cell_height: 10,
      'data-gs-width': 2,
      draggable: { // @see jquery-ui.js:837
        cancel: 'input, textarea, button, select, option, .faceted-filters'
      }
    };


    // Set HTML elements to be registered by gridstack upon initialization
    if (!Drupal.settings.is_guest && serialization.length > 0) {
      initializeUserLayout(serialization)
    } else {
      initializeGuestLayout();
    }
    $grid_container.gridstack(options);
    $grid_container.show();
    var grid = $grid_container.data('gridstack');

    // If Serialization is empty, capture current grid state for reversion if
    // the user had no previously saved data
    if (serialization.length == 0 && !Drupal.settings.is_guest) {
      previous_grid_settings = serialized_data(grid);
    }
    var save_grid_changes = '<button id="save-grid-changes">Save Layout</button>';
    var revert_grid_changes = '<button class="usa-button-outline" id="revert-grid-changes">Cancel</button>';
    var $grid_change_options = $('<div class="grid-changes">' + save_grid_changes + revert_grid_changes + '</div>');

    $('body').prepend($grid_change_options);
    var $revert_button = $('#revert-grid-changes');
    var $save_button = $('#save-grid-changes');

    addDragListeners($grid_container, $grid_change_options);
    addSaveListeners(grid, $save_button, $revert_button);
    addResizeSensors(grid);
    grid.resizable('.grid-stack-item', false);
    if (Drupal.settings.is_guest) {
      grid.movable('.grid-stack-item', false);
    }
    $('body').trigger('grid_stack_initialized');
    $('.grid-stack-loading').removeClass('grid-stack-loading');
  }

  /**
   * Initialize User layout from saved data
   * @param serialization
   */
  function initializeUserLayout(serialization) {
    var $gridStackContent;
    $.each(serialization, function (i, obj) {
      $gridStackContent = $('#' + obj.id);
      $gridStackContent.parent().attr({
          'data-gs-x': obj.x,
          'data-gs-y': obj.y,
          'data-gs-width': 1,
          'data-gs-height': 15
        }
      );
    });
  }

  /**
   * Initialize Guest layout based off of evenly spaced grid
   */
  function initializeGuestLayout() {
    var count = 0, x, y;
    $(".grid-stack-item").each(function () {
      x = count % 2;
      y = Math.floor(count / 2) * 60;
      $(this).attr({
        'data-gs-x': x,
        'data-gs-y': y,
        'data-gs-width': 1,
        'data-gs-height': 15
      });
      count++;
    });
  }

  function addDragListeners($grid_container, $grid_change_options) {
    $('body').on('swapped_grid', function () {
      $grid_change_options.show();
    });
  }

  function rebuildSkipLinks(serializedWidgets) {
    // rebuild the skip links
    for (var i = 0; i < (serializedWidgets.length - 1); i++) {
      // all widgets except for the last one point to 'next'
      setSkipLink($('#' + serializedWidgets[i].id), $('#' + serializedWidgets[i + 1].id));
    }
    // the last widget points to 'first'
    var lastWidget = serializedWidgets[serializedWidgets.length - 1];
    setSkipLink($('#' + lastWidget.id), $('#' + serializedWidgets[0].id));
  }

  // override what gets tabbed as the first widget
  $('.grid-stack').parents('.main-content').prevAll().find('a').last().keydown(function (e) {
    if (e.which === 9 && !e.shiftKey) { // tab key
      e.stopImmediatePropagation();
      $('#' + sortedWidgets()[0].id + ' h2').focus();
    }
  });

  // @see https://github.com/troolee/gridstack.js/blob/master/README.md#save-grid-to-array
  function sortedWidgets() {
    var widgets = _.map($('.grid-stack .grid-stack-item').not('.grid-stack-placeholder'), function (el, key) {
      var el = $(el);
      // if no id has been set, set the id, e.g.: grid-item-my-facility-manager-2
      if (!el.attr('id')) {
        el.attr('id', 'grid-item-' + key);
      }
      var node = el.data('_gridstack_node');
      return {
        id: el.attr('id'),
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height
      };
    });

    return GridStackUI.Utils.sort(widgets);
  }

  function setSkipLink(sourceWidget, destinationWidget) {
    var skipTitle = $.trim($(destinationWidget).find('h2').text());
    $(sourceWidget).find('a.skip-widget').remove();
    $(sourceWidget).find('h2').after($('<a>', {
      'class': 'skip-widget element-invisible element-focusable',
      'text': 'Skip to ' + skipTitle + ' widget',
      'href': '#',
      'next-widget': $(destinationWidget).attr('id'),
      // @see http://stackoverflow.com/questions/11144653/a-script-links-without-href (A dud href)
      'role': 'button'
    }));
  }

  function addSaveListeners(grid, $save_button, $revert_button) {
    $save_button.click(function (e) {
      if (is_saving) {
        e.preventDefault();
      }
      else {
        // Save changes
        var data = serialized_data(grid);
        updateUserIndices(data, $save_button, $revert_button);
      }
    });
    $revert_button.click(function () {
      // Revert changes
      revertIndices(grid, previous_grid_settings);
      $(".grid-changes").fadeOut();
    });
  }

  /**
   * Grab updated grid heights with dynamic
   * ids based on x and y postions on the grid
   * @param grid_nodes
   * @returns {{}}
   */
  function calculateGridHeights(grid_nodes) {
    var grid_heights = {};
    jQuery.each(grid_nodes, function () {
      var $pane_content = this.el.find('.pane-content');
      if ($pane_content.length > 0) {
        var id = this.x + '_' + this.y;
        grid_heights[id] = $pane_content.height();
      }
    });
    return grid_heights;
  }

  /**
   * Every second check if there has been a grid item
   * that has resized. Do not run if an element is being dragged
   * Checks for .grid-stack-content with children .pane-content
   * @param gs_object
   */
  function addResizeSensors(gs_object) {
    // Initialize cache of grid heights
    var grid_heights = {};
    var nodes = gs_object.grid.nodes;
    var $draggingGrid = jQuery('.grid-stack .ui-draggable-dragging');
    setInterval(function () {
      // Only resize if not dragging component
      if ($draggingGrid.length <= 0) {
        // Check if grid content heights have changed
        for (var i = 0; i < nodes.length; i++) {
          var $elem = nodes[i].el;
          var id = nodes[i].x + '_' + nodes[i].y;
          var $pane_content = $elem.find('.pane-content');
          if ($pane_content.length > 0) {
            if (!grid_heights[id] || $pane_content.height() != grid_heights[id]) {
              resizeCallback(gs_object, $(nodes[i].el));
              // Update cached height of content
              grid_heights[id] = $pane_content.height();
            }
          }
        }
      }
    }, 1000)
  }

  function resizeCallback(grid, $elementToResize) {
    $(document).trigger("eportal-grid-engine:element-resize", [grid, $elementToResize]);
    recalculateWidgetHeights(grid, $elementToResize);
          rebuildSkipLinks(sortedWidgets());
  }

  function recalculateWidgetHeights(grid, $elementToResize) {
    var contentHeight = $elementToResize.find('.pane-title').outerHeight(true)
      + Math.ceil($elementToResize.find('.pane-content').outerHeight(true))
      + 30
      + verticalMargin;

    var $pager = $elementToResize.find('.pager');
    if ($pager.size() > 0) {
      contentHeight += parseInt($pager.css('marginBottom'));
    }

    var gsHeight = Math.ceil(contentHeight / (10 + verticalMargin));
    grid.resize($elementToResize, null, gsHeight);
  }

  function revertIndices(grid, serialization) {
    $.each(serialization, function (key, pane_data) {
      var $grid_item = $("#" + pane_data.id).parent();
      var x = pane_data.x;
      var y = pane_data.y;
      var width = 1;
      var height = 1;
      grid.update($grid_item, x, y, width, height);
    });
  }


  function updateUserIndices(grid_data, $save_button, $revert_button) {
    $.ajax({
      url: 'update_user_gridstack_data',
      data: {grid_data: grid_data},
      method: "POST",
      beforeSend: function () {
        $save_button.html('Saving Changes <i class="fa fa-spinner fa-pulse"></i>').addClass("btn btn-default").prop('disabled', true);
        $revert_button.hide();
        is_saving = true;
      },
      success: function (data) {
        $save_button.html("Changes to Layout Saved");
        setTimeout(function () {
          $(".grid-changes").fadeOut();
        }, 1000);
        setTimeout(function () {
          $save_button.html("Save Changes to Layout").removeClass('btn btn-default').prop('disabled', false);
          $revert_button.show();
        }, 2000);
        previous_grid_settings = grid_data;
        is_saving = false;
      }
    });
  }

  function serialized_data(grid) {
    return _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
      el = $(el);
      var node = el.data('_gridstack_node');
      return {
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        id: el.find(".grid-stack-item-content").attr("id")
      };
    }, grid);
  }

  createGrid();
      });
    }
  };

})(jQuery)