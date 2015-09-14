(function ($) {
  $(document).ready(function(){

    var cellHeight = 10;
    var verticalMargin = 10;

    function initializeIndices() {
      // assign x and y values to widgets
      // todo: load saved x and y values from user profile
      var count = 0;
      $(".grid-stack-item").each(function(){
        var x = count % 2 * 6;
        var y = Math.floor(count / 2) * 30;
        //grid.move($(this), x, y);
        $(this).attr({'data-gs-x': x, 'data-gs-y': y});
        //console.log($(this), x, y, $(this).attr('data-gs-x'), $(this).attr('data-gs-y'));
        count++;
        $(this).find('.grid-stack-item-content').css('overflow-y', 'hidden');
      });
    }

    function recalculateWidgetHeights(grid) {
      $('.grid-stack-item.ui-draggable').each(function(){
        var contentHeight = $(this).find('.pane-title').outerHeight(true)
          + Math.ceil($(this).find('.pane-content').outerHeight(true))
          + 30
          + verticalMargin;

        var $pager = $(this).find('.pager');
        if ($pager.size() > 0) {
          contentHeight += parseInt($pager.css('marginBottom'));
        }

        var gsHeight = Math.ceil(contentHeight / (cellHeight + verticalMargin));
        grid.resize(this, null, gsHeight);
      });
    }

    initializeIndices();

    var options = {
      static_grid: true,
      vertical_margin: verticalMargin,
      cell_height: cellHeight
    };

    $('.grid-stack').gridstack(options);
    var grid = $('.grid-stack').data('gridstack');

    if (typeof ResizeSensor !== 'undefined') {
      new ResizeSensor(jQuery('.grid-stack-item'), _.debounce( function(){ console.log('grid-stack-item: debounce'); recalculateWidgetHeights(grid) }, 150 ));
      new ResizeSensor(jQuery('.view-content'), _.debounce( function(){ console.log('view-content: debounce'); recalculateWidgetHeights(grid) }, 150 ));
    }
    $(document).ajaxComplete(_.debounce( function(){ console.log('ajaxComplete: debounce'); recalculateWidgetHeights(grid) }, 150 ));
  });
})(jQuery);