<?php

namespace Drupal\content_access\Plugin\RulesAction;

use Drupal\node\NodeInterface;
use Psr\Log\LogLevel;

/**
 * Provides common functionality for Content Access Rules actions.
 */
trait ActionCommonTrait {

  /**
   * Verifies that per content settings are activated for the given node.
   */
  protected function checkSetting(NodeInterface $node) {
    $config = \Drupal::configFactory()->getEditable('content_access.settings');

    $type = $node->getType();
    $settings = unserialize($config->get('content_access_node_type.' . $type));

    if (isset($settings['per_node']) && $settings['per_node']) {
      return TRUE;
    }

    // If we didn't find any settings in content access for this type return
    // false as we don't want to process it.
    $this->logger->log(LogLevel::WARNING, $this->t("Can't set per content permissions for content type @type. Make sure to have per content settings activated for content types you want to alter access control for.", ['@type' => $node->getType()]));

    return FALSE;
  }

  /**
   * Transforms the array of text values to an array keyed by $op and $rid.
   */
  protected function transformRulesValue($value) {
    $array = [];
    foreach ($value as $op_role) {
      $parts = explode(':', $op_role);
      // The first item is $op and the second $rid.
      $array[$parts[0]][] = $parts[1];
    }

    return $array;
  }

  /**
   * Apply the new grants to the affected node.
   */
  protected function aquireGrants(NodeInterface $node) {
    \Drupal::entityTypeManager()->getAccessControlHandler('node')->writeGrants($node);
  }

  /**
   * Process Rule's param, and grant by the passed operation.
   */
  protected function actionUser(array $params, $type) {
    $ops = ['view', 'update', 'delete'];
    $settings = [];
    $node = $params['node'];

    foreach ($ops as $op) {
      if ($params['content_access_user_' . $op]) {
        $settings[$op] = $params['content_access_user_' . $op]->id();
      }
    }

    foreach ($settings as $op => $uid) {
      $acl_id = content_access_get_acl_id($node, $op);
      acl_node_add_acl($node->nid, $acl_id, (int) ($op == 'view'), (int) ($op == 'update'), (int) ($op == 'delete'), content_access_get_settings('priority', $node->getType()));

      $this->database->delete('acl_user')
        ->condition('acl_id', $acl_id)
        ->condition('uid', $uid)
        ->execute();

      if ($type == 'grant') {
        $this->database->insert('acl_user')
          ->fields([
            'acl_id' => $acl_id,
            'uid' => $uid,
          ])
          ->execute();
      }
    }

    $this->aquireGrants($node);
  }

}
