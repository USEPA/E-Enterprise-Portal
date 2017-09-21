<?php
/**
 * @file
 * Common testing class for this Drupal site.
 */

/**
 * Class SiteWebTestCase.
 */
// @codingStandardsIgnoreStart
abstract class SiteWebTestCase extends DrupalWebTestCase {
  // @codingStandardsIgnoreEnd

  /**
   * Tables to exclude during data cloning, only their structure will be cloned.
   *
   * @var array
   */
  protected $excludeTables = [
    'cache',
    'cache_block',
    'cache_bootstrap',
    'cache_field',
    'cache_filter',
    'cache_form',
    'cache_image',
    'cache_menu',
    'cache_page',
    'cache_path',
    'cache_update',
    'simpletest',
    'watchdog',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    // Re-route setUp() based on the test mode.
    $method = 'setUpFor' . ucfirst($this->getMethod());
    if (method_exists($this, $method)) {
      call_user_func([$this, $method], func_get_args());
    }
    else {
      throw new Exception(t('Undefined test mode @mode', ['@mode' => $this->getMethod()]));
    }
  }

  /**
   * {@inheritdoc}
   */
  protected function tearDown() {
    // Re-route tearDown() based on the test mode.
    $method = 'tearDownFor' . ucfirst($this->getMethod());
    if (method_exists($this, $method)) {
      call_user_func([$this, $method], func_get_args());
    }
    else {
      throw new Exception(t('Undefined test mode @mode', ['@mode' => $this->getMethod()]));
    }
  }

  /**
   * Initialize a standard Drupal core simpletest case.
   */
  protected function setUpForCore() {
    call_user_func_array('parent::setUp', func_get_args());
  }

  /**
   * Set up for on-site, non-sandbox testing.
   */
  protected function setUpForSite() {
    // Use current files directories: public, private, temp.
    // Although directories are not set to variables (variables are already
    // set to these directories), these class properties must have values
    // to be successfully used in inherited helper methods.
    $this->originalFileDirectory = variable_get('file_public_path', conf_path() . '/files');
    $this->public_files_directory = $this->originalFileDirectory;
    $this->private_files_directory = variable_get('file_private_path');
    $this->temp_files_directory = file_directory_temp();

    // Use the test mail class instead of the default mail handler class.
    variable_set('mail_system', ['default-system' => 'TestingMailSystem']);

    // Set time limit for current test. This limit can be set from with test
    // to allow longer execution time for tests.
    drupal_set_time_limit($this->timeLimit);

    $this->setup = TRUE;
  }

  /**
   * Set up for site clone testing.
   */
  protected function setUpForClone() {
    global $language, $conf;

    // Create the database prefix for this test.
    $this->prepareDatabasePrefix();

    // Clone tables.
    $this->cloneTables();

    // Prepare the environment for running tests.
    $this->prepareEnvironment();
    if (!$this->setupEnvironment) {
      return FALSE;
    }

    // Change the database prefix.
    // All static variables need to be reset before the database prefix is
    // changed, since DrupalCacheArray implementations attempt to
    // write back to persistent caches when they are destructed.
    $conf = [];
    drupal_static_reset();
    $this->changeDatabasePrefix();
    if (!$this->setupDatabasePrefix) {
      return FALSE;
    }

    // Refresh variables from newly cloned database.
    $this->refreshVariables();

    // Preset the 'install_profile' system variable, so the first call into
    // system_rebuild_module_data() (in drupal_install_system()) will register
    // the test's profile as a module. Without this, the installation profile of
    // the parent site (executing the test) is registered, and the test
    // profile's hook_install() and other hook implementations are never
    // invoked.
    $conf['install_profile'] = $this->profile;

    // Use current files directories: public, private, temp.
    // Although directories are not set to variables (variables are already
    // set to these directories), these class properties must have values
    // to be successfully used in inherited helper methods.
    $this->originalFileDirectory = variable_get('file_public_path', conf_path() . '/files');
    $this->public_files_directory = $this->originalFileDirectory;
    $this->private_files_directory = variable_get('file_private_path');
    $this->temp_files_directory = file_directory_temp();

    // Restore necessary variables.
    variable_set('install_task', 'done');
    variable_set('clean_url', $this->originalCleanUrl);
    variable_set('site_mail', 'simpletest@example.com');
    variable_set('date_default_timezone', date_default_timezone_get());

    // Set up English language.
    unset($conf['language_default']);
    $language = language_default();

    // Use the test mail class instead of the default mail handler class.
    variable_set('mail_system', ['default-system' => 'TestingMailSystem']);

    drupal_set_time_limit($this->timeLimit);
    $this->setup = TRUE;
  }

  /**
   * Helper to clone existing DB tables.
   *
   * To clone existing tables into new ones, we need to get current and new
   * table names. Since any prefix-related information is stored with
   * connection, we have to switch current database connection to test database
   * connection, but not earlier than data about current schema is gathered.
   */
  protected function cloneTables() {
    global $db_prefix;
    $db_prefix_current = $db_prefix;
    $db_prefix_test = $this->databasePrefix;

    // Retrieve schema for current installation.
    $this->databasePrefix = $db_prefix;
    $schemas = drupal_get_schema(NULL, TRUE);

    // Gather all prefixed source table names.
    $sources = [];
    foreach ($schemas as $name => $schema) {
      $sources[$name] = Database::getConnection()
        ->prefixTables('{' . $name . '}');
    }

    // Return test database prefix to original value.
    $this->databasePrefix = $db_prefix_test;
    $db_prefix = $db_prefix_test;

    // Change the database prefix to gather full destination table names.
    $this->changeDatabasePrefix();

    // Clone each table into the new test tables.
    foreach ($schemas as $name => $schema) {
      // Create new test table.
      // Current DB connection already have information about table prefixes.
      // Excluded tables needs to be created even if they have bo data.
      db_create_table($name, $schema);

      if (in_array($name, $this->excludeTables)) {
        continue;
      }

      $destination = Database::getConnection()->prefixTables('{' . $name . '}');
      // @codingStandardsIgnoreStart
      db_query('INSERT INTO ' . db_escape_table($destination) . ' SELECT * FROM ' . db_escape_table($sources[$name]));
      // @codingStandardsIgnoreEnd
    }

    $db_prefix = $db_prefix_current;
  }

  /**
   * Tear down for core based testing.
   */
  protected function tearDownForCore() {
    call_user_func_array('parent::tearDown', func_get_args());
  }

  /**
   * Tear down for on site testing.
   */
  protected function tearDownForSite() {
    // In case a fatal error occurred that was not in the test process read the
    // log to pick up any fatal errors.
    simpletest_log_read($this->testId, $this->databasePrefix, get_class($this), TRUE);

    // Output info about any captured emails.
    $email_count = count(variable_get('drupal_test_email_collector', []));
    if ($email_count) {
      $message = format_plural($email_count, '1 e-mail was sent during this test.', '@count e-mails were sent during this test.');
      $this->pass($message, t('E-mail'));
    }

    // Close the CURL handler.
    $this->curlClose();
  }

  /**
   * Tear down for clone based testing.
   */
  protected function tearDownForClone() {
    global $language;

    // In case a fatal error occurred that was not in the test process read the
    // log to pick up any fatal errors.
    simpletest_log_read($this->testId, $this->databasePrefix, get_class($this), TRUE);

    // Output info about any captured emails.
    $email_count = count(variable_get('drupal_test_email_collector', []));
    if ($email_count) {
      $message = format_plural($email_count, '1 e-mail was sent during this test.', '@count e-mails were sent during this test.');
      $this->pass($message, t('E-mail'));
    }

    // Remove all prefixed tables (all the tables in the schema).
    $schema = drupal_get_schema(NULL, TRUE);
    foreach ($schema as $name => $table) {
      db_drop_table($name);
    }

    // Get back to the original connection.
    Database::removeConnection('default');
    Database::renameConnection('simpletest_original_default', 'default');

    // Restore original shutdown callbacks array to prevent original
    // environment of calling handlers from test run.
    $callbacks = &drupal_register_shutdown_function();
    $callbacks = $this->originalShutdownCallbacks;

    // Return the user to the original one.
    global $user;
    $user = $this->originalUser;
    drupal_save_session(TRUE);

    // Ensure that internal logged in variable and cURL options are reset.
    $this->loggedInUser = FALSE;
    $this->additionalCurlOptions = [];

    // Reload module list and implementations to ensure that test module hooks
    // aren't called after tests.
    module_list(TRUE);
    module_implements('', FALSE, TRUE);

    // Reset the Field API.
    field_cache_clear();

    // Rebuild variables caches.
    $this->refreshVariables();

    // Reset language.
    $language = $this->originalLanguage;
    if ($this->originalLanguageDefault) {
      $GLOBALS['conf']['language_default'] = $this->originalLanguageDefault;
    }

    // Close the CURL handler.
    $this->curlClose();
  }

  /**
   * Get method for test.
   *
   * @return string
   *   The method of the test. Defaults to 'core'.
   */
  public function getMethod() {
    $info = $this->getInfo();

    // Fall back to 'core' if 'mode' was not specified in the test info.
    return !empty($info['mode']) ? $info['mode'] : 'core';
  }

}
