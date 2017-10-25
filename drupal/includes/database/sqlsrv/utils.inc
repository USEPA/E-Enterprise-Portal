<?php

class DatabaseUtils {
  /**
   * Summary of BindArguments
   * @param PDOStatement $stmt
   * @param array $values
   */
  public static function BindArguments(\PDOStatement $stmt, array &$values) {
    foreach ($values as $key => &$value) {
      $stmt->bindParam($key, $value, PDO::PARAM_STR);
    }
  }

  /**
   * Summary of BindExpressions
   * @param PDOStatement $stmt
   * @param array $values
   * @param array $remove_from
   */
  public static function BindExpressions(\PDOStatement $stmt, array &$values, array &$remove_from) {
    foreach ($values as $key => $value) {
      unset($remove_from[$key]);
      if (empty($value['arguments'])) {
        continue;
      }
      if (is_array($value['arguments'])) {
        foreach ($value['arguments'] as $placeholder => $argument) {
          // We assume that an expression will never happen on a BLOB field,
          // which is a fairly safe assumption to make since in most cases
          // it would be an invalid query anyway.
          $stmt->bindParam($placeholder, $value['arguments'][$placeholder]);
        }
      }
      else {
        $stmt->bindParam($key, $value['arguments'], PDO::PARAM_STR);
      }
    }
  }

  /**
   * Binds a set of values to a PDO Statement,
   * taking care of properly managing binary data.
   *
   * @param PDOStatement $stmt
   * PDOStatement to bind the values to
   *
   * @param array $values
   * Values to bind. It's an array where the keys are column
   * names and the values what is going to be inserted.
   *
   * @param array $blobs
   * When sending binary data to the PDO driver, we need to keep
   * track of the original references to data
   *
   * @param array $ref_prefix
   * The $ref_holder might be shared between statements, use this
   * prefix to prevent key colision.
   *
   * @param mixed $placeholder_prefix
   * Prefix to use for generating the query placeholders.
   *
   * @param mixed $max_placeholder
   * Placeholder count, if NULL will start with 0.
   *
   */
  public static function BindValues(\PDOStatement $stmt, array &$values, array &$blobs, $placeholder_prefix, $columnInformation, &$max_placeholder = NULL, $blob_suffix = NULL) {
    if (empty($max_placeholder)) {
      $max_placeholder = 0;
    }
    foreach ($values as $field_name => &$field_value) {
      $placeholder = $placeholder_prefix . $max_placeholder++;
      $blob_key = $placeholder . $blob_suffix;
      if (isset($columnInformation['blobs'][$field_name])) {
        $blobs[$blob_key] = fopen('php://memory', 'a');
        fwrite($blobs[$blob_key], $field_value);
        rewind($blobs[$blob_key]);
        $stmt->bindParam($placeholder, $blobs[$blob_key], PDO::PARAM_LOB, 0, PDO::SQLSRV_ENCODING_BINARY);
      }
      else {
        // Even though not a blob, make sure we retain a copy of these values.
        $blobs[$blob_key] = $field_value;
        $stmt->bindParam($placeholder, $blobs[$blob_key], PDO::PARAM_STR);
      }
    }
  }

  public static function GetConfigBoolean($name, $default = FALSE) {
    global $conf;
    // Isolation level.
    if (isset($conf[$name])) {
      $value = $conf[$name];
      if (is_bool($value)) {
        return $value;
      }
    }
    return FALSE;
  }

  /**
   * Get the value of a constant string from configuration.
   *
   * @param mixed $name
   * @param mixed $default
   * @return mixed
   */
  public static function GetConfigConstant($name, $default) {
    global $conf;
    // Isolation level.
    if (isset($conf[$name])) {
      $level =  $conf[$name];
      if($l = @constant($level)) {
        return $l;
      }
    }
    return $default;
  }

  /**
   * Returns the spec for a MSSQL data type definition.
   *
   * @param mixed $type
   */
  public static function GetMSSQLType($type) {
    $matches = array();
    if(preg_match('/^[a-zA-Z]*/' , $type, $matches)) {
      return reset($matches);
    }
    return $type;
  }
}