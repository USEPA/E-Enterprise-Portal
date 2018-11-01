<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/22/2018
 * Time: 10:37 PM
 */

namespace Drupal\eep_proxy_service\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a form that configures forms module settings.
 */
class EepProxyServiceModuleConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'eep_proxy_service_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'eep_proxy_service.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['#tree'] = TRUE;

    $config = $this->config('eep_proxy_service.settings');
    $form['blacklisted_headers'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Blacklisted Headers'),
      '#description' => $this->t('Lowercase, space separated header names'),
      '#default_value' => $config->get('blacklisted_headers'),
    ];
    $form['error_message_general'] = [
      '#type' => 'textarea',
      '#title' => $this->t('General Error Message'),
      '#description' => $this->t('This is the generic message for '),
      '#default_value' => $config->get('error_message_general') || "The external service request was not able to be completed. Please try again later.",
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
    $values = $form_state->getValues();
    $this->config('eep_proxy_service.settings')
      ->set('blacklisted_headers', $values['blacklisted_headers'])
      ->save();
    parent::submitForm($form, $form_state);
  }

}