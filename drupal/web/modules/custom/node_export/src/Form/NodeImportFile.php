<?php

namespace Drupal\node_Export\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a Node Import form.
 */
class NodeImportFile extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'node_import_file';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['myfile'] = [
      '#title' => $this->t('Upload myfile'),
      '#type' => 'file',
      // DO NOT PROVILDE '#required' => TRUE or your form will always fail validation!
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => 'Import',
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // $json = $form_state->getValue('paste');.
    $validators = ['file_validate_extensions' => ['json']];
    $file = file_save_upload('myfile', $validators, FALSE, 0);
    if (!$file) {
      return;
    }
    else {
      $data = file_get_contents($file->getFileUri());
    }
    $nodes = json_decode($data, TRUE);
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
