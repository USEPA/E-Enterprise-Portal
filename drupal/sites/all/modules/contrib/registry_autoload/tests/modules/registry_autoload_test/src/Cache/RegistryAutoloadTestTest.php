<?php
/**
 * @file
 * Tests that PSR-4 namespaced classes and interfaces get registered correctly.
 */

namespace Drupal\registry_autoload_test\Cache;

class RegistryAutoloadTestTest implements RegistryAutoloadTestTestInterface {

  /**
   * Constructs a RegistryAutoloadTestTest object.
   */
  public function __construct() {
    print "Hello Render_Cache\n";
    $this->x();
  }

  /**
   * {@inheritdoc}
   */
  public function x() {
    print "Implements x\n";
  }
}
