<?php

namespace Drupal\eep_core\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class EepCookieConfigurationForm.
 */
class EepCookieConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'eep_core.eepcookieconfiguration',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'eep_cookie_configuration_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('eep_core.eepcookieconfiguration');
    $form['cookie_timeout'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Cookie Timeout'),
      '#description' => $this->t('this input field specifies the time a cookie can exist for'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('cookie_timeout'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('eep_core.eepcookieconfiguration')
      ->set('cookie_timeout', $form_state->getValue('cookie_timeout'))
      ->save();
  }

}
