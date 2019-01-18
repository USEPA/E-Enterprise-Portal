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


//use Drupal\Drupal\Component\Utility\String;
use Drupal\Core\Authentication\AuthenticationProviderInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Flood\FloodInterface;
use Drupal\user\UserAuthInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;


class JWTAuthProvider implements AuthenticationProviderInterface {
    

//
//    /**
//     * Constructs a HTTP basic authentication provider object.
//     *
//     * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
//     *   The config factory.
//     * @param \Drupal\user\UserAuthInterface $user_auth
//     *   The user authentication service.
//     * @param \Drupal\Core\Flood\FloodInterface $flood
//     *   The flood service.
//     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
//     *   The entity manager service.
//     */
//    public function __construct(ConfigFactoryInterface $config_factory, EntityTypeManagerInterface $entity_type_manager) {
//        $this->configFactory = $config_factory;
//        $this->entityManager = $entity_type_manager;
//    }

    /**
     * {@inheritdoc}
     */
    public function applies(Request $request) {
//        return TRUE;
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(Request $request) {
//        $entity_manager = \Drupal::entityManager();
//        return $entity_manager->getStorage('user')->load(1);
    }

}