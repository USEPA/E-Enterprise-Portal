(function ($) {

  $(function() {

      var page_name = window.location.pathname.split('/')[1],
          firstLoad = 'true';
      
      if (page_name === "eenterprise-new") {
        $(document).on('ready', function() {
          var $jcarousel = $('.jcarousel');
          $jcarousel.jcarousel();
          var $jcarouselNext = $('.jcarousel-control-next');
          var $jcarouselPrev = $('.jcarousel-control-prev');             
          $jcarousel
            .on('jcarousel:reload', function () {
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
            
          $jcarousel.on('keyup', function(e) {
            var key = e.which || e.keyChar || e.keyCode;
            if (key === 37) {
              e.stopImmediatePropagation();                
              // If jcarouselPrev button does not have inactive class, reverse carousel
              if(!$jcarouselPrev.hasClass('inactive')) {
                $jcarouselPrev.trigger('click');             
              }          
            } else if (key === 39) {
              e.stopImmediatePropagation();                
              // If jcarouselNext button does not have inactive class, advance carousel
              if(!$jcarouselNext.hasClass('inactive')) {
                $jcarouselNext.trigger('click');
              }
            } else {
                return false;
            }
            firstIsActive();
          }); // End jcarousel keyup
        
        }); // End document ready
        
        $(window).load(function() {
          var carousel = $('body').find('.jcarousel'),
                width = $('body').find('.jcarousel-wrapper').innerWidth();
              carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
          firstIsActive();
          firstLoad = 'false';          
        });

        function firstIsActive(){
          var $jcarousel = $('body').find('.jcarousel'),
              $jcarouselNext = $('.jcarousel-control-next'),
              $jcarouselPrev = $('.jcarousel-control-prev'),
              $jcarouselSlides = $jcarousel.find('.slides > li'),
              firstActive = $jcarouselSlides.eq(0).index(),
              currentActive = $jcarousel.jcarousel('last').index(), // Last visible slide
              //currentActive = $jcarouselSlides.eq(0).index(); 
              lastSlide = $jcarouselSlides.length - 1;
          
          // Remove active class that sets visibility: visible
          $jcarouselSlides.removeClass('active');   
          
          // Handle what slide to set visibility: visible and when to show arrows - assumes 3 slides
          if (firstActive === currentActive) {
            // First slide
            $jcarouselPrev.addClass('inactive');   
            if ($jcarouselNext.hasClass('inactive')) {
              $jcarouselNext.removeClass('inactive');
            }            
          }
          else if (currentActive !== lastSlide) {
            // Middle slide
            $jcarouselPrev.removeClass('inactive');
            $jcarouselNext.removeClass('inactive');              
          }
          else  {
            // Last slide
            if ($jcarouselPrev.hasClass('inactive')) {
              $jcarouselPrev.removeClass('inactive');
            }
            $jcarouselNext.addClass('inactive');    
          }
          if (firstLoad !== 'true') {
            $jcarousel.focus();
          }
          $jcarouselSlides.eq(currentActive).addClass('active');  
        }
  
      }
    });
})(jQuery);
