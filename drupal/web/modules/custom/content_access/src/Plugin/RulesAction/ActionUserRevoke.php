<?php

namespace Drupal\content_access\Plugin\RulesAction;

/**
 * Provides a 'Revoke access by user' action.
 *
 * @RulesAction(
 *   id = "content_access_action_user_revoke",
 *   label = @Translation("Revoke access by user"),
 *   category = @Translation("Content Access User"),
 *   context = {
 *     "node" = @ContextDefinition("entity:node",
 *       label = @Translation("Content"),
 *       description = @Translation("Revoke access to the following content."),
 *     ),
 *     "content_access_user_view" = @ContextDefinition("entity:user",
 *       label = @Translation("Revoke view access"),
 *       description = @Translation("Revoke view access to the following user."),
 *       required = FALSE
 *     ),
 *     "content_access_user_update" = @ContextDefinition("entity:user",
 *       label = @Translation("Revoke edit access"),
 *       description = @Translation("Revoke edit access to the following user."),
 *       required = FALSE
 *     ),
 *     "content_access_user_delete" = @ContextDefinition("entity:user",
 *       label = @Translation("Revoke delete access"),
 *       description = @Translation("Revoke delete access to the following user."),
 *       required = FALSE
 *     )
 *   },
 *   deriver = "\Drupal\content_access\Plugin\Deriver\RulesActionUserAclDeriver"
 * )

 */
class ActionUserRevoke extends ContentAccessUserRulesActionBase {
  use ActionCommonTrait;

  /**
   * {@inheritdoc}
   */
  public function execute() {
    $params = $this->getContextValues();
    $this->actionUser($params, 'revoke');
  }

}
