<?php

namespace Drupal\eep_proxy_service\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterManager;

/**
 * Plugin implementation of the 'filter_widget_type' widget.
 *
 * @FieldWidget(
 *   id = "filter_widget_type",
 *   label = @Translation("Filter widget type"),
 *   field_types = {
 *     "filters_field"
 *   }
 * )
 */
class FilterWidgetType extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'size' => 60,
      'placeholder' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = [];

    $elements['size'] = [
      '#type' => 'number',
      '#title' => t('Size of textfield'),
      '#default_value' => $this->getSetting('size'),
      '#required' => TRUE,
      '#min' => 1,
    ];
    $elements['placeholder'] = [
      '#type' => 'textfield',
      '#title' => t('Placeholder'),
      '#default_value' => $this->getSetting('placeholder'),
      '#description' => t('Text that will be shown inside the field until a value is entered. This hint is usually a sample value or a brief description of the expected format.'),
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $summary[] = t('Textfield size: @size', ['@size' => $this->getSetting('size')]);
    if (!empty($this->getSetting('placeholder'))) {
      $summary[] = t('Placeholder: @placeholder', ['@placeholder' => $this->getSetting('placeholder')]);
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {

    // Make sure we pass on the set value to the widget so it doesn't reset
    $value = isset($items[$delta]->value) ? $items[$delta]->value : '';

    // Pull together info we need to build the element.
    $options = [];

    $filter_manager = \Drupal::service('plugin.manager.proxy_service_filter');
    $proxyServiceFiltersPlugins = $filter_manager->getDefinitions();
    foreach($proxyServiceFiltersPlugins as $key => $filter) {
      $options[$key] = $filter['label']->render();
    }

    // Build the element render array.
    $element += [
      '#type' => 'select',
      '#default_value' => $value,
      '#options' => $options,
    ];

    return ['value' => $element];
  }

}
