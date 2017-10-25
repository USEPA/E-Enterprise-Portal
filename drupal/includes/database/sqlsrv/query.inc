<?php

/**
 * SQL Server-specific implementation of INSERT.
 *
 * SQL Server doesn't supports multi-insert queries, and needs special handling for
 * binary columns.
 */
class InsertQuery_sqlsrv extends InsertQuery {

  public function __construct($connection, $table, array $options = []) {
    if (!isset($options['return'])) {
      $options['return'] = Database::RETURN_NULL;
    }
    parent::__construct($connection, $table, $options);
  }

  public function execute() {
    if (!$this->preExecute()) {
      return NULL;
    }

    // Fetch the list of blobs and sequences used on that table.
    $columnInformation = $this->connection->schema()->queryColumnInformation($this->table);

    // Find out if there is an identity field set in this insert.
    $this->setIdentity = !empty($columnInformation['identity']) && in_array($columnInformation['identity'], $this->insertFields);
    $identity = !empty($columnInformation['identity']) ? $columnInformation['identity'] : NULL;

    // Retrieve query options.
    $options = $this->queryOptions;

    #region Select Based Insert

    if (!empty($this->fromQuery)) {
      // Re-initialize the values array so that we can re-use this query.
      $this->insertValues = array();

      $stmt = $this->connection->prepareQuery((string) $this);

      // Handle the case of SELECT-based INSERT queries first.
      $arguments = $this->fromQuery->getArguments();
      DatabaseUtils::BindArguments($stmt, $arguments);

      // Run the query
      $this->connection->query($stmt, array(), $options);

      // We can only have 1 identity column per table (or none, where fetchColumn will fail)
      try {
        return $stmt->fetchColumn(0);
      }
      catch(\PDOException $e) {
        return NULL;
      }
    }

    #endregion

    #region Inserts with no values (full defaults)

    // Handle the case of full-default queries.
    if (empty($this->fromQuery) && (empty($this->insertFields) || empty($this->insertValues))) {
      // Re-initialize the values array so that we can re-use this query.
      $this->insertValues = array();
      $stmt = $this->connection->prepareQuery((string) $this);

      // Run the query
      $this->connection->query($stmt, array(), $options);

      // We can only have 1 identity column per table (or none, where fetchColumn will fail)
      try {
        return $stmt->fetchColumn(0);
      }
      catch(\PDOException $e) {
        return NULL;
      }
    }

    #endregion

    #region Regular Inserts

    // Each insert happens in its own query. However, we wrap it in a transaction
    // so that it is atomic where possible.
    $transaction = NULL;

    $batch_size = 200;

    // At most we can process in batches of 250 elements.
    $batch = array_splice($this->insertValues, 0, $batch_size);

    // If we are going to need more than one batch for this... start a transaction.
    if (empty($this->queryOptions['sqlsrv_skip_transactions']) && !empty($this->insertValues)) {
      $transaction = $this->connection->startTransaction('', DatabaseTransactionSettings::GetBetterDefaults());
    }

    while (!empty($batch)) {
      // Give me a query with the amount of batch inserts.
      $query = (string) $this->__toString2(count($batch));

      // Prepare the query.
      $stmt = $this->connection->prepareQuery($query);

      // We use this array to store references to the blob handles.
      // This is necessary because the PDO will otherwise messes up with references.
      $blobs = array();

      $max_placeholder = 0;
      foreach ($batch as $insert_index => $insert_values) {
        $values = array_combine($this->insertFields, $insert_values);
        DatabaseUtils::BindValues($stmt, $values, $blobs, ':db_insert', $columnInformation, $max_placeholder, $insert_index);
      }

      // Run the query
      $this->connection->query($stmt, [], array_merge($options, ['fetch' => PDO::FETCH_ASSOC]));

      // We can only have 1 identity column per table (or none, where fetchColumn will fail)
      // When the column does not have an identity column, no results are thrown back.
      foreach($stmt as $insert) {
        try {
          $this->inserted_keys[] = $insert[$identity];
        }
        catch(\Exception $e) {
          $this->inserted_keys[] = NULL;
        }
      }

      // Fetch the next batch.
      $batch = array_splice($this->insertValues, 0, $batch_size);
    }

    // If we started a transaction, commit it.
    if ($transaction) {
      $transaction->commit();
    }

    // Re-initialize the values array so that we can re-use this query.
    $this->insertValues = array();

    // Return the last inserted key.
    return empty($this->inserted_keys) ? NULL : end($this->inserted_keys);

    #endregion
  }

  // Because we can handle multiple inserts, give
  // an option to retrieve all keys.
  public $inserted_keys = array();

  public function __toString() {
    return $this->__toString2(1);
  }

  /**
   * The aspect of the query depends on the batch size...
   *
   * @param mixed $batch_size
   * @throws Exception
   * @return string
   */
  private function __toString2($batch_size) {
    // Make sure we don't go crazy with this numbers.
    if ($batch_size > 250) {
      throw new Exception("MSSQL Native Batch Insert limited to 250.");
    }

    // Fetch the list of blobs and sequences used on that table.
    $columnInformation = $this->connection->schema()->queryColumnInformation($this->table);

    // Create a sanitized comment string to prepend to the query.
    $prefix = $this->connection->makeComment($this->comments);

    $output = NULL;

    // Enable direct insertion to identity columns if necessary.
    if (!empty($this->setIdentity)) {
      $prefix .= 'SET IDENTITY_INSERT {' . $this->table . '} ON;';
    }

    // Using PDO->lastInsertId() is not reliable on highly concurrent scenarios.
    // It is much better to use the OUTPUT option of SQL Server.
    if (isset($columnInformation['identities']) && !empty($columnInformation['identities'])) {
      $identities = array_keys($columnInformation['identities']);
      $identity = reset($identities);
      $output = "OUTPUT (Inserted.{$identity})";
    }
    else {
      // Empty is the default for
      // a missing lastInsertId()
      $output = "OUTPUT ('')";
    }

    // If we're selecting from a SelectQuery, finish building the query and
    // pass it back, as any remaining options are irrelevant.
    if (!empty($this->fromQuery)) {
      if (empty($this->insertFields)) {
        return $prefix . "INSERT INTO {{$this->table}} {$output}" . $this->fromQuery;
      }
      else {
        $fields_csv = implode(', ', $this->connection->quoteIdentifiers($this->insertFields));
        return $prefix . "INSERT INTO {{$this->table}} ({$fields_csv}) {$output} " . $this->fromQuery;
      }
    }

    // Full default insert
    if (empty($this->insertFields)) {
      return $prefix . "INSERT INTO {{$this->table}} {$output} DEFAULT VALUES";
    }

    // Build the list of placeholders, a set of placeholders
    // for each element in the batch.
    $placeholders = array();
    $field_count = count($this->insertFields);
    for($j = 0; $j < $batch_size; $j++) {
      $batch_placeholders = array();
      for ($i = 0; $i < $field_count; ++$i) {
        $batch_placeholders[] = ':db_insert' . (($field_count * $j) + $i);
      }
      $placeholders[] = '(' . implode(', ', $batch_placeholders) . ')';
    }

    $sql = $prefix . 'INSERT INTO {' . $this->table . '} (' . implode(', ', $this->connection->quoteIdentifiers($this->insertFields)) . ') ' . $output . ' VALUES ' . PHP_EOL;
    $sql .= implode(', ', $placeholders) . PHP_EOL;
    return $sql;
  }
}

/**
 * SQL Server-specific implementation of UPDATE.
 *
 * The specific parts are:
 *  - SQL Server returns the number of matched rows to an UPDATE, and Drupal
 *    requires the number of affected rows to be returned.
 *  - SQL Server requires a special handling for the blobs.
 */
class UpdateQuery_sqlsrv extends UpdateQuery {

  public function execute() {
    // Retrieve query options.
    $options = $this->queryOptions;

    // Fetch the list of blobs and sequences used on that table.
    $columnInformation = $this->connection->schema()->queryColumnInformation($this->table);

    // MySQL is a pretty slut that swallows everything thrown at it,
    // like trying to update an identity field...
    if (isset($columnInformation['identity']) && isset($this->fields[$columnInformation['identity']])) {
      unset($this->fields[$columnInformation['identity']]);
    }

    // Because we filter $fields the same way here and in __toString(), the
    // placeholders will all match up properly.
    $stmt = $this->connection->prepareQuery((string)$this);

    // Expressions take priority over literal fields, so we process those first
    // and remove any literal fields that conflict.
    $fields = $this->fields;
    DatabaseUtils::BindExpressions($stmt, $this->expressionFields, $fields);

    // We use this array to store references to the blob handles.
    // This is necessary because the PDO will otherwise messes up with references.
    $blobs = array();
    DatabaseUtils::BindValues($stmt, $fields, $blobs, ':db_update_placeholder_', $columnInformation);

    // Add conditions.
    if (count($this->condition)) {
      $this->condition->compile($this->connection, $this);
      $arguments = $this->condition->arguments();
      DatabaseUtils::BindArguments($stmt, $arguments);
    }

    $options = $this->queryOptions;
    $options['already_prepared'] = TRUE;

    // Run the statement.
    $this->connection->query($stmt, array(), $options);

    return $stmt->rowCount();
  }

  public function __toString() {
    // Create a sanitized comment string to prepend to the query.
    $prefix = $this->connection->makeComment($this->comments);

    // Expressions take priority over literal fields, so we process those first
    // and remove any literal fields that conflict.
    $fields = $this->fields;
    $update_fields = array();
    foreach ($this->expressionFields as $field => $data) {
      $update_fields[] = $this->connection->quoteIdentifier($field) . '=' . $data['expression'];
      unset($fields[$field]);
    }

    $max_placeholder = 0;
    foreach ($fields as $field => $value) {
      $update_fields[] = $this->connection->quoteIdentifier($field) . '=:db_update_placeholder_' . ($max_placeholder++);
    }

    $query = $prefix . 'UPDATE {' . $this->connection->escapeTable($this->table) . '} SET ' . implode(', ', $update_fields);

    if (count($this->condition)) {
      $this->condition->compile($this->connection, $this);
      // There is an implicit string cast on $this->condition.
      $query .= "\nWHERE " . $this->condition;
    }

    return $query;
  }
}

/**
 * SQL Server-specific implementation of TRUNCATE.
 */
class TruncateQuery_sqlsrv extends TruncateQuery {
  public function __toString() {
    // Create a sanitized comment string to prepend to the query.
    $prefix = $this->connection->makeComment($this->comments);

    return $prefix . 'TRUNCATE TABLE {' . $this->connection->escapeTable($this->table) . '} ';
  }
}

/**
 * SQL Server-specific implementation of the MERGE operation.
 *
 * Tested to be at least 50% faster than parent's implementation.
 */
class MergeQuery_sqlsrv extends MergeQuery {
  public function execute() {

    if (!count($this->condition)) {
      throw new InvalidMergeQueryException(t('Invalid merge query: no conditions'));
    }

    // Retrieve query options.
    $options = $this->queryOptions;

    // Keep a reference to the blobs.
    $blobs = array();

    // Fetch the list of blobs and sequences used on that table.
    $columnInformation = $this->connection->schema()->queryColumnInformation($this->table);

    // Find out if there is an identity field set in this insert.
    $this->setIdentity = !empty($columnInformation['identity']) && in_array($columnInformation['identity'], array_keys($this->insertFields));

    // Initialize placeholder count.
    $max_placeholder = 0;

    // Build the query.
    $stmt = $this->connection->prepareQuery((string)$this);

    // Build the arguments: 1. condition.
    $arguments = $this->condition->arguments();
    DatabaseUtils::BindArguments($stmt, $arguments);

    // 2. When matched part.
    $fields = $this->updateFields;
    DatabaseUtils::BindExpressions($stmt, $this->expressionFields, $fields);
    DatabaseUtils::BindValues($stmt, $fields, $blobs, ':db_merge_placeholder_', $columnInformation, $max_placeholder);

    // 3. When not matched part.
    DatabaseUtils::BindValues($stmt, $this->insertFields, $blobs, ':db_merge_placeholder_', $columnInformation, $max_placeholder);

    // 4. Run the query, this will return UPDATE or INSERT
    // MERGE queries should be atomic, yet you can run into concurrency
    // issues, so implement some retry logic. This is more elaborate and generic
    // in the 8.x-2.x version of the driver, just a quick workaround here.
    try {
      $this->connection->query($stmt, [], $options);
    }
    catch (\PDOException $e) {
      if (in_array((string) $e->getCode(), ['23000'])) {
        // Try again...
        $this->connection->query($stmt, [], $options);
      }
      else {
        // Rethrow.
        throw $e;
      }
    }

    $result = NULL;
    foreach ($stmt as $value) {
      $result = $value->{'$action'};
    }
    switch($result) {
      case 'UPDATE':
        return static::STATUS_UPDATE;
      case 'INSERT':
        return static::STATUS_INSERT;
    }
  }

  public function __toString() {
    // Initialize placeholder count.
    $max_placeholder = 0;
    $max_placeholder_conditions =  0;

    $query = array();

    // Enable direct insertion to identity columns if necessary.
    if (!empty($this->setIdentity)) {
      $query[] = 'SET IDENTITY_INSERT {' . $this->table . '} ON;';
    }

    $query[] = 'MERGE INTO {' . $this->table . '} _target';

    // 1. Condition part.
    $this->condition->compile($this->connection, $this);
    $key_conditions = array();
    $template_item = array();
    $conditions = $this->conditions();
    unset($conditions['#conjunction']);
    foreach ($conditions as $condition) {
      $key_conditions[] = '_target.' . $this->connection->escapeField($condition['field']) . ' = ' . '_source.' . $this->connection->escapeField($condition['field']);
      $template_item[] = ':db_condition_placeholder_' . $max_placeholder_conditions++ . ' AS ' . $this->connection->escapeField($condition['field']);
    }
    $query[] = 'USING (SELECT ' . implode(', ', $template_item) . ') _source ' . PHP_EOL . 'ON ' . implode(' AND ', $key_conditions);

    // 2. "When matched" part.
    // Expressions take priority over literal fields, so we process those first
    // and remove any literal fields that conflict.
    $fields = $this->updateFields;
    $update_fields = array();
    foreach ($this->expressionFields as $field => $data) {
      $update_fields[] = $field . '=' . $data['expression'];
      unset($fields[$field]);
    }

    foreach ($fields as $field => $value) {
      $update_fields[] = $this->connection->quoteIdentifier($field) . '=:db_merge_placeholder_' . ($max_placeholder++);
    }

    if (!empty($update_fields)) {
      $query[] = 'WHEN MATCHED THEN UPDATE SET ' . implode(', ', $update_fields);
    }

    // 3. "When not matched" part.
    if ($this->insertFields) {
      // Build the list of placeholders.
      $placeholders = array();
      for ($i = 0; $i < count($this->insertFields); ++$i) {
        $placeholders[] = ':db_merge_placeholder_' . ($max_placeholder++);
      }

      $query[] = 'WHEN NOT MATCHED THEN INSERT (' . implode(', ', $this->connection->quoteIdentifiers(array_keys($this->insertFields))) . ') VALUES (' . implode(', ', $placeholders) . ')';
    }
    else {
      $query[] = 'WHEN NOT MATCHED THEN INSERT DEFAULT VALUES';
    }

    // Return information about the query.
    $query[] = 'OUTPUT $action;';

    return implode(PHP_EOL, $query);

  }

}