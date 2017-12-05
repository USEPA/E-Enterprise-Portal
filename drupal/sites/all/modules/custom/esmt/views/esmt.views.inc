<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/8/2017
 * Time: 4:58 AM
 */

/**
 * Implements hook_views_post_execute().
 */
function esmt_views_post_execute(&$view) {

  if ($view->name == 'esmt_service_provider') {
    global $user;
    // Get user permissions
    $permission = ['BWI Configuation', 'admin'];
    if (empty(array_intersect($permission, $user->roles))) {
      return;
    }
    foreach ($view->result as $result) {
      // Get user partner affiliations
      // @todo this should grab the current active affiliation and pass it on the view

      // if you have permissions you can access the configuration
      // @todo this should be driven by Drupal permissions and not roles but for brevity we cheat a bit

      foreach ($result->field_field_webform as $form) {
        $nid = $form['raw']['entity']->webform['nid'];

        $form['rendered']['#markup'] = '<a class="button usa-button" href=\'/node/' . $nid . '\'>Customize</a>';
      }
    }
  }
}