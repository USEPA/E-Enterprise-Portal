CONTENTS OF THIS FILE
---------------------
 * Introduction
 * Requirements
 * Recommended modules
 * Writing your first test
 * Test modes
 * Maintainers

INTRODUCTION
------------
The Site Test module is an extension of the Drupal core Simpletest module for
running site specific tests in place on an active Drupal installation. The core
Simpletest module creates a new Drupal installation with a blank database every
time it runs a test creating a large bottleneck and removing the ability to test
with real-world data and configuration.

REQUIREMENTS
------------
This module requires the following modules:
 * Simpletest (core)

RECOMMENDED MODULES
-------------------
This module requires the following modules:
 * Devel (https://www.drupal.org/project/devel):
   Use Devel to generate content for use in tests with prefilled fields and
   lorem ipsum content.


WRITING YOUR FIRST TEST
-----------------------
 1. Enable the site_test module on your site.
 2. In a custom module or feature, create a new folder called 'tests'.
 3. Copy the file 'site_test.example.test' from the site_test/examples folder
    into your modules test folder and rename to suit the objective of your test.
 4. Change the getInfo values to reflect the nature of your test.
 5. In your modules .info file add the test file using:
    files[] = tests/site_test.example.test
 6. Clear cache and visit admin/config/development/testing/site_test to run your
    test.

TEST MODES
----------
Within the getInfo() test definition of your test there is a mode property which
allows you to set whether your test runs on the current instance, a cloned
instance or a fresh Drupal installation.

 * Site mode (site)
   Run the test directly on your site, with the current database and files. This
   mode is extremely fast and is best for most tests however if you're precious
   about your database you will need to clean up after yourself or ensure your
   test doesn't add any unwanted data.
 * Clone mode (clone)
   For each test run, the system will clone the current site as a whole into
   prefixed tables on the same database and run the tests on a sandboxed version
   with the exact same data and configuration. This method is slow for large
   databases but generally much faster than the core method and will not affect
   your database or site configuration.
 * Core mode (core)
   For each test run, the system will build a fresh installation of Drupal in
   prefixed tables. This is the way in which the core simpletest module runs and
   all site configuration (including enabling modules) must be done individually
   for each test. This is the slowest and most cumbersome mode and doesn't allow
   for doing complex business logic test case that depends on replicating
   complex site conditions.

MAINTAINERS
-----------
Current maintainers:
 * Marton Bodonyi (interactivejunky) - https://www.drupal.org/user/1633774
 * Alex Skrypnyk (alexdesignworks) - https://www.drupal.org/user/620694
