<?php

namespace Drupal\content_access\Plugin\RulesAction;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\rules\Core\RulesActionBase;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Grant access by role' action.
 *
 * @RulesAction(
 *   id = "content_access_action_grant_node_permissions",
 *   label = @Translation("Grant access by role"),
 *   category = @Translation("Content Access"),
 *   context = {
 *     "node" = @ContextDefinition("entity:node",
 *       label = @Translation("Content"),
 *       description = @Translation("Grant access to the following content.")
 *     ),
 *     "permissions" = @ContextDefinition("string",
 *       label = @Translation("Role-based access control settings."),
 *       required = FALSE
 *     )
 *   }
 * )
 *
 * @todo: Add option_list parameter to permissions after it becomes available.
 */
class ActionGrantNodePermissions extends RulesActionBase implements ContainerFactoryPluginInterface {
  use ActionCommonTrait;

  /**
   * @var \Psr\Log\LoggerInterface
   */
  protected $logger;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, LoggerInterface $logger) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->logger = $logger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('logger.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function execute() {
    $node = $this->getContextValue('node');
    $permissions = $this->getContextValue('permissions');

    if (!empty($node->id()) && $this->checkSetting($node)) {
      // Transform the value to the content-access format.
      $settings = $this->transformRulesValue($permissions);
      $ca_settings = [];
      foreach (_content_access_get_operations() as $op => $label) {
        // Merge in the array of role-ids for each operation.
        $settings += [$op => []];
        $ca_settings[$op] = array_keys(array_flip(content_access_per_node_setting($op, $node)) + array_flip($settings[$op]));
      }
      content_access_save_per_node_settings($node, $ca_settings);
      $this->aquireGrants($node);
    }
  }

}
