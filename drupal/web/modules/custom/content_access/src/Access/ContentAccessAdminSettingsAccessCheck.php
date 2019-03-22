<?php

namespace Drupal\content_access\Access;

use Drupal\Core\Routing\Access\AccessInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\Entity\NodeType;

/**
 * Determines access to routes based on permissions defined via
 * $module.permissions.yml files.
 */
class ContentAccessAdminSettingsAccessCheck implements AccessInterface {

  /**
   * {@inheritdoc}
   */
  public function access(AccountInterface $account, RouteMatchInterface $route_match) {
    $node_type_id = $route_match->getParameter('node_type');
    $node_type = NodeType::load($node_type_id);

    $permission_match = $account->hasPermission('administer nodes') && $account->hasPermission('administer content types');
    return AccessResult::allowedIf($permission_match && $node_type);
  }

}
