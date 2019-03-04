<?php
/**
 * @file
 *
 * Contains Drupal\eep_bridge\Form\AuthenticationConfigForm
 */
namespace Drupal\eep_bridge\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class AuthenticationConfigForm extends ConfigFormBase{


  /**
   * @return array
   */
  protected function getEditableConfigNames() {
    return ['eep_bridge.environment_settings'];
  }

  /**
   * @return string
   */
  public function getFormId() {
    return 'eep_bridge_environment_form';
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('eep_bridge.environment_settings');

    $form['eep_bridge_environment_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Current Environment Host Name'),
      '#description' => $this->t('E.g: https://dev2.e-enterprise.gov'),
      '#default_value' => $config->get('eep_bridge_environment_name'),
    ];

    $form['eep_bridge_wreply'] = [
      '#type' => 'textfield',
      '#title' => $this->t('WReply for the logout'),
      '#description' => $this->t('the wreply is the page that they will be redirected too after logout'),
      '#default_value' => $config->get('eep_bridge_wreply'),
    ];
    return parent::buildForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    $this->config('eep_bridge.environment_settings')
      ->set('eep_bridge_environment_name', $form_state->getValue('eep_bridge_environment_name'))
      ->set('eep_bridge_wreply', $form_state->getValue('eep_bridge_wreply'))
      ->save();
  }


}