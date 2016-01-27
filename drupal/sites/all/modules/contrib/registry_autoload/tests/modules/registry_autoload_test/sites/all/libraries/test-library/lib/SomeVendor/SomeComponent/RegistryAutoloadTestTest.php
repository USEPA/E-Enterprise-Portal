<?php

/**
 * @file
 * Tests that classes in arbitrary paths get registered correctly.
 */

namespace SomeVendor\SomeComponent;

class RegistryAutoloadTestTest {
  /**
   * Constructs a RegistryAutoloadTestTest object.
   */
  public function __construct() {
    print "Hello test-library: SomeVendor\SomeComponent\n";
  }
}
