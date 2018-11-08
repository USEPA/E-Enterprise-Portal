<?php

namespace Drupal\eep_proxy_service\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a Proxy Service Filter item annotation object.
 *
 * @see \Drupal\eep_proxy_service\Plugin\ProxyServiceFilterManager
 * @see plugin_api
 *
 * @Annotation
 */
class ProxyServiceFilter extends Plugin {


  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The label of the plugin.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

}
