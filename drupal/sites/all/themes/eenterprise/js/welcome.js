(function($) {

  $(function() {

    var page_name = window.location.pathname.split('/')[1],
      firstLoad = 'true';

    if (page_name == "eenterprise-new" || page_name == "eenterprise-alternate") {
      $(document).on('ready', function() {
        var $jcarousel = $('.jcarousel');
        $jcarousel.jcarousel();
        var $jcarouselNext = $('.jcarousel-control-next');
        var $jcarouselPrev = $('.jcarousel-control-prev');
        $jcarousel
          .on('jcarousel:reload', function() {
            var carousel = $(this),
              width = $('body').find('.jcarousel-wrapper').innerWidth();
            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
          });

        $jcarouselPrev
          .jcarouselControl({
            target: '-=1'
          })
          .on('click', function() {
            firstIsActive();
          });

        $jcarouselNext
          .jcarouselControl({
            target: '+=1'
          })
          .on('click', function() {
            firstIsActive();
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
            firstIsActive();
          })
          .jcarouselPagination({
            perPage: 1,
            item: function(page) {
              return '<a href="#' + page + '">' + page + '</a>';
            }
          });

        $jcarousel.on('focus', function() {
          $jcarousel.on('keyup', function(e) {
            e.stopImmediatePropagation();
            var key = e.which || e.keyChar || e.keyCode;
            if (key === 37) {
              // If jcarouselPrev button does not have inactive class, reverse carousel
              if (!$jcarouselPrev.hasClass('inactive')) {
                $jcarouselPrev.trigger('click');
              }
            } else if (key === 39) {
              // If jcarouselNext button does not have inactive class, advance carousel
              if (!$jcarouselNext.hasClass('inactive')) {
                $jcarouselNext.trigger('click');
              }
            }
            firstIsActive();
          }); // End jcarousel keyup
        }); // End jcarousel focus

      }); // End document ready

      $(window).load(function() {
        var carousel = $('body').find('.jcarousel'),
          width = $('body').find('.jcarousel-wrapper').innerWidth();
        carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        firstIsActive();
        firstLoad = 'false';
      });

      function firstIsActive() {
        var $jcarousel = $('body').find('.jcarousel'),
          $jcarouselNext = $('.jcarousel-control-next'),
          $jcarouselPrev = $('.jcarousel-control-prev'),
          firstActive = $jcarousel.jcarousel('first').index(),
          $jcarouselSlides = $jcarousel.find('.slides > li'),
          currentActive = $jcarouselSlides.eq(0).index(),
          lastSlide = $jcarouselSlides.length - 1;
        if (firstActive === currentActive) {
          $jcarouselPrev.addClass('inactive');
        }
        else if (firstActive === lastSlide) {
          $jcarouselNext.addClass('inactive');
        }
        else {
          $jcarouselPrev.removeClass('inactive');
          $jcarouselNext.removeClass('inactive');
        }
        if (firstLoad !== 'true') {
          $jcarousel.focus();
        }
      }

    }
  });
})(jQuery);
