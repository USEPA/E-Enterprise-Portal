<?php

namespace Drupal\content_access\Form;

use Drupal\user\Entity\Role;

/**
 * Common components for Content Access forms.
 */
trait ContentAccessRoleBasedFormTrait {

  /**
   * Builds the role based permission form for the given defaults.
   *
   * @param $defaults
   *   Array of defaults for all operations.
   */
  protected function roleBasedForm(&$form, $defaults = [], $type = NULL) {
    $description = [
      t('Note that users need at least the %access_content permission to be able to deal in any way with content.', [
        '%access_content' => t('access content'),
      ]),
      t('Furthermore note that content which is not @published is treated in a different way by drupal: It can be viewed only by its author or users with the %administer_nodes permission.', [
        '@published' => t('published'),
        '%administer_nodes' => t('administer nodes'),
      ]),
    ];
    $form['per_role'] = [
      '#type' => 'fieldset',
      '#title' => t('Role based access control settings'),
      '#collapsible' => TRUE,
      '#description' => implode(' ', $description),
    ];

    $operations = _content_access_get_operations($type);
    $user_roles = Role::loadMultiple();
    $roles = [];
    foreach ($user_roles as $role) {
      $roles[$role->id()] = $role->get('label');
    }
    foreach ($operations as $op => $label) {
      // Make sure defaults are set properly.
      $defaults += [$op => []];

      $form['per_role'][$op] = [
        '#type' => 'checkboxes',
        '#prefix' => '<div class="content_access-div">',
        '#suffix' => '</div>',
        '#options' => $roles,
        '#title' => $label,
        '#default_value' => $defaults[$op],
      ];
    }

    $form['per_role']['clearer'] = [
      '#value' => '<br clear="all" />',
    ];

    $form['#attached']['library'][] = 'content_access/drupal.content_access';

    return $form;
  }

}
