<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/8/2017
 * Time: 4:58 AM
 */

/**
 * Implements hook_views_pre_render().
 */
function esmt_views_post_execute(&$view) {

  if($view->name == 'esmt_service_provider') {
    global $user;
    // Get user permissions

    foreach($view->result as $result){
      $result = $result;
      // Get user partner affiliations
      // @todo this should grab the current active affiliation and pass it on the view

      // if you have permissions you can access the configuration
      // @todo this should be driven by Drupal permissions and not roles but for brevity we cheat a bit

      // @todo Sorry Ben, having a brainfart here trying to connect SCS to drupal
      $permission = ['BWI Configuation', 'admin'];
      if(array_intersect($permission, $user->roles)) {
        foreach($result->field_field_webform as $form) {
          $form = $form;
          $nid  = $form['raw']['entity']->webform['nid'];

          $form['rendered']['#markup'] = '<a class="button usa-button" href=\'/node/'.$nid.'\'>Customize</a>';
        }
      }

      // if you have permission you can publish
    }


  }
}