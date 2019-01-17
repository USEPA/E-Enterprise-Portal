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

use \Drupal\Component\Utility\String;
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

class JWTAuthProvider implements AuthenticationProviderInterface {

    /**
     * Constructs a HTTP basic authentication provider object.
     *
     * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
     *   The config factory.
     * @param \Drupal\user\UserAuthInterface $user_auth
     *   The user authentication service.
     * @param \Drupal\Core\Flood\FloodInterface $flood
     *   The flood service.
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
     *   The entity manager service.
     */
    public function __construct(ConfigFactoryInterface $config_factory, EntityTypeManagerInterface $entity_type_manager) {
        $this->configFactory = $config_factory;
        $this->entityTypeManager = $entity_type_manager;
    }

    /**
     * {@inheritdoc}
     */
    public function applies(Request $request) {
        // If Authentication Provider is enabled always apply
        return TRUE;
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(Request $request) {
        return TRUE;
//        $allowed_ip_consumers = $this->configFactory->
//        get('ip_consumer_auth.consumers_form_config')->
//        get('allowed_ip_consumers');
//        $ips = array_map('trim', explode( "\n", $allowed_ip_consumers));
//        $consumer_ip = $request->getClientIp(TRUE);
//        if (in_array($consumer_ip, $ips)) {
//            // Return Anonymous user
//            return $this->entityManager->getStorage('user')->load(0);
//        }
//        else{
//            throw new AccessDeniedHttpException();
//            return null;
//        }
    }
}