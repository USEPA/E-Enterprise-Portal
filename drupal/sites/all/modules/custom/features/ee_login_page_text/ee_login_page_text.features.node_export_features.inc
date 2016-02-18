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
      \'vid\' => \'15219\',
      \'uid\' => \'1\',
      \'title\' => \'New to E-Enterprise?\',
      \'log\' => \'Replaces span with i tags\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'641a508c-95e7-4589-9bf8-7b247445c1fc\',
      \'nid\' => \'4925\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1442377435\',
      \'changed\' => \'1455826144\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'2b51353b-ae55-4917-bdd7-52c8471e2774\',
      \'revision_timestamp\' => \'1455826144\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<p>You can use our <strong><a href=\\"/guest_login\\">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p><ul><li>My Air</li><li>My Maps</li><li>My Environment Mapper</li></ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p><ul class=\\"login-options\\"><li id=\\"exchange-cdx\\"><a aria-describedby=\\"exchange-subtext\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span id=\\"exchange-subtext\\">(Use your CDX or Exchange Network account)</span></li>\\r\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:WAMNAAS\\" class=\\"btn btn-block btn-social btn-wam”><i class=\\"wam\\" aria-hidden=\\"true\\"></i> Web Application Access</a></li>\\r\\n<li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\r\\n<li><a class=\\"btn btn-block btn-social btn-twitter\\" href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\"><i class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"></i>Twitter</a></li>\\r\\n<li><span id=\\"exchange-subtext\\">Other providers may be available in the future</span></li>\\r\\n</ul><p>Or if you\'d prefer, you can <strong><a href=\\"http://test.epacdx.net/RegistrationRequest?DataflowRole=111010\\">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>",
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<p>You can use our <strong><a href=\\"/guest_login\\">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p>\\n<ul><li>My Air</li>\\n<li>My Maps</li>\\n<li>My Environment Mapper</li>\\n</ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p>\\n<ul class=\\"login-options\\"><li id=\\"exchange-cdx\\"><a aria-describedby=\\"exchange-subtext\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span id=\\"exchange-subtext\\">(Use your CDX or Exchange Network account)</span></li>\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:WAMNAAS\\" class=\\"btn btn-block btn-social btn-wam”&gt;&lt;i class=\\" wam=\\"\\" aria-hidden=\\"true\\"> Web Application Access</a></li>\\n<li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\n<li><a class=\\"btn btn-block btn-social btn-twitter\\" href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\"><i class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"></i>Twitter</a></li>\\n<li><span id=\\"exchange-subtext\\">Other providers may be available in the future</span></li>\\n</ul><p>Or if you\'d prefer, you can <strong><a href=\\"http://test.epacdx.net/RegistrationRequest?DataflowRole=111010\\">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>\\n",
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
      \'vid\' => \'15216\',
      \'uid\' => \'1\',
      \'title\' => \'Log in\',
      \'log\' => \'Adds WAM button but removes social media icons accidentally added\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'0e9102ee-2ab4-4efd-97f9-786d9402929e\',
      \'nid\' => \'4926\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1442377526\',
      \'changed\' => \'1455825505\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'d8e04d57-7a08-4eb2-b55b-c7d33b374cf4\',
      \'revision_timestamp\' => \'1455825505\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<ul class=\\"login-options\\">\\r\\n<li id=\\"en-logins\\"><h3>Use your agency or EPA account&hellip;</h3>\\r\\n<ul>\\r\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:NAAS\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\"><span class=\\"exchangenetwork\\" aria-hidden=\\"true\\"> </span> Exchange Network</a></li>\\r\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:WAMNAAS\\" class=\\"btn btn-block btn-social btn-wam\\"><span class=\\"wam\\" aria-hidden=\\"true\\"> </span> Web Application Access</a></li>\\r\\n</ul>\\r\\n</li>\\r\\n<li id=\\"social-logins\\"><h3>Or a social media account&hellip;</h3>\\r\\n<ul>\\r\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\" class=\\"btn btn-block btn-social btn-facebook\\"><span class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"> </span> Facebook</a></li>\\r\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\" class=\\"btn btn-block btn-social btn-twitter\\"><span class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"> </span> Twitter</a></li>\\r\\n</ul>\\r\\n</li>\\r\\n</ul>",
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<ul class=\\"login-options\\"><li id=\\"en-logins\\">\\n<h3>Use your agency or EPA account…</h3>\\n<ul><li><a href=\\"/eebridge-auth/redirect?whr=urn:NAAS\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\"><span class=\\"exchangenetwork\\" aria-hidden=\\"true\\"> </span> Exchange Network</a></li>\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:WAMNAAS\\" class=\\"btn btn-block btn-social btn-wam\\"><span class=\\"wam\\" aria-hidden=\\"true\\"> </span> Web Application Access</a></li>\\n</ul></li>\\n<li id=\\"social-logins\\">\\n<h3>Or a social media account…</h3>\\n<ul><li><a href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\" class=\\"btn btn-block btn-social btn-facebook\\"><span class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"> </span> Facebook</a></li>\\n<li><a href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\" class=\\"btn btn-block btn-social btn-twitter\\"><span class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"> </span> Twitter</a></li>\\n</ul></li>\\n</ul>",
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
