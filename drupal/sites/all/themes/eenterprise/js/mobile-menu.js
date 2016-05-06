(function ($) {

// Convert main menu into a mobile menu and move original menu.
Drupal.behaviors.mobileMenu = {
  attach: function () {

    // Create mobile menu container, create mobile bar, and clone the main menu.
    var $mobileLinks = $('.mobile-nav_links');
    var $mainNav = $('.main-nav');
    var $secondaryNav = $('.secondary-nav');
    var $newMainMenu = $mainNav.find('.menu').clone();
    var $newSecondaryMenu = $secondaryNav.find('.menu').clone();

    // Insert the cloned menus into the mobile menu container.
    $newMainMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu');
    });
    $newMainMenu.find('ul').remove();

    $newSecondaryMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu');
    });
    $newSecondaryMenu.find('ul').remove();
    
    // If the user is a guest user, then show them the FAQs, Login options
    if (Drupal.settings.ee_guest) {
	    if ($('.block--login-from-guest-page').length > 0 ) {
				var $guestMenu = $('.block--login-from-guest-page div a').clone().prop({class: "newlinks"});
		    $newMainMenu.append($guestMenu);
		    $newMainMenu.find('.newlinks').wrap('<li class="menu-item"></li>');
			}
			else {
				var guestMenuAdd = $('<ul class="menu"><li class="menu-item"><a href="/faqs" id="faqs-link">FAQs</a></li><li class="menu-item"><a href="/guest_bye" id="guest-login">Log in</a></li></ul>');
				if ($newMainMenu > 0) {
					$newMainMenu.append(guestMenuAdd);
				}
				else {
					$('.mobile-nav_links').append(guestMenuAdd);
				}
			}
    }
    // If the user isn't logged in and is viewing FAQs / Release Notes pages
	  else if (Drupal.settings.ee_user) {
		  var menuToClone = '';
		  if ($('.block--login-from-guest-page').length > 0 ) {
			  menuToClone = '.block--login-from-guest-page div a';
		  }
		  else if ($('.block--ee-bridge-login div a').length > 0) {
			  menuToClone = '.block--ee-bridge-login div a';
		  }
		  else if ($('.main-nav').length == 0) {
			  var addWorkbench = '<li class="menu-item"><a href="/">Workbench</a></li>';
			  $newSecondaryMenu.prepend(addWorkbench);
		  }
    	var $newuserMenu = $(menuToClone).clone().prop({class: "newlinks"});
    	$newMainMenu.append($newuserMenu);
    	$newMainMenu.find('.newlinks').wrap('<li class="menu-item"></li>');
	  }
	  else {
		 var otherUser = $('<li class="menu-item"><a href="/bridge-landing" id="guest-login">Log in</a></li><li class="menu-item"><a href="/faqs" id="faqs-link" >FAQs</a></li>');
		 $newMainMenu.append(otherUser);
	  }
	  
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
