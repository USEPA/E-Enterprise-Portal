<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/8/2017
 * Time: 4:48 AM
 */

/**
 * @file
 * Definition of esmt_handler_field_configuration.
 */

/**
 * Provide the first name only from the name field.
 *
 * @ingroup views_filter_handlers
 */
class esmt_handler_esmt_service_action_link extends views_handler_field {
  /**
   * Render the name field.
   */
  public function render($values) {
    $value = $this->get_value($values);
    $return = explode(' ', $value);
    return 'First name: ' . $return['0'];
  }
}