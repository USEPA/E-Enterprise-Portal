<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/20/2017
 * Time: 11:19 AM
 */


/**
 * @param $form
 * @param $form_state
 * @return mixed
 */
function esmt_admin_form($form, $form_state) {
  $form = array();

  $form['esmt_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('ESMT configurations'),
  );

  $form['#validate'][] = 'esmt_admin_form_validate';
  $form['#submit'][] = 'esmt_admin_form_submit';
  return system_settings_form($form);
}

/**
 * @param $form
 * @param $form_state
 */
function esmt_admin_form_submit($form, &$form_state){

}

/**
 * Implements hook_validate().
 */
function esmt_admin_form_validate($form, &$form_state) {

}