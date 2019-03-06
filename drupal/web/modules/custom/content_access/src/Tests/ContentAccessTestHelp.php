<?php

namespace Drupal\content_access\Tests;

use Drupal\Core\Session\AccountInterface;
use Drupal\node\NodeInterface;
use Drupal\user\Entity\Role;
use Drupal\simpletest\WebTestBase;

/**
 * Helper class with auxiliary functions for content access module tests.
 */
class ContentAccessTestHelp extends WebTestBase {

  protected $test_user;
  protected $rid = AccountInterface::AUTHENTICATED_ROLE;
  protected $admin_user;
  protected $content_type;
  protected $url_content_type_name;
  protected $node1;
  protected $node2;

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = ['content_access', 'acl'];

  /**
   * Preparation work that is done before each test.
   * Test users, content types, nodes etc. are created.
   */
  public function setUp() {
    parent::setUp();

    // Create test user with separate role.
    $this->test_user = $this->drupalCreateUser();

    // Get the value of the new role.
    // @see drupalCreateUser().
    $test_user_roles = $this->test_user->getRoles();
    foreach ($test_user_roles as $role) {
      if (!in_array($role, [AccountInterface::AUTHENTICATED_ROLE])) {
        $this->rid = $role;
        break;
      }
    }

    // Create admin user.
    $this->admin_user = $this->drupalCreateUser([
      'access content',
      'administer content types',
      'grant content access',
      'grant own content access',
      'administer nodes',
      'access administration pages'
    ]);
    $this->drupalLogin($this->admin_user);

    // Rebuild content access permissions.
    node_access_rebuild();

    // Create test content type.
    $this->content_type = $this->drupalCreateContentType();
  }

  /**
   * Change access permissions for a content type.
   */
  function changeAccessContentType($access_settings) {
    $this->drupalPostForm(
      'admin/structure/types/manage/' . $this->content_type->id() . '/access',
      $access_settings,
      t('Submit')
    );
    $this->assertText(
      t('Your changes have been saved.'),
      'access rules of content type were updated successfully'
    );
  }

  /**
   * Change access permissions for a content type by a given keyword
   * for the role of the user.
   */
  function changeAccessContentTypeKeyword($keyword, $access = TRUE, AccountInterface $user = NULL) {
    $roles = [];

    if ($user === NULL) {
      $role = Role::load($this->rid);
      $roles[$role->id()] = $role->id();
    }
    else {
      $user_roles = $user->getRoles();
      foreach ($user_roles as $role) {
        $roles[$role] = $role;
        break;
      }
    }

    $access_settings = [
      $keyword . '[' . key($roles) . ']' => $access,
    ];

    $this->changeAccessContentType($access_settings);
  }

  /**
   * Change the per node access setting for a content type.
   */
  function changeAccessPerNode($access = TRUE) {
    $access_permissions = [
      'per_node' => $access,
    ];
    $this->changeAccessContentType($access_permissions);
  }

  /**
   * Change access permissions for a node by a given keyword
   * (view, update or delete).
   */
  function changeAccessNodeKeyword(NodeInterface $node, $keyword, $access = TRUE) {
    $user = $this->test_user;
    $user_roles = $user->getRoles();
    foreach ($user_roles as $rid) {
      $role = Role::load($rid);
      $roles[$role->id()] = $role->get('label');
    }

    $access_settings = [
      $keyword . '[' . key($roles) . ']' => $access,
    ];

    $this->changeAccessNode($node, $access_settings);
  }

  /**
   * Change access permission for a node.
   */
  function changeAccessNode(NodeInterface $node, $access_settings) {
    $this->drupalPostForm('node/' . $node->id() . '/access', $access_settings, t('Submit'));
    $this->assertText(
      t('Your changes have been saved.'),
      'access rules of node were updated successfully'
    );
  }

}
