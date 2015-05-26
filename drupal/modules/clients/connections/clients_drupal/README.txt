
Clients for Drupal Services XMLRPC Servers
==========================================

This module contains client connection types for connecting to Services module
on Drupal (http://drupal.org/project/services), for endpoints using the XMLRPC
server.

The module allows for a client type for each version of Services, though
not all are done yet:
  Services 7.x-3.x on Drupal 7: not extensively tested
  Services 6.x-3.x on Drupal 6: TODO
  Services 6.x-2.x on Drupal 6: working
  Services 5.x-0.92 on Drupal 5: working

Each different type is simply a subclass of the main Drupal Client class.

Setting up a client
--------------------

At admin/settings/clients, choose the type of connection you want to create.
The Drupal-specific options are as follows:

- Domain, Service key: These should match the key in the Services settings on
  the remote site.
  Note that the Domain property is actually an arbitrary string more akin to a
  username. You can set it to anything as long as it matches
- Service username, password: the details for a Drupal user on the remote site.
- Services, Views: these are obsolete and may be ignored.

It's a very good idea to go to the test page for your connection and try the
various actions such as connecting, logging in, retrieving a node. These show
you exactly what is returned from the remote server.

Setting up Services
------------------

Services 5.x-0.92 on Drupal 5

  - install:
    - services

  - enable:
    - services
    - xmlrpc server
    - system service
    - uprpc import source
    - uprpc import services
    - user service
    - user get service
    - node service (if required)
    - taxonomy service (ditto)
  - at admin/build/services, set up services:
    - create an API key for your Client site to use.
      - domain: the same string as for the client connection settings.
    - settings:
      - use keys: TRUE
      - token expiry: you may need to set this to a large number if you need to
        run many operations.
      - use sessid: TRUE
  - create a role for your webservice
  - create a user to access services, with this role.
  - add permissions for the anonymous role:
    - 'access services'
  - add permissions for the webservice role:
    - 'access services'
    - 'load raw node data'
    - 'load raw user data'
    - 'run content count queries'
    - 'run import flagging queries'

  Be aware that with these permissions, the webservice user can access data on
  your nodes such as hidden fields.






