<<<<<<< HEAD
(function ($) {

  $(function() {

      var page_name = window.location.pathname.split('/')[1];
      if (page_name == "eenterprise-new" || page_name == "eenterprise-alternate") {
        $(document).on('ready', function() {
          var $jcarousel = $('.jcarousel');
          $jcarousel.jcarousel();
          var $jcarouselNext = $('.jcarousel-control-next');
          var $jcarouselPrev = $('.jcarousel-control-prev');             
          $jcarousel
            .on('jcarousel:create jcarousel:reload', function () {
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
                if(!$jcarouselPrev.hasClass('inactive')) {
                  $jcarouselPrev.trigger('click');             
                }          
              } else if (key === 39) {
                // If jcarouselNext button does not have inactive class, advance carousel
                if(!$jcarouselNext.hasClass('inactive')) {
                  $jcarouselNext.trigger('click');
                }
              }
              firstIsActive();
            }); // End jcarousel keyup
          }); // End jcarousel focus
        
        }); // End document ready

        function firstIsActive(){
          var $jcarousel = $('body').find('.jcarousel'),
              $jcarouselNext = $('.jcarousel-control-next'),
              $jcarouselPrev = $('.jcarousel-control-prev'),
              firstActive = $jcarousel.jcarousel('first').index(),
              $jcarouselSlides = $jcarousel.find('.slides > li'),
              currentActive = $jcarouselSlides.eq(0).index(),
              lastSlide = $jcarouselSlides.length - 1;
          if (firstActive === currentActive) {
            $jcarouselPrev.addClass('inactive');
            $jcarousel.focus();
          }
          else if (firstActive === lastSlide) {
            $jcarouselNext.addClass('inactive');
            $jcarousel.focus();            
          }
          else {
            $jcarouselPrev.removeClass('inactive');
            $jcarouselNext.removeClass('inactive');
            $jcarousel.focus();                        
          }
        }
        
      }
    });
})(jQuery);
=======
!function(a){a(function(){var b=window.location.pathname.split("/")[1];console.log("page name is : "+b),"eenterprise-new"!=b&&"eenterprise-alternate"!=b||(console.log("page name is right"),a(document).on("ready",function(){var b=a(".jcarousel");b.jcarousel(),b.on("jcarousel:create jcarousel:reload",function(){var b=a(this),c=a("body").find(".jcarousel-wrapper").innerWidth();console.log("width is: "+c),b.jcarousel("items").css("width",Math.ceil(c)+"px")}),a(".jcarousel-control-prev").jcarouselControl({target:"-=1"}),a(".jcarousel-control-next").jcarouselControl({target:"+=1"}),a(".jcarousel-pagination").on("jcarouselpagination:active","a",function(){a(this).addClass("active")}).on("jcarouselpagination:inactive","a",function(){a(this).removeClass("active")}).on("click",function(a){a.preventDefault()}).jcarouselPagination({perPage:1,item:function(a){return'<a href="#'+a+'">'+a+"</a>"}})}))})}(jQuery);
//# sourceMappingURL=welcome.js.map
>>>>>>> 449dee5810a31e38c121db2e67c4e5b75c789b9d
