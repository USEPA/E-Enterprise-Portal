(function ($) {

  $(function() {

      var page_name = window.location.pathname.split('/')[1];
      console.log('page name is : ' + page_name);
      if (page_name == "eenterprise-new" || page_name == "eenterprise-alternate") {
        console.log('page name is right');
        $(document).on('ready', function() {
          var $jcarousel = $('.jcarousel');
          $jcarousel.jcarousel();
          $jcarousel
            .on('jcarousel:create jcarousel:reload', function () {
              var carousel = $(this),
                width = $('body').find('.jcarousel-wrapper').innerWidth();
              console.log('width is: ' + width);
              carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            });
  
          $('.jcarousel-control-prev')
            .jcarouselControl({
              target: '-=1'
            });
  
          $('.jcarousel-control-next')
            .jcarouselControl({
              target: '+=1'
            });
  
          $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
              $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
              $(this).removeClass('active');
            })
            .on('click', function(e) {
              e.preventDefault();
            })
            .jcarouselPagination({
              perPage: 1,
              item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
              }
            });
        });
      }
    });
})(jQuery);
