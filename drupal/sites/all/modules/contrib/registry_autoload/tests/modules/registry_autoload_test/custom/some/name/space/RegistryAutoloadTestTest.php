<?php
/**
 * @file
 * Tests that custom namespace classes get registered correctly.
 */

namespace custom\some\name\space;

class RegistryAutoloadTestTest {
  /**
   * Constructs a RegistryAutoloadTestTest object.
   */
  public function __construct() {
    print "Hello custom some namespace\n";
  }
}
