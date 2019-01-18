<?php
/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 1/17/2019
 * Time: 1:35 PM
 */

/**
 * @file
 * Contains \Drupal\jwt_auth_provider\Authentication\Provider\JWTAuthProvider.
 */

namespace Drupal\jwt_auth_provider\Authentication\Provider;

use Drupal\Core\Authentication\AuthenticationProviderInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Flood\FloodInterface;
use Drupal\user\UserAuthInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Drupal\jwt_auth_provider\JWTHandler;


class JWTAuthProvider implements AuthenticationProviderInterface {

    private $jwt_handler;

    function __construct() {
        $this->jwt_handler = new JWTHandler();
    }

    private function isUserPath(Request $request) {
        $path = $request->getPathInfo();
        $path_segments = explode('/', $path);
        $requested_resource = $path_segments[1];
        $requested_uid = $path_segments[2];
        return $requested_resource === 'user' && is_numeric($requested_uid);
    }

    private function requestContainsJWTHeader(Request $request) {
        $jwt = $this->returnJWTFromRequest($request);
        return is_string($jwt);
    }

    private function returnJWTFromRequest(Request $request) {
        $jwt = null;
        $basic_token = $request->headers->get('authorization');
        $basic_token_parts = explode(' ', $basic_token);
        if (!isset($basic_token_parts[1]) && is_string($basic_token_parts[1])) {
            $jwt = $basic_token_parts[1];
        }
        return $jwt;
    }

    /**
     * {@inheritdoc}
     */
    public function applies(Request $request) {
        return $this->isUserPath($request) && $this->requestContainsJWTHeader($request);
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(Request $request) {
        $auth_return = null;
        $jwt = $this->returnJWTFromRequest($request);   
        $decodedJWT = $this->jwt_handler->decodeToken($jwt);
        $uid = $decodedJWT->user_id;
        $path = $request->getPathInfo();
        $path_segments = explode('/', $path);
        if ($this->isUserPath($request)) {
            $requested_uid = $path_segments[2];
            if ((int)$requested_uid === $uid) {
                $auth_return = \Drupal::entityTypeManager()->getStorage('user')->load($uid);
            }
        }
        return $auth_return;
    }
}