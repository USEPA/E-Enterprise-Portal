<?php

include_once 'fastcache.inc';

/**
 * @filefe
 * Database schema code for Microsoft SQL Server database servers.
 */

/**
 * @ingroup schemaapi
 * @{
 */

class DatabaseSchema_sqlsrv extends DatabaseSchema {

  // Override to take into account the
  // default schema for MS SQL.
  public function __construct($connection) {
    $this->LoadDefaultSchema($connection);
    parent::__construct($connection);
  }

  /**
   * Get the current database schema.
   *
   * @return string
   */
  public function GetDefaultSchema() {
    return $this->defaultSchema;
  }

  /**
   * Default recommended collation for SQL Server.
   */
  const DEFAULT_COLLATION_CI = 'Latin1_General_CI_AI';

  /**
   * Default recommended collation for SQL Server.
   * when case sensitivity is required.
   */
  const DEFAULT_COLLATION_CS = 'Latin1_General_CS_AI';

  // Name for the technical column used for computed keys
  // or technical primary key.
  // IMPORTANT: They both start with "__" because the
  // statement class will remove those columns from the final
  // result set.
  // This should be constants, but we are using variable to ease
  // their use in inline strings.
  var $COMPUTED_PK_COLUMN_NAME = '__pkc';
  var $COMPUTED_PK_COLUMN_INDEX = '__ix_pkc';
  var $TECHNICAL_PK_COLUMN_NAME = '__pk';

  /**
   * Returns a list of functions that are not
   * available by default on SQL Server, but used
   * in Drupal Core or contributed modules
   * because they are available in other databases
   * such as MySQL.
   */
  public function DrupalSpecificFunctions() {
    if ($cache = fastcache::cache_get('drupal_specific_functions', 'schema')) {
      return $cache->data;
    }
    $functions = array(
        'SUBSTRING',
        'SUBSTRING_INDEX',
        'GREATEST',
        'MD5',
        'LPAD',
        'GROUP_CONCAT',
        'CONCAT',
        'IF',
        'CONNECTION_ID'
      );
    // Since SQL Server 2012 (11), there
    // is a native CONCAT implementation
    if ($this->EngineVersionNumber() >= 11) {
      $functions = array_diff($functions, array('CONCAT'));
    }
    fastcache::cache_set('drupal_specific_functions', $functions, 'schema');
    return $functions;
  }

  /**
   * Load the real default schema name for this connection.
   */
  protected function LoadDefaultSchema($connection) {
    if ($cache = fastcache::cache_get('default_schema', 'schema')) {
      $this->defaultSchema = $cache->data;
      return;
    }
    $result = $connection->query_direct("SELECT SCHEMA_NAME()")->fetchField();
    fastcache::cache_set('default_schema', $result, 'schema');
    $this->defaultSchema =  $result;
  }

  /**
   * Clear introspection cache for a specific table.
   *
   * @param mixed $table
   */
  protected function queryColumnInformationInvalidate($table) {
    fastcache::cache_clear_all('queryColumnInformation:' . $table, 'schema_queryColumnInformation');
  }

  /**
   * Database introspection: fetch technical information about a table.
   *
   * @return
   *   An array with the following structure:
   *   - blobs[]: Array of column names that should be treated as blobs in this table.
   *   - identities[]: Array of column names that are identities in this table.
   *   - identity: The name of the identity column
   *   - columns[]: An array of specification details for the columns
   *      - name: Column name.
   *      - max_length: Maximum length.
   *      - precision: Precision.
   *      - collation_name: Collation.
   *      - is_nullable: Is nullable.
   *      - is_ansi_padded: Is ANSI padded.
   *      - is_identity: Is identity.
   *      - definition: If a computed column, the computation formulae.
   *      - default_value: Default value for the column (if any).
   */
  public function queryColumnInformation($table, $refresh = FALSE) {

    // No worry for the tableExists() check, results
    // are cached.
    if (empty($table) || !$this->tableExists($table)) {
      throw new DatabaseSchemaObjectDoesNotExistException("The table '{$table}' does not exist.");
    }

    $table_info = $this->getPrefixInfo($table);

    // We could adapt the current code to support temporary table introspection, but
    // for now this is not supported.
    if ($table_info['table'][0] == '#') {
      throw new Exception('Temporary table introspection is not supported.');
    }

    if ($cache = fastcache::cache_get('queryColumnInformation:' . $table, 'schema_queryColumnInformation')) {
      return $cache->data;
    }

    $info = array();

    // Don't use {} around information_schema.columns table.
    $result = $this->connection->query_direct("SELECT sysc.name, sysc.max_length, sysc.precision, sysc.collation_name,
                    sysc.is_nullable, sysc.is_ansi_padded, sysc.is_identity, sysc.is_computed, TYPE_NAME(sysc.user_type_id) as type,
                    syscc.definition,
                    sm.[text] as default_value
                    FROM sys.columns AS sysc
                    INNER JOIN sys.syscolumns AS sysc2 ON sysc.object_id = sysc2.id and sysc.name = sysc2.name
                    LEFT JOIN sys.computed_columns AS syscc ON sysc.object_id = syscc.object_id AND sysc.name = syscc.name
                    LEFT JOIN sys.syscomments sm ON sm.id = sysc2.cdefault
                    WHERE sysc.object_id = OBJECT_ID(:table)
                    ",
                  array(':table' => $table_info['schema'] . '.' . $table_info['table']));

    foreach ($result as $column) {
      if ($column->type == 'varbinary') {
        $info['blobs'][$column->name] = TRUE;
      }
      $info['columns'][$column->name] = (array) $column;
      // Provide a clean list of columns that excludes the ones internally created by the
      // database driver.
      if (!(isset($column->name[1]) && substr($column->name, 0, 2) == "__")) {
        $info['columns_clean'][$column->name] = (array) $column;
      }
    }

    // If we have computed columns, it is important to know what other columns they depend on!
    $column_names = array_keys($info['columns']);
    $column_regex = implode('|', $column_names);
    foreach($info['columns'] as &$column) {
      $dependencies = array();
      if (!empty($column['definition'])) {
        $matches = array();
        if (preg_match_all("/\[[{$column_regex}\]]*\]/", $column['definition'], $matches) > 0) {
          $dependencies = array_map(function($m) { return trim($m, "[]"); }, array_shift($matches));
        }
      }
      $column['dependencies'] = array_flip($dependencies);
    }

    // Don't use {} around system tables.
    $result = $this->connection->query_direct('SELECT name FROM sys.identity_columns WHERE object_id = OBJECT_ID(:table)', array(':table' => $table_info['schema'] . '.' . $table_info['table']));
    unset($column);
    $info['identities'] = array();
    $info['identity'] = NULL;
    foreach ($result as $column) {
      $info['identities'][$column->name] = $column->name;
      $info['identity'] = $column->name;
    }

    // Now introspect information about indexes
    $result = $this->connection->query_direct("select tab.[name]  as [table_name],
         idx.[name]  as [index_name],
         allc.[name] as [column_name],
         idx.[type_desc],
         idx.[is_unique],
         idx.[data_space_id],
         idx.[ignore_dup_key],
         idx.[is_primary_key],
         idx.[is_unique_constraint],
         idx.[fill_factor],
         idx.[is_padded],
         idx.[is_disabled],
         idx.[is_hypothetical],
         idx.[allow_row_locks],
         idx.[allow_page_locks],
         idxc.[is_descending_key],
         idxc.[is_included_column],
         idxc.[index_column_id],
         idxc.[key_ordinal]
    FROM sys.[tables] as tab
    INNER join sys.[indexes]       idx  ON tab.[object_id] =  idx.[object_id]
    INNER join sys.[index_columns] idxc ON idx.[object_id] = idxc.[object_id] and  idx.[index_id]  = idxc.[index_id]
    INNER join sys.[all_columns]   allc ON tab.[object_id] = allc.[object_id] and idxc.[column_id] = allc.[column_id]
    WHERE tab.object_id = OBJECT_ID(:table)
    ORDER BY tab.[name], idx.[index_id], idxc.[index_column_id]
                    ",
                  array(':table' => $table_info['schema'] . '.' . $table_info['table']));

    foreach ($result as $index_column) {
      if (!isset($info['indexes'][$index_column->index_name])) {
        $ic = clone $index_column;
        // Only retain index specific details.
        unset($ic->column_name);
        unset($ic->index_column_id);
        unset($ic->is_descending_key);
        unset($ic->table_name);
        unset($ic->key_ordinal);
        $info['indexes'][$index_column->index_name] = (array) $ic;
        if ($index_column->is_primary_key) {
          $info['primary_key_index'] = $ic->index_name;
        }
      }
      $index = &$info['indexes'][$index_column->index_name];
      $index['columns'][$index_column->key_ordinal] = array(
           'name' => $index_column->column_name,
           'is_descending_key' => $index_column->is_descending_key,
           'key_ordinal' => $index_column->key_ordinal,
         );
      // Every columns keeps track of what indexes it is part of.
      $info['columns'][$index_column->column_name]['indexes'][] = $index_column->index_name;
      if (isset($info['columns_clean'][$index_column->column_name])) {
        $info['columns_clean'][$index_column->column_name]['indexes'][] = $index_column->index_name;
      }
    }

    fastcache::cache_set('queryColumnInformation:' . $table, $info, 'schema_queryColumnInformation');

    return $info;
  }

  /**
   * {@Inheritdoc}
   */
  public function createTable($name, $table) {
    if ($this->tableExists($name, FALSE)) {
      throw new DatabaseSchemaObjectExistsException(t('Table %name already exists.', array('%name' => $name)));
    }

    // Reset caches after calling tableExists() otherwise it's results get cached again before
    // the table is created.
    $this->queryColumnInformationInvalidate($name);
    fastcache::cache_clear_all('*', 'tableExists', TRUE);

    // Build the table and its unique keys in a transaction, and fail the whole
    // creation in case of an error.
    $transaction = $this->connection->startTransaction(NULL, DatabaseTransactionSettings::GetDDLCompatibleDefaults());

    // Create the table with a default technical primary key.
    // $this->createTableSql already prefixes the table name, and we must inhibit prefixing at the query level
    // because field default _context_menu_block_active_values definitions can contain string literals with braces.
    $this->connection->query_direct($this->createTableSql($name, $table), array(), array('prefix_tables' => FALSE));

    // If the spec had a primary key, set it now after all fields have been created.
    // We are creating the keys after creating the table so that createPrimaryKey
    // is able to introspect column definition from the database to calculate index sizes
    // This adds quite quite some overhead, but is only noticeable during table creation.
    if (isset($table['primary key']) && is_array($table['primary key'])) {
      $this->createPrimaryKey($name,  $table['primary key']);
    }
    // Otherwise use a technical primary key.
    else {
      $this->createTechnicalPrimaryColumn($name);
    }

    // Now all the unique keys.
    if (isset($table['unique keys']) && is_array($table['unique keys'])) {
      foreach ($table['unique keys'] as $key_name => $key) {
        $this->addUniqueKey($name, $key_name, $key);
      }
    }

    // Commit changes until now.
    $transaction->commit();

    // Create the indexes but ignore any error during the creation. We do that
    // do avoid pulling the carpet under modules that try to implement indexes
    // with invalid data types (long columns), before we come up with a better
    // solution.
    if (isset($table['indexes']) && is_array($table['indexes'])) {
      foreach ($table['indexes'] as $key_name => $key) {
        try {
          $this->addIndex($name, $key_name, $key);
        }
        catch (Exception $e) {
          // Log the exception but do not rollback the transaction.
          watchdog_exception('database', $e);
        }
      }
    }

    // Invalidate introspection cache.
    $this->queryColumnInformationInvalidate($name);
  }

  /**
   * Remove comments from an SQL statement.
   * @see http://stackoverflow.com/questions/9690448/regular-expression-to-remove-comments-from-sql-statement
   *
   * @param mixed $sql
   *  SQL statement to remove the comments from.
   *
   * @param mixed $comments
   *  Comments removed from the statement
   *
   * @return string
   */
  public function removeSQLComments($sql, &$comments = NULL) {
    $sqlComments = '@(([\'"]).*?[^\\\]\2)|((?:\#|--).*?$|/\*(?:[^/*]|/(?!\*)|\*(?!/)|(?R))*\*\/)\s*|(?<=;)\s+@ms';
    /* Commented version
    $sqlComments = '@
    (([\'"]).*?[^\\\]\2) # $1 : Skip single & double quoted expressions
    |(                   # $3 : Match comments
    (?:\#|--).*?$    # - Single line comments
    |                # - Multi line (nested) comments
    /\*             #   . comment open marker
    (?: [^/*]    #   . non comment-marker characters
    |/(?!\*) #   . ! not a comment open
    |\*(?!/) #   . ! not a comment close
    |(?R)    #   . recursive case
    )*           #   . repeat eventually
    \*\/             #   . comment close marker
    )\s*                 # Trim after comments
    |(?<=;)\s+           # Trim after semi-colon
    @msx';
     */
    $uncommentedSQL = trim(preg_replace($sqlComments, '$1', $sql));
    if (is_array($comments)) {
      preg_match_all($sqlComments, $sql, $comments);
      $comments = array_filter($comments[ 3 ]);
    }
    return $uncommentedSQL;
  }

  /**
   * Find if a table already exists. Results are cached, use
   * $reset = TRUE to get a fresh copy.
   *
   * @param $table
   *   Name of the table.
   * @return
   *   True if the table exists, false otherwise.
   */
  public function tableExists($table, $reset = FALSE) {
    // Do not cache temporary tables (#)
    if (!$reset && $table[0] != '#' && $cache = fastcache::cache_get($table, 'tableExists')) {
      return $cache->data;
    }

    // Temporary tables and regular tables cannot be verified in the same way.
    $query = NULL;
    if ($table[0] == '#') {
      $query = "SELECT 1 FROM tempdb.sys.tables WHERE name like '" . $this->connection->prefixTables('{' . $table . '}') . "%'";
    }
    else {
      $query = "SELECT 1 FROM INFORMATION_SCHEMA.tables WHERE table_name = '" . $this->connection->prefixTables('{' . $table . '}') . "'";
    }

    $exists = $this->connection
      ->query_direct($query)
      ->fetchField() !== FALSE;

    if ($table[0] != '#') {
      fastcache::cache_set($table, $exists, 'tableExists');
    }

    return $exists;
  }

  /**
   * Returns an array of current connection user options
   *
   * textsize	2147483647
   * language	us_english
   * dateformat	mdy
   * datefirst	7
   * lock_timeout	-1
   * quoted_identifier	SET
   * arithabort	SET
   * ansi_null_dflt_on	SET
   * ansi_warnings	SET
   * ansi_padding	SET
   * ansi_nulls	SET
   * concat_null_yields_null	SET
   * isolation level	read committed
   *
   * @return mixed
   */
  public function UserOptions() {
    return $this->connection->query_direct('DBCC UserOptions')->fetchAllKeyed();
  }

  /**
   * Retrieve Engine Version information.
   */
  public function EngineVersion() {
    if ($cache = fastcache::cache_get('EngineVersion', 'schema')) {
      return $cache->data;
    }

    $version = $this->connection
    ->query_direct(<<< EOF
    SELECT CONVERT (varchar,SERVERPROPERTY('productversion')) AS VERSION,
    CONVERT (varchar,SERVERPROPERTY('productlevel')) AS LEVEL,
    CONVERT (varchar,SERVERPROPERTY('edition')) AS EDITION
EOF
    )->fetchAssoc();

    fastcache::cache_set('EngineVersion', $version, 'schema');
    return $version;
  }

  /**
   * Retrieve Major Engine Version Number as integer.
   */
  public function EngineVersionNumber() {
    $version = $this->EngineVersion();
    $start = strpos($version['VERSION'], '.');
    return intval(substr($version['VERSION'], 0, $start));
  }

  /**
   * Find if a table function exists.
   *
   * @param $function
   *   Name of the function.
   * @return
   *   True if the function exists, false otherwise.
   */
  public function functionExists($function) {
    // FN = Scalar Function
    // IF = Inline Table Function
    // TF = Table Function
    // FS | AF = Assembly (CLR) Scalar Function
    // FT | AT = Assembly (CLR) Table Valued Function
    return $this->connection
      ->query_direct("SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID('" . $function . "') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT', N'AF')")
      ->fetchField() !== FALSE;
  }

  /**
   * Check if CLR is enabled, required
   * to run GROUP_CONCAT.
   */
  public function CLREnabled() {
    return $this->connection
        ->query_direct("SELECT CONVERT(int, [value]) as [enabled] FROM sys.configurations WHERE name = 'clr enabled'")
        ->fetchField() !== 1;
  }

  /**
   * Check if a column is of variable length.
   */
  private function isVariableLengthType($type) {
    $types = array('nvarchar' => TRUE, 'ntext' => TRUE, 'varchar' => TRUE, 'varbinary' => TRUE, 'image' => TRUE);
    return isset($types[$type]);
  }

  /**
   * Retrieve an array of field specs from
   * an array of field names.
   *
   * @param array $fields
   * @param mixed $table
   */
  private function loadFieldsSpec(array $fields, $table) {
    $result = array();
    $info = $this->queryColumnInformation($table);
    foreach ($fields as $field) {
      $result[$field] = $info['columns'][$field];
    }
    return $result;
  }

  /**
   * Estimates the row size of a clustered index.
   * @see https://msdn.microsoft.com/en-us/library/ms178085.aspx
   */
  public function calculateClusteredIndexRowSizeBytes($table, $fields, $unique = TRUE) {
    // The fields must already be in the database to retrieve their real size.
    $info = $this->queryColumnInformation($table);

    // Specify the number of fixed-length and variable-length columns
    // and calculate the space that is required for their storage.
    $num_cols = count($fields);
    $num_variable_cols = 0;
    $max_var_size = 0;
    $max_fixed_size = 0;
    foreach ($fields as $field) {
      if ($this->isVariableLengthType($info['columns'][$field]['type'])) {
        $num_variable_cols++;
        $max_var_size += $info['columns'][$field]['max_length'];
      }
      else {
        $max_fixed_size += $info['columns'][$field]['max_length'];
      }
    }

    // If the clustered index is nonunique, account for the uniqueifier column.
    if (!$unique) {
      $num_cols++;
      $num_variable_cols++;
      $max_var_size += 4;
    }

    // Part of the row, known as the null bitmap, is reserved to manage column nullability. Calculate its size.
    $null_bitmap = 2 + (($num_cols + 7) / 8);

    // Calculate the variable-length data size.
    $variable_data_size = empty($num_variable_cols) ? 0 : 2 + ($num_variable_cols * 2) + $max_var_size;

    // Calculate total row size.
    $row_size = $max_fixed_size + $variable_data_size + $null_bitmap + 4;

    return $row_size;
  }

  /**
   * Change Database recovery model.
   */
  public function setRecoveryModel($model) {
    $this->connection->query_direct("ALTER " . $this->connection->options['name'] . " model SET RECOVERY " . $model);
  }

  /**
   * Drops the current primary key and creates
   * a new one. If the previous primary key
   * was an internal primary key, it tries to cleant it up.
   *
   * @param mixed $table
   * @param mixed $primary_key_sql
   */
  protected function recreatePrimaryKey($table, $fields) {
    // Drop the existing primary key if exists, if it was a TPK
    // it will get completely dropped.
    $this->cleanUpPrimaryKey($table);
    $this->createPrimaryKey($table, $fields);
  }

  /**
   * Create a Primary Key for the table, does not drop
   * any prior primary keys neither it takes care of cleaning
   * technical primary column. Only call this if you are sure
   * the table does not currently hold a primary key.
   *
   * @param string $table
   * @param mixed $fields
   * @param int $limit
   */
  private function createPrimaryKey($table, $fields, $limit = 900) {
    // To be on the safe side, on the most restrictive use case the limit
    // for a primary key clustered index is of 128 bytes (usually 900).
    // @see http://blogs.msdn.com/b/jgalla/archive/2005/08/18/453189.aspx
    // If that is going to be exceeded, use a computed column.
    $csv_fields = $this->createKeySql($fields);
    $size = $this->calculateClusteredIndexRowSizeBytes($table, $this->createKeySql($fields, TRUE));
    $result = array();
    $index = FALSE;
    // Add support for nullable columns in a primary key.
    $nullable = FALSE;
    $field_specs = $this->loadFieldsSpec($fields, $table);
    foreach ($field_specs as $field) {
      if ($field['is_nullable'] == TRUE) {
        $nullable = TRUE;
        break;
      }
    }

    if ($nullable || $size >= $limit) {
      // Use a computed column instead, and create a custom index.
      $result[] = "{$this->COMPUTED_PK_COLUMN_NAME} AS (CONVERT(VARCHAR(32), HASHBYTES('MD5', CONCAT('',{$csv_fields})), 2)) PERSISTED NOT NULL";
      $result[] = "CONSTRAINT {{$table}}_pkey PRIMARY KEY CLUSTERED ({$this->COMPUTED_PK_COLUMN_NAME})";
      $index = TRUE;
    }
    else {
      $result[] = "CONSTRAINT {{$table}}_pkey PRIMARY KEY CLUSTERED ({$csv_fields})";
    }

    $this->connection->query_direct('ALTER TABLE [{' . $table . '}] ADD ' . implode(' ', $result));

    // If we relied on a computed column for the Primary Key,
    // at least index the fields with a regular index.
    if ($index) {
      $this->addIndex($table, $this->COMPUTED_PK_COLUMN_INDEX, $fields);
    }

    // Invalidate current introspection.
    $this->queryColumnInformationInvalidate($table);
  }

  /**
   * Create the SQL needed to add a new technical primary key based on a
   * computed column.
   */
  private function createTechnicalPrimaryKeyIndexSql($table) {
    $result = array();
    $result[] = "{$this->TECHNICAL_PK_COLUMN_NAME} UNIQUEIDENTIFIER DEFAULT NEWID() NOT NULL";
    $result[] = "CONSTRAINT {{$table}}_pkey_technical PRIMARY KEY CLUSTERED ({$this->TECHNICAL_PK_COLUMN_NAME})";
    return implode(' ', $result);
  }

  /**
   * Generate SQL to create a new table from a Drupal schema definition.
   *
   * @param $name
   *   The name of the table to create.
   * @param $table
   *   A Schema API table definition array.
   * @return
   *   The SQL statement to create the table.
   */
  protected function createTableSql($name, $table) {
    $sql_fields = array();
    foreach ($table['fields'] as $field_name => $field) {
      $sql_fields[] = $this->createFieldSql($name, $field_name, $this->processField($field));
    }

    // Use already prefixed table name.
    $table_prefixed = $this->connection->prefixTables('{' . $name . '}');

    $sql = "CREATE TABLE [{$table_prefixed}] (" . PHP_EOL;
    $sql .= implode("," . PHP_EOL, $sql_fields);
    $sql .= PHP_EOL . ")";
    return $sql;
  }

  /**
   * Create an SQL string for a field to be used in table creation or
   * alteration.
   *
   * Before passing a field out of a schema definition into this
   * function it has to be processed by _db_process_field().
   *
   *
   *
   * @param $table
   *    The name of the table.
   * @param $name
   *    Name of the field.
   * @param $spec
   *    The field specification, as per the schema data structure format.
   */
  protected function createFieldSql($table, $name, $spec, $skip_checks = FALSE) {

    $sql = $this->connection->quoteIdentifier($name) . ' ' . $spec['sqlsrv_type_full'];

    // When binary is true, case sensitivity is requested.
    if (isset($spec['sqlsrv_collation'])) {
      $sql .= ' COLLATE ' . $spec['sqlsrv_collation'];
    }

    if (isset($spec['not null']) && $spec['not null'] == TRUE) {
      $sql .= ' NOT NULL';
    }

    if (!$skip_checks) {
      if (isset($spec['default'])) {
        // Use a prefixed table.
        $table_prefixed = $this->connection->prefixTables('{' . $table . '}');
        $default = $this->defaultValueExpression($spec['sqlsrv_type'], $spec['default']);
        $sql .= " CONSTRAINT {$table_prefixed}_{$name}_df DEFAULT  $default";
      }
      if (!empty($spec['identity'])) {
        $sql .= ' IDENTITY';
      }
      if (!empty($spec['unsigned'])) {
        $sql .= ' CHECK (' . $this->connection->quoteIdentifier($name) . ' >= 0)';
      }
    }
    return $sql;
  }

  /**
   * Get the SQL expression for a default value.
   *
   * @param mixed $table
   * @param mixed $field
   * @param mixed $default
   */
  private function defaultValueExpression($sqlsr_type, $default) {
    // The actual expression depends on the target data type as it might require conversions.
    $result = is_string($default) ? "'" . addslashes($default) . "'" : $default;
    if (\DatabaseUtils::GetMSSQLType($sqlsr_type) == 'varbinary') {
      $default = addslashes($default);
      $result = "CONVERT({$sqlsr_type}, '{$default}')";
    }
    return $result;
  }

  /**
   * Returns a list of field names coma separated ready
   * to be used in a SQL Statement.
   *
   * @param array $fields
   * @param boolean $as_array
   * @return array|string
   */
  protected function createKeySql($fields, $as_array = FALSE) {
    $ret = array();
    foreach ($fields as $field) {
      if (is_array($field)) {
        $ret[] = $field[0];
      }
      else {
        $ret[] = $field;
      }
    }
    if ($as_array) {
      return $ret;
    }
    return implode(', ', $ret);
  }

  /**
   * Returns the SQL needed (incomplete) to create and index. Supports XML indexes.
   *
   * @param string $table
   *   Table to create the index on.
   *
   * @param string $name
   *   Name of the index.
   *
   * @param array $fields
   *   Fields to be included in the Index.
   *
   * @return string
   */
  protected function createIndexSql($table, $name, $fields, &$xml_field) {
    // Get information about current columns.
    $info = $this->queryColumnInformation($table);
    // Flatten $fields array if neccesary.
    $fields = $this->createKeySql($fields, TRUE);
    // Look if an XML column is present in the fields list.
    $xml_field = NULL;
    foreach ($fields as $field) {
      if (isset($info['columns'][$field]['type']) && $info['columns'][$field]['type'] == 'xml') {
        $xml_field = $field;
        break;
      }
    }
    // XML indexes can only have 1 column.
    if (!empty($xml_field) && isset($fields[1])) {
      throw new Exception("Cannot include an XML field on a multiple column index.");
    }
    // No more than one XML index per table.
    if ($xml_field && $this->tableHasXmlIndex($table)) {
      throw new Exception("Only one primary clustered XML index is allowed per table.");
    }
    if (empty($xml_field)) {
      // TODO: As we are already doing with primary keys, when a user requests
      // an index that is too big for SQL Server (> 900 bytes) this could be dependant
      // on a computed hash column.
      $fields_csv = implode(', ', $fields);
      return "CREATE INDEX {$name}_idx ON [{{$table}}] ({$fields_csv})";
    }
    else {
      return "CREATE PRIMARY XML INDEX {$name}_idx ON [{{$table}}] ({$xml_field})";
    }
  }

  /**
   * Set database-engine specific properties for a field.
   *
   * @param $field
   *   A field description array, as specified in the schema documentation.
   */
  protected function processField($field) {

    // Default size to normal.
    if (!isset($field['size'])) {
      $field['size'] = 'normal';
    }

    // Set the correct database-engine specific datatype.
    if (!isset($field['sqlsrv_type'])) {
      $map = $this->getFieldTypeMap();
      $field['sqlsrv_type'] = $map[$field['type'] . ':' . $field['size']];
    }

    // Serial is identity.
    if ($field['type'] == 'serial') {
      $field['identity'] = TRUE;
    }

    // If this is a text field.
    if (!isset($field['sqlsrv_is_text'])) {
      $field['sqlsrv_is_text'] = in_array($field['sqlsrv_type'], array('char', 'varchar', 'text', 'nchar', 'nvarchar', 'ntext'));
    }

    // Collation only makes sense for text fields
    // Detect target collation
    if ($field['sqlsrv_is_text'] && !isset($field['sqlsrv_collation'])) {
      if (!empty($field['collation'])) {
        // Try to match to an SQL Server collation
        switch($field['collation']) {
          case 'ascii_bin':
            $field['sqlsrv_collation'] = 'Latin1_General_BIN';
            break;
        }
      }

      // If still no collation, resort to default behaviour.
      if (empty($field['sqlsrv_collation'])) {
        if ($field['sqlsrv_is_text'] === TRUE && isset($field['binary']) && $field['binary'] === TRUE) {
          $field['sqlsrv_collation'] = self::DEFAULT_COLLATION_CS;
        }
        else {
          $field['sqlsrv_collation'] = self::DEFAULT_COLLATION_CI;
        }
      }
    }

    // The full native type (TYPE (LENGTH))
    if (!isset($field['sqlsrv_type_full'])) {
      $sqlsrv_type_full = $field['sqlsrv_type'];
      if ($field['sqlsrv_is_text'] === TRUE && !empty($field['length'])) {
        $sqlsrv_type_full .= '(' . $field['length'] . ')';
      }
      elseif (in_array($field['sqlsrv_type'], array('numeric', 'decimal')) && isset($field['precision']) && isset($field['scale'])) {
        // Maximum precision for SQL Server 2008 or greater is 38.
        // For previous versions it's 28.
        if ($field['precision'] > 38) {
          $field['precision'] = 38;
        }
        $sqlsrv_type_full .= '(' . $field['precision'] . ', ' . $field['scale'] . ')';
      }

      $field['sqlsrv_type_full'] = $sqlsrv_type_full;

    }

    

    return $field;
  }

  /**
   * This maps a generic data type in combination with its data size
   * to the engine-specific data type.
   */
  function getFieldTypeMap() {
    // Put :normal last so it gets preserved by array_flip.  This makes
    // it much easier for modules (such as schema.module) to map
    // database types back into schema types.
    return array(
      'varchar:normal' => 'nvarchar',
      'char:normal' => 'nchar',

      'text:tiny' => 'nvarchar(max)',
      'text:small' => 'nvarchar(max)',
      'text:medium' => 'nvarchar(max)',
      'text:big' => 'nvarchar(max)',
      'text:normal' => 'nvarchar(max)',

      'serial:tiny'     => 'smallint',
      'serial:small'    => 'smallint',
      'serial:medium'   => 'int',
      'serial:big'      => 'bigint',
      'serial:normal'   => 'int',

      'int:tiny' => 'smallint',
      'int:small' => 'smallint',
      'int:medium' => 'int',
      'int:big' => 'bigint',
      'int:normal' => 'int',

      'float:tiny' => 'real',
      'float:small' => 'real',
      'float:medium' => 'real',
      'float:big' => 'float(53)',
      'float:normal' => 'real',

      'numeric:normal' => 'numeric',

      'blob:big' => 'varbinary(max)',
      'blob:normal' => 'varbinary(max)',

      'datetime:normal' => 'timestamp',
      'date:normal'     => 'date',
      'datetime:normal' => 'datetime2(0)',
      'time:normal'     => 'time(0)',
    );
  }

  /**
   * Override DatabaseSchema::renameTable().
   *
   * @status complete
   */
  public function renameTable($table, $new_name) {
    if (!$this->tableExists($table, TRUE)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot rename %table to %table_new: table %table doesn't exist.", array('%table' => $table, '%table_new' => $new_name)));
    }
    if ($this->tableExists($new_name, TRUE)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot rename %table to %table_new: table %table_new already exists.", array('%table' => $table, '%table_new' => $new_name)));
    }

    $old_table_info = $this->getPrefixInfo($table);
    $new_table_info = $this->getPrefixInfo($new_name);

    // We don't support renaming tables across schemas (yet).
    if ($old_table_info['schema'] != $new_table_info['schema']) {
      throw new PDOException(t('Cannot rename a table across schema.'));
    }

    // Borrar la caché de table_exists
    fastcache::cache_clear_all('*', 'tableExists', TRUE);

    $this->connection->query_direct('EXEC sp_rename :old, :new', array(
      ':old' => $old_table_info['schema'] . '.' . $old_table_info['table'],
      ':new' => $new_table_info['table'],
    ));

    // Constraint names are global in SQL Server, so we need to rename them
    // when renaming the table. For some strange reason, indexes are local to
    // a table.
    $objects = $this->connection->query_direct('SELECT name FROM sys.objects WHERE parent_object_id = OBJECT_ID(:table)', array(':table' => $new_table_info['schema'] . '.' . $new_table_info['table']));
    foreach ($objects as $object) {
      if (preg_match('/^' . preg_quote($old_table_info['table']) . '_(.*)$/', $object->name, $matches)) {
        $this->connection->query_direct('EXEC sp_rename :old, :new, :type', array(
          ':old' => $old_table_info['schema'] . '.' . $object->name,
          ':new' => $new_table_info['table'] . '_' . $matches[1],
          ':type' => 'OBJECT',
        ));
      }
    }
  }

  /**
   * Override DatabaseSchema::dropTable().
   *
   * @status tested
   */
  public function dropTable($table) {
    if (!$this->tableExists($table, TRUE)) {
      return FALSE;
    }
    $this->connection->query_direct('DROP TABLE {' . $table . '}');
    fastcache::cache_clear_all('*', 'tableExists', TRUE);
    return TRUE;
  }

  public function fieldExists($table, $field) {
    return $this->connection
        ->query_direct("SELECT 1 FROM INFORMATION_SCHEMA.columns WHERE table_name = '" . $this->connection->prefixTables('{' . $table . '}') . "' AND column_name = '"  . $field . "'")
        ->fetchField() !== FALSE;
  }

  /**
   * Override DatabaseSchema::addField().
   *
   * @status complete
   */
  public function addField($table, $field, $spec, $new_keys = array()) {
    if (!$this->tableExists($table, TRUE)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add field %table.%field: table doesn't exist.", array('%field' => $field, '%table' => $table)));
    }
    if ($this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add field %table.%field: field already exists.", array('%field' => $field, '%table' => $table)));
    }

    /** @var DatabaseTransaction_sqlsrv $transaction */
    $transaction = $this->connection->startTransaction(NULL, DatabaseTransactionSettings::GetDDLCompatibleDefaults());

    // Prepare the specifications.
    $spec = $this->processField($spec);

    // Clear column information for table.
    $this->queryColumnInformationInvalidate($table);

    // Use already prefixed table name.
    $table_prefixed = $this->connection->prefixTables('{' . $table . '}');

    // If the field is declared NOT NULL, we have to first create it NULL insert
    // the initial data (or populate default values) and then switch to NOT NULL.
    $fixnull = FALSE;
    if (isset($spec['not null']) && $spec['not null'] == TRUE) {
      $fixnull = TRUE;
      $spec['not null'] = FALSE;
    }

    // Create the field.
    // Because the default values of fields can contain string literals
    // with braces, we CANNOT allow the driver to prefix tables because the algorithm
    // to do so is a crappy str_replace.
    $query = "ALTER TABLE {$table_prefixed} ADD ";
    $query .= $this->createFieldSql($table, $field, $spec);
    $this->connection->query_direct($query, array(), array('prefix_tables' => FALSE));

    // Clear column information for table.
    $this->queryColumnInformationInvalidate($table);

    // Load the initial data.
    if (isset($spec['initial'])) {
      $this->connection->update($table)
        ->fields(array($field => $spec['initial']))
        ->execute();
    }

    // Switch to NOT NULL now.
    if ($fixnull === TRUE) {
      // There is no warranty that the old data did not have NULL values, we need to populate
      // nulls with the default value because this won't be done by MSSQL by default.
      if (isset($spec['default'])) {
        $default_expression = $this->defaultValueExpression($spec['sqlsrv_type'], $spec['default']);
        $this->connection->query_direct("UPDATE [$table_prefixed] SET [$field] = $default_expression WHERE [$field] IS NULL", array(), array('prefix_tables' => FALSE));
      }
      // Now it's time to make this non-nullable.
      $spec['not null'] = TRUE;
      $this->connection->query_direct("ALTER TABLE [$table_prefixed] ALTER COLUMN " . $this->createFieldSql($table, $field, $spec, TRUE), array(), array('prefix_tables' => FALSE));
    }

    // Add the new keys.
    if (isset($new_keys)) {
      $this->recreateTableKeys($table, $new_keys);
    }

    // Commit.
    $transaction->commit();

    // Clear column information for table.
    $this->queryColumnInformationInvalidate($table);
  }

  /**
   * Sometimes the size of a table's primary key index needs
   * to be reduced to allow for Primary XML Indexes.
   *
   * @param string $table
   * @param int $limit
   */
  public function compressPrimaryKeyIndex($table, $limit = 900) {
    // Introspect the schema and save the current primary key if the column
    // we are modifying is part of it.
    $primary_key_fields = $this->introspectPrimaryKeyFields($table);

    // SQL Server supports transactional DDL, so we can just start a transaction
    // here and pray for the best.
    $transaction = $this->connection->startTransaction(NULL, DatabaseTransactionSettings::GetDDLCompatibleDefaults());

    // Clear current Primary Key.
    $this->cleanUpPrimaryKey($table);

    // Recreate the Primary Key with the given limit size.
    $this->createPrimaryKey($table, $primary_key_fields, $limit);

    $transaction->commit();

    // Refresh introspection for this table.
    $this->queryColumnInformation($table, TRUE);

  }

  /**
   * Override DatabaseSchema::changeField().
   *
   * @status complete
   */
  public function changeField($table, $field, $field_new, $spec, $new_keys = array()) {
    if (!$this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot change the definition of field %table.%name: field doesn't exist.", array('%table' => $table, '%name' => $field)));
    }
    if (($field != $field_new) && $this->fieldExists($table, $field_new)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot rename field %table.%name to %name_new: target field already exists.", array('%table' => $table, '%name' => $field, '%name_new' => $field_new)));
    }

    // SQL Server supports transactional DDL, so we can just start a transaction
    // here and pray for the best.

    /** @var DatabaseTransaction_sqlsrv $transaction */
    $transaction = $this->connection->startTransaction(NULL, DatabaseTransactionSettings::GetDDLCompatibleDefaults());

    // Prepare the specifications.
    $spec = $this->processField($spec);

    // IMPORTANT NOTE: To maintain database portability, you have to explicitly recreate all indices and primary keys that are using the changed field.
    // That means that you have to drop all affected keys and indexes with db_drop_{primary_key,unique_key,index}() before calling db_change_field().
    // @see https://api.drupal.org/api/drupal/includes!database!database.inc/function/db_change_field/7
    //
    // What we are going to do in the SQL Server Driver is a best-effort try to preserve original keys if they do not conflict
    // with the new_keys parameter, and if the callee has done it's job (droping constraints/keys) then they will of course not be recreated.

    // Introspect the schema and save the current primary key if the column
    // we are modifying is part of it. Make sure the schema is FRESH.
    $this->queryColumnInformationInvalidate($table);
    $primary_key_fields = $this->introspectPrimaryKeyFields($table);
    if (in_array($field, $primary_key_fields)) {
      // Let's drop the PK
      $this->cleanUpPrimaryKey($table);
    }

    // If there is a generated unique key for this field, we will need to
    // add it back in when we are done
    $unique_key = $this->uniqueKeyExists($table, $field);

    // Drop the related objects.
    $this->dropFieldRelatedObjects($table, $field);

    // Use already prefixed table name.
    $table_prefixed = $this->connection->prefixTables('{' . $table . '}');

    // Start by renaming the current column.
    $this->connection->query_direct('EXEC sp_rename :old, :new, :type', array(
      ':old' => "[$table_prefixed].$field",
      ':new' => $field . '_old',
      ':type' => 'COLUMN',
    ));

    // If the new column does not allow nulls, we need to
    // create it first as nullable, then either migrate
    // data from previous column or populate default values.
    $fixnull = FALSE;
    if (isset($spec['not null']) && $spec['not null'] == TRUE) {
      $fixnull = TRUE;
      $spec['not null'] = FALSE;
    }

    // Create a new field.
    $this->addField($table, $field_new, $spec);

    // Migrate the data over.
    // Explicitly cast the old value to the new value to avoid conversion errors.
    $collate_expression = isset($spec['sqlsrv_collation']) ? "COLLATE {$spec['sqlsrv_collation']}" : "";
    $this->connection->query_direct("UPDATE [{{$table}}] SET [{$field_new}] = CAST([{$field}_old] {$collate_expression} AS {$spec['sqlsrv_type_full']})");

    // Switch to NOT NULL now.
    if ($fixnull === TRUE) {
      // There is no warranty that the old data did not have NULL values, we need to populate
      // nulls with the default value because this won't be done by MSSQL by default.
      if (isset($spec['default'])) {
        $default_expression = $this->defaultValueExpression($spec['sqlsrv_type'], $spec['default']);
        $this->connection->query_direct("UPDATE [$table_prefixed] SET [{$field_new}] = {$default_expression} WHERE [{$field_new}] IS NULL", array(), array('prefix_tables' => FALSE));
      }
      // Now it's time to make this non-nullable.
      $spec['not null'] = TRUE;
      $this->connection->query_direct("ALTER TABLE [$table_prefixed] ALTER COLUMN " . $this->createFieldSql($table, $field_new, $spec, TRUE), array(), array('prefix_tables' => FALSE));
    }

    // Initialize new keys.
    if (!isset($new_keys)) {
      $new_keys = array(
        'unique keys' => array(),
        'primary keys' => array()
      );
    }

    // Recreate the primary key if no new primary key
    // has been sent along with the change field.
    if (in_array($field, $primary_key_fields) && (!isset($new_keys['primary keys']) || empty($new_keys['primary keys']))) {
      // The new primary key needs to have
      // the new column name.
      unset($primary_key_fields[$field]);
      $primary_key_fields[$field_new] = $field_new;
      $new_keys['primary key'] = $primary_key_fields;
    }

    // Recreate the unique constraint if it existed.
    if ($unique_key && !isset($new_keys['unique keys']) && !in_array($field_new, $new_keys['unique keys'])) {
      $new_keys['unique keys'][] = $field_new;
    }

    // Drop the old field.
    $this->dropField($table, $field . '_old');

    // Add the new keys.
    $this->recreateTableKeys($table, $new_keys);

    // Refresh introspection for this table.
    $this->queryColumnInformationInvalidate($table);

    // Commit.
    $transaction->commit();
  }

  /**
   * Return size information for current database.
   */
  public function getSizeInfo() {
    $sql = <<< EOF
      SELECT
    DB_NAME(db.database_id) DatabaseName,
    (CAST(mfrows.RowSize AS FLOAT)*8)/1024 RowSizeMB,
    (CAST(mflog.LogSize AS FLOAT)*8)/1024 LogSizeMB,
    (CAST(mfstream.StreamSize AS FLOAT)*8)/1024 StreamSizeMB,
    (CAST(mftext.TextIndexSize AS FLOAT)*8)/1024 TextIndexSizeMB
FROM sys.databases db
    LEFT JOIN (SELECT database_id, SUM(size) RowSize FROM sys.master_files WHERE type = 0 GROUP BY database_id, type) mfrows ON mfrows.database_id = db.database_id
    LEFT JOIN (SELECT database_id, SUM(size) LogSize FROM sys.master_files WHERE type = 1 GROUP BY database_id, type) mflog ON mflog.database_id = db.database_id
    LEFT JOIN (SELECT database_id, SUM(size) StreamSize FROM sys.master_files WHERE type = 2 GROUP BY database_id, type) mfstream ON mfstream.database_id = db.database_id
    LEFT JOIN (SELECT database_id, SUM(size) TextIndexSize FROM sys.master_files WHERE type = 4 GROUP BY database_id, type) mftext ON mftext.database_id = db.database_id
    WHERE DB_NAME(db.database_id) = :database
EOF
;
    // Database is defaulted from active connection.
    $options = $this->connection->getConnectionOptions();
    $database = $options['database'];
    return $this->connection->query_direct($sql, array(':database' => $database))->fetchObject();
  }

  /**
   * Get database information from sys.databases
   *
   * @return mixed
   */
  public function getDatabaseInfo() {
    if ($cache = fastcache::cache_get('getDatabaseInfo', 'schema')) {
      return $cache->data;
    }

    $sql = <<< EOF
      select name
        , db.snapshot_isolation_state
        , db.snapshot_isolation_state_desc
        , db.is_read_committed_snapshot_on
        , db.recovery_model
        , db.recovery_model_desc
        , db.collation_name
    from sys.databases db
    WHERE DB_NAME(db.database_id) = :database
EOF
;
    // Database is defaulted from active connection.
    $options = $this->connection->getConnectionOptions();
    $database = $options['database'];
    $result = $this->connection->query_direct($sql, array(':database' => $database))->fetchObject();
    fastcache::cache_set('getDatabaseInfo', $result, 'schema');
    return $result;
  }

  /**
   * Get the collation of current connection wether
   * it has or not a database defined in it.
   *
   * @param string $table
   * @param string $column
   *
   * @return string
   */
  public function getCollation($table = NULL, $column = NULL) {
    // No table or column provided, then get info about
    // database (if exists) or server defaul collation.
    if (empty($table) && empty($column)) {
      // Database is defaulted from active connection.
      $options = $this->connection->getConnectionOptions();
      $database = $options['database'];
      if (!empty($database)) {
        // Default collation for specific table.
        $sql = "SELECT CONVERT (varchar, DATABASEPROPERTYEX('$database', 'collation'))";
        return $this->connection->query_direct($sql)->fetchField();
      }
      else {
        // Server default collation.
        $sql = "SELECT SERVERPROPERTY ('collation') as collation";
        return $this->connection->query_direct($sql)->fetchField();
      }
    }

    $sql = <<< EOF
      SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, COLLATION_NAME, DATA_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = :schema
        AND TABLE_NAME = :table
        AND COLUMN_NAME = :column
EOF
;
    $params = array();
    $params[':schema'] = $this->defaultSchema;
    $params[':table'] = $table;
    $params[':column'] = $column;
    $result = $this->connection->query_direct($sql, $params)->fetchObject();
    return $result->COLLATION_NAME;
  }

  /**
   * Get the list of fields participating in the Primary Key
   *
   * @param string $table
   * @param string $field
   *
   * @return string[]
   */
  public function introspectPrimaryKeyFields($table) {
    $data = $this->queryColumnInformation($table, TRUE);
    // All primary keys have a default index,
    // use that to see if we have a primary key
    // before iterating.
    if (!isset($data['primary_key_index']) || !isset($data['indexes'][$data['primary_key_index']])) {
      return array();
    }
    $result = array();
    $index = $data['indexes'][$data['primary_key_index']];
    foreach ($index['columns'] as $column) {
      if ($column['name'] != $this->COMPUTED_PK_COLUMN_NAME) {
        $result[$column['name']] = $column['name'];
      }
      // Get full column definition
      $c = $data['columns'][$column['name']];
      // If this column depends on other columns
      // the other columns are also part of the index!
      // We don't support nested computed columns here.
      foreach ($c['dependencies'] as $name => $order) {
        $result[$name] = $name;
      }
    }
    return $result;
  }

  /**
   * Re-create keys associated to a table.
   */
  protected function recreateTableKeys($table, $new_keys) {
    if (isset($new_keys['primary key'])) {
      $this->addPrimaryKey($table, $new_keys['primary key']);
    }
    if (isset($new_keys['unique keys'])) {
      foreach ($new_keys['unique keys'] as $name => $fields) {
        $this->addUniqueKey($table, $name, $fields);
      }
    }
    if (isset($new_keys['indexes'])) {
      foreach ($new_keys['indexes'] as $name => $fields) {
        $this->addIndex($table, $name, $fields);
      }
    }
  }

  /**
   * Override DatabaseSchema::dropField().
   *
   * @status complete
   */
  public function dropField($table, $field) {
    if (!$this->fieldExists($table, $field)) {
      return FALSE;
    }

    // Drop the related objects.
    $this->dropFieldRelatedObjects($table, $field);
    $this->connection->query_direct('ALTER TABLE {' . $table . '} DROP COLUMN ' . $field);
    // Clear introspection cache.
    $this->queryColumnInformationInvalidate($table);
    return TRUE;
  }

  /**
   * Drop the related objects of a column (indexes, constraints, etc.).
   *
   * @status complete
   */
  protected function dropFieldRelatedObjects($table, $field) {
    // Fetch the list of indexes referencing this column.
    $indexes = $this->connection->query_direct('SELECT DISTINCT i.name FROM sys.columns c INNER JOIN sys.index_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id INNER JOIN sys.indexes i ON i.object_id = ic.object_id AND i.index_id = ic.index_id WHERE i.is_primary_key = 0 AND i.is_unique_constraint = 0 AND c.object_id = OBJECT_ID(:table) AND c.name = :name', array(
      ':table' => $this->connection->prefixTables('{' . $table . '}'),
      ':name' => $field,
    ));
    foreach ($indexes as $index) {
      $this->connection->query_direct('DROP INDEX [' . $index->name . '] ON [{' . $table . '}]');
    }

    // Fetch the list of check constraints referencing this column.
    $constraints = $this->connection->query_direct('SELECT DISTINCT cc.name FROM sys.columns c INNER JOIN sys.check_constraints cc ON cc.parent_object_id = c.object_id AND cc.parent_column_id = c.column_id WHERE c.object_id = OBJECT_ID(:table) AND c.name = :name', array(
      ':table' => $this->connection->prefixTables('{' . $table . '}'),
      ':name' => $field,
    ));
    foreach ($constraints as $constraint) {
      $this->connection->query_direct('ALTER TABLE [{' . $table . '}] DROP CONSTRAINT [' . $constraint->name . ']');
    }

    // Fetch the list of default constraints referencing this column.
    $constraints = $this->connection->query_direct('SELECT DISTINCT dc.name FROM sys.columns c INNER JOIN sys.default_constraints dc ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id WHERE c.object_id = OBJECT_ID(:table) AND c.name = :name', array(
      ':table' => $this->connection->prefixTables('{' . $table . '}'),
      ':name' => $field,
    ));
    foreach ($constraints as $constraint) {
      $this->connection->query_direct('ALTER TABLE [{' . $table . '}] DROP CONSTRAINT [' . $constraint->name . ']');
    }

    // Drop any indexes on related computed columns when we have some.
    if ($this->uniqueKeyExists($table, $field)) {
      $this->dropUniqueKey($table, $field);
    }

    // If this column is part of a computed primary key, drop the key.
    $data = $this->queryColumnInformation($table, TRUE);
    if (isset($data['columns'][$this->COMPUTED_PK_COLUMN_NAME]['dependencies'][$field])) {
      $this->cleanUpPrimaryKey($table);
    }
  }

  /**
   * Override DatabaseSchema::fieldSetDefault().
   *
   * @status complete
   */
  public function fieldSetDefault($table, $field, $default) {
    throw new \Exception('Not implemented.');
    if (!$this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot set default value of field %table.%field: field doesn't exist.", array('%table' => $table, '%field' => $field)));
    }

    if ($default === NULL) {
      $default = 'NULL';
    }
    elseif (is_string($default)) {
      $default = "'" . addslashes($default) . "'";
    }

    // Try to remove any existing default first.
    try { $this->fieldSetNoDefault($table, $field); } catch (Exception $e) {}

    // Create the new default.
    $this->connection->query_direct('ALTER TABLE [{' . $table . '}] ADD CONSTRAINT {' . $table . '}_' . $field . '_df DEFAULT ' . $default . ' FOR [' . $field . ']');
  }

  /**
   * Override DatabaseSchema::fieldSetNoDefault().
   *
   * @status complete
   */
  public function fieldSetNoDefault($table, $field) {
    if (!$this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot remove default value of field %table.%field: field doesn't exist.", array('%table' => $table, '%field' => $field)));
    }

    $this->connection->query_direct('ALTER TABLE [{' . $table . '}] DROP CONSTRAINT {' . $table . '}_' . $field . '_df');
  }

  /**
   * Override DatabaseSchema::addPrimaryKey().
   *
   * @status tested
   */
  public function addPrimaryKey($table, $fields) {
    if (!$this->tableExists($table, TRUE)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add primary key to table %table: table doesn't exist.", array('%table' => $table)));
    }

    if ($primary_key_name = $this->primaryKeyName($table)) {
      if ($this->isTechnicalPrimaryKey($primary_key_name)) {
        // Destroy the existing technical primary key.
        $this->connection->query_direct('ALTER TABLE [{' . $table . '}] DROP CONSTRAINT [' . $primary_key_name . ']');
        $this->cleanUpTechnicalPrimaryColumn($table);
      }
      else {
        throw new DatabaseSchemaObjectExistsException(t("Cannot add primary key to table %table: primary key already exists.", array('%table' => $table)));
      }
    }

    // The size limit of the primary key depends on the
    // cohexistance with an XML field.
    if ($this->tableHasXmlIndex($table)) {
      $this->createPrimaryKey($table, $fields, 128);
    }
    else {
      $this->createPrimaryKey($table, $fields);
    }

    return TRUE;
  }

  /**
   * Override DatabaseSchema::dropPrimaryKey().
   *
   * @status tested
   */
  public function dropPrimaryKey($table) {
    if (!$this->primaryKeyName($table)) {
      return FALSE;
    }
    $this->cleanUpPrimaryKey($table);
    $this->createTechnicalPrimaryColumn($table);
    $this->connection->query_direct("ALTER TABLE [{{$table}}] ADD CONSTRAINT {{$table}}_pkey_technical PRIMARY KEY CLUSTERED ({$this->TECHNICAL_PK_COLUMN_NAME})");
    return TRUE;
  }

  /**
   * Return the name of the primary key of a table if it exists.
   */
  protected function primaryKeyName($table) {
    $table = $this->connection->prefixTables('{' . $table . '}');
    return $this->connection->query_direct('SELECT name FROM sys.key_constraints WHERE parent_object_id = OBJECT_ID(:table) AND type = :type', array(
      ':table' => $table,
      ':type' => 'PK',
    ))->fetchField();
  }

  /**
   * Check if a key is a technical primary key.
   */
  protected function isTechnicalPrimaryKey($key_name) {
    return $key_name && preg_match('/_pkey_technical$/', $key_name);
  }

  /**
   * Add a primary column to the table.
   */
  protected function createTechnicalPrimaryColumn($table) {
    if (!$this->fieldExists($table, $this->TECHNICAL_PK_COLUMN_NAME)) {
      $this->connection->query_direct("ALTER TABLE {{$table}} ADD {$this->TECHNICAL_PK_COLUMN_NAME} UNIQUEIDENTIFIER DEFAULT NEWID() NOT NULL");
    }
  }

  /**
   * Drop the primary key constraint.
   * @param mixed $table
   */
  protected function cleanUpPrimaryKey($table) {
    // We are droping the constraint, but not the column.
    if ($existing_primary_key = $this->primaryKeyName($table)) {
      $this->connection->query_direct("ALTER TABLE [{{$table}}] DROP CONSTRAINT {$existing_primary_key}");
    }
    // We are using computed columns to store primary keys,
    // try to remove it if it exists.
    if ($this->fieldExists($table, $this->COMPUTED_PK_COLUMN_NAME)) {
      // The TCPK has compensation indexes that need to be cleared.
      $this->dropIndex($table, $this->COMPUTED_PK_COLUMN_INDEX);
      $this->dropField($table, $this->COMPUTED_PK_COLUMN_NAME);
    }
    // Try to get rid of the TPC
    $this->cleanUpTechnicalPrimaryColumn($table);
  }

  /**
   * Tries to clean up the technical primary column. It will
   * be deleted if
   * (a) It is not being used as the current primary key and...
   * (b) There is no unique constraint because they depend on this column (see addUniqueKey())
   *
   * @param string $table
   */
  protected function cleanUpTechnicalPrimaryColumn($table) {
    // Get the number of remaining unique indexes on the table, that
    // are not primary keys and prune the technical primary column if possible.
    $unique_indexes = $this->connection->query_direct('SELECT COUNT(*) FROM sys.indexes WHERE object_id = OBJECT_ID(:table) AND is_unique = 1 AND is_primary_key = 0', array(':table' => $this->connection->prefixTables('{' . $table . '}')))->fetchField();
    $primary_key_is_technical = $this->isTechnicalPrimaryKey($this->primaryKeyName($table));
    if (!$unique_indexes && !$primary_key_is_technical) {
      $this->dropField($table, $this->TECHNICAL_PK_COLUMN_NAME);
    }
  }

  /**
   * Override DatabaseSchema::addUniqueKey().
   *
   * @status tested
   */
  public function addUniqueKey($table, $name, $fields) {
    if (!$this->tableExists($table, TRUE)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add unique key %name to table %table: table doesn't exist.", array('%table' => $table, '%name' => $name)));
    }
    if ($this->uniqueKeyExists($table, $name)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add unique key %name to table %table: unique key already exists.", array('%table' => $table, '%name' => $name)));
    }

    $this->createTechnicalPrimaryColumn($table);

    // Then, build a expression based on the columns.
    $column_expression = array();
    foreach ($fields as $field) {
      if (is_array($field)) {
        $column_expression[] = 'SUBSTRING(CAST(' . $this->connection->escapeField($field[0]) . ' AS varbinary(max)), 1,' . $field[1] . ')';
      }
      else {
        $column_expression[] = 'CAST(' . $this->connection->escapeField($field) . ' AS varbinary(max))';
      }
    }
    $column_expression = implode(' + ', $column_expression);

    // Build a computed column based on the expression that replaces NULL
    // values with the globally unique identifier generated previously.
    // This is (very) unlikely to result in a collision with any actual value
    // in the columns of the unique key.
    $this->connection->query_direct("ALTER TABLE {{$table}} ADD __unique_{$name} AS CAST(HashBytes('MD4', COALESCE({$column_expression}, CAST({$this->TECHNICAL_PK_COLUMN_NAME} AS varbinary(max)))) AS varbinary(16))");
    $this->connection->query_direct("CREATE UNIQUE INDEX {$name}_unique ON [{{$table}}] (__unique_{$name})");
  }

  /**
   * Override DatabaseSchema::dropUniqueKey().
   */
  public function dropUniqueKey($table, $name) {
    if (!$this->uniqueKeyExists($table, $name)) {
      return FALSE;
    }

    $this->connection->query_direct('DROP INDEX ' . $name . '_unique ON [{' . $table . '}]');
    $this->connection->query_direct('ALTER TABLE [{' . $table . '}] DROP COLUMN __unique_' . $name);

    // Try to clean-up the technical primary key if possible.
    $this->cleanUpTechnicalPrimaryColumn($table);

    return TRUE;
  }

  /**
   * Find if an unique key exists.
   *
   * @status tested
   */
  protected function uniqueKeyExists($table, $name) {
    $table = $this->connection->prefixTables('{' . $table . '}');
    return (bool) $this->connection->query_direct('SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(:table) AND name = :name', array(
      ':table' => $table,
      ':name' => $name . '_unique',
    ))->fetchField();
  }

  /**
   * Override DatabaseSchema::addIndex().
   *
   * @status tested
   */
  public function addIndex($table, $name, $fields) {
    if (!$this->tableExists($table, TRUE)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add index %name to table %table: table doesn't exist.", array('%table' => $table, '%name' => $name)));
    }
    if ($this->indexExists($table, $name)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add index %name to table %table: index already exists.", array('%table' => $table, '%name' => $name)));
    }

    $xml_field = NULL;
    $sql = $this->createIndexSql($table, $name, $fields, $xml_field);
    if (!empty($xml_field)) {
      // We can create an XML field, but the current primary key index
      // size needs to be under 128bytes.
      $pk_fields = $this->introspectPrimaryKeyFields($table);
      $size = $this->calculateClusteredIndexRowSizeBytes($table, $pk_fields, TRUE);
      if ($size > 128) {
        // Alright the compress the index.
        $this->compressPrimaryKeyIndex($table, 128);
      }
    }
    $this->connection->query_direct($sql);
    $this->queryColumnInformationInvalidate($table);
  }

  /**
   * Override DatabaseSchema::dropIndex().
   *
   * @status tested
   */
  public function dropIndex($table, $name) {
    if (!$this->indexExists($table, $name)) {
      return FALSE;
    }

    $expand = FALSE;
    if (($index = $this->tableHasXmlIndex($table)) && $index == ($name . '_idx')) {
      $expand = TRUE;
    }

    $this->connection->query_direct('DROP INDEX ' . $name . '_idx ON [{' . $table . '}]');

    // If we just dropped an XML index, we can re-expand the original primary key index.
    if ($expand) {
      $this->compressPrimaryKeyIndex($table);
    }

    $this->queryColumnInformationInvalidate($table);

    return TRUE;
  }

  /**
   * Override DatabaseSchema::indexExists().
   *
   * @status tested
   */
  public function indexExists($table, $name) {
    // Indexes created through the database schema
    // have the '_idx' prefix.
    return $this->_ExistsIndex($table, $name . '_idx');
  }

  /**
   * Check if a table already has an XML index.
   *
   * @param string $table
   * @param string $name
   */
  public function tableHasXmlIndex($table) {
    $info = $this->queryColumnInformation($table);
    if (isset($info['indexes']) && is_array($info['indexes'])) {
      foreach ($info['indexes'] as $name => $index) {
        if (strcasecmp($index['type_desc'], 'XML') == 0) {
          return $name;
        }
      }
    }
    return FALSE;
  }

  #region Helper Functions

  // These are a set of non Drupal specific SQL Server Helperf functions
  // to deal with tables, indexes, etc... creation/verification/deletion.

  #region Index

  /**
   * Verify if a in index exists in the database.
   *
   * @param mixed $table
   * @param mixed $name
   * @return bool
   */
  public function _ExistsIndex($table, $index) {
    $table = $this->connection->prefixTables('{' . $table . '}');
    return (bool) $this->connection->query_direct('SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(:table) AND name = :name', array(
      ':table' => $table,
      ':name' => $index
    ))->fetchField();
  }

  /**
   * Drop an index, nothing to to if the index does not exists.
   *
   * @param mixed $table
   * @param mixed $index
   * @return void
   */
  public function _DropIndex($table, $index) {
    if (!$this->_ExistsIndex($table, $index)) {
      // Nothing to do....
      return;
    }
    $table = $this->connection->prefixTables('{' . $table . '}');
    $this->connection->query_direct('DROP INDEX :index ON :table',
      array(
        ':index' => $index,
        ':table' => $table,
      )
    );
  }

  #endregion

  #endregion

}

/**
 * @} End of "ingroup schemaapi".
 */