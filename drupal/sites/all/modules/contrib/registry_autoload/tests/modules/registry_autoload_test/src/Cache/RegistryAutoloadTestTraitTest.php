<?php
/**
 * @file
 * Tests that traits work properly.
 */

namespace Drupal\registry_autoload_test\Cache;

class RegistryAutoloadTraitTest {

  use RegistryAutoloadTestTestTrait;

  /**
   * Constructs a RegistryAutoloadTraitTest object.
   */
  public function __construct() {
    print "Hello Class using trait.\n";
    $this->foo();
  }
}
