(function ($) {
  $(document).ready(function(){

    var cellHeight = 10;
    var verticalMargin = 10;

    function recalculateWidgetHeights(grid) {
      $('.grid-stack-item.ui-draggable').each(function(){
        var contentHeight = $(this).find('.pane-title').outerHeight(true)
          + Math.ceil($(this).find('.pane-content').outerHeight(true))
          + 26
          + verticalMargin;

        var $pager = $(this).find('.pager');
        if ($pager.size() > 0) {
          contentHeight += parseInt($pager.css('marginBottom'));
        }

        var gsHeight = Math.ceil(contentHeight / (cellHeight + verticalMargin));
        grid.resize(this, null, gsHeight);
      });
    }

    // assign x and y values to widgets
    // todo: load saved x and y values from user profile
    var count = 0;
    $(".grid-stack-item").each(function(){
      var x = count % 2 * 6;
      var y = Math.floor(count / 2) * 6;
      $(this).attr({'data-gs-x': x, 'data-gs-y': y});
      count++;
    });

    var options = {
      static_grid: true,
      vertical_margin: verticalMargin,
      cell_height: cellHeight
    };

    $('.grid-stack').gridstack(options);
    var grid = $('.grid-stack').data('gridstack');

    // todo: find a way to recalculate widget heights less often
    $(document).ajaxComplete(function(){
      recalculateWidgetHeights(grid);
    });

    $( window ).resize( _.debounce( function(){ recalculateWidgetHeights(grid) }, 150 ) );
  });
})(jQuery);