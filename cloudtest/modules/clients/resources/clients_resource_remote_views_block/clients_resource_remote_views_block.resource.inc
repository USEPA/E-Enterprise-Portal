<?php
/**
 * @file
 * Contains the Client resource handler class.
 */

/**
 * Resource class for remote blocks.
 */
class clients_resource_remote_view_block extends clients_resource_base {

  /**
   * Extra form elements specific to a class's edit form.
   */
  function resourceSettingsFormAlter(&$form, &$form_state) {
    $form['component']['#title'] = t('Block delta');
    $form['component']['#description'] = t('The delta to identify this block.');

    $form['configuration']['block_title'] = array(
      '#type' => 'textfield',
      '#title' => t('Block title'),
      '#default_value' => isset($this->configuration['block_title']) ? $this->configuration['block_title'] : '',
      '#description' => t('The title to show for the block.'),
      '#required' => TRUE,
    );

    $form['configuration']['view'] = array(
      '#type' => 'textfield',
      '#title' => t('View machine name'),
      '#default_value' => isset($this->configuration['view']) ? $this->configuration['view'] : '',
      '#description' => t('The machine name of the View on the remote site.'),
      '#required' => TRUE,
    );
    $form['configuration']['display'] = array(
      '#type' => 'textfield',
      '#title' => t('Display machine name'),
      '#default_value' => isset($this->configuration['display']) ? $this->configuration['display'] : '',
      '#description' => t('The machine name of the View display on the remote site.'),
      '#required' => TRUE,
    );
    $form['configuration']['arguments'] = array(
      '#type' => 'textfield',
      '#title' => t('View arguments'),
      '#default_value' => isset($this->configuration['arguments']) ? $this->configuration['arguments'] : '',
      '#description' => t('Arguments to pass to the view, separated with a /.'),
    );

    // TODO: offset, count
  }

  // ======================================== Remote Block

  /**
   * Implements hook_block_info() for this resource's block.
   */
  function hook_block_info() {
    $blocks[$this->component] = array(
      'info' => $this->configuration['block_title'],
      // TODO: Our own caching for resources or connections?
      'cache' => DRUPAL_CACHE_GLOBAL,
    );
    return $blocks;
  }

  /**
   * Implements hook_block_view() for this resource's block.
   */
  function hook_block_view() {
    // Get our connection.
    $connection = $this->getConnection();

    // Make the arguments array.
    if (!empty($this->configuration['arguments'])) {
      $arguments = explode('/', $this->configuration['arguments']);
    }
    else {
      $arguments = array();
    }

    try {
      $result = $connection->callMethodArray('views.retrieve', array(
        $this->configuration['view'],
        $this->configuration['display'],
        $arguments,
        0,    // offset
        100,  // count... we only need these to get to the final parameter of...
        TRUE, // return formatted view rather than raw result data.
      ));
    }
    catch (Exception $e) {
      // If we get an error, log it and bail.
      $message = $e->getMessage();
      watchdog('clients_resource_remote_views_block', 'Error retrieving remote blocks from master site. Error was code @code with message "@message".', array(
        '@code' => $e->getCode(),
        '@message' => $message,
      ));
      return;
    }

    // No idea why this is wrapped in an array...
    $view_output = $result[0];

    $block['subject'] = $this->configuration['block_title'];
    $block['content'] = $view_output;

    return $block;
  }

}
