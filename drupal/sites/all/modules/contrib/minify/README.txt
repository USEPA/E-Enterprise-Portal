README for Minify

Description
===========
Minify is designed to improve the website performance.
This module provides the mechanism to render the page using minified versions of HTML and JavaScript files. 
Minified HTML is generated using regular expression, and JavaScript files are generated using GOOGLE Closure Compiler webservice.
Minify removes the comments and whitespace which will help to reduce the file size. 
Smaller HTML and file size reduces the page load time and improve the website performance. 

Installation
============
  1. Place the entire minify folder into your Drupal modules/ or better
     sites/x/modules/ directory.
  2. Enable the Minify module by navigating to
     Administer > Modules
  3. Bring up the Minify configuration screens by navigating to
     Administer > Configuration > Performance
  4. Selecting the Use Minified JavaScript files does not enough to improve performance, select Minify JavaScript files tab at top of the page to generate and manage minified JavaScript files