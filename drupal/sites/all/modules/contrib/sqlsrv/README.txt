
# SQL Server driver for Drupal 7

See http://drupal.org/project/sqlsrv for installation instructions.

System Requirements

ODBC 11 (https://www.microsoft.com/en-us/download/details.aspx?id=36434)
Wincache >= 1.3.7.4 (http://sourceforge.net/projects/wincache/)
PDO >= 3.2.0.0 (http://www.microsoft.com/en-us/download/details.aspx?id=20098)
PHP >= 5.4
MS SQL Server >= 2012

# WincacheDrupal Dependency

The driver needs the Wincache PHP extension.

To properly leverage performance gains of the driver, you need to run it
in combination with the WincacheDrupal module:

https://www.drupal.org/project/wincachedrupal

Proper setup of the WincacheDrupal module is not trivial, and requires to manually
modify the settings.php file.

Se the README.txt in the WincacheDrupal module. The *important* lines are:

// Register the new cache backend
$conf['cache_backends'][] = 'sites/all/modules/wincachedrupal/drupal_win_cache.inc';
// This is the cache binary of the SQL Server driver
$conf['cache_class_fastcache'] = 'DrupalWinCache';
// We rely on memory locks to make this work
$conf['lock_inc'] = 'sites/all/modules/wincachedrupal/wincache-lock.inc';

If this is not properly setup, the SQL Server Driver will detect the situation
and disable the custom caching backend. 
 