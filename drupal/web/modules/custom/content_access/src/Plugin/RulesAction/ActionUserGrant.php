<?php

namespace Drupal\content_access\Plugin\RulesAction;

/**
 * Provides a 'Grant access by user' action.
 *
 * @RulesAction(
 *   id = "content_access_action_user_grant",
 *   label = @Translation("Grant access by user"),
 *   category = @Translation("Content Access User"),
 *   context = {
 *     "node" = @ContextDefinition("entity:node",
 *       label = @Translation("Content"),
 *       description = @Translation("Grant access to the following content.")
 *     ),
 *     "content_access_user_view" = @ContextDefinition("entity:user",
 *       label = @Translation("Grant view access"),
 *       description = @Translation("Grant view access to the following user."),
 *       required = FALSE
 *     ),
 *     "content_access_user_update" = @ContextDefinition("entity:user",
 *       label = @Translation("Grant edit access"),
 *       description = @Translation("Grant edit access to the following user."),
 *       required = FALSE
 *     ),
 *     "content_access_user_delete" = @ContextDefinition("entity:user",
 *       label = @Translation("Grant delete access"),
 *       description = @Translation("Grant delete access to the following user."),
 *       required = FALSE
 *     )
 *   },
 *   deriver = "\Drupal\content_access\Plugin\Deriver\RulesActionUserAclDeriver"
 * )

 */
class ActionUserGrant extends ContentAccessUserRulesActionBase {
  use ActionCommonTrait;

  /**
   * {@inheritdoc}
   */
  public function execute() {
    $params = $this->getContextValues();
    $this->actionUser($params, 'grant');
  }

}
