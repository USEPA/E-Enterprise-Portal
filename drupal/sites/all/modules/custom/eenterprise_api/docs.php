<?php
require_once 'api_constants.php';
/**
* @SWG\Info(
*   title="EEnterprise API",
*   description="Demonstrate features in the OPEN API-2.0 specification",
*   version=API_VERSION,
*   @SWG\Contact(
*     email="apiteam@swagger.io",
*     name="Swagger API Team",
*     url="http://swagger.io"
*   ),
*   @SWG\License(
*     name="MIT",
*     url="http://github.com/gruntjs/grunt/blob/master/LICENSE-MIT"
*   ),
*   termsOfService="http://swagger.io/terms/"
* )
* @SWG\Swagger(
*   host=API_HOST,
*   basePath=BASE_PATH,
*   schemes={HTTP_SETTING},
*   produces={"application/json"},
*   consumes={"application/json"},
* )
*/
