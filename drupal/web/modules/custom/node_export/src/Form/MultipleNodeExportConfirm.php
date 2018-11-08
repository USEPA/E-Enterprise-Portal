<?php

namespace Drupal\node_Export\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a Node Export form.
 */
class MultipleNodeExportConfirm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'multiple_node_export_confirm';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $content_type = \Drupal::routeMatch()->getParameter('content_type');
    // Get all the node ids of a particular content type.
    $nids = \Drupal::entityQuery('node')->condition('type', $content_type)->execute();

    $batch = [
      'title' => t('Generating Export Code...'),
      'operations' => [],
      'init_message'     => t('Exporting '),
      'progress_message' => t('Processed @current out of @total.'),
      'error_message'    => t('An error occurred during processing'),
      'finished' => '\Drupal\node_export\nodeExport::NodeExportFinishedCallback',
    ];
    foreach ($nids as $nid) {
      $batch['operations'][] = ['\Drupal\node_export\nodeExport::NodeExport', [$nid]];
    }
    batch_set($batch);
    $count = 0;
    $result = [];
    foreach ($nodes as $node) {
      foreach ($node as $key => $value) {
        $result[$count][$key] = $node->get($key)->getValue()[0];
      }
      $count++;
    }
    $json = json_encode($result);
    $form['export_code'] = [
      '#type' => 'textarea',
      '#value' => $json,
      '#title' => t('Node Export Code is :'),
      '#rows' => '25',
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => t('Download'),
    ];
    $form['nid'] = [
      '#type' => 'hidden',
      '#value' => $nid,
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    drupal_set_message(t('Node Content Type has been changed succesfully.'));
  }

}
