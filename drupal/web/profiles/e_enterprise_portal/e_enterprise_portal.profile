<?php

/**
 * @file
 * Enables modules and site configuration for the E-Enterprise Portal profile.
 */

// Add any custom code here like hook implementations.


use Drupal\contact\Entity\ContactForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for install_configure_form().
 *
 * Allows the profile to alter the site configuration form.
 */
function e_enterprise_portal_form_install_configure_form_alter(&$form, FormStateInterface $form_state) {

  $form['langcode']['#default_value'] = 'en';
  $form['admin_account']['account']['name']['#default_value'] = 'cgi-admin';
  $form['regional_settings']['site_default_country']['#default_value'] = 'US';
  $form['regional_settings']['date_default_timezone']['#default_value'] = 'America/Chicago';

  $form['site_information']['site_mail']['#default_value'] = 'admin@' . $_SERVER['HTTP_HOST'];
  $form['admin_account']['account']['mail']['#default_value'] = 'admin@' . $_SERVER['HTTP_HOST'];

  $form['site_information']['site_name']['#default_value'] = t('E-Enterprise Portal');

  // Do not enable the update manager module by default during installation.
  // This module probably shouldn't be enabled on productions sites where
  // performance is critical.
  $form['update_notifications']['enable_update_status_module']['#default_value'] = FALSE;
  $form['update_notifications']['enable_update_status_emails']['#default_value'] = FALSE;


  $form['#submit'][] = 'e_enterprise_portal_form_install_configure_submit';
}

/**
 * Submission handler to sync the contact.form.feedback recipient.
 */
function e_enterprise_portal_form_install_configure_submit($form, FormStateInterface $form_state) {
  $site_mail = $form_state->getValue('site_mail');
  $feedback = ContactForm::load('feedback');
  if ($feedback) {
    $feedback->setRecipients([$site_mail])->trustData()->save();
  }
}