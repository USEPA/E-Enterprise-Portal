Simple module to add PSR-0 and PSR-4 support to the Drupal 7 Core registry.

### INSTALL

- Enable the module
- Change your .info files and add ```registry_autoload[] = PSR-0|PSR-4``` key (choose one)
- Put your files in src/ for PSR-4 and lib/ for PSR-0.
- DONE

Alternatively to the registry\_autoload key use:

````
  registry_autoload_files[] = filename
````

to specify all your files manually and avoid the file system scan.

It is still advised to provide files in PSR-0 or PSR-4 format, so that you can
switch to another autoloader later.

### FORMAT

Add the following keys to your modules .info file to search the respective
subdir for .php files:

sample.info:

````
  registry_autoload[] = PSR-0
  registry_autoload[] = PSR-4
  registry_autoload[] = PHPUnit
````

PSR-0 will by default search the lib/ subdirectory of your module and the
convention is to repeat the full namespace, e.g.

lib/Drupal/Core/Cache/CacheableInterface.php

with:

````php
namespace Drupal\Core\Cache;
````

PSR-4 will by default search the src/ subdirectory of your module and the
convention is to only repeat the namespace after Drupal/your\_module:

src/Cache/CacheableInterface.php

with:

````php
namespace Drupal\your_module\Cache;
````

### AVOID FILE SYSTEM SCAN 

If you want to avoid the static file\_scan\_directory use:

````
  registry_autoload_files[] = filename
````

The PSR-0 and PSR-4 are just shortcuts if you want to register all your files
automatically.

### SEARCHING ARBITRARY PATHS

To support arbitrary libraries in e.g. sites/all/libraries use e.g:

````
  registry_autoload[DRUPAL_ROOT/sites/all/libraries/mylibrary/lib] = PSR-0
  registry_autoload[DRUPAL_ROOT/sites/all/libraries/mylibrary/src] = PSR-4
````

DRUPAL\_ROOT is the only supported constant here and will be replaced with the constant ```DRUPAL_ROOT```.

To add arbitrary paths relative to the module, use e.g.:

````
  registry_autoload[mylibrary/lib] = PSR-0
  registry_autoload[mylibrary/src] = PSR-4
````

Note that neither lib/ nor src/ are appended when specifying a path yourself.

### Traits

PHP 5.4 traits are supported. For PHP versions < 5.4, the files with trait declarations are simply ignored.

### RELATED MODULES

xautoload is a related module.

The difference is that this statically scans all files during the registry
rebuild to register the files, while xautoload does it dynamically during
runtime based on the class name.

However this does only need the D7 core registry and only changes the registry
in a way to add namespaced files, which core could support, too.

### STATUS

[![Build Status](https://travis-ci.org/LionsAd/registry_autoload.svg?branch=7.x-1.x)](https://travis-ci.org/LionsAd/registry_autoload)
