<?php

/**
 * @file
 * Tests that classes in arbitrary paths get registered correctly.
 */

namespace SomeOtherVendor\SomeComponent;

class RegistryAutoloadTestTest {
  /**
   * Constructs a RegistryAutoloadTestTest object.
   */
  public function __construct() {
    print "Hello global test-library: SomeOtherVendor\SomeComponent\n";
  }
}
