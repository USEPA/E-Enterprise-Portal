<?php
/**
 * @file
 *
 * Contains Drupal\eep_eep_my_reporting\Form\AuthenticationConfigForm
 */

namespace Drupal\eep_my_reporting\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class AuthenticationConfigForm extends ConfigFormBase {


  /**
   * @return array
   */
  protected function getEditableConfigNames() {
    return ['eep_my_reporting.form'];
  }

  /**
   * @return string
   */
  public function getFormId() {
    return 'eep_my_reporting_form';
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   *
   *
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('eep_my_reporting.form');
    $form['wsdl'] = [
      '#type' => 'textfield',
      '#title' => $this->t('WSDL address to make SOAP calls to'),
      '#description' => $this->t('A URL ending with \'?wsdl\''),
      '#default_value' => $config->get('wsdl'),
    ];
    $form['cdx_base_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('CDX URL for SSO and silent handoffs'),
      '#description' => $this->t('This URL is used for the SSO redirect to CDX'),
      '#default_value' => $config->get('cdx_base_url'),
    ];
    $form['cdx_submission_history_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Submission History Return URL for SSO'),
      '#description' => $this->t('This URL is used for the SSO redirect to CDX'),
      '#default_value' => $config->get('cdx_submission_history_url'),
    ];
    $form['admin_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Administrative ID for NAAS authentication'),
      '#description' => $this->t('Typically an email address'),
      '#default_value' => $config->get('admin_id'),
    ];
    $form['domain'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Domain for NAAS authentication'),
      '#description' => $this->t('Typically \'default\''),
      '#default_value' => $config->get('domain'),
    ];
    $form['authentication_method'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Authentication method for NAAS authentication'),
      '#description' => $this->t('Typically \'password\''),
      '#default_value' => $config->get('authentication_method'),
    ];
    return parent::buildForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    $this->config('eep_my_reporting.form')
      ->set('wsdl', $form_state->getValue('wsdl'))
      ->set('cdx_base_url', $form_state->getValue('cdx_base_url'))
      ->set('cdx_submission_history_url', $form_state->getValue('cdx_submission_history_url'))
      ->set('admin_id', $form_state->getValue('admin_id'))
      ->set('domain', $form_state->getValue('domain'))
      ->set('authentication_method', $form_state->getValue('authentication_method'))
      ->save();
  }


}
