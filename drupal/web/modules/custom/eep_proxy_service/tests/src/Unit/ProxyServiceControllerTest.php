<?php

namespace Drupal\Tests\eep_proxy_service\Unit;

use Drupal\Core\Url;
use Drupal\Tests\UnitTestCase;
use Drupal\eep_proxy_service\Controller\ProxyServiceController;

/**
 * Simple test to ensure that main page loads with module enabled.
 *
 * @group eep_proxy_service
 */
class ProxyServiceControllerTest extends UnitTestCase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = ['eep_proxy_service'];

  /**
   * A user with permission to administer site configuration.
   *
   * @var \Drupal\user\UserInterface
   */
  protected $user;

  protected $controller;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
  }

  /**
   * Tests that the home page loads with a 200 response.
   */
  /*public function testLoad() {
    $this->drupalGet(Url::fromRoute('<front>'));
    $this->assertSession()->statusCodeEquals(200);
  }*/

}
