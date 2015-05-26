<?php
/**
 * @file
 * Contains class for Client dummy connections handler.
 */

/**
 * Class for dummy client connections.
 *
 * This connection handler allows SimpleTests to fake the result of calls to
 * connections, thus allows tests to simulate various remote calls in order to
 * test the behaviour of systems that rely on remote data.
 *
 * This works by allowing the connection to have a callback set on it, and
 * having the __call() magic method call that callback.
 *
 * Tests will require a test module that either defines a dummy connection
 * or alters the usual connection to be of this type.
 *
 * Test cases should define a method that will return the faked remote data, and
 * then pass this methods as a callable to the connection's setCallback().
 * Subsequent calls to the connection will call the given callback, with the
 * called method name as the first parameter and the remaining parameters as
 * called.
 *
 * For example, in your test case you might have:
 * @code
 * // Pre-emptively load the connection to set our callback on it.
 * $connection = clients_connection_load('my_connection');
 * $connection->setCallback(array($this, 'my_connection_callback'));
 *
 * // Now perform tasks which will cause a remote call.
 * // This function loads the connection and makes a remote call.
 * // We are faking the data the call gets back so that we can test what the
 * // function does with it.
 * my_module_load_remote_data();
 * @endcode
 *
 * The callback might look something like this:
 * @code
 * function my_connection_callback($method_name) {
 *   // Remove the method name to get the originally called method's parameters.
 *   $params = func_get_args();
 *   array_shift($params);
 *
 *   // If your usual connection class requires several method calls to connect
 *   // switch on the $method_name here.
 *
 *   return array('fake' => 'data');
 * }
 * @endcode
 *
 * Note that calls to callMethod() don't get 'callMethod' passed as the
 * $method_name parameter, but the same array as was passed to callMethod. Thus
 * $method_name is the intended method passed to callMethod().
 *
 * See ClientsTestCase for a working example.
 */
class clients_connection_clients_dummy extends clients_connection_base {

  /**
   * The callback to use for function calls.
   */
  protected $callback;

  /**
   * Set the callback to use for subsequent method calls.
   *
   * @param callable $callback
   *  A callable to use for subsequent method calls to this connection handler.
   */
  public function setCallback($callback) {
    $this->callback = $callback;
  }

  /**
   * Call a remote method.
   *
   * (Note that we inherit callMethod(), which nobody should be overriding.)
   */
  function callMethodArray($method, $method_params = array()) {
    $callback_args = $method_params;
    array_unshift($callback_args, $method);

    call_user_func_array($this->callback, $callback_args);
  }

  /**
   * Any call to any method on this client calls instead the callback that was
   * set on it last.
   */
  public function __call($name, $arguments) {
    // Add the method name to the front of the arguments array.
    array_unshift($arguments, $name);

    return call_user_func_array($this->callback, $arguments);
  }

}
