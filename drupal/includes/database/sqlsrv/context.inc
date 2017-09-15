<?php

/**
 * Defines a behaviour scope for the database
 * driver that lasts until the object is destroyed.
 */
class DatabaseContext {

  /**
   * Conection that this context is applied to.
   *
   * @var \DatabaseConnection_sqlsrv
   */
  var $connection;

  /**
   * Bypass SQL Server specific query preprocessing.
   *
   * @var bool
   */
  var $state_bypass = NULL;

  /**
   * Use DIRECT_QUERY feature of the driver so that statements are not prepared.
   *
   * @var bool
   */
  var $state_direct = NULL;

  /**
   * Prepared statement caching enabled for this connection. Incompatible
   * with direct queries.
   *
   * @var bool
   */
  var $statement_caching = NULL;

  /**
   * Define the behaviour of the database driver during the scope of the
   * life of this instance.
   *
   * @param DatabaseConnection_sqlsrv $connection
   *
   *  Instance of the connection to be configured. Leave null to use the
   *  current default connection.
   *
   * @param mixed $bypass_queries
   *
   *  Do not preprocess the query before execution.
   *
   * @param mixed $direct_query
   *
   *  Prepare statements with SQLSRV_ATTR_DIRECT_QUERY = TRUE.
   *
   * @param mixed $statement_caching
   *
   *  Enable prepared statement caching. Cached statements are reused even
   *  after the context has expired.
   *
   */
  public function __construct(\DatabaseConnection_sqlsrv $connection = NULL,
        $bypass_queries = NULL,
        $direct_query = NULL,
        $statement_caching = NULL) {

    if ($connection == NULL) {
      $connection = Database::getConnection();
    }

    $this->connection = $connection;

    $this->state_bypass = $this->connection->bypassQueryPreprocess;
    $this->state_direct = $this->connection->directQuery;
    $this->statement_caching = $this->connection->statementCaching;

    if ($bypass_queries !== NULL) {
      $this->connection->bypassQueryPreprocess = $bypass_queries;
    }

    if ($direct_query !== NULL) {
      $this->connection->directQuery = $direct_query;
    }

    if ($statement_caching !== NULL) {
      $this->connection->statementCaching = $statement_caching;
    }

  }

  public function __destruct() {
    // Restore previous driver configuration.
    $this->connection->bypassQueryPreprocess = $this->state_bypass;
    $this->connection->directQuery = $this->state_direct;
    $this->connection->statementCaching = $this->statement_caching;
  }
}