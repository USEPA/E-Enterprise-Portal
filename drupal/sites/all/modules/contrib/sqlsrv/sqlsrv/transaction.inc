<?php

/**
 * Overriden to bring some commonsense to transaction management.
 *
 * The "sane" approach is to require explicit transaction commits!
 *
 * Drupal uses the other way round, commits are implicit unless you explicitly
 * rollback.
 */
class DatabaseTransaction_sqlsrv extends DatabaseTransaction {

  /**
   * A boolean value to indicate whether this transaction has been commited.
   *
   * @var Boolean
   */
  protected $commited = FALSE;

  /**
   * A boolean to indicate if the transaction scope should behave sanely.
   *
   * @var DatabaseTransactionSettings
   */
  protected $settings = FALSE;

  /**
   * Overriden to add settings.
   *
   * @param DatabaseConnection $connection
   * @param mixed $name
   * @param mixed $sane
   */
  public function __construct(DatabaseConnection $connection, $name = NULL, $settings = NULL) {
    $this->settings = $settings;
    $this->connection = $connection;
    // If there is no transaction depth, then no transaction has started. Name
    // the transaction 'drupal_transaction'.
    if (!$depth = $connection->transactionDepth()) {
      $this->name = 'drupal_transaction';
    }
    // Within transactions, savepoints are used. Each savepoint requires a
    // name. So if no name is present we need to create one.
    elseif (empty($name)) {
      $this->name = 'savepoint_' . $depth;
    }
    else {
      $this->name = $name;
    }
    $this->connection->pushTransaction($this->name, $settings);
  }

  /**
   * Overriden __desctur to provide some mental health.
   */
  public function __destruct() {
    if (!$this->settings->Get_Sane()) {
      // If we rolled back then the transaction would have already been popped.
      if (!$this->rolledBack) {
        $this->connection->popTransaction($this->name);
      }
    }
    else {
      // If we did not commit and did not rollback explicitly, rollback.
      // Rollbacks are not usually called explicitly by the user
      // but that could happen.
      if (!$this->commited && !$this->rolledBack) {
        $this->rollback();
      }
    }
  }

  /**
   * The "sane" behaviour requires explicit commits.
   *
   * @throws DatabaseTransactionExplicitCommitNotAllowedException
   */
  public function commit() {
    if (!$this->settings->Get_Sane()) {
      throw new DatabaseTransactionExplicitCommitNotAllowedException();
    }
    // Cannot commit a rolledback transaction...
    if ($this->rolledBack) {
      throw new DatabaseTransactionCannotCommitAfterRollbackException();
    }
    // Mark as commited, and commit!
    $this->commited = TRUE;
    $this->connection->popTransaction($this->name);
  }
}

/**
 * Like db_transaction() but transaction behaviour is more
 * sane requiring explicit commits.
 *
 * @param mixed $name
 * @param array $options
 * @return DatabaseTransaction
 */
function db_transaction_sane(DatabaseTransactionSettings $settings = NULL) {
  if ($settings == NULL) {
    $settings = DatabaseTransactionSettings::GetBetterDefaults();
  }
  return Database::getConnection()->startTransaction(NULL, $settings);
}

/**
 * Thrown when the user is trying to commit a rollbacked transaction.
 */
class DatabaseTransactionCannotCommitAfterRollbackException extends Exception { }

/**
 * Available transaction isolation levels.
 */
class DatabaseTransactionIsolationLevel extends Enum {
  const ReadUncommitted = 'READ UNCOMMITTED';
  const ReadCommitted = 'READ COMMITTED';
  const RepeatableRead = 'REPEATABLE READ';
  const Snapshot = 'SNAPSHOT';
  const Serializable = 'SERIALIZABLE';
  const Chaos = 'CHAOS';
  const Ignore = 'IGNORE';
}

/**
 * Summary of DatabaseTransactionScopeOption
 */
class DatabaseTransactionScopeOption extends Enum {
  const RequiresNew = 'RequiresNew';
  const Supress = 'Supress';
  const Required = 'Required';
}

/**
 * Behaviour settings for a transaction.
 */
class DatabaseTransactionSettings {

  /**
   * Summary of __construct
   * @param mixed $Sane
   * @param DatabaseTransactionScopeOption $ScopeOption
   * @param DatabaseTransactionIsolationLevel $IsolationLevel
   */
  public function __construct($Sane = FALSE,
      DatabaseTransactionScopeOption $ScopeOption = NULL,
      DatabaseTransactionIsolationLevel $IsolationLevel = NULL) {
    $this->_Sane = $Sane;
    if ($ScopeOption == NULL) {
      $ScopeOption = DatabaseTransactionScopeOption::RequiresNew();
    }
    if ($IsolationLevel == NULL) {
      $IsolationLevel = DatabaseTransactionIsolationLevel::Unspecified();
    }
    $this->_IsolationLevel = $IsolationLevel;
    $this->_ScopeOption = $ScopeOption;
  }

  // @var DatabaseTransactionIsolationLevel
  private $_IsolationLevel;

  // @var DatabaseTransactionScopeOption
  private $_ScopeOption;

  // @var Boolean
  private $_Sane;

  /**
   * Summary of Get_IsolationLevel
   * @return mixed
   */
  public function Get_IsolationLevel() {
    return $this->_IsolationLevel;
  }

  /**
   * Summary of Get_ScopeOption
   * @return mixed
   */
  public function Get_ScopeOption() {
    return $this->_ScopeOption;
  }

  /**
   * Summary of Get_Sane
   * @return mixed
   */
  public function Get_Sane() {
    return $this->_Sane;
  }

  /**
   * Returns a default setting system-wide.
   *
   * @return DatabaseTransactionSettings
   */
  public static function GetDefaults() {
    // Use snapshot if available.
    $isolation = DatabaseTransactionIsolationLevel::Ignore();
    if ($info = \Database::getConnection()->schema()->getDatabaseInfo()) {
      if ($info->snapshot_isolation_state == TRUE) {
        // Some DDL operations on core will fail with snapshot.
        $isolation = DatabaseTransactionIsolationLevel::ReadCommitted();
      }
    }
    // Otherwise use Drupal's default behaviour (except for nesting!)
    return new DatabaseTransactionSettings(FALSE,
                DatabaseTransactionScopeOption::Required(),
                $isolation);
  }

  /**
   * Proposed better defaults.
   *
   * @return DatabaseTransactionSettings
   */
  public static function GetBetterDefaults() {
    // Use snapshot if available.
    $isolation = DatabaseTransactionIsolationLevel::Ignore();
    if ($info = \Database::getConnection()->schema()->getDatabaseInfo()) {
      if ($info->snapshot_isolation_state == TRUE) {
        $isolation = DatabaseTransactionIsolationLevel::Snapshot();
      }
    }
    // Otherwise use Drupal's default behaviour (except for nesting!)
    return new DatabaseTransactionSettings(TRUE,
                DatabaseTransactionScopeOption::Required(),
                $isolation);
  }

  /**
   * Snapshot isolation is not compatible with DDL operations.
   *
   * @return DatabaseTransactionSettings
   */
  public static function GetDDLCompatibleDefaults() {
    return new DatabaseTransactionSettings(TRUE,
                DatabaseTransactionScopeOption::Required(),
                DatabaseTransactionIsolationLevel::ReadCommitted());
  }
}