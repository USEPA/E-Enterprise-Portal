<?php

namespace Drupal\eep_core\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class EEPCookieConfigForm.
 */
class EEPCookieConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'eep_core.eepcookieconfig',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'eep_cookie_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('eep_core.eepcookieconfig');
    $form['cookie_duration'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Cookie Duration'),
      '#description' => $this->t('amount of the time cookie will be active for'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('cookie_duration'),
    ];
    $form['cookie_time_units'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Cookie Time Units'),
      '#description' => $this->t('this will be either s, m, h. These will represent seconds, minutes, or hours.'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('cookie_time_units'),
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

    $this->config('eep_core.eepcookieconfig')
      ->set('cookie_duration', $form_state->getValue('cookie_duration'))
      ->set('cookie_time_units', $form_state->getValue('cookie_time_units'))
      ->save();
  }

}
