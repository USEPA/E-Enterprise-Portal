<?php
/**
 * Created by PhpStorm.
 * User: mculpepp
 * Date: 1/17/2019
 * Time: 9:50 AM
 */

/**
 * @file
 * Contains \Drupal\jwt_auth_provider\Authentication\Provider\jwtAuthProvider.
 */
namespace Drupal\jwt_auth_provider\Authentication\Provider\jwtAuthProvider;
use \Drupal\Component\Utility\String;
use Drupal\Core\Authentication\AuthenticationProviderInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Flood\FloodInterface;
use Drupal\user\UserAuthInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
/**
 * HTTP Basic authentication provider.
 */
class jwtAuthProvider implements AuthenticationProviderInterface {
  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;
  /**
   * The user auth service.
   *
   * @var \Drupal\user\UserAuthInterface
   */
  protected $userAuth;
  /**
   * The flood service.
   *
   * @var \Drupal\Core\Flood\FloodInterface
   */
  protected $flood;
  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;
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
    // Only apply this validation if request has a valid accept value
    $config = $this->configFactory->get('jwt_auth_provider.consumers_form_config');
    if(strstr($request->headers->get('Accept'),$config->get('format'))) {
      return TRUE;
    }
    else {
      return FALSE;
    }
  }
  /**
   * {@inheritdoc}
   */
  public function authenticate(Request $request) {
    $config = $this->configFactory->get('jwt_auth_provider.consumers_form_config');
    $ip_consumers = $config->get('ip_consumers');
    // Determine if list of IP is a white list or black list
    $type = $config->get('list_type');
    $ips = array_map('trim', explode( "\n", $ip_consumers));
    $consumer_ip = $request->getClientIp(TRUE);
    // White list logic
    if($type) {
      if (in_array($consumer_ip, $ips)) {
        // Return Anonymous user
        return $this->entityTypeManager->getStorage('user')->load(0);
      }
      else{
        throw new AccessDeniedHttpException();
        return null;
      }
    }
    // Black list logic
    else {
      if (!in_array($consumer_ip, $ips)) {
        // Return Anonymous user
        return $this->entityTypeManager->getStorage('user')->load(0);
      }
      else{
        throw new AccessDeniedHttpException();
        return null;
      }
    }
  }
  /**
   * {@inheritdoc}
   */
  public function cleanup(Request $request) {}
  /**
   * {@inheritdoc}
   */
  public function handleException(GetResponseForExceptionEvent $event) {
    $exception = $event->getException();
    if ($exception instanceof AccessDeniedHttpException) {
      $event->setException(new UnauthorizedHttpException('Invalid consumer origin.', $exception));
      return TRUE;
    }
    return FALSE;
  }
}