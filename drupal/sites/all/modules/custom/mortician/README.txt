README for Minify

Description
===========
Mortician is designed to improve the website performance.
This module provides the mechanism to find modules that have been added in the past and deleted before being removed
from Drupal.  It properly disables them in the database to prevent time consuming searches for these missing modules.

Installation
============
  1. Place the entire mortician folder into your Drupal modules/ or better
     sites/x/modules/ directory.
  2. Enable the Mortician module by navigating to
     Administer > Modules
  3. Bring up the Mortician configuration screens by navigating to
     Administer > Configuration > Performance
  4. Selecting Mortician tab and see a list of modules that have be removed incorrectly from Drupal.