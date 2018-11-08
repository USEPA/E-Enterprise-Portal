<?php

namespace Drupal\node_Export\Form;

use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a Node Import form.
 */
class NodeImportForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'node_import_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['upload_from_file'] = [
      '#type' => 'markup',
      '#markup' => '<a href="import/file">Import from file</a>',
    ];
    $form['paste'] = [
      '#type' => 'textarea',
      '#default_value' => '',
      '#rows' => 15,
      '#description' => t('Paste the code of a node export here and check that new nodes are created or not after clicking on content.'),
      '#wysiwyg' => FALSE,
      '#required' => TRUE,
    ];
    $form['actions'] = ['#type' => 'actions'];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => t('Import'),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // Loads all the content types in the drupal site.
    $contentTypes = \Drupal::service('entity.manager')
      ->getStorage('node_type')
      ->loadMultiple();

    $contentTypesList = [];
    foreach ($contentTypes as $contentType) {
      $contentTypesList[$contentType->id()] = $contentType->id();
    }
    $json = $form_state->getValue('paste');
    $nodes = json_decode($json, TRUE);

    foreach ($nodes as $node) {
      if (!in_array($node['type'][0]['target_id'], $contentTypesList)) {
        $form_state->setErrorByName('Content Type', $this->t('The content type of the node you are trying to insert does not match any content type in your Drupal site'));
      }
    }
    $field_values = [];
    foreach ($nodes as $node) {
      $contentType = $node['type'][0]['target_id'];
      $bundle_fields = \Drupal::entityManager()->getFieldDefinitions('node', $contentType);
      foreach ($node as $fields => $value) {
        if(!array_key_exists($fields, $bundle_fields)) {
          $form_state->setErrorByName('paste', $this->t('The content type does not have all the fields.'));
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $json = $form_state->getValue('paste');
    $nodes = json_decode($json, TRUE);
    $batch = [
      'title' => t('Importing Nodes...'),
      'operations' => [],
      'init_message' => t('Imporitng'),
      'progress_message' => t('Processed @current out of @total.'),
      'error_message' => t('An error occurred during processing'),
      'finished' => '\Drupal\node_export\NodeImport::nodeImportFinishedCallback',
    ];
    foreach ($nodes as $node) {
      $batch['operations'][] = [
        '\Drupal\node_export\NodeImport::nodeImport',
        [$node],
      ];
    }
    batch_set($batch);
    drupal_set_message(t('Node has been imported succesfully.'));
  }

}
