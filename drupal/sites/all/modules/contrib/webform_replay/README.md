# Webform Replay #

Webform Replay is ideal for situations where multiple webform submissions per
user are allowed, and some of that information is likely to be repeated on each
submission.

For example, a field for the user's name is almost certain to be the same for
each entry. The user's address is another field that could reasonably be
expected to change only occasionally.

By enabling webform replay for these fields, the user need only complete them
for the initial webform submission. On subsequent entries, these fields will be
pre-populated with the values from the previous submission.


## Requirements ##

* Drupal 7.x
* [Webform module](https://www.drupal.org/project/webform)


## Installation ##

* Install as usual, see http://drupal.org/node/895232 for further information.


## Configuration ##

On the Webform Replay configuration page (admin/config/content/webform-replay),
select the webform components that you would like to be available for replay.
The edit form for these components will now contain a "Replay component"
checkbox which, when checked, will prefill the component with the value from
the current user's previous submission - if one exists.


## Maintainers ##

* Craig Wood (Rijidij) - http://www.drupal.org/user/269886
