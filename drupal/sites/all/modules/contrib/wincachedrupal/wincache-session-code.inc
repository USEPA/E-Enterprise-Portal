<?php

/**
 * @file
 * User session handling functions.
 */
 
// Use the $WINCACHE_SESSION_ACTIVE global
// to tell other modules if this is the
// active locking backend.
$GLOBALS['WINCACHE_SESSION_ACTIVE'] = TRUE;

/**
 * Initializes the session handler, starting a session if needed.
 */
function drupal_session_initialize() {
  global $user;

  // We use !empty() in the following check to ensure that blank session IDs
  // are not valid.
  if (!empty($_COOKIE[session_name()])) {
    // If a session cookie exists, initialize the session. Otherwise the
    // session is only started on demand in drupal_session_commit(), making
    // anonymous users not use a session cookie unless something is stored in
    // $_SESSION. This allows HTTP proxies to cache anonymous pageviews.
    drupal_session_start(TRUE);
    if (!empty($user->uid) || !empty($_SESSION)) {
      drupal_page_is_cacheable(FALSE);
    }
  }
  else {
    // Set a session identifier for this request. This is necessary because
    // we lazily start sessions at the end of this request, and some
    // processes (like drupal_get_token()) needs to know the future
    // session ID in advance.
    $GLOBALS['lazy_session'] = TRUE;
    $user = drupal_anonymous_user();
    // Less random sessions (which are much faster to generate) are used for
    // anonymous users than are generated in drupal_session_regenerate() when
    // a user becomes authenticated.
    session_id(WincacheSessionHandler::wincache_session_id(NULL));
  }
  date_default_timezone_set(drupal_get_user_timezone());
}

/**
 * Returns whether a session has been started.
 */
function drupal_session_started() {
  return session_status() == PHP_SESSION_ACTIVE;
}

/**
 * Starts a session forcefully, preserving already set session data.
 *
 * @ingroup php_wrappers
 */
function drupal_session_start() {
  global $user;
  // Command line clients do not support cookies nor sessions.
  if (!drupal_session_started() && !drupal_is_cli()) {
    // Save current session data before starting it, as PHP will destroy it.
    $session_data = isset($_SESSION) ? $_SESSION : NULL;

    session_start();
    drupal_session_started(TRUE);

    // Restore session data.
    if (!empty($session_data)) {
      $_SESSION += $session_data;
    }
  }
}

/**
 * Commits the current session, if necessary.
 *
 * If an anonymous user already have an empty session, destroy it.
 */
function drupal_session_commit() {
  global $user;

  if (!drupal_save_session()) {
    // We don't have anything to do if we are not allowed to save the session.
    return;
  }

  if (empty($user->uid) && (!isset($_SESSION) || empty($_SESSION))) {
    // There is no session data to store, destroy the session if it was
    // previously started.
    if (drupal_session_started()) {
      session_destroy();
    }
  }
  else {
    // There is session data to store. Start the session if it is not already
    // started.
    if (!drupal_session_started()) {
      drupal_session_start();
    }
    // Write the session data.
    session_write_close();
  }
}

/**
 * Called when an anonymous user becomes authenticated or vice-versa.
 *
 * @ingroup php_wrappers
 */
function drupal_session_regenerate() {
  global $user;
  // Nothing to do if we are not allowed to change the session.
  if (!drupal_save_session()) {
    return;
  }

  // Keep track of old session id.
  if (drupal_session_started()) {
    $old_session_id = session_id();
  }

  // Assign a new session id.
  session_id(WincacheSessionHandler::wincache_session_id($user->uid));

  if (isset($old_session_id)) {
    // If we already had a session, update the cookie to point to the new one!
    $params = session_get_cookie_params();
    $expire = $params['lifetime'] ? REQUEST_TIME + $params['lifetime'] : 0;
    setcookie(session_name(), session_id(), $expire, $params['path'], $params['domain'], FALSE, $params['httponly']);
    drupal_session_start();
  }
  else {
    // Start the session when it doesn't exist yet.
    // Preserve the logged in user, as it will be reset to anonymous
    // by drupal_session_start().
    $account = $user;
    drupal_session_start();
    $user = $account;
  }
  date_default_timezone_set(drupal_get_user_timezone());
}

/**
 * Ends a specific user's session(s).
 *
 * @param $uid
 *   User ID.
 */
function drupal_session_destroy_uid($uid) {
  // Nothing to do if we are not allowed to change the session.
  if (!drupal_save_session()) {
    return;
  }
  // In order to destroy we need to load that
  // particular session, but session ID's are random....
  $scache_info = wincache_scache_info();
  $affected_sessions = array();
  $affected_prefix = WincacheSessionHandler::wincache_session_id($uid, TRUE);
  $affected_length = strlen($affected_prefix);
  foreach ($scache_info['scache_entries'] as $sid) {
  	if (substr($sid['key_name'], 0, $affected_length) == $affected_prefix) {
      $affected_sessions[] = $sid['key_name'];
    }
  }
  // Destroy all the affected sessions.
  _wincachedrupal_session_destroy_multiple($affected_sessions);
}

/**
 * Destroy a group of sessions.
 *
 * @param array $sids 
 *  The id's of the sessions to be destroyed.
 *
 */
function _wincachedrupal_session_destroy_multiple(array $sids) {
  // Store current session.
  $current_session = NULL;
  if (drupal_session_started()) {
    $current_session = session_id();
    session_write_close();
  }

  // Now clear all those sessions.
  foreach ($sids as $sid) {
    if ($current_session == $sid) {
      // We are clearing our own session...
      unset($current_session);
    }
    session_id($sid);
    session_start();
    session_destroy();
    session_write_close();
  }

  // Restore current user session.
  if (!empty($current_session)) {
    session_id($current_session);
    session_start();
  }
}

/**
 * Custom wrapper for the native Wincahce Handler
 */
class WincacheSessionHandler extends SessionHandler {

  /**
   * Generate a session ID from user id.
   *
   * It is ver nice to have session ID's that actually
   * hint on to what the userID of the owner is, even
   * for anonymous users...
   */
  public static function wincache_session_id($uid, $onlyprefix = FALSE) {
    if (empty($uid)) {
      $uid = '0';
    }
    $prefix = 'wc-sess-' . $uid . '-';
    if ($onlyprefix) {
      return $prefix;
    }
    // A valid session id may consists of digits, letters A to Z (both upper and lower case), comma and dash. Described as a character class, it would be [-,a-zA-Z0-9].
    return $prefix . preg_replace('#\W#', '', uniqid('', TRUE));
  }
  
  
  /**
   * {@inheritdoc}
   */
  public function destroy($session_id) {
    global $user;

    // Nothing to do if we are not allowed to change the session.
    if (!drupal_save_session()) {
      return FALSE;
    }

    // Delete session data.
    $res = parent::destroy($session_id);

    // Reset $_SESSION and $user to prevent a new session from being started
    // in drupal_session_commit().
    $_SESSION = array();
    $user = drupal_anonymous_user();

    // Unset the session cookies.
    _drupal_session_delete_cookie(session_name());

    return $res;
  }
  
  /**
   * {@inheritdoc}
   */
  public function read($session_id) {
    global $user;
    
    // Write and Close handlers are called after destructing objects
    // since PHP 5.0.5.
    // Thus destructors can use sessions but session handler can't use objects.
    // So we are moving session closure before destructing objects.
    // THIS IS DONE AUTOMATICALLY IN session_set_save_handler($handler, true);

    // Handle the case of first time visitors and clients that don't store
    // cookies (eg. web crawlers).
    if (!isset($_COOKIE[session_name()])) {
      $user = drupal_anonymous_user();
      return '';
    }

    // Otherwise read session.
    $data = parent::read($session_id);
    $session = @unserialize($data);
    if ($session !== FALSE) {
      // After the session handler upgrade, trying to unserialize
      // a previous session will not work.
      $user = $session->user;
      $user->timestamp = $session->timestamp;

      // Store the session that was read for comparison in write().
      $last_read = &drupal_static('drupal_session_last_read');
      $last_read = array(
        'sid' => $session_id,
        'value' => $session->session,
      );
    }

    // We found the client's session record and they are an authenticated,
    // active user.
    if ($user && $user->uid > 0 && $user->status == 1) {
      // This is done to unserialize the data member of $user.
      $user->data = $user->data;

      // Add roles element to $user.
      $user->roles = array();
      $user->roles[DRUPAL_AUTHENTICATED_RID] = 'authenticated user';
      $user->roles += db_query("SELECT r.rid, r.name FROM {role} r INNER JOIN {users_roles} ur ON ur.rid = r.rid WHERE ur.uid = :uid", array(':uid' => $user->uid))->fetchAllKeyed(0, 1);
    }
    elseif ($user) {
      // The user is anonymous or blocked. Only preserve two fields from the
      // {sessions} table.
      $account = drupal_anonymous_user();
      $account->session = $session->session;
      $account->timestamp = $session->timestamp;
      $user = $account;
    }
    else {
      // The session has expired.
      $user = drupal_anonymous_user();
      $user->session = '';
    }

    // If we could obtain a stored session, return
    // the actual session data.
    if ($session !== FALSE) {
      return $session->session;
    }

    // No session data.
    return NULL;
  }
  
  /**
   * {@inheritdoc}
   */
  public function write($session_id, $session_data) {
    global $user;

    if (!drupal_save_session()) {
      // We don't have anything to do if we are not allowed to save the session.
      return TRUE;
    }
    
    // Check whether $_SESSION has been changed in this request.
    $last_read = &drupal_static('drupal_session_last_read');
    $is_changed = !isset($last_read) || $last_read['sid'] != $session_id || $last_read['value'] !== $session_data;

    $res = TRUE;
    
    // Likewise, do not update access time more than once per 180 seconds.
    if ($user->uid && REQUEST_TIME - $user->access > variable_get('session_write_interval', 240)) {
      db_update('users')
        ->fields(array(
          'access' => REQUEST_TIME
        ))
        ->condition('uid', $user->uid)
        ->execute();
      $user->access = REQUEST_TIME;
      // Make user the changes to $user->access are stored.
      $is_changed = TRUE;
    }
    
    // For performance reasons, do not update the sessions table, unless
    // $_SESSION has changed or more than 240 has passed since the last update.
    // We add an additional 5 seconds to the timestamp check to prevent a double session
    // save on expiration.
    if ($is_changed || !isset($user->timestamp) || REQUEST_TIME - $user->timestamp > (variable_get('session_write_interval', 240) + 5)) {
      // Prepare the information to be saved.
      $session = new stdClass();
      $session->sid = $session_id;
      $session->uid = $user->uid;
      $session->cache = isset($user->cache) ? $user->cache : '';
      $session->hostname = ip_address();
      $session->session = $session_data;
      $session->timestamp = REQUEST_TIME;
      $session->user = clone $user;
      // Use json_encode/json_decode to be
      // on the safe side here.
      // Do not pass untrusted user input to unserialize()
      $data = serialize($session);
      $res = parent::write($session_id, $data);
    }

    return $res;
    
  }
}

/**
 * Determines whether to save session data of the current request.
 *
 * This function allows the caller to temporarily disable writing of
 * session data, should the request end while performing potentially
 * dangerous operations, such as manipulating the global $user object.
 * See http://drupal.org/node/218104 for usage.
 *
 * @param $status
 *   Disables writing of session data when FALSE, (re-)enables
 *   writing when TRUE.
 *
 * @return
 *   FALSE if writing session data has been disabled. Otherwise, TRUE.
 */
function drupal_save_session($status = NULL) {
  // PHP session ID, session, and cookie handling happens in the global scope.
  // This value has to persist across calls to drupal_static_reset(), since a
  // potentially wrong or disallowed session would be written otherwise.
  static $save_session = TRUE;
  if (isset($status)) {
    $save_session = $status;
  }
  return $save_session;
}

/**
 * Deletes the session cookie.
 *
 * @param $name
 *   Name of session cookie to delete.
 * @param boolean $secure
 *   Force the secure value of the cookie.
 */
function _drupal_session_delete_cookie($name) {
  if (isset($_COOKIE[$name])) {
    $params = session_get_cookie_params();
    setcookie($name, '', REQUEST_TIME - 3600, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    unset($_COOKIE[$name]);
  }
}

// Initialize the storage
$handler = new WincacheSessionHandler();
session_set_save_handler($handler, true);