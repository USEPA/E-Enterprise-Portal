Clients module
==============

The Clients module aims to provide a simple way to manage connections to remote
sites, and the resources that they provide.

Connections and resources are exportable via the EntityAPI and thus can be added
to Features.

Requirements
============

Clients requires the following modules:

- Entity API

Connections and Resources
=========================

Clients module provides a simple UI for creating, editing, and testing
connections to remote sites.

There are two ways to use a connection:

- Connections can be called directly to make calls/requests to remote services.
- Resources can be defined on top of clients. These take care of handling the
  remote connection in a way that is transparent to the rest of Drupal. For
  example, a remote block resource would take care of declaring the various
  block hooks, and caching retrieved results. The remote block provided would
  function exactly like a normal, local block.

Connection substitution
=======================

It's possible to have the same connection machine name load different
connections depending on the site's environment. This is based on the value of
the 'environment_name' site variable. When loading a connection, the environment
name as defined by this variable is appended to the requested connection name,
and if this results in the name of another connection, that is loaded instead.

This allows a development site to connect to a development version of a service
without any changes in code.

For example:

// Just loads the foobar connection.
$connection = clients_connection_load('foobar');

variable_set('environment_name', 'dev');
// Loads the foobar_dev instead, if it exists. Otherwise, loads foobar.
$connection = clients_connection_load('foobar');


Using connections directly
==========================

The Clients connection object lets you call methods on remote sites very
simply, without having to deal with tokens, keys, and all that sort of
stuff.

Once a connection is defined in the admin UI, you can call a remote method on it
like this:

  try {
    // 'my_connection' is the machine name of the connection.
    $result = clients_connection_call('my_connection', 'method.name', $param1, $param2, $param_etc);
  }
  catch (Exception $e) {
    // Something went wrong; it's up to you to display an error.
    // This is the error message, if any:
    $message = $e->getMessage();
  }

So for example, to load a node from a remote Drupal site, do:

  try {
    $node = clients_connection_call('my_connection', 'node.get', $remote_nid);
    // Note that the $node will be an array.
  }
  catch (Exception $e) {
    drupal_set_message("Error loading a remote node.");
  }

If you need to make several calls, you can use the connection object yourself:

  $connection = clients_connection_load('my_connection');
  try {
    $result = $connection->callMethod('method.name', $param1, $param2, $param_etc);
  }
  catch (Exception $e) {
    drupal_set_message("Error calling method.name.");
  }

Debugging mode
==============

Each connections may have a debug mode flag set. Note that at this time not all
connection types support this (and may thus simply not provide any output).

Debug output may be sent to the following channels:

  - watchdog: The usual Drupal core watchdog. This may not be suitable for
      large data.
  - dpm: Devel module's dpm() function.
  - ddl: Devel Debug Log module's ddl() function.
  - dd: (Not used by default) Devel module's dd() function.

The channels used can be overridden by defining an array of the above names
as keys in the site variable 'clients_debug_channels'.

Extending the testing system
===========================

You can extend the connection testing system to provide tests that are specific
to your particular system.

- define connection test classes. See ClientsConnectionDrupalTestConnect for
  an example.
- to make your test class available, either:
  - implement hook_clients_connection_type_info_alter() to add your test class
    to all connections of a given type.
  - implement hook_client_connection_tests_alter() to add your test to a single
    connection.

Defining Connection types
=========================

To define your own connection type, you need:

- an implementation of hook_clients_connection_type_info().
- a class definition for your connection type. This should be named
  'clients_connection_YOUR_TYPE_ID' and implement the following methods:
  - connectionSettingsFormAlter(), which should add your configuration form
    elements to the FormAPI array for your connection type's edit form.
  - connectionSettingsForm_submit(), which should provide any processing of
    the form specific to your connection type.
  - callMethodArray(), which should call a remote method and return the result.

