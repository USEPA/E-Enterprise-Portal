CONTENTS OF THIS FILE
---------------------
   
 * Introduction
 * Requirements
 * Recommended modules
 * Installation
 * Configuration
 * Troubleshooting
 * FAQ
 * Maintainers

Introduction
------------
Version 7.x-1.0: Allows a site administrator to easily manage large role tables.

Requirements
------------
None.

Recommended modules
-------------------
Simple Access, Content Access.

Installation
------------
Install module as usual. Enable at "/admin/modules". 

Configuration
-------------

Bulk Options: Add (/admin/config/people/bulk_role_management)

  Add (one line per row) as many role entity terms as desired. Simply copy &
  paste your list in the "Add bulk role entities" box, click "Submit". The role
  entities will be added to the "role" table in the database.

Bulk Options: Delete/Edit (/admin/config/people/bulk_role_management/edit)

  After adding new role entities, your role entities will be listed on this page
  for editing or mass deletion. If you want to edit (which will allow you to 
  rename the role entity), click the "rename" link. To mass delete, select the 
  role entities you wish to delete and click "Delete Selected". The role entities 
  selected for deletion will be removed from your "role" table and "users_roles" 
  table. Finally, the "permissions" link will take you directly to the role
  entity's permission page. If you create a large list of role entities, don't
  use Drupal global permissions edit page (the one that shows all permissions
  for all roles as it will be too large to manage). Everything will work fine, 
  just easier to edit one role entity's permissions table at a time.

The user's edit page (/user/[uid]/edit)
-----------------------------------
The user's edit page is changed from having the section called "roles" to
"My groups, memberships and roles" with a drill-down textbox. This drill-down 
will allow you to quick search your role entities and jQuery will autofilter the 
results allowing for fast role entity table selections.

Troubleshooting
---------------
Ensure you have the right version of jQuery running.

FAQ
---
None at this time.

Maintainers
-----------
Xandermar LLC
http://www.xandermar.com
https://www.drupal.org/u/xandermar
https://www.drupal.org/node/2536488
