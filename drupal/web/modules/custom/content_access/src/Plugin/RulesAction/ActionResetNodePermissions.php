<?php

namespace Drupal\content_access\Plugin\RulesAction;

use Drupal\rules\Core\RulesActionBase;

/**
 * Provides a 'Reset access by role' action.
 *
 * @RulesAction(
 *   id = "content_access_action_reset_node_permissions",
 *   label = @Translation("Reset access to content type defaults"),
 *   category = @Translation("Content Access"),
 *   context = {
 *     "node" = @ContextDefinition("entity:node",
 *       label = @Translation("Content"),
 *       description = @Translation("Reset node permissions to default permissions.")
 *     )
 *   }
 * )
 */
class ActionResetNodePermissions extends RulesActionBase {
  use ActionCommonTrait;

  /**
   * {@inheritdoc}
   */
  public function execute() {
    $node = $this->getContextValue('node');

    content_access_delete_per_node_settings($node);
    $this->aquireGrants($node);
  }

}
