<?php

namespace Drupal\content_access\Tests;

/**
 * Automated SimpleTest Case for content access module.
 *
 * @group Access
 */
class ContentAccessModuleTestCase extends ContentAccessTestHelp {

  /**
   * Implementation of get_info() for information.
   */
  public static function getInfo() {
    return [
      'name' => t('Content Access Module Tests'),
      'description' => t(
        'Various tests to check permission settings on nodes.'
      ),
      'group' => t('Content Access'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();

    // Create test nodes.
    $this->node1 = $this->drupalCreateNode(['type' => $this->content_type->id()]);
    $this->node2 = $this->drupalCreateNode(['type' => $this->content_type->id()]);
  }

  /**
   * Test for viewing nodes.
   */
  function testViewAccess() {
    // Restrict access to the content type.
    $access_permissions = [
      'view[anonymous]' => FALSE,
      'view[authenticated]' => FALSE,
    ];
    $this->changeAccessContentType($access_permissions);

    // Logout admin and try to access the node anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');

    // Login test user, view node, access must be denied.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');

    // Login admin and grant access for viewing to the test user.
    $this->drupalLogin($this->admin_user);
    $this->changeAccessContentTypeKeyword('view');

    // Logout admin and try to access the node anonymously
    // access must be denied again.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');

    // Login test user, view node, access must be granted.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertNoText(t('Access denied'), 'node1 is viewable');

    // Login admin and enable per node access.
    $this->drupalLogin($this->admin_user);
    $this->changeAccessPerNode();

    // Restrict access on node2 for the test user role.
    $this->changeAccessNodeKeyword($this->node2, 'view', FALSE);

    // Logout admin and try to access both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertText(t('Access denied'), 'node2 is not viewable');

    // Login test user, view node1, access must be granted.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertNoText(t('Access denied'), 'node1 is viewable');

    // View node2, access must be denied.
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertText(t('Access denied'), 'node2 is not viewable');

    // Login admin, swap permissions between content type and node2.
    $this->drupalLogin($this->admin_user);

    // Restrict access to content type
    $this->changeAccessContentTypeKeyword('view', FALSE);

    // Grant access to node2
    $this->changeAccessNodeKeyword($this->node2, 'view');

    // Logout admin and try to access both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertText(t('Access denied'), 'node2 is not viewable');

    // Login test user, view node1, access must be denied.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');

    // View node2, access must be granted.
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertNoText(t('Access denied'), 'node2 is viewable');
  }

  /**
   * Test for editing nodes.
   */
  function testEditAccess() {
    // Logout admin and try to edit the node anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertText(t('Access denied'), 'edit access denied for anonymous');

    // Login test user, edit node, access must be denied.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertText(t('Access denied'), 'edit access denied for test user');

    // Login admin and grant access for editing to the test user.
    $this->drupalLogin($this->admin_user);
    $this->changeAccessContentTypeKeyword('update');

    // Logout admin and try to edit the node anonymously
    // access must be denied again.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertText(t('Access denied'), 'edit access denied for anonymous');

    // Login test user, edit node, access must be granted.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertNoText(t('Access denied'), 'node1 is editable');

    // Login admin and enable per node access.
    $this->drupalLogin($this->admin_user);
    $this->changeAccessPerNode();

    // Restrict access for this content type for the test user.
    $this->changeAccessContentTypeKeyword('update', FALSE);

    // Allow acces for node1 only
    $this->changeAccessNodeKeyword($this->node1, 'update');
    $this->changeAccessNodeKeyword($this->node2, 'update', FALSE);

    // Logout admin and try to edit both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertText(t('Access denied'), 'node1 is not editable');
    $this->drupalGet('node/' . $this->node2->id() . '/edit');
    $this->assertText(t('Access denied'), 'node2 is not editable');

    // Login test user, edit node1, access must be granted.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertNoText(t('Access denied'), 'node1 is editable');

    // Edit node2, access must be denied.
    $this->drupalGet('node/' . $this->node2->id() . '/edit');
    $this->assertText(t('Access denied'), 'node2 is not editable');

    // Login admin, swap permissions between node1 and node2.
    $this->drupalLogin($this->admin_user);

    // Grant edit access to node2.
    $this->changeAccessNodeKeyword($this->node2, 'update');
    // Restrict edit access to node1.
    $this->changeAccessNodeKeyword($this->node1, 'update', FALSE);

    // Logout admin and try to edit both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertText(t('Access denied'), 'node1 is not editable');
    $this->drupalGet('node/' . $this->node2->id() . '/edit');
    $this->assertText(t('Access denied'), 'node2 is not editable');

    // Login test user, edit node1, access must be denied.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/edit');
    $this->assertText(t('Access denied'), 'node1 is not editable');

    // Edit node2, access must be granted.
    $this->drupalGet('node/' . $this->node2->id() . '/edit');
    $this->assertNoText(t('Access denied'), 'node2 is editable');
  }

  /**
   * Test for deleting nodes.
   */
  function testDeleteAccess() {
    // Logout admin and try to delete the node anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertText(t('Access denied'), 'delete access denied for anonymous');

    // Login test user, delete node, access must be denied.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertText(t('Access denied'), 'delete access denied for test user');

    // Login admin and grant access for deleting to the test user.
    $this->drupalLogin($this->admin_user);

    $this->changeAccessContentTypeKeyword('delete');

    // Logout admin and try to edit the node anonymously
    // access must be denied again.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertText(t('Access denied'), 'delete access denied for anonymous');

    // Login test user, delete node, access must be granted.
    $this->drupalLogin($this->test_user);
    $this->drupalPostForm(
      'node/' . $this->node1->id() . '/delete',
      [],
      'Delete'
    );
    $this->assertRaw(
      t('%node has been deleted', ['%node' => $this->node1->getTitle()]),
      'Test node was deleted successfully by test user'
    );

    // Login admin and recreate test node1.
    $this->drupalLogin($this->admin_user);
    $this->node1 = $this->drupalCreateNode(
      ['type' => $this->content_type->id()]
    );

    // Enable per node access.
    $this->changeAccessPerNode();

    // Restrict access for this content type for the test user.
    $this->changeAccessContentTypeKeyword('delete', FALSE);

    // Allow acces for node1 only.
    $this->changeAccessNodeKeyword($this->node1, 'delete');
    $this->changeAccessNodeKeyword($this->node2, 'delete', FALSE);

    // Logout admin and try to delete both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertText(t('Access denied'), 'node1 is not deletable');
    $this->drupalGet('node/' . $this->node2->id() . '/delete');
    $this->assertText(t('Access denied'), 'node2 is not deletable');

    // Login test user, delete node1, access must be granted.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertNoText(t('Access denied'), 'node1 is deletable');

    // Delete node2, access must be denied.
    $this->drupalGet('node/' . $this->node2->id() . '/delete');
    $this->assertText(t('Access denied'), 'node2 is not deletable');

    // Login admin, swap permissions between node1 and node2.
    $this->drupalLogin($this->admin_user);

    // Grant delete access to node2.
    $this->changeAccessNodeKeyword($this->node2, 'delete');
    // Restrict delete acces to node1.
    $this->changeAccessNodeKeyword($this->node1, 'delete', FALSE);

    // Logout admin and try to delete both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertText(t('Access denied'), 'node1 is not deletable');
    $this->drupalGet('node/' . $this->node2->id() . '/delete');
    $this->assertText(t('Access denied'), 'node2 is not deletable');

    // Login test user, delete node1, access must be denied.
    $this->drupalLogin($this->test_user);
    $this->drupalGet('node/' . $this->node1->id() . '/delete');
    $this->assertText(t('Access denied'), 'node1 is not deletable');

    // Delete node2, access must be granted.
    $this->drupalGet('node/' . $this->node2->id() . '/delete');
    $this->assertNoText(t('Access denied'), 'node2 is deletable');
  }

  /**
   * Test own view access.
   */
  function testOwnViewAccess() {
    // Setup 2 test users.
    $test_user1 = $this->test_user;
    $test_user2 = $this->drupalCreateUser();

    // Change ownership of test nodes to test users.
    $this->node1->setOwner($test_user1);
    $this->node1->save();

    $this->node2->setOwner($test_user2);
    $this->node2->save();

    // Remove all view permissions for this content type.
    $access_permissions = [
      'view[anonymous]' => FALSE,
      'view[authenticated]' => FALSE,
      'view_own[anonymous]' => FALSE,
      'view_own[authenticated]' => FALSE,
    ];
    $this->changeAccessContentType($access_permissions);

    // Allow view own content for test user 1 and 2 roles.
    $this->changeAccessContentTypeKeyword('view_own', TRUE, $test_user1);
    $this->changeAccessContentTypeKeyword('view_own', TRUE, $test_user2);

    // Logout admin and try to access both nodes anonymously.
    $this->drupalLogout();
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertText(t('Access denied'), 'node2 is not viewable');

    // Login test user 1, view node1, access must be granted.
    $this->drupalLogin($test_user1);
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertNoText(t('Access denied'), 'node1 is viewable');

    // View node2, access must be denied.
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertText(t('Access denied'), 'node2 is not viewable');

    // Login test user 2, view node1, access must be denied.
    $this->drupalLogin($test_user2);
    $this->drupalGet('node/' . $this->node1->id());
    $this->assertText(t('Access denied'), 'node1 is not viewable');

    // View node2, access must be granted.
    $this->drupalGet('node/' . $this->node2->id());
    $this->assertNoText(t('Access denied'), 'node2 is viewable');
  }

}
