<?php

// Microsoft SQL Server specific install functions

class DatabaseTasks_sqlsrv extends DatabaseTasks {

  protected $pdoDriver = 'sqlsrv';

  public function name() {
    return 'Microsoft SQL Server';
  }

  public function __construct() {
    // Core tasks are using a table without primary key, they need to be
    // completely rewritten.
    $this->tasks = array();

    // Create the user-defined functions we need to be Drupal friendly.
    $this->tasks[] = array(
      'function' => 'initializeDatabase',
      'arguments' => array(),
    );
  }

  /**
   * Make SQL Server Drupal friendly.
   */
  function initializeDatabase() {
    $database = Database::getConnection();
    $database->bypassQueryPreprocess = TRUE;
    try {
      // SUBSTRING() function.
      $database->query(<<< EOF
IF OBJECT_ID (N'SUBSTRING', N'FN') IS NOT NULL BEGIN DROP FUNCTION SUBSTRING END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [SUBSTRING](@op1 nvarchar(max), @op2 sql_variant, @op3 sql_variant) RETURNS nvarchar(max) AS
BEGIN
  RETURN CAST(SUBSTRING(CAST(@op1 AS nvarchar(max)), CAST(@op2 AS int), CAST(@op3 AS int)) AS nvarchar(max))
END
EOF
      );

      // SUBSTRING_INDEX() function.
      $database->query(<<< EOF
IF OBJECT_ID (N'SUBSTRING_INDEX', N'FN') IS NOT NULL BEGIN DROP FUNCTION SUBSTRING_INDEX END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [SUBSTRING_INDEX](@string varchar(8000), @delimiter char(1), @count int) RETURNS varchar(8000) AS
BEGIN
  DECLARE @result varchar(8000)
  DECLARE @end int
  DECLARE @part int
  SET @end = 0
  SET @part = 0
  IF (@count = 0)
  BEGIN
    SET @result = ''
  END
  ELSE
  BEGIN
    IF (@count < 0)
    BEGIN
      SET @string = REVERSE(@string)
    END
    WHILE (@part < ABS(@count))
    BEGIN
      SET @end = CHARINDEX(@delimiter, @string, @end + 1)
      IF (@end = 0)
      BEGIN
        SET @end = LEN(@string) + 1
        BREAK
      END
      SET @part = @part + 1
    END
    SET @result = SUBSTRING(@string, 1, @end - 1)
    IF (@count < 0)
    BEGIN
      SET @result = REVERSE(@result)
    END
  END
  RETURN @result
END
EOF
      );

      // GREATEST() function.
      $database->query(<<< EOF
IF OBJECT_ID (N'GREATEST', N'FN') IS NOT NULL BEGIN DROP FUNCTION GREATEST END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [GREATEST](@op1 real, @op2 real) RETURNS real AS
BEGIN
  DECLARE @result real
  SET @result = CASE WHEN @op1 >= @op2 THEN @op1 ELSE @op2 END
  RETURN @result
END
EOF
      );

      // CONCAT() function.
      $database->query(<<< EOF
IF OBJECT_ID (N'CONCAT', N'FN') IS NOT NULL BEGIN DROP FUNCTION CONCAT END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [CONCAT](@op1 sql_variant, @op2 sql_variant) RETURNS nvarchar(4000) AS
BEGIN
  DECLARE @result nvarchar(4000)
  SET @result = CAST(@op1 AS nvarchar(4000)) + CAST(@op2 AS nvarchar(4000))
  RETURN @result
END
EOF
      );

      // IF(expr1, expr2, expr3) function.
      $database->query(<<< EOF
IF OBJECT_ID (N'IF', N'FN') IS NOT NULL BEGIN DROP FUNCTION [IF] END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [IF](@expr1 sql_variant, @expr2 sql_variant, @expr3 sql_variant) RETURNS sql_variant AS
BEGIN
  DECLARE @result sql_variant
  SET @result = CASE WHEN CAST(@expr1 AS int) != 0 THEN @expr2 ELSE @expr3 END
  RETURN @result
END
EOF
      );

      // MD5(expr1) function.
      $database->query(<<< EOF
IF OBJECT_ID (N'MD5', N'FN') IS NOT NULL BEGIN DROP FUNCTION [MD5] END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [MD5](@value varchar(255)) RETURNS varchar(32) AS
BEGIN
  RETURN SUBSTRING(sys.fn_sqlvarbasetostr(HASHBYTES('MD5', @value)),3,32);
END
EOF
      );

      // LPAD(@str, @len, @padstr) function.
      $database->query(<<< EOF
IF OBJECT_ID (N'LPAD', N'FN') IS NOT NULL BEGIN DROP FUNCTION [LPAD] END
EOF
      );
      $database->query(<<< EOF
CREATE FUNCTION [dbo].[LPAD](@str nvarchar(max), @len int, @padstr nvarchar(max)) RETURNS nvarchar(4000) AS
BEGIN
  RETURN left(@str + replicate(@padstr,@len),@len);
END
EOF
      );

      // CONNECTION_ID() function.
      $database->query(<<< EOF
IF OBJECT_ID (N'CONNECTION_ID', N'FN') IS NOT NULL BEGIN DROP FUNCTION [CONNECTION_ID] END
EOF
      );

      $database->query(<<< EOF
CREATE FUNCTION [dbo].[CONNECTION_ID]() RETURNS smallint AS
BEGIN
  DECLARE @var smallint
  SELECT @var = @@SPID
  RETURN @Var
END
EOF
      );

      $database->bypassQueryPreprocess = FALSE;
    }
    catch (Exception $e) {
      $this->fail(st('Drupal could not be correctly setup with the existing database. Revise any errors.'));
    }
  }

  // Modify the default options form to allow Windows authentication.
  public function getFormOptions($database) {

    $form = array();

    drupal_set_message(t('To install this version of the MS SQL Server driver make sure you have this patch in core: <a target="_blank" href="!url">!url</a>',
      array('!url' => 'https://www.drupal.org/node/2376239')), 'warning');

    include_once('reflexiondata.inc');
    $extensiondata = sqlsrv_REData(new ReflectionExtension('pdo_sqlsrv'));

    // Client buffer size.
    $buffer_size = $extensiondata['getINIEntries']['pdo_sqlsrv.client_buffer_max_kb_size'];
    $buffer_size_min = (12240 * 2);
    $buffer_size_ok = $buffer_size >= $buffer_size_min;

    if (!$buffer_size_ok) {
      drupal_set_message(t('pdo_sqlsrv.client_buffer_max_kb_size needs to be of at least @min, currently @current.',
        array('@min' => '24480Kb', '@current' => "{$buffer_size}Kb")), 'error');
    }

    // PDO version, and require at least 3.2.
    $version_ok = version_compare($extensiondata['getVersion'] , '3.2') >= 0;

    if (!$version_ok) {
      drupal_set_message(t('This version of the MS SQL Server driver needs at least the @min version of the SQL Server PDO, currently running @current. Download from <a href="!download">here</a>.',
          array(
		  '@min' => '3.2',
		  '@current' => $extensiondata['getVersion'],
		  '!download' => 'http://www.microsoft.com/en-us/download/details.aspx?id=20098',
		  ))
		  , 'error');
    }

  	// Check that Wincache user cache is enabled and big enough.
  	$wincache_ok = (function_exists('wincache_ucache_info') && ($cache = @wincache_ucache_info(TRUE)) && ($meminfo = @wincache_ucache_meminfo()));
  	if ($wincache_ok) {
  	  // Minimum 15 Mb of usercache.
  	  $wincache_ok = $meminfo['memory_total'] >= 20 * 1024 * 1024;
  	}

  	if (!$wincache_ok) {
      drupal_set_message(t('This version of the MS SQL Server needs the Wincache PHP extension with a minimum ucachesize of 20Mb.'), 'error');
    }

    // If there is something wrong do not allow the user to install.
    if (!$buffer_size_ok || !$version_ok || !$wincache_ok) {
  	  drupal_set_message(t('Please review the errors and refresh this page when fixed.'), 'status');
    }

  	$form['messages']['errors'] = array(
      '#type' => 'markup',
      '#markup' => theme_status_messages(array('display' => NULL)),
    );

  	if ($buffer_size_ok && $version_ok && $wincache_ok) {
      $form = array_merge($form, parent::getFormOptions($database));
      // Make username not required.
      $form['username']['#required'] = FALSE;
      // Add a description for about leaving username blank.
      $form['username']['#description'] = t('Leave username (and password) blank to use Windows authentication.');
    }

    return $form;
  }
}