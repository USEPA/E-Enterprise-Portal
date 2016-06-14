<?php
$dev_root = '/var/www/html/drupal';
$aliases['dev'] = array(
    'uri' => '52.204.39.82',
    'root' => $dev_root,
    'remote-user' => 'bamboo',
    'remote-host' => '52.204.39.82',
    'path-aliases' => array(
        '%dump-dir' => '/var/www/dumps',
        '%files' => $dev_root . '/sites/default/files',
        '%test1' => $dev_root.'/test1/',
        '%test2' => $dev_root.'/test2',
     )
);
?>