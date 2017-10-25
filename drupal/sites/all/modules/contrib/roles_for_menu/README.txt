
-- SUMMARY --

This module allows you to restrict access to menu items based on user roles. 
It is used when you don't want to copy your whole menu just because for one 
specific role you want to hide one menu item.

The module will add a fieldset with options for restricting access or gaining 
access to menu link for a specific role/roles.

For a full description of the module, visit the project page:
  https://www.drupal.org/project/roles_for_menu

To submit bug reports and feature suggestions, or to track changes:
  https://www.drupal.org/project/issues/roles_for_menu


-- REQUIREMENTS --

The only dependency for this module is the Drupal core menu.


-- INSTALLATION --

* Install as usual, see 
  https://www.drupal.org/documentation/install/modules-themes/modules-7 
  for further information.


-- CONFIGURATION --

* For now the module doesn't have or need any configuration.


-- CUSTOMIZATION --

* No options for now


-- TROUBLESHOOTING --


* If you can't see the fieldset in the menu item form, check the following:

  - Is the "administer roles for menu" permissions enabled for the appropriate 
    roles?


-- FAQ --

Q: Why is the menu path still reachable?

A: Note that for now the module only hides the menu item from the menu list
   and it doesn't reflect the menu access


-- CONTACT --

Current maintainers:
* Mihail Shahov (ShaxA) - https://www.drupal.org/u/shaxa
