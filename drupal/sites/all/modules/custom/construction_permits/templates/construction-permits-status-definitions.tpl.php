<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 12/22/2016
 * Time: 9:23 AM
 */

$cgp_definition = variable_get('cgp_definition', array('value' => variable_get('cgp_definition', '<dl>
    <dt>Active (NOI)</dt>
    <dd>CGP NOI that has been certified, submitted to EPA, and completed a 14-day review process. Active NOIs are considered covered under the CGP permit.</dd>
    <dt>Active (LEW)</dt>
    <dd>A LEW that has been certified and submitted to EPA. Active LEWs are considered covered under the waiver from needing CGP coverage.</dd>
    <dt>Submitted to EPA</dt>
    <dd>CGP NOI that has been certified and submitted to EPA and is undergoing the 14-day review process.</dd>
    <dt>Active - Pending Change</dt>
    <dd>CGP NOI that is Active but has had a Change NOI submitted to EPA and is currently undergoing the 14-day review process. Once the Change NOI becomes Active, the original NOI will become Archived.</dd>
    <dt>Archived</dt>
    <dd>When a Change NOI or LEW has been submitted to EPA and becomes Active, the original NOI or LEW becomes Archived and is no longer Active.</dd>
    <dt>Terminated</dt>
    <dd>CGP NOI that has been terminated for a project that no longer needs permit coverage. Projects are only eligible for termination after meeting the requirements of Part 8 of EPA’s 2017 CGP.</dd>
    <dt>Discontinued</dt>
    <dd>A LEW that has been discontinued for a project that no longer needs or is eligible for the waiver for permit coverage.</dd>
</dl>'), 'format' => NULL));
?>
<div class="ee-grid box-fluid">
  <div class="section">
    <div class="line">
      <div class="col-sm-12">
        <?php echo $cgp_definition['value'] ?>
      </div>
    </div>
  </div>
</div>