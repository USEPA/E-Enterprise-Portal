<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/5/2018
 * Time: 11:40 PM
 */

namespace Drupal\eep_proxy_service\Routing;

use Drupal\Core\ParamConverter\ParamConverterInterface;
use Symfony\Component\Routing\Route;

class ParamConverter implements ParamConverterInterface {

  /**
   * Converts path variables to their corresponding objects.
   *
   * @param mixed $value
   *   The raw value.
   * @param mixed $definition
   *   The parameter definition provided in the route options.
   * @param string $name
   *   The name of the parameter.
   * @param array $defaults
   *   The route defaults array.
   *
   * @return mixed|null
   *   The converted parameter value.
   */
  public function convert($value, $definition, $name, array $defaults) {
    // TODO: Implement convert() method.
  }

  /**
   * Determines if the converter applies to a specific route and variable.
   *
   * @param mixed $definition
   *   The parameter definition provided in the route options.
   * @param string $name
   *   The name of the parameter.
   * @param \Symfony\Component\Routing\Route $route
   *   The route to consider attaching to.
   *
   * @return bool
   *   TRUE if the converter applies to the passed route and parameter, FALSE
   *   otherwise.
   */
  public function applies($definition, $name, Route $route) {
    // TODO: Implement applies() method.
    return TRUE;
  }
}