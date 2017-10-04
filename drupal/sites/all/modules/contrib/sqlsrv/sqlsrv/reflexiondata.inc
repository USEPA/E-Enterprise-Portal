<?php

/**
 * Get basic information about an installed PHP extension.
 *
 * @param ReflectionExtension $re
 * @return array
 */
function sqlsrv_REData(ReflectionExtension $re) {
  $_data = [];
  $_data['getName'] = $re->getName() ?: NULL;
  $_data['getVersion'] = $re->getVersion() ?: NULL;
  $_data['getClassName'] = PHP_EOL.implode(", ",$re->getClassNames()) ?: NULL;
  foreach ($re->getConstants() as $key => $value) {
    $_data['getConstants'] .= "\n{$key}:={$value}";
  }
  $_data['getDependencies'] = $re->getDependencies() ?: NULL;
  $_data['getFunctions'] = PHP_EOL.implode(", ",array_keys($re->getFunctions())) ?: NULL;
  $_data['getINIEntries'] = $re->getINIEntries() ?: NULL;
  $_data['isPersistent'] = $re->isPersistent() ?: NULL;
  $_data['isTemporary'] = $re->isTemporary() ?: NULL;
  return $_data;
}