<?php

namespace Drupal\eep_core\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class BannerConfigForm.
 */
class BannerConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'eep_core.bannerconfig',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'banner_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('eep_core.bannerconfig');
    $form['banner_text'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Banner Text'),
      '#description' => $this->t('This is the text that will be displayed on the banner on the top of every route'),
      '#default_value' => $config->get('banner_text'),
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

    $this->config('eep_core.bannerconfig')
      ->set('banner_text', $form_state->getValue('banner_text'))
      ->save();
  }
}
