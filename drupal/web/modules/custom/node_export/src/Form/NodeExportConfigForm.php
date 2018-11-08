<?php

namespace Drupal\node_Export\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a Node Export form.
 */
class NodeExportConfigForm extends ConfigFormBase {

  protected $moduleHandler;

  /**
   * Gets the configuration names that will be editable.
   *
   * @return array
   *   An array of configuration object names that are editable if called in
   *   conjunction with the trait's config() method.
   */
  protected function getEditableConfigNames() {
    return [
      'node_export.settings',
    ];
  }
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'node_export_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('node_export.settings');
    $form['basic'] = [
      '#type' => 'fieldset',
      '#title' => t('General settings'),
    ];
    $form['basic']['node_export_format'] = array(
      '#type' => 'radios',
      '#title' => t('Format to use when exporting a node'),
      '#default_value' => 'JSON',
      '#options' => ['JSON' => t('JSON')],
      '#description' => t("Right Now we use only JSON Foramt."),
    );
    $form['basic']['node_export_existing'] = [
      '#type' => 'radios',
      '#title' => t('When importing a node that already exists'),
      '#options' => [
        'new' => t('Create a new node'),
        'replace' => t('Create a new revision of the existing node'),
        'skip' => t('Skip the node'),
      ],
      '#description' => t('UUIDs are used to uniquely identify nodes.'),
      '#default_value' => $config->get('node_export_import'),
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => t('Save Configuration'),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->configFactory->getEditable('node_export.settings')
      // Set the submitted configuration setting.
      ->set('node_export_import', $form_state->getValue('node_export_existing'))
      ->set('node_export_format', $form_state->getValue('node_export_format'))
      ->save();
    parent::submitForm($form, $form_state);
  }
}
