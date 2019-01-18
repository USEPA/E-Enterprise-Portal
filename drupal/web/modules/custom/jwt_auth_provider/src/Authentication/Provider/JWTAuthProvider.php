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

    private function isUserPath(Request $request) {
        $path = $request->getPathInfo();
        $path_segments = explode('/', $path);
        $requested_resource = $path_segments[1];
        $requested_uid = $path_segments[2];
        return $requested_resource === 'user' && is_numeric($requested_uid);
    }

    /**
     * {@inheritdoc}
     */
    public function applies(Request $request) {
        return $this->isUserPath($request);
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(Request $request) {
        $auth_return = null;
        $jwt_handler = new JWTHandler();
        $jwt_handler->setUIDForJWT(1);
        $jwt = $jwt_handler->generateToken();

        $decodedJWT = $jwt_handler->decodeToken($jwt);
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