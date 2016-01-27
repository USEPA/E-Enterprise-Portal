<?php
/**
 * @file
 * Tests that non namespaced classes get registered correctly.
 */

class RegistryAutoloadTestTest {
  /**
   * Constructs a RegistryAutoloadTestTest object.
   */
  public function __construct() {
    print "Hello No Namespace\n";
  }
}
