Remove views block resource
===========================

This is provided as an example of implementing resources.

To use a remote View as a block:

- enable Views Services module (part of Services 2.x; at http://drupal.org/project/services_views for Services 3.x)
- enable the views.get method on your Services API key / endpoint
- create a new resource, specifying:
  - the block delta and title
  - the view machine name
  - the display machine name
  - arguments to pass, if any

The block will then be available like a normal Drupal block.
