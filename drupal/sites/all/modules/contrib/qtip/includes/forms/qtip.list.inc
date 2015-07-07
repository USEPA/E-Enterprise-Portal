<?php

/**
 * Page callback to list qTips in the system.
 */
function qtip_list() {
  $ctools_exists = module_exists('ctools');

  $header = array(
    array('data' => t('Name')),
    array('data' => t('Machine Name')),
    array('data' => t('Example')),
    array('data' => t('Storage')),
    array('data' => t('Operations'), 'colspan' => ($ctools_exists ? 4 : 2)),
  );
  $rows = array();

  foreach (qtip_load_multiple() as $qt) {
    if ($ctools_exists) {
      // Determine storage
      switch ($qt->export_type) {
        case EXPORT_IN_DATABASE | EXPORT_IN_CODE:
          $storage = t('Overridden');
          $delete = l(t('Revert'), 'admin/config/user-interface/qtip/actions/' . $qt->machine_name . '/revert');
          break;
        case EXPORT_IN_DATABASE:
          $storage = t('Normal');
          $delete = l(t('Delete'), 'admin/config/user-interface/qtip/actions/' . $qt->machine_name . '/delete');
          break;
        case EXPORT_IN_CODE:
          $storage = t('In code');
          $delete = '';
          break;
      }
    }

    $row = array(
      array('data' => check_plain($qt->name)),
      array('data' => check_plain($qt->machine_name)),
      array('data' => theme('qtip', array('content' => t('Sample text'), 'instance' => $qt->machine_name, 'tooltip' => t('This is an example of how this qTip instance will look and function throughout the website.')))),
    );

    if ($ctools_exists) {
      $row[] = array('data' => $storage);
    }

    $row[] = array('data' => l(t('Edit'), 'admin/config/user-interface/qtip/manage/' . $qt->machine_name . '/edit'));

    if ($ctools_exists) {
      $row[] = array('data' => l(t('Export'), 'admin/config/user-interface/qtip/actions/' . $qt->machine_name . '/export'));
      $row[] = array('data' => l(t('Clone'), 'admin/config/user-interface/qtip/actions/' . $qt->machine_name . '/clone'));

    }

    $row[] = array('data' => $delete);

    $rows[] = $row;
  }

  if (empty($rows)) {
    $rows[] = array(array('data' => t('No qTip instances implemented. Create your first one !link.', array('!link' => l(t('here'), 'admin/config/user-interface/qtip/list/add'))), 'colspan' => 8));
  }

  $table = theme('table', array('rows' => $rows, 'header' => $header));

  return '<h2 class="label">' . t('qTip instances') . '</h2>' . $table;
}
