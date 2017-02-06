<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 12/22/2016
 * Time: 9:23 AM
 */
?>
<div class="permit-wrapper ee-grid box-fluid">
  <div class="section" id="cgp-general">
    <h2>General Permit Information</h2>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="npdesId">
        <div class="col-md-4 title">NPDES ID</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="type"
           data-cgp-function="adjustType">
        <div class="col-md-4 title">Form Type</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="status">
        <div class="col-md-4 title">Status</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line" style="display:none">
      <div class="box-fluid property" data-cgp-property="trackingNumber">
        <div class="col-md-4 title">Tracking #</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>

    <div class="line">
      <div class="box-fluid property" data-cgp-property="certifiedDate"
           data-cgp-function="dateFormat">
        <div class="col-md-4 title">Submitted</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="reviewExpiration"
           data-cgp-function="dateFormat">
        <div class="col-md-4 title">Hold Period Expiration</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div><!-- @end General Permit Info -->
  <div class="section lew-only" id="cgp-lew">
    <h2>Low Erosity Waiver Information</h2>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="lowErosivityWaiver"
           data-cgp-function="dateRange" data-cgp-params="['lew']">
        <div class="col-md-4 title">Project Start / End <span
            class="cgp-footnote">(Estimated)</span></div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="lowErosivityWaiver.lewAreaDisturbed">
        <div class="col-md-4 title">Estimated Area to be Disturbed<span
            class="cgp-footnote">(to the nearest quarter acre)</span></div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="lowErosivityWaiver.lewRFactor">
        <div class="col-md-4 title">Construction site&rsquo;s R-Factor</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="lowErosivityWaiver.lewRFactorCalculationMethod">
        <div class="col-md-4 title">Rainfall Erosivity factor was calculated by
          using
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="lowErosivityWaiver.interimSiteStabilizationMeasures"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Interim nonvegatative site stabilization
          measures used to establish the project completion date for purposes of
          obtaining this waiver?
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div><!-- @end Low Erosity Waiver Information -->
  <div class="section" id="cgp-operator">
    <h2>Operator Information</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="operatorInformation.operatorName">
        <div class="col-md-4 title">Operator Name</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="operatorInformation"
           data-cgp-function="address" data-cgp-params="['operator']">
        <div class="col-md-4 title">Address</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="operatorInformation.operatorCounty">
        <div class="col-md-4 title">County</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="operatorInformation.operatorPointOfContact"
           data-cgp-function="fullName">
        <div class="col-md-4 title">Point of Contact</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="operatorInformation.operatorPointOfContact"
           data-cgp-function="fullPhone">
        <div class="col-md-4 title">Phone #</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="operatorInformation.operatorPointOfContact.email">
        <div class="col-md-4 title">Email</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="operatorInformation.operatorFederal"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Federal Operator</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div><!-- @end Operator Info -->
  <div class="section" id="cgp-project">
    <h2>Project Site Information</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteName">
        <div class="col-md-4 title">Project / Site Name</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property" data-cgp-property="projectSiteInformation"
           data-cgp-function="address" data-cgp-params="['site']">
        <div class="col-md-4 title">Address</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteIndianCountry"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Project / Facility on Indian Land?</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>

    <!--@TODO Make the siteIndianCountryLands show only if siteIndianCountry == true -->
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteIndianCountryLands"
           data-cpg-null="N/A">
        <div class="col-md-4 title">Indian tribe name:</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>

    <!-- @TODO Verify function latlong correctly generates the lat long entries -->
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteLocation"
           data-cgp-function="latlong">
        <div class="col-md-4 title">Latitude / Longitude</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteLocation.horizontalReferenceDatum">
        <div class="col-md-4 title" data-cgp-null="Unknown">Horizontal Reference
          Datum
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>

    <!-- @TODO Show the Estimated Area to be Disturbed line only if NOI - if LEW, include line in LEW section -->
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteAreaDisturbed">
        <div class="col-md-4 title">Estimated Area to be Disturbed<span
            class="cgp-footnote">(to the nearest quarter acre)</span></div>
        <div class="col-md-8"><span class="value"></span> acres</div>
      </div>
    </div>

    <div class="line">
      <div class="box-fluid property" data-cgp-property="projectSiteInformation"
           data-cgp-function="dateRange" data-cgp-params="['site']">
        <div class="col-md-4 title">Project Duration <span class="cgp-footnote">(Estimated)</span>
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>

    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteIndianCulturalProperty"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Project located on a property of religious or cultural significance to an Indian tribe?</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>

    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteIndianCulturalPropertyTribe">
        <div class="col-md-4 title">Indian tribe name:</div>
        <div class="col-md-8"><span class="value"></span></div>
      </div>
    </div>
  </div><!-- @end Project Site Info -->

  <div class="section noi-only" id="cgp-additional">
    <h2>Additional Project Information</h2>
    <div class="line"><div class="box-fluid property" data-cgp-property="projectSiteInformation.siteConstructionTypes" data-cgp-function="siteConstructionTypes"><div class="col-md-4 title">Type of Construction Sites</div><div class="col-md-8 value cgp-uppercase"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="projectSiteInformation.siteStructureDemolitionBefore1980" data-cgp-options="['No','Yes']"><div class="col-md-4 title">Demolition of structure built or renovated before January 1, 1980?</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="projectSiteInformation.siteStructureDemolitionBefore198010kSquareFeet" data-cgp-options="['No','Yes']"><div class="col-md-4 title cgp-subquestion">Structure being demolished has at least 10,000 ft<sup>2</sup> of floor space?</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="projectSiteInformation.sitePreDevelopmentAgricultural" data-cgp-options="['No','Yes']"><div class="col-md-4 title">Pre-development land use used for agriculture?</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="projectSiteInformation.siteEarthDisturbingActivitiesOccurrence" data-cgp-options="['No','Yes']"><div class="col-md-4 title">Earth-disturbing activities commenced on project/site?</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="projectSiteInformation.siteEmergencyRelated" data-cgp-options="['No','Yes']"><div class="col-md-4 title cgp-subquestion">Project is emergency-related project?</div><div class="col-md-8 value"></div></div></div>
  </div>
  <!--<div class="section noi-only" id="cgp-earth">
    <h2>Earth Disturbance / Demolition Information</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteStructureDemolitionBefore1980"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Demolition of structure built or renovated
          before January 1, 1980?
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteStructureDemolitionBefore198010kSquareFeet"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Structure being demolished has at least
          10,000 ft2 of floor space
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.sitePreDevelopmentAgricultural"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Pre-development land use used for
          agriculture
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteEarthDisturbingActivitiesOccurrence"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Earth-disturbing activities commenced on
          project/site
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="projectSiteInformation.siteEmergencyRelated"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Project is emergency-related project</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div>--><!-- @end Earth Disturbance / Demolition Information -->
  <div class="section noi-only" id="cgp-discharge">
    <h2>Discharge Information</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="dischargeInformation.dischargeMunicipalSeparateStormSewerSystem"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Discharge stormwater into a Municipal
          Separate Storm Sewer System (MS4)?
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
      <div class="box-fluid property"
           data-cgp-property="dischargeInformation.dischargeUSWatersWithin50Feet"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">U.S. waters within 50 feet of project's
          earth disturbances?
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="col-sm-12 box-fluid">
        <div class="box-fluid">
          <div class="box-fluid property"
               data-cgp-property="dischargeInformation.dischargePoints"
               data-cgp-function="dischargePoints"><h6>Impaired Surface Waters
              to Which you Discharge</h6></div>
        </div>
      </div>
    </div>
  </div><!-- @end Discharge Information -->
  <!-- @TODO Show Treatment Chemicals only if chemicalTreatmentInformation.polymersFlocculantsOtherTreatmentChemicals != null -->
  <div class="section noi-only" id="cgp-treatment">
    <h2>Chemical Treatment Information</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="chemicalTreatmentInformation.polymersFlocculantsOtherTreatmentChemicals" data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Will you use polymers, flocculants, or other
          treatment chemicals at your construction site?
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="chemicalTreatmentInformation.treatmentChemicals" data-cgp-function="array_join" data-cgp-params="[', ']">
        <div class="col-md-4 title">Cationic treatment authorized for uses:
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div><!-- @end Treatment Chemicals -->
  <div class="section noi-only" id="cgp-swppp">
    <h2>Stormwater Pollution Prevention Plan Point of Contact</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="stormwaterPollutionPreventionPlanInformation.contactInformation"
           data-cgp-function="fullName">
        <div class="col-md-4 title">Name</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="stormwaterPollutionPreventionPlanInformation.contactInformation.organization">
        <div class="col-md-4 title">Organization Name</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="stormwaterPollutionPreventionPlanInformation.contactInformation.title">
        <div class="col-md-4 title">Title</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="stormwaterPollutionPreventionPlanInformation.contactInformation"
           data-cgp-function="fullPhone">
        <div class="col-md-4 title">Phone</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="stormwaterPollutionPreventionPlanInformation.contactInformation.email">
        <div class="col-md-4 title">Email</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div><!-- @end Stormwater Pollution Prevention Plan Point of Contact-->
  <div class="section noi-only" id="cgp-esp">
    <h2>Endangered Species Protection Information</h2>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation"
           data-cgp-function="appendixDCriteria">
        <div class="col-md-4 title">Eligible for coverage under this permit by
          meeting Appendix D, criterion:
        </div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.criteriaSelectionSummary">
        <div class="col-md-4 title">Summary of criterion selection basis</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.eligibilityCoveredByOtherOperator"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Eligibility covered by other operator</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.otherOperatorNpdesId">
        <div class="col-md-4 title">Other Operator NPDES ID</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.dischargesNotLikelyToAffect"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Discharges Not Likely to Affect</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.speciesAndHabitatInActionArea">
        <div class="col-md-4 title">Species and Habitat in Action Area</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.distanceFromSite">
        <div class="col-md-4 title">Distance between site and species or
          designated critical habitat
        </div>
        <div class="col-md-8"><span class="value"></span> miles</div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.coordinationWithUsfsOrNmfs"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Coordination with USFS or NMFS</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.section7Consultation"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Section 7 Consultation</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.biologicalOpinion"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Biological Opinion</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.writtenOccurrence"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Written Occurrence</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
    <div class="line">
      <div class="box-fluid property"
           data-cgp-property="endangeredSpeciesProtectionInformation.section10Permit"
           data-cgp-options="['No','Yes']">
        <div class="col-md-4 title">Section 10 Permit</div>
        <div class="col-md-8 value"></div>
      </div>
    </div>
  </div><!-- @end Endangered Species Protection Information -->
  <div class="section noi-only" id="cgp-historic">
    <h2>Historic Preservation</h2>
    <div class="line"><div class="box-fluid property" data-cgp-property="historicPreservation.appendexEStep1" data-cgp-options="['No','Yes']"><div class="col-md-4 title">Installing  stormwater controls as described in Appendix E that require subsurface earth disturbances? (Appendix E, Step 1)</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="historicPreservation.appendexEStep2" data-cgp-options="['No','Yes']"><div class="col-md-4 title">If yes, have prior surveys or evaluations conducted on the site determined historic properties do not exist, or that prior disturbances have precluded the existence of historic properties?</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="historicPreservation.appendexEStep3" data-cgp-options="['No','Yes']"><div class="col-md-4 title">If no, have you determined that your installation of subsurface earth-disturbing stormwater controls will have no effect on historic properties?</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="historicPreservation.appendexEStep4" data-cgp-options="['No','Yes']"><div class="col-md-4 title">Received response within 15 calendar days from SHPO, THPO, or other Tribal Representative to indicate whether the subsurface earth disturbances caused by the installation of stormwater controls affect historic properties? (Appendix E, Step 4)</div><div class="col-md-8 value"></div></div></div>
    <div class="line"><div class="box-fluid property" data-cgp-property="historicPreservation.appendexEStep4Response"><div class="col-md-4 title">Response from SHPO, THPO, or Tribal Representative</div><div class="col-md-8 value"></div></div></div>
  </div><!-- @end Historic Preservation Information-->
<div class="section" id="cgp-documents">
    <h2>Corresponding Documents</h2>
    <div class="line">
      <div class="col-sm-12 box-fluid">
        <div class="box-fluid">
          <div class="box-fluid property" data-cgp-property=""
               data-cgp-function="attachments"></div>
        </div>
      </div>
    </div>
  </div>
</div>