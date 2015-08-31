(function ($) {
    $(document).ready(function(){
        var options = {
            static_grid: true,
            vertical_margin: 10,
            cell_height: 70,
            handle: 'grid-stack-item'
        };

        $('.grid-stack').gridstack(options);

    });
})(jQuery);

