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
    $form['#tree'] = TRUE;


    $config = $this->config('eep_proxy_service.settings');
    $form['blacklisted_headers'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Blacklisted Headers'),
      '#description' => $this->t('Lowercase, space separated header names'),
      '#default_value' => $config->get('host'),
    ];


    // Initial number of names.
    if (!$form_state->get('blacklisted_headers')) {
      $form_state->set('blacklisted_headers', 1);
    }

    // Container for our repeating fields.
    $form['blacklisted_header'] = [
      '#type' => 'container',
      '#title' => $this->t('Blacklisted Headers'),
    ];

    // Add our names fields.
    for ($x = 0; $x < $form_state->get('blacklisted_headers'); $x++) {
      $form['blacklisted_header'][$x] = [
        '#type' => 'textfield',
        '#title' => $this->t('Blacklisted Header @num', ['@num' => ($x + 1)]),
      ];
    }

    // Button to add more names.
    $form['add_header'] = [
      '#type' => 'submit',
      '#value' => $this->t('Add another header'),
    ];

    // Submit button.
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
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

    // Decide what action to take based on which button the user clicked.
    switch ($values['op']) {
      case 'Add another name':
        $this->addNewFields($form, $form_state);
        break;

      default:
        $this->finalSubmit($form, $form_state);
    }
  }

  /**
   * {@inheritdoc}
   */
  /*public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('eep_core.settings')
      ->set('variable_name', $values)
      ->save();
    parent::submitForm($form, $form_state);
  }*/

  /**
   * Handle adding new.
   */
  private function addNewFields(array &$form, FormStateInterface $form_state) {

    // Add 1 to the number of names.
    $num_names = $form_state->get('blacklisted_headers');
    $form_state->set('blacklisted_headers', ($num_names + 1));

    // Rebuild the form.
    $form_state->setRebuild();
  }

  /**
   * Handle submit.
   */
  private function finalSubmit(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('eep_core.settings')
      ->set('variable_name', $values)
      ->save();
    parent::submitForm($form, $form_state);
  }

}