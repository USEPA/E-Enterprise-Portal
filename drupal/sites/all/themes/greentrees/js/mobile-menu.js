(function ($) {

// Convert main menu into a mobile menu and move original menu.
Drupal.behaviors.mobileMenu = {
  attach: function (context) {

    // Create mobile menu container, create mobile bar, and clone the main menu.
    var $mobileNav = $('<div id="mobile-nav" class="mobile-nav"></div>'),
        $mobileBar = $('<div class="mobile-bar clearfix"><a class="mobile-home" href="/" rel="home"><span class="mobile-home-icon">Home</span></a> <a class="menu-button" href="#mobile-links">Menu</a></div>'),
        $mobileLinks = $('<div id="mobile-links" class="mobile-links element-hidden"></div>'),
        //$mainNav = $('.simple-main-nav', context),
        $secondaryNav = $('.secondary-nav', context),
        $footerNav = $('.region-footer', context),
        $eeNav = $('.workbench-menu', context),
        //$newMenu = $mainNav.find('> .menu').clone();	
        $newSecondaryMenu = $secondaryNav.find('> .menu').clone();
        $newEEMenu = $eeNav.find('> .menu').clone();

    // Reset menu list class and remove second level menu items.
    /*
$newMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu sub-menu');
    });
    $newMenu.find('ul').remove();
*/
    
    $newSecondaryMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu');
    });
    $newSecondaryMenu.find('ul').remove();
    
    $newEEMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu');
    });
    $newEEMenu.find('ul').remove();

    // Insert the cloned menus into the mobile menu container.
    $newEEMenu.appendTo($mobileLinks);
    $newSecondaryMenu.appendTo($mobileLinks);
    //$newMenu.appendTo($mobileLinks);

    // Insert the top bar into mobile menu container.
    $mobileBar.prependTo($mobileNav);

    // Insert the mobile links into mobile menu container.
    $mobileLinks.appendTo($mobileNav);

    // Add mobile menu to the page.
    $('.masthead', context).before($mobileNav);

    // Open/Close mobile menu when menu button is clicked.
    var $mobileMenuWrapper = $('#mobile-nav', context).find('.mobile-links'),
        $mobileMenuLinks = $mobileMenuWrapper.find('a');

    $mobileMenuLinks.attr('tabindex', -1);
    $('.mobile-bar .menu-button', context).click(function(e) {
      $(this).toggleClass('menu-button-active');
      $mobileMenuWrapper.toggleClass('element-hidden');
      // Take mobile menu links out of tab flow if hidden.
      if ($mobileMenuWrapper.hasClass('element-hidden')) {
        $mobileMenuLinks.attr('tabindex', -1);
      }
      else {
        $mobileMenuLinks.removeAttr('tabindex');
      }
      e.preventDefault();
    });

    // Set the height of the menu.
    $mobileMenuWrapper.height($(document).height());

    var breakpoint = 640; /* 40em */
    if (document.documentElement.clientWidth >= breakpoint) {

      // Detach original menus and reset classes.
      //$mainNav.detach().attr('class', 'nav main-nav clearfix');
      $secondaryNav.detach().attr('class', 'nav secondary-nav');
      $eeNav.detach().attr('class', 'nav workbench-menu');

      // Add pipeline class to secondary menu.
      $secondaryNav.find('.menu').addClass('pipeline');
      $footerNav.find('.menu').addClass('pipeline');

      // Move main and secondary menus to the top of the page for wide screens.
      $('.masthead').before($secondaryNav);
      //$('hgroup').after($mainNav);
	  $('.block-search').after($eeNav);
    }

  }
};

})(jQuery);
