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
      \'vid\' => \'8986\',
      \'uid\' => \'1\',
      \'title\' => \'New to E-Enterprise?\',
      \'log\' => \'Adds Twitter button to this page\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'597e5df9-6a02-46ef-bcec-23caf780a72c\',
      \'nid\' => \'4925\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1442377435\',
      \'changed\' => \'1453308231\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'2b51353b-ae55-4917-bdd7-52c8471e2774\',
      \'revision_timestamp\' => \'1453308231\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<p>You can use our <strong><a href=\\"/guest_login\\">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p><ul><li>My Air</li><li>My Maps</li><li>My Environment Mapper</li></ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p><ul class=\\"login-options\\"><li id=\\"exchange-cdx\\"><a aria-describedby=\\"exchange-subtext\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span id=\\"exchange-subtext\\">(Use your CDX or Exchange Network account)</span></li><li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li><li><a class=\\"btn btn-block btn-social btn-twitter\\" href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\"><i class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"></i>Twitter</a></li><li><span id=\\"exchange-subtext\\">Other providers may be available in the future</span></li></ul><p>Or if you\'d prefer, you can <strong><a href=\\"http://test.epacdx.net/RegistrationRequest?DataflowRole=111010\\">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>",
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<p>You can use our <strong><a href=\\"/guest_login\\">Browse as Guest</a></strong> option to see environmental information in your area as well as explore other tools like:</p>\\n<ul><li>My Air</li>\\n<li>My Maps</li>\\n<li>My Environment Mapper</li>\\n</ul><p>If you\'d like to save your preferences and see more, you can use an account you may have already like:</p>\\n<ul class=\\"login-options\\"><li id=\\"exchange-cdx\\"><a aria-describedby=\\"exchange-subtext\\" class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a><span id=\\"exchange-subtext\\">(Use your CDX or Exchange Network account)</span></li>\\n<li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\n<li><a class=\\"btn btn-block btn-social btn-twitter\\" href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\"><i class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"></i>Twitter</a></li>\\n<li><span id=\\"exchange-subtext\\">Other providers may be available in the future</span></li>\\n</ul><p>Or if you\'d prefer, you can <strong><a href=\\"http://test.epacdx.net/RegistrationRequest?DataflowRole=111010\\">create a free CDX account</a></strong> within the Exchange Network . You only need to provide some basic information.</p>\\n",
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
      \'vid\' => \'5685\',
      \'uid\' => \'1\',
      \'title\' => \'Log in\',
      \'log\' => \'Copy of the revision from <em class="placeholder">Tue, 2015-09-22 15:32</em>.\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'a16756c9-ce7f-47f4-ab9a-99f6948cc7e0\',
      \'nid\' => \'4926\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1442377526\',
      \'changed\' => \'1452271855\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'d8e04d57-7a08-4eb2-b55b-c7d33b374cf4\',
      \'revision_timestamp\' => \'1452271855\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => \'<ul class="login-options"><li id="en-logins"><h3>Use your CDX or Exchange Network account…</h3><ul><li><a class="btn btn-block btn-social btn-exchangenetwork" href="/eebridge-auth/redirect?whr=urn:ENNAAS"><i class="exchangenetwork" aria-hidden="true"></i>Exchange Network</a></li></ul></li><li id="social-logins"><h3>Or a social media account…</h3><ul><li><a class="btn btn-block btn-social btn-facebook" href="/eebridge-auth/redirect?whr=urn:Facebook"><i class="fa fa-facebook" aria-hidden="true"></i>Facebook</a></li><li><a class="btn btn-block btn-social btn-twitter" href="/eebridge-auth/redirect?whr=urn:Twitter"><i class="fa fa-twitter" aria-hidden="true"></i>Twitter</a></li><li><span style="display: block;font-size: 0.75em;margin-bottom: 20px;text-align:center;">Other providers may be available in the future</span></li></ul></li></ul>\',
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<ul class=\\"login-options\\"><li id=\\"en-logins\\">\\n<h3>Use your CDX or Exchange Network account…</h3>\\n<ul><li><a class=\\"btn btn-block btn-social btn-exchangenetwork\\" href=\\"/eebridge-auth/redirect?whr=urn:ENNAAS\\"><i class=\\"exchangenetwork\\" aria-hidden=\\"true\\"></i>Exchange Network</a></li>\\n</ul></li>\\n<li id=\\"social-logins\\">\\n<h3>Or a social media account…</h3>\\n<ul><li><a class=\\"btn btn-block btn-social btn-facebook\\" href=\\"/eebridge-auth/redirect?whr=urn:Facebook\\"><i class=\\"fa fa-facebook\\" aria-hidden=\\"true\\"></i>Facebook</a></li>\\n<li><a class=\\"btn btn-block btn-social btn-twitter\\" href=\\"/eebridge-auth/redirect?whr=urn:Twitter\\"><i class=\\"fa fa-twitter\\" aria-hidden=\\"true\\"></i>Twitter</a></li>\\n<li><span style=\\"display: block;font-size: 0.75em;margin-bottom: 20px;text-align:center;\\">Other providers may be available in the future</span></li>\\n</ul></li>\\n</ul>",
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
