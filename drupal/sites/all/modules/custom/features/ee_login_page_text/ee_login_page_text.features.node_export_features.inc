<?php
/**
 * @file
 * ee_login_page_text.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function ee_login_page_text_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'12956\',
      \'uid\' => \'1\',
      \'title\' => \'New to E-Enterprise?\',
      \'log\' => \'Removes Twitter so not deployed across environments and moves Exchange Network subtext to tooltip and screen reader only spot\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'5d7c9569-b3f9-4156-b717-23a2e6d231b4\',
      \'nid\' => \'4925\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1442377435\',
      \'changed\' => \'1455915116\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'2b51353b-ae55-4917-bdd7-52c8471e2774\',
      \'revision_timestamp\' => \'1455915116\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<p>You can use our <strong><a href=\\"/guest_login\\">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p><ul><li>My Air</li><li>My Maps</li><li>My Environment Mapper</li></ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p><ul class=\\"login-options\\"><li id=\\"exchange-cdx\\"><a aria-describedby=\\"exchange-subtext\\" title=\\"Use your CDX or Exchange Network account\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span class=\\"sr-only\\" id=\\"exchange-subtext\\">Use your CDX or Exchange Network account</span></li>\\r\\n<li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\r\\n<li><span id=\\"exchange-subtext\\">Other providers may be available in the future</span></li>\\r\\n</ul><p>Or if you\'d prefer, you can <strong><a href=\\"http://test.epacdx.net/RegistrationRequest?DataflowRole=111010\\">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>",
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<p>You can use our <strong><a href=\\"/guest_login\\">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p>\\n<ul><li>My Air</li>\\n<li>My Maps</li>\\n<li>My Environment Mapper</li>\\n</ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p>\\n<ul class=\\"login-options\\"><li id=\\"exchange-cdx\\"><a aria-describedby=\\"exchange-subtext\\" title=\\"Use your CDX or Exchange Network account\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span class=\\"sr-only\\" id=\\"exchange-subtext\\">Use your CDX or Exchange Network account</span></li>\\n<li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\n<li><span id=\\"exchange-subtext\\">Other providers may be available in the future</span></li>\\n</ul><p>Or if you\'d prefer, you can <strong><a href=\\"http://test.epacdx.net/RegistrationRequest?DataflowRole=111010\\">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>\\n",
            \'safe_summary\' => \'\',
          ),
        ),
      ),
      \'rdf_mapping\' => array(
        \'rdftype\' => array(
          \'foaf:Document\',
        ),
        \'title\' => array(
          \'predicates\' => array(
            \'dc:title\',
          ),
        ),
        \'created\' => array(
          \'predicates\' => array(
            \'dc:date\',
            \'dc:created\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'changed\' => array(
          \'predicates\' => array(
            \'dc:modified\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'body\' => array(
          \'predicates\' => array(
            \'content:encoded\',
          ),
        ),
        \'uid\' => array(
          \'predicates\' => array(
            \'sioc:has_creator\',
          ),
          \'type\' => \'rel\',
        ),
        \'name\' => array(
          \'predicates\' => array(
            \'foaf:name\',
          ),
        ),
        \'comment_count\' => array(
          \'predicates\' => array(
            \'sioc:num_replies\',
          ),
          \'datatype\' => \'xsd:integer\',
        ),
        \'last_activity\' => array(
          \'predicates\' => array(
            \'sioc:last_activity_date\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
      ),
      \'name\' => \'admin\',
      \'picture\' => \'0\',
      \'data\' => \'b:0;\',
      \'path\' => array(
        \'pid\' => \'7\',
        \'source\' => \'node/4925\',
        \'alias\' => \'new-users\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
  (object) array(
      \'vid\' => \'12957\',
      \'uid\' => \'1\',
      \'title\' => \'Log in\',
      \'log\' => \'Removes Twitter for other environments, adds Exchange Network text to title\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'7bd402c0-1919-4f0b-966d-843635dcf624\',
      \'nid\' => \'4926\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1442377526\',
      \'changed\' => \'1455915640\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'d8e04d57-7a08-4eb2-b55b-c7d33b374cf4\',
      \'revision_timestamp\' => \'1455915640\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<ul class=\\"login-options\\"><li id=\\"en-logins\\">\\r\\n<h3>Use your CDX or Exchange Network account…</h3>\\r\\n<ul><li><a aria-describedby=\\"exchange-subtext\\" title=\\"Use your CDX or Exchange Network account\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span class=\\"sr-only\\" id=\\"exchange-subtext\\">Use your CDX or Exchange Network account</span></li>\\r\\n</ul></li>\\r\\n<li id=\\"social-logins\\">\\r\\n<h3>Or a social media account…</h3>\\r\\n<ul><li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\r\\n<li><span style=\\"display: block;font-size: 0.75em;margin-bottom: 20px;text-align:center;\\">Other providers may be available in the future</span></li>\\r\\n</ul></li>\\r\\n</ul>",
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<ul class=\\"login-options\\"><li id=\\"en-logins\\">\\n<h3>Use your CDX or Exchange Network account…</h3>\\n<ul><li><a aria-describedby=\\"exchange-subtext\\" title=\\"Use your CDX or Exchange Network account\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span class=\\"sr-only\\" id=\\"exchange-subtext\\">Use your CDX or Exchange Network account</span></li>\\n</ul></li>\\n<li id=\\"social-logins\\">\\n<h3>Or a social media account…</h3>\\n<ul><li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\n<li><span style=\\"display: block;font-size: 0.75em;margin-bottom: 20px;text-align:center;\\">Other providers may be available in the future</span></li>\\n</ul></li>\\n</ul>",
            \'safe_summary\' => \'\',
          ),
        ),
      ),
      \'rdf_mapping\' => array(
        \'rdftype\' => array(
          \'foaf:Document\',
        ),
        \'title\' => array(
          \'predicates\' => array(
            \'dc:title\',
          ),
        ),
        \'created\' => array(
          \'predicates\' => array(
            \'dc:date\',
            \'dc:created\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'changed\' => array(
          \'predicates\' => array(
            \'dc:modified\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'body\' => array(
          \'predicates\' => array(
            \'content:encoded\',
          ),
        ),
        \'uid\' => array(
          \'predicates\' => array(
            \'sioc:has_creator\',
          ),
          \'type\' => \'rel\',
        ),
        \'name\' => array(
          \'predicates\' => array(
            \'foaf:name\',
          ),
        ),
        \'comment_count\' => array(
          \'predicates\' => array(
            \'sioc:num_replies\',
          ),
          \'datatype\' => \'xsd:integer\',
        ),
        \'last_activity\' => array(
          \'predicates\' => array(
            \'sioc:last_activity_date\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
      ),
      \'name\' => \'admin\',
      \'picture\' => \'0\',
      \'data\' => \'b:0;\',
      \'path\' => array(
        \'pid\' => \'8\',
        \'source\' => \'node/4926\',
        \'alias\' => \'bridge-landing\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
