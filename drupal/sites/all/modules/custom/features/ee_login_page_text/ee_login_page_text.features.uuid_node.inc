<?php
/**
 * @file
 * ee_login_page_text.features.uuid_node.inc
 */

/**
 * Implements hook_uuid_features_default_content().
 */
function ee_login_page_text_uuid_features_default_content() {
  $nodes = array();

  $nodes[] = array(
  'title' => 'New to E-Enterprise?',
  'log' => 'Adds Twitter button to this page',
  'status' => 1,
  'comment' => 0,
  'promote' => 0,
  'sticky' => 0,
  'type' => 'page',
  'language' => 'und',
  'created' => 1442377435,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => '2b51353b-ae55-4917-bdd7-52c8471e2774',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => '<p>You can use our <strong><a href="/guest_login">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p><ul><li>My Air</li><li>My Maps</li><li>My Environment Mapper</li></ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p><ul class="login-options"><li id="exchange-cdx"><a aria-describedby="exchange-subtext" class="btn btn-block btn-social btn-exchangenetwork" href="/eebridge-auth/redirect?whr=urn:ENNAAS"><i class="exchangenetwork" aria-hidden="true"></i>Exchange Network</a><span id="exchange-subtext">(Use your CDX or Exchange Network account)</span></li><li><a class="btn btn-block btn-social btn-facebook" href="/eebridge-auth/redirect?whr=urn:Facebook"><i class="fa fa-facebook" aria-hidden="true"></i>Facebook</a></li><li><a class="btn btn-block btn-social btn-twitter" href="/eebridge-auth/redirect?whr=urn:Twitter"><i class="fa fa-twitter" aria-hidden="true"></i>Twitter</a></li><li><span id="exchange-subtext">Other providers may be available in the future</span></li></ul><p>Or if you\'d prefer, you can <strong><a href="http://test.epacdx.net/RegistrationRequest?DataflowRole=111010">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>',
        'summary' => '',
        'format' => 'full_html',
        'safe_summary' => '',
      ),
    ),
  ),
  'rdf_mapping' => array(
    'rdftype' => array(
      0 => 'foaf:Document',
    ),
    'title' => array(
      'predicates' => array(
        0 => 'dc:title',
      ),
    ),
    'created' => array(
      'predicates' => array(
        0 => 'dc:date',
        1 => 'dc:created',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'changed' => array(
      'predicates' => array(
        0 => 'dc:modified',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'body' => array(
      'predicates' => array(
        0 => 'content:encoded',
      ),
    ),
    'uid' => array(
      'predicates' => array(
        0 => 'sioc:has_creator',
      ),
      'type' => 'rel',
    ),
    'name' => array(
      'predicates' => array(
        0 => 'foaf:name',
      ),
    ),
    'comment_count' => array(
      'predicates' => array(
        0 => 'sioc:num_replies',
      ),
      'datatype' => 'xsd:integer',
    ),
    'last_activity' => array(
      'predicates' => array(
        0 => 'sioc:last_activity_date',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
  ),
  'date' => '2015-09-16 00:23:55 -0400',
  'user_uuid' => '920bc7f6-fa5c-4683-b66a-a485f120f697',
);
  $nodes[] = array(
  'title' => 'Log in',
  'log' => 'Copy of the revision from <em class="placeholder">Tue, 2015-09-22 15:32</em>.',
  'status' => 1,
  'comment' => 0,
  'promote' => 0,
  'sticky' => 0,
  'type' => 'page',
  'language' => 'und',
  'created' => 1442377526,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => 'd8e04d57-7a08-4eb2-b55b-c7d33b374cf4',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => '<ul class="login-options"><li id="en-logins"><h3>Use your CDX or Exchange Network account…</h3><ul><li><a class="btn btn-block btn-social btn-exchangenetwork" href="/eebridge-auth/redirect?whr=urn:ENNAAS"><i class="exchangenetwork" aria-hidden="true"></i>Exchange Network</a></li></ul></li><li id="social-logins"><h3>Or a social media account…</h3><ul><li><a class="btn btn-block btn-social btn-facebook" href="/eebridge-auth/redirect?whr=urn:Facebook"><i class="fa fa-facebook" aria-hidden="true"></i>Facebook</a></li><li><a class="btn btn-block btn-social btn-twitter" href="/eebridge-auth/redirect?whr=urn:Twitter"><i class="fa fa-twitter" aria-hidden="true"></i>Twitter</a></li><li><span style="display: block;font-size: 0.75em;margin-bottom: 20px;text-align:center;">Other providers may be available in the future</span></li></ul></li></ul>',
        'summary' => '',
        'format' => 'full_html',
        'safe_summary' => '',
      ),
    ),
  ),
  'rdf_mapping' => array(
    'rdftype' => array(
      0 => 'foaf:Document',
    ),
    'title' => array(
      'predicates' => array(
        0 => 'dc:title',
      ),
    ),
    'created' => array(
      'predicates' => array(
        0 => 'dc:date',
        1 => 'dc:created',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'changed' => array(
      'predicates' => array(
        0 => 'dc:modified',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'body' => array(
      'predicates' => array(
        0 => 'content:encoded',
      ),
    ),
    'uid' => array(
      'predicates' => array(
        0 => 'sioc:has_creator',
      ),
      'type' => 'rel',
    ),
    'name' => array(
      'predicates' => array(
        0 => 'foaf:name',
      ),
    ),
    'comment_count' => array(
      'predicates' => array(
        0 => 'sioc:num_replies',
      ),
      'datatype' => 'xsd:integer',
    ),
    'last_activity' => array(
      'predicates' => array(
        0 => 'sioc:last_activity_date',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
  ),
  'date' => '2015-09-16 00:25:26 -0400',
  'user_uuid' => '920bc7f6-fa5c-4683-b66a-a485f120f697',
);
  return $nodes;
}
