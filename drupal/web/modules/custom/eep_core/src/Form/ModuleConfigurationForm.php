<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/22/2018
 * Time: 10:37 PM
 */

namespace Drupal\eep_core\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a form that configures forms module settings.
 */
class ModuleConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'eep_core_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'eep_core.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('eep_core.settings');
    $form['your_message'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Your message'),
      '#default_value' => $config->get('your_message'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('eep_core.settings')
      ->set('variable_name', $values)
      ->save();
    parent::submitForm($form, $form_state);
  }

}