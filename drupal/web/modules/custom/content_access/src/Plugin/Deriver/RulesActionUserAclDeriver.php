<?php

namespace Drupal\content_access\Plugin\Deriver;

use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\StringTranslation\TranslationInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Derives Content Access User plugin definitions.
 */
class RulesActionUserAclDeriver extends DeriverBase implements ContainerDeriverInterface {
  use StringTranslationTrait;

  /**
   * The module handler.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * Creates a new RulesActionUserAclDeriver object.
   *
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module_handler.
   * @param \Drupal\Core\StringTranslation\TranslationInterface $string_translation
   *   The string translation service.
   */
  public function __construct(ModuleHandlerInterface $module_handler, TranslationInterface $string_translation) {
    $this->moduleHandler = $module_handler;
    $this->stringTranslation = $string_translation;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, $base_plugin_id) {
    return new static($container->get('module_handler'), $container->get('string_translation'));
  }

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    if ($this->moduleHandler->moduleExists('acl')) {
      $id = $base_plugin_definition['id'];
      $this->derivatives[$id] = $base_plugin_definition;
    }

    return $this->derivatives;
  }

}
