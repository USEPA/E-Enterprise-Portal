(function ($) {
  $(document).ready(function(){

    var cellHeight = 70;
    var verticalMargin = 10;

    function recalculateWidgetHeights() {
      $('.grid-stack-item-content').each(function(){
        var gsHeight = Math.round((this.scrollHeight + verticalMargin * 2) / cellHeight);
        console.log(gsHeight);
        $(this).closest('.grid-stack-item').attr('data-gs-height', gsHeight);
      });
    }

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
      cell_height: cellHeight,
      //handle: 'grid-stack-item'
      //float:true
    };

    setTimeout(function(){
      recalculateWidgetHeights();
      $('.grid-stack').gridstack(options);
    }, 5000);
  });
})(jQuery);