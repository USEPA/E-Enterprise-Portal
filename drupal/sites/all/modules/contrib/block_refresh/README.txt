-- SUMMARY --

As the name implies, Block Refresh is a module that lets administrators configure all
or some of their blocks to be refresh, either by an defined number of seconds or by providing
a link for the website user to click on to refresh content, or both options on the same block.

To submit bug reports and feature suggestions, or to track changes:
  http://drupal.org/project/issues/block_refresh


-- REQUIREMENTS --

None.


-- INSTALLATION --

* Install as usual, see http://drupal.org/node/70151 for further information.


-- CONFIGURATION --

* Once installed, go to admin/structure/block
* Select 'configure' next to the block you want to setup with Block Refresh
* In the configuration window there will be a section for Block Refresh settings.
* Set the settings that you want to apply to the block (Block Refresh settings
  and any others) and click "Save Block"

** NOTE: Make sure and set the 'access block refresh content' permission for the roles
         you want to be able to see the block refresh. If the user does not have the
         permission required, the block will appear as though it was not configured with
         Block Refresh.


--  TROUBLESHOOTING --

* Use the included 'Block Refresh Demo' module to test functionality.
* If block are refreshing strangely on taxonomy/term/xx pages and you are
running the Global Redirect module, disable the 'taxonomy term path handler'
feature on that module's configuration page.

-- CONTACT --

Current maintainers:
* Phil Dodd (tripper54) - http://drupal.org/user/452964