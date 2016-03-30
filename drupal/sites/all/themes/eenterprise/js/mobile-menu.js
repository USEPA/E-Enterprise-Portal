(function ($) {

// Convert main menu into a mobile menu and move original menu.
Drupal.behaviors.mobileMenu = {
  attach: function () {

    // Create mobile menu container, create mobile bar, and clone the main menu.
    var $mobileLinks = $('.mobile-nav_links'),
        $mainNav = $('.main-nav'),
        $secondaryNav = $('.secondary-nav'),
        $newMainMenu = $mainNav.find('.menu').clone();
        $newSecondaryMenu = $secondaryNav.find('.menu').clone();

    // Insert the cloned menus into the mobile menu container.
    $newMainMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu');
    });
    $newMainMenu.find('ul').remove();

    $newSecondaryMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu');
    });
    $newSecondaryMenu.find('ul').remove();
    
    $newMainMenu.appendTo($mobileLinks);
    $newSecondaryMenu.appendTo($mobileLinks);

    // Open/Close mobile menu when menu button is clicked.
    var $mobileMenuWrapper = $('.mobile-nav').find('.mobile-nav_links'),
        $mobileMenuLinks = $mobileMenuWrapper.find('a');

    $mobileMenuLinks.attr('tabindex', -1);
    $('.mobile-nav_toggle').on("click", function(e) {
      $(this).toggleClass('menu-button-active');
      $mobileLinks.toggleClass('element-hidden');
      // Take mobile menu links out of tab flow if hidden.
      if ($mobileMenuWrapper.hasClass('element-hidden')) {
        $mobileMenuLinks.attr('tabindex', -1);
      }
      else {
        $mobileMenuLinks.removeAttr('tabindex');
      }
      e.preventDefault();
    });

  }
};

})(jQuery);
