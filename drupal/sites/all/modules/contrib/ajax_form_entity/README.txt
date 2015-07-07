This module aims at ajaxifying any entity form (creation edition and deletion).

It can be used for various use-case, like ajaxifying the comment process, adding a complete ajax wall, mass-submiting or creating / editing via AJAX...

Compatible for now with :
-  Content types
-  Comments
-  Entity forms
-  Field collection (with a special formatter).
NOTE : the field collections submodule will be taken out of the module and have its own project page.

Known to be compatible with multiple form on the same page (for examples multiple comment forms in a view). Handle the files by triggering the upload with a little javascript action. It handle errors as well.

Included options and features : 
-  reload the form or not
-  show the resulting entity above, under or replace the form and choose the display type of the entity
- control the display/removal of the confirmation messages.
- Cancel the action
- Can be enabled per entity per bundle.

WARNING : this module is under heavy development and still needs some important features (see roadmap).

Roadmap :
-  Implement restriction access.
-  End compatibility with core entities (taxonomy and users).
-  End special features for comments (reply link, indentation), see AJAX comment module
-  Some rewrite for calling forms.

Similar module :
The AJAX comment module handle AJAXifying the comments.

Development by émérya (France)
