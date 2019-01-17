<?php

namespace Drupal\jwt_auth_provider\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class JWTAuthProviderConfigs.
 */
class JWTAuthProviderConfigs extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'jwt_auth_provider.jwtauthproviderconfigs',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'jwt_auth_provider_configs';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('jwt_auth_provider.jwtauthproviderconfigs');
    $form['jwt_key'] = [
      '#type' => 'password',
      '#title' => $this->t('JWT Key'),
      '#description' => $this->t('Key to encode/decode JWT&#039;s'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('jwt_key'),
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

    $this->config('jwt_auth_provider.jwtauthproviderconfigs')
      ->set('jwt_key', $form_state->getValue('jwt_key'))
      ->save();
  }

}
