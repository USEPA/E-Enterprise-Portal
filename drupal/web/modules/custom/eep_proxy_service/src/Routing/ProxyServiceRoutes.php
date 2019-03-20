<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/5/2018
 * Time: 10:10 PM
 */

namespace Drupal\eep_proxy_service\Routing;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route;


class ProxyServiceRoutes {
  public function routes() {
    $routes = new RouteCollection();
    $path = '/eep/proxy/service/{service_machine_name}';
    $requirements = array(
      '_permission' => 'access content',
    );
    for($i = 1; $i <= 10; $i++) {
      $path .= "/{path_part$i}";
      // $requirements["path$i"] =
      $route = new Route($path, array(
        '_controller' => '\Drupal\eep_proxy_service\Controller\ProxyServiceController::service'
      ), $requirements);

      $routes->add("eep_proxy_service.proxy_service_controller_service_path$i", $route);
    }

    return $routes;
  }
}