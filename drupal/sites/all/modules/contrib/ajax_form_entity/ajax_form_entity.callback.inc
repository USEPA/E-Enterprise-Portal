<?php

/**
 * Ajax callback for edition (ajax edit link).
 */
function ajax_form_entity_entity_edit_callback($type = 'ajax') {
  // TODO : use hook_menu page argument.
  $entity_type = arg(3);
  $entity_id = arg(4);
  $special_id = arg(5);

  // Load entity.
  $ids[] = $entity_id;
  $entity = entity_load($entity_type, $ids);
  // TODO : desactivated js compatibility.
  if (entity_access('update', $entity_type, $entity[$entity_id])) {
    if ($type == 'ajax') {

      $form_state['build_info']['args'][] = $entity;

      $form['#prefix'] = '<div id="form-closing-wrapper-' . $special_id . '">';
      $form['#suffix'] = '</div>';
      $form = _ajax_form_entity_build_entity_forms($entity_type, array(), array(), $entity);
      $form['#prefix'] .= l(t('Close'), 'ajax-form-entity-cancel/nojs/' . $special_id, array('attributes' => array('class' => array('use-ajax button-cancel'))));

      $render_form = drupal_render($form);
      $commands = array();
      $commands[] = ajax_command_css('#ajax-entity-form-' . $special_id, array('display' => 'none'));
      
      $commands[] = ajax_command_append('#ajax-entity-form-wrapper-' . $special_id, $render_form);
      $page = array('#type' => 'ajax', '#commands' => $commands);
      ajax_deliver($page);
    }
    else {
      // TODO : no javascript.
    }
  }

}

/**
 * Ajax callback for deletion (ajax delete link).
 */
function ajax_form_entity_entity_delete_callback($type = 'ajax') {

  $entity_type = arg(3);
  $entity_id = arg(4);
  $special_id = arg(5);

  // Load entity to check access.
  $ids[] = $entity_id;
  $entity = entity_load($entity_type, $ids);

  if (entity_access('delete', $entity_type, $entity[$entity_id]) && isset($_SESSION['ajax_form_entity_delete'][$special_id])) {
    if ($type == 'ajax') {

      //$message = t('Deleted');
      $vars['content'] = 'Deleted';
      $message = theme('ajax_form_entity_deleted', $vars);
      
      //  For field collection, apply the delete class of Field collection to delete references from host entity.
      if ($entity_type == 'field_collection_item') {
        $entity[$entity_id]->delete();
      }
      else {
        entity_delete($entity_type, $entity_id);
      }
      $commands[] = ajax_command_replace('#ajax-entity-form-' . $special_id, $message . theme('status_messages'));

      $page = array('#type' => 'ajax', '#commands' => $commands);
      ajax_deliver($page);
    }
    else {
      // TODO : no javascript.
    }
  }
}
