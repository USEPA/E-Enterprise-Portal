function showElementOutOfMany($wrapper_to_show, $common_selector) {
  $common_selector.hide();
  $wrapper_to_show.show();
  resizeModal()
}

function resizeModal() {
  jQuery('#chemical-rules-modal').dialog({
    position: { 'my': 'center', 'at': 'center' }
  });
  if(jQuery('.chemical-rules-modal').css('top').replace('px', '') < 1){
    jQuery('.chemical-rules-modal').css('top', 0)
  }
}

function checkValues(previous, current, cIndex, keys) {
  var previousKeys = [];
  if(typeof previous[keys[cIndex]] == 'object'){
    previousKeys = Object.keys(previous[keys[cIndex]])
  }

  if ((previousKeys.indexOf('Value') > -1 && previous[keys[cIndex]].Value == "")) {
    delete previous[keys[cIndex]];
  }
  else if (['object'].indexOf(typeof previous[keys[cIndex]]) > -1) {
    previous[keys[cIndex]] = previousKeys.reduce(checkValues, previous[keys[cIndex]])
    if (Object.keys(previous[keys[cIndex]]).length == 0) {
      delete previous[keys[cIndex]];
    }
  }
  return previous
}

var sampleData = function() {};

/**
 * Clear form inputs and hide warning messages
 */
function resetCRForm() {
  var $form = $('#cr-search');
  //$form.find('input[type=text]').val('');
  $form.val('');
}

(function($) {
  var $body = $('body'),
      $cr_tabs = $('#cr-tabs').tabs(),
      sampleSetIndex = 0,
      num_chem_faves = 0,
      num_rules_faves = 0,
      $cr_empty = $('.cr-tabs_favorites_empty'),
      $cr_avail = $('.cr-tabs_favorites_available');
  
  //@TODO Add logic to count number of Chemical Favorites and Law / Rule Favorites
  //num_chem_faves = ...;
  //num_rules_faves = ...;
  
  // If no favorites exist, show Search tab
  if (num_chem_faves === 0 && num_rules_faves === 0) {
    $cr_empty.toggleClass('hidden', false);
    $cr_avail.toggleClass('hidden', true);
  }
  else {
    $cr_empty.toggleClass('hidden', false);
    $cr_avail.toggleClass('hidden', true);
    //@TODO Print Favorite Chemicals
    //
    //@TODO Print Favorite Laws/Regs    
    //count
    //ul
  }
  
  // Sample Data for Modal
  var sampleData = function(sample) {
      sampleSet = [{
        "Substance": {
          "EPAChemicalInternalNumber": "4309",
          "CASRegistryNumber": "67-64-1",
          "ChemicalSubstanceSystematicName": "2-Propanone",
          "EPAChemicalRegistryName": "Acetone",
          "MolecularFormulaCode": "C3H6O",
          "ChemicalSubstanceFormulaWeightQuantity": "58.08",
          "ChemicalSubstanceLinearStructureCode": "O=C(C)C",
          "SubstanceCreateDate": "2006-10-13 14:30:12.0",
          "SubstanceLastUpdateDate": "2012-02-01 14:37:36.0",
          "SubstanceStatus": "A",
          "Synonym": [
            "2-Propanone",
            "Acetone",
            "Methyl ketone",
            "Dimethylketone",
            "Dimethyl ketone",
            "Methyl ketone",
            "Acetone, dry weight",
            "Acetone, in waste",
            "Residual acetone"
          ],
          // Not yet available
          "MolecularWeight": "58.08 g/mol",
          "Solubility": "Miscible with water",
          "VaporPressure": "231 mm Hg at 25 deg C",
          "LogP": "log Kow = -0.24",
          "Stability": "Stable under recommended storage conditions.",
          "pKA": "20"
        },
        "SubstanceList": [
          "Chemical Hazard Information Profiles",
          "Master Testing List (MTL) 1996",
          "Substitute Hazard Profiles",
          "Emergency Response Notification System",
          "Green Chemistry Expert System",
          "Chemical Update System (CUS) 1998",
          "Permit Compliance System",
          "Toxic Substances Control Act Test Submissions",
          "Ecotoxicology Database",
          "High Production Volume Challenge Program / Voluntary Childrens Chemical Evaluation Program Information System",
          "Chemical Update System (CUS) 2002",
          "Agency for Toxic Substances and Disease Registry",
          "Hazardous Discarded Commercial Chemical Products",
          "Chemical Abstracts Index Name",
          "Comprehensive Environmental Response, Compensation, And Liability Act Hazardous Substances",
          "TSCA Inventory",
          "2012 Chemical Data Reporting",
          "Substitute Hazard Profiles",
          "Toxics Release Inventory Program System",
          "Emergency Response Notification System",
          "ICIS-Air",
          "Storage and Retrieval for Water Quality Data",
          "Comprehensive Environmental Response, Compensation and Liability Information System - 3",
          "Permit Compliance System",
          "Chemicals On Reporting Rules",
          "Integrated Compliance Information System",
          "Office of Pesticide Programs Information Network",
          "Environmental Information Management System",
          "Air Quality System",
          "Ecotoxicology Database",
          "CAMEO Chemicals",
          "Screening Information Data Set-High Production Volume Chemicals",
          "Agency for Toxic Substances and Disease Registry",
          "Hazardous Discarded Commercial Chemical Products",
          "Emergency Planning and Community Right-to-Know Act Section 313",
          "Hazardous Substance Data Bank, 1998",
          "Integrated Risk Information System",
          "Master Testing List",
          "Safe Drinking Water Information System in Envirofacts",
          "Chemical Identification",
          "New Jersey Right to Know Hazardous Substances Fact Sheets",
          "National Toxicology Program Chemical Health and Safety Data",
          "National Toxicology Program Study Abstracts",
          "Hazardous Wastes From Non-Specific Sources",
          "Comprehensive Environmental Response, Compensation, And Liability Act Hazardous Substances",
          "Effluent Limitation Guidelines",
          "Standards of Performance for New Stationary Sources of Air Pollutants - Equipment Leaks Chemical List",
          "Priority List of Hazardous Substances",
          "Inert Ingredients in Pesticide Products",
          "Water Quality Exchange",
          "Organic Hazardous Air Pollutants National Emission Standards",
          "Wisconsin Department of Natural Resources",
          "International Toxicity Estimates for Risk",
          "Superfund Chemical Data Matrix",
          "Regional Screening Levels",
          "Acute Exposure Guideline Levels for Airborne Chemicals",
          "2016 CDR TSCA Inv",
          "Chemical Update System (CUS) 1986",
          "Chemical Update System (CUS) 1990",
          "United States High Production Volume Challenge Program List",
          "Chemical Update System (CUS) 1994",
          "Integrated Compliance Information System",
          "2012 Chemical Data Reporting",
          "ICIS-Air",
          "Emergency Response Notification System",
          "Integrated Compliance Information System",
          "Permit Compliance System",
          "Permit Compliance System",
          "CAMEO Chemicals",
          "Food and Drug Administration Substance Registry"
        ],
        "Image": "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetone/png",
        "LawsRegs": [
          {
            "name": "40 CFR § 261.31 - Hazardous Waste from non-specific sources.",
            "source": "/test.pdf"
          },
          {
            "name": "40 CFR § 721.10237 - Formaldehyde, polymers with acetone-phenol reaction products and phenol, sodium salts.",
            "source": "/test.pdf"
          },
          {
            "name": "15 U.S. Code Subchapter I - CONTROL OF TOXIC SUBSTANCES",
            "source": "/test.pdf"
          }
        ],
        "Programs": [
          {
            "name": "TSCA Inventory",
            "source": "https://epa.gov"
          },
          {
            "name": "2016 CDR TSCA Inv",
            "source": "https://epa.gov"
          }
        ]
      }]

      //sample = sampleSet[sampleSetIndex]
      //sampleSetIndex = ++sampleSetIndex % sampleSet.length
      sample = sampleSet[0];
  }

  $body.on('click', '#cr-search-chems-btn', function(ev) {
    ev.preventDefault();
    ev.stopPropagation();    
    var chemicalNameOrNum = $body.find('#cr-search_input').val();
    if ($body.find('#chemical-error').length > 0) {
      $body.find('#chemical-error').remove();
      $body.find('#cr-search_input').removeAttr('aria-describedby');
    }
  
    //@TODO - Samuel's logic to handle chemical regex and lookup
    
    //////
    
    var is_valid_chemical = true;
    if (!is_valid_chemical) {
      error = true;
      var error_message = '<p class="has-error" id="chemical-error">No results were found for <b>' + chemicalNameOrNum + '</b>.  Please try another variation.</p>';
      $(error_message).insertBefore('#cr-search_description');
      $body.find('#cr-search_input').attr('aria-describedby', 'chemical-error');
    }  
    
    // Simulate the loading results block switching to results block
    // @TODO - Change this once Ajax / JSON success call returned - 
    else {
      // Initialize and open dialog
      $('#chemical-rules-modal')
        .html(Drupal.settings.chemical_rules.modal)
        .dialog({
          title: chemicalNameOrNum,
          modal: true,
          width: "auto",
          position: { 'my': 'left top', 'at': 'left top' },
          dialogClass: 'chemical-rules-modal',
          draggable: false,
          create: function(event, ui) {
            $body.find('#user-chemical-name').text(chemicalNameOrNum);
            showElementOutOfMany($('#chemical-rules-loading-wrapper'), $('#chemical-rules-results-wrapper'));
            //For testing / demo purposes
            window.setTimeout(function(){
              showElementOutOfMany($('#chemical-rules-results-wrapper'), $('#chemical-rules-loading-wrapper'));
            }, 2000);
          },
          close: function(event, ui) {
            resetCRForm();            
            $('#chemical-rules-loading-wrapper').hide();
            $(this).dialog('destroy');
          }
      });  
      var toc = $("#cr-modal-toc-icons").toc({ 
        selectors: "h2",
        container: "#chemical-rules-modal",
        'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
          return $heading[0].tagName.toLowerCase();
        } 
      });
      // POST input field value to lookup service
      // Render out 

      resizeModal();
    }
  });    

  /**
   * Close Listener on Chemical Rules Modal
   * -  Remove Previous Results ?
   * -  Cancel Pending Form submission
   */
  $('#chemical-rules-modal').on('dialogclose', function() {
    var $chemical_loading = $('#chemical-rules-loading-wrapper');
    var $all_wrappers = $('.chemical-rules-modal-wrapper');

    showElementOutOfMany($chemical_loading, $all_wrappers);
    resizeModal();
  });

})(jQuery);
