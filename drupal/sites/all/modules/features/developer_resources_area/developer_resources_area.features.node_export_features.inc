<?php
/**
 * @file
 * developer_resources_area.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function developer_resources_area_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'50334\',
      \'uid\' => \'1\',
      \'title\' => \'Resources for Local Communities API\',
      \'log\' => \'Removes inline formatting\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'1\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'8f5a8bf6-ed4b-489c-b953-4f0c6b0f241b\',
      \'nid\' => \'50259\',
      \'type\' => \'developer_resource\',
      \'language\' => \'und\',
      \'created\' => \'1484057183\',
      \'changed\' => \'1484058646\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'a3600efd-2243-4e93-a889-6435112f0927\',
      \'revision_timestamp\' => \'1484058646\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<h2>Title: Get All Local Government Resources</h2><p>This is the definition of the RESTful web service that E-Enterprise partners should expose in order to share real time resource information related to providing resources for local communities. This is a coordinated effort between the E-Enterprise Local Government and Portal teams.</p><h2>URL (path only, no root url)</h2><p>/LocalGovernmentResources</p><h2>Method</h2><p>GET</p><h2>URL Params</h2><p>None. Method is expected to return all resources for local government that the E-Enterprise partner wishes to expose through the service.</p><h2>Data Params (for POST)</h2><p>None. POST is not currently supported.</p><h2>Success Response</h2><p>Code: 200</p><p>Content:</p>\\r\\n<pre>{\\"resources\\": [\\r\\n     {\\"topics\\": [\\"Emerging Technologies, Issues and Topics\\", \\"Stormwater\\"],\\r\\n      \\"name\\":\\"Sustainable Communities\\",\\r\\n      \\"link\\":\\"https://www.sustainablecommunities.gov/\\",\\r\\n      \\"source\\":\\"Partnership for Sustainable Communities\\",\\r\\n      \\"detailed_description\\":\\"On June 16, 2009, the U.S. Department of Housing and Urban Development (HUD), U.S. Department of Transportation (DOT), and the U.S. Environmental Protection Agency (EPA) joined together to help communities nationwide improve access to affordable housing, increase transportation options, and lower transportation costs while protecting the environment.\\",\\r\\n      \\"summary\\":\\"Designed to help communities nationwide improve access to affordable housing, increase transportation options, and lower transportation costs while protecting the environment.\\",\\r\\n      \\"categories\\": [\\"Sustainability\\", \\"Asset Management\\", \\"Financial Assistance\\", \\"Capacity Development\\"],\\r\\n      \\"tool_type\\":\\"Guidance-Website\\",\\r\\n      \\"update_frequency\\":\\"Frequently\\",\\r\\n      \\"relevance\\": [\\"Public\\", \\"Policy\\"]\\r\\n      \\"training_level\\":\\"Low\\",\\r\\n      \\"user_friendly_rating\\":\\"Medium\\",\\r\\n      \\"data_resource_requirements\\":\\"High\\",\\r\\n     }\\r\\n]}</pre>\\r\\n<h2>Error Response</h2><p>Code: 400 BAD REQUEST</p><p>Content (example):</p>\\r\\n<pre>{ error : \\"The url in the request could not be parsed.\\" }</pre>\\r\\n<p>Code: 404 NOT FOUND</p><p>Content:</p>\\r\\n<pre>{ error : \\"The specified resource does not exist.\\" }</pre>\\r\\n<h2>Schema</h2><table><thead><tr><th>Element Name</th><th>Element Type</th><th>Element Options</th><th>Maximum Length</th><th>Required?</th></tr></thead><tbody><tr><td>ID</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Topics</td><td>Multi-select</td><td><ol><li>Brownfields and Redevelopment and Industrial Cleanup</li><li>Climate Change</li><li>Conservation and Alternative Energy</li><li>Drinking Water and Wastewater</li><li>Emerging Technologies, Issues and Topics</li><li>Finance and Grants</li><li>Indoor and Outdoor Air Quality</li><li>Municipal/Industrial Solid Waste Management</li><li>Natural Disaster and Emergency Management</li><li>Stormwater</li><li>Water Quality and Restoration</li></ol></td><td>N/A</td><td>Yes</td></tr><tr><td>Name</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Link</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Source</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Detailed Description</td><td>String</td><td>N/A</td><td>4,000 characters</td><td>Yes</td></tr><tr><td>Summary</td><td>String</td><td>N/A</td><td>4,000 characters</td><td>Yes</td></tr><tr><td>Categories</td><td>Multi-select</td><td><ol><li>Asset Management</li><li>Best Management Practices</li><li>Capacity Development</li><li>Emergency Preparedness</li><li>Energy Efficiency</li><li>Environmental Justice</li><li>Financial Assistance</li><li>Green Infrastructure</li><li>Monitoring</li><li>Nutrients and Pollution Reduction</li><li>Planning</li><li>Regulation</li><li>Resilience</li><li>Sustainability</li><li>Technical Guidance</li><li>Tribal</li><li>Water Efficiency</li><li>Water Security</li></ol></td><td>N/A</td><td>Yes</td></tr><tr><td>Tool Type</td><td>Single-select</td><td><ol><li>Guidance-Website</li><li>Decision Tree</li><li>Data</li><li>Tool</li></ol></td><td>N/A</td><td>Yes</td></tr><tr><td>Update Frequency</td><td>Single-select</td><td><ol><li>Frequently</li><li>One-Time</li><li>Other</li><li>Periodically</li><li>Rarely</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>Relevance</td><td>Multi-select</td><td><ol><li>Manager</li><li>Operator</li><li>Public</li><li>Policy</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>Training Level</td><td>Single-select</td><td><ol><li>High</li><li>Medium</li><li>Low</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>User Friendly Rating</td><td>Single-select</td><td><ol><li>High</li><li>Medium</li><li>Low</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>Data/Resource Requirements</td><td>Single-select</td><td><ol><li>High</li><li>Medium</li><li>Low</li></ol></td><td>N/A</td><td>No</td></tr></tbody></table><h2>Notes</h2><p>Additional methods and more flexible searches (invocation with search parameters) may be added in the future.</p>",
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<h2>Title: Get All Local Government Resources</h2><p>This is the definition of the RESTful web service that E-Enterprise partners should expose in order to share real time resource information related to providing resources for local communities. This is a coordinated effort between the E-Enterprise Local Government and Portal teams.</p><h2>URL (path only, no root url)</h2><p>/LocalGovernmentResources</p><h2>Method</h2><p>GET</p><h2>URL Params</h2><p>None. Method is expected to return all resources for local government that the E-Enterprise partner wishes to expose through the service.</p><h2>Data Params (for POST)</h2><p>None. POST is not currently supported.</p><h2>Success Response</h2><p>Code: 200</p><p>Content:</p>\\n<pre>{\\"resources\\": [\\n     {\\"topics\\": [\\"Emerging Technologies, Issues and Topics\\", \\"Stormwater\\"],\\n      \\"name\\":\\"Sustainable Communities\\",\\n      \\"link\\":\\"https://www.sustainablecommunities.gov/\\",\\n      \\"source\\":\\"Partnership for Sustainable Communities\\",\\n      \\"detailed_description\\":\\"On June 16, 2009, the U.S. Department of Housing and Urban Development (HUD), U.S. Department of Transportation (DOT), and the U.S. Environmental Protection Agency (EPA) joined together to help communities nationwide improve access to affordable housing, increase transportation options, and lower transportation costs while protecting the environment.\\",\\n      \\"summary\\":\\"Designed to help communities nationwide improve access to affordable housing, increase transportation options, and lower transportation costs while protecting the environment.\\",\\n      \\"categories\\": [\\"Sustainability\\", \\"Asset Management\\", \\"Financial Assistance\\", \\"Capacity Development\\"],\\n      \\"tool_type\\":\\"Guidance-Website\\",\\n      \\"update_frequency\\":\\"Frequently\\",\\n      \\"relevance\\": [\\"Public\\", \\"Policy\\"]\\n      \\"training_level\\":\\"Low\\",\\n      \\"user_friendly_rating\\":\\"Medium\\",\\n      \\"data_resource_requirements\\":\\"High\\",\\n     }\\n]}</pre>\\n<h2>Error Response</h2><p>Code: 400 BAD REQUEST</p><p>Content (example):</p>\\n<pre>{ error : \\"The url in the request could not be parsed.\\" }</pre>\\n<p>Code: 404 NOT FOUND</p><p>Content:</p>\\n<pre>{ error : \\"The specified resource does not exist.\\" }</pre>\\n<h2>Schema</h2><table><thead><tr><th>Element Name</th><th>Element Type</th><th>Element Options</th><th>Maximum Length</th><th>Required?</th></tr></thead><tbody><tr><td>ID</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Topics</td><td>Multi-select</td><td><ol><li>Brownfields and Redevelopment and Industrial Cleanup</li><li>Climate Change</li><li>Conservation and Alternative Energy</li><li>Drinking Water and Wastewater</li><li>Emerging Technologies, Issues and Topics</li><li>Finance and Grants</li><li>Indoor and Outdoor Air Quality</li><li>Municipal/Industrial Solid Waste Management</li><li>Natural Disaster and Emergency Management</li><li>Stormwater</li><li>Water Quality and Restoration</li></ol></td><td>N/A</td><td>Yes</td></tr><tr><td>Name</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Link</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Source</td><td>String</td><td>N/A</td><td>250 characters</td><td>Yes</td></tr><tr><td>Detailed Description</td><td>String</td><td>N/A</td><td>4,000 characters</td><td>Yes</td></tr><tr><td>Summary</td><td>String</td><td>N/A</td><td>4,000 characters</td><td>Yes</td></tr><tr><td>Categories</td><td>Multi-select</td><td><ol><li>Asset Management</li><li>Best Management Practices</li><li>Capacity Development</li><li>Emergency Preparedness</li><li>Energy Efficiency</li><li>Environmental Justice</li><li>Financial Assistance</li><li>Green Infrastructure</li><li>Monitoring</li><li>Nutrients and Pollution Reduction</li><li>Planning</li><li>Regulation</li><li>Resilience</li><li>Sustainability</li><li>Technical Guidance</li><li>Tribal</li><li>Water Efficiency</li><li>Water Security</li></ol></td><td>N/A</td><td>Yes</td></tr><tr><td>Tool Type</td><td>Single-select</td><td><ol><li>Guidance-Website</li><li>Decision Tree</li><li>Data</li><li>Tool</li></ol></td><td>N/A</td><td>Yes</td></tr><tr><td>Update Frequency</td><td>Single-select</td><td><ol><li>Frequently</li><li>One-Time</li><li>Other</li><li>Periodically</li><li>Rarely</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>Relevance</td><td>Multi-select</td><td><ol><li>Manager</li><li>Operator</li><li>Public</li><li>Policy</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>Training Level</td><td>Single-select</td><td><ol><li>High</li><li>Medium</li><li>Low</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>User Friendly Rating</td><td>Single-select</td><td><ol><li>High</li><li>Medium</li><li>Low</li></ol></td><td>N/A</td><td>No</td></tr><tr><td>Data/Resource Requirements</td><td>Single-select</td><td><ol><li>High</li><li>Medium</li><li>Low</li></ol></td><td>N/A</td><td>No</td></tr></tbody></table><h2>Notes</h2><p>Additional methods and more flexible searches (invocation with search parameters) may be added in the future.</p>",
            \'safe_summary\' => \'\',
          ),
        ),
      ),
      \'field_developer_resource\' => array(
        \'und\' => array(
          array(
            \'target_id\' => \'174444\',
          ),
        ),
      ),
      \'rdf_mapping\' => array(
        \'rdftype\' => array(
          \'sioc:Item\',
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
      \'print_pdf_size\' => \'\',
      \'print_pdf_orientation\' => \'\',
      \'path\' => array(
        \'pid\' => \'15\',
        \'source\' => \'node/50259\',
        \'alias\' => \'for-developers/resources-lgc\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
