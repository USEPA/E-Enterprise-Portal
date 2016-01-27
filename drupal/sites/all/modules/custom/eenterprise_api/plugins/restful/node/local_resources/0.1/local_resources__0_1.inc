<?php

/**
 * @file
 * Artists plugin definition.
 */

$plugin = array(
    'label' => t('Local Resources'),
    'resource' => 'local_resources',
    'name' => 'local_resources__0_1',
    'entity_type' => 'node',
    'bundle' => 'lgc-resources',
    'description' => t('This resource presents local resources from REST easy.'),
    'class' => 'EEnterpriseAPILGCResources',
    'major_version' => 0,
    'minor_version' => 1,
);