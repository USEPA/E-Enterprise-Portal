<div class="usa-grid-full">
  <div id="chemical-rules-loading-wrapper"
       class="chemical-rules-modal-wrapper">
    <h1>Loading search results for <span id="searching-chemical-name"></span>&hellip;</h1> <i class="fa fa-spinner" aria-hidden="true"></i>
  </div>
  <div id="chemical-rules-results-wrapper"
       class="chemical-rules-modal-wrapper">
    <ul id="chemical-metadata">
      <li id="modal-common-name"><span class="modal-label" id="label-common-name">Common name</span><span id="metadata-common-name" aria-describedby="label-common-name"></span></li>
      <li id="modal-sys-name"><span class="modal-label" id="label-sys-name">Systematic name</span><span id="metadata-sys-name" aria-describedby="label-sys-name"></span></li>
      <li id="modal-cas-num"><span class="modal-label" id="label-cas-num">CAS #</span><span id="metadata-cas-num" aria-describedby="label-cas-num"></span></li>  
      <li id="modal-iupac-num"><span class="modal-label" id="label-iupac-num">IUPAC Name</span><span id="metadata-iupac-num" aria-describedby="label-iupac-num"></span></li>      
    </ul>
    <ul class="cr-modal-actions">
      <li><a id="cr-save-favorite" class="save-favorite" href="javascript:void(0)" data-favtype="Chemical">Save to My Chemicals</a></li>
      <li><a id="cr-remove-favorite" class="remove-favorite remove-link" href="javascript:void(0)" data-favtype="Chemical">Remove from Favorites</a></li>
      <li><a class="cr-future">Save as PDF</a></li>
      <li><a class="cr-future">Share This</a></li>
    </ul>
    <ul class="cr-modal-toc" id="cr-modal-toc-icons">
      <li><a id="cr-icon-laws" href="#cr-laws-regs" class="favorites-ignore">Laws &amp; Regulations</a></li>
      <li><a id="cr-icon-programs" href="#cr-programs" class="favorites-ignore">EPA Programs</a></li>
      <li><a id="cr-icon-structure" href="#cr-structure" class="favorites-ignore">Structure</a></li>
      <li><a id="cr-icon-properties" href="#cr-properties" class="favorites-ignore">Chemical &amp; Physical Properties</a></li>
      <li><a id="cr-icon-synonyms" href="#cr-synonyms" class="favorites-ignore">Synonyms</a></li>
      <li><a id="cr-icon-lists" href="#cr-lists" class="favorites-ignore">Substance Lists</a></li>
    </ul>
    
    <!-- @LAWS AND REGULATIONS -->
    <h2 id="cr-laws-regs">Laws &amp; Regulations</h2>
    <p id="cr-laws-regs-results"><span id="count-all-cfrs" class="cr-laws-regs_count"></span> laws and regulations found for <span class="cr-chemical-name"></span>, its synonyms, and substances lists.<span id="results-intro"></span></p>

    <div id="cr-laws-regs-substances">
    </div><!-- @end #cr-laws-regs_substances -->
    
    <!-- @PROGRAMS -->
    <div id="cr-laws-regs_programs">
      <h2 id="cr-programs">EPA Programs</h2>
        <ul id="cr-programs-list">
        </ul>
    </div><!-- @end #cr-laws-regs_programs -->

    <!-- @STRUCTURE --> 
    <div id="cr-laws-regs_structure">   
      <h2 id="cr-structure">Structure</h2>
      <div class="cr-structure_container">
        <div class="cr-structure_image">
        </div>
      </div><!-- @end .cr-structure_container -->
    </div><!-- @end #cr-laws-regs_structure -->

    <!-- @CHEMICAL & PHYSICAL PROPERTIES -->    
    <div id="cr-laws-regs_properties">      
      <h2 id="cr-properties">Chemical &amp; Physical Properties</h2>
      <div class="cr-properties_container">
        <table id="cr-properties-table">
          <thead>
            <tr>
              <th scope="col" class="cr-property">Property</th>
              <th scope="col" class="cr-value">Value</th>
            </tr>
          </thead>
          <tbody>
          </tbody> 
        </table>
      </div><!-- @end .cr-properties_container -->    
    </div><!-- @end #cr-laws-regs_properties -->    

    <!-- @SYNONYMS -->    
    <div id="cr-laws-regs_synonyms">
      <h2 id="cr-synonyms">Synonyms</h2>
        <ul id="cr-synonyms-list">
        </ul>
    </div><!-- @end #cr-laws-regs_synonyms -->    
    
    <!-- @SUBSTANCE LISTS -->    
    <div id="cr-laws-regs_lists">    
      <h2 id="cr-lists">Substance Lists</h2>
        <ul id="cr-substances-list">
        </ul>    
    </div><!-- @end #cr-laws-regs_lists -->
    
  </div><!-- @end .chemical-rules-results-wrapper -->
</div><!-- @end usa-grid-full for CR -->
