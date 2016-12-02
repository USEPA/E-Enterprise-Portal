<p class="widget-note">
  Source: <a href="https://www.epa.gov" target="_blank">US Environmental Protection Agency</a>
</p>
<p>Find federal laws and regulations related to chemicals.  As state and local partners join, more resources will be available. <span id="learnmore-link"></span>
</p>
<div id="cr-search">
  <div id="cr-search_field">
    <form id="chem_search_form">
      <label for="cr-search_input">Enter chemical name or CAS #</label>
      <input id="cr-search_input" name="cr-search_input" type="text" class="form-text" size="60" maxlength="128">
    </form>
  </div><!-- @end cr-search_field -->
  <button id="cr-search-chems-btn" type="button">Search chemicals</button>  
  <div id="cr-search_description" class="description">Powered by EPA <a href="https://epa.gov/srs" rel="external" target="_blank">Substance Registry Service</a> and Laws &amp; Regulations Service</div>
</div><!-- @end cr-search -->    
<div id="cr-tabs">
    <ul>
      <li><a class="favorites-ignore" href="#cr-tabs_favorites">My Favorites</a></li>
      <li><a class="favorites-ignore" href="#cr-tabs_previous">Previous Searches</a></li>
      <li><a class="favorites-ignore" href="#cr-tabs_naics">NAICS Codes</a></li>
<!--       <li><a class="favorites-ignore" href="#cr-tabs_trending">Trending</a></li> -->
    </ul>
    <!-- @TAB: My Favorites -->
    <div id="cr-tabs_favorites">
      <div class="cr-tabs_favorites_empty">
        <p>
          You have 0 favorites saved.  To add a favorite, use the <a href="#cr-tabs_search">search</a> option.
        </p>
      </div><!-- @end cr-tabs_favorites_empty -->
      <div class="cr-tabs_favorites_available">
        <! -- @TODO - List favorites -->
        <p class="cr-chemicals"><span id="cr-count-chemicals"></span> Chemicals</p>
        <ul class="cr-lists cr-favorite-chemicals">
        </ul>   
        <p class="cr-laws"><span id="cr-count-laws"></span> Laws / Regulations</p>
        <ul class="cr-lists cr-favorite-laws">
        </ul>
      </div><!-- @end cr-tabs_favorites_empty -->
    </div><!-- @end cr-tabs_favorites -->
    <!-- @TAB: Search -->    
    <div id="cr-tabs_previous">
      <p class="dev-note"><strong>NOTE:  This tab is for conceptual purposes only and is not yet functional.</strong></p>
      <p>
        Here are your previous searches:
      </p>
      <ul class="cr-lists">
        <li><a class="favorite-chemical cr-favorite" href="javascript:void(0);" data-favtype="Chemical" data-sysname="2H-1-Benzopyran-2-one, 4-hydroxy-3-(3-oxo-1-phenylbutyl)-" data-epaintnum="8979" data-casnum="81-81-2" data-commonname="Warfarin">81-81-2: 2H-1-Benzopyran-2-one, 4-hydroxy-3-(3-oxo-1-phenylbutyl)- (Warfarin)</a></li>
        <li><a class="favorite-chemical cr-favorite" href="javascript:void(0);" data-favtype="Chemical" data-sysname="Helium" data-epaintnum="150169" data-casnum="7440-59-7" data-commonname="Helium">7440-59-7: Helium (Helium)</a></li>
        <li><a class="favorite-chemical cr-favorite" href="javascript:void(0);" data-favtype="Chemical" data-sysname="Gasoline, natural" data-epaintnum="157628" data-casnum="8006-61-9" data-commonname="Natural gasoline">8006-61-9: Gasoline, natural (Natural gasoline)</a></li>        
      </ul>  
    </div><!-- @end cr-tabs_previous -->
    <!-- @TAB: NAICS Codes -->
    <div id="cr-tabs_naics">
      <p class="dev-note"><strong>NOTE:  This tab is for conceptual purposes only and is not yet showing the correct NAICS codes from the user's CDX profile.</strong></p>
      <p class="cr_codes">Here are the NAICS codes we retrieved from your CDX profile.</p>
      <ul class="cr-lists cr-naics-codes">
          <li><a class="favorite-code cr-favorite" href="https://www.naics.com/naics-code-description/?code=334512"  data-favtype="Code" target="_blank"> 334512 </a></li>
          <li><a class="favorite-code cr-favorite" href="https://www.naics.com/naics-code-description/?code=311230"  data-favtype="Code" target="_blank"> 311230 </a></li>
          <li><a class="favorite-code cr-favorite" href="https://www.naics.com/naics-code-description/?code=111110"  data-favtype="Code" target="_blank"> 111110 </a></li>
          <li><a class="favorite-code cr-favorite" href="https://www.naics.com/naics-code-description/?code=111140"  data-favtype="Code" target="_blank"> 111140 </a></li>
          <li><a class="favorite-code cr-favorite" href="https://www.naics.com/naics-code-description/?code=924110"  data-favtype="Code" target="_blank"> 924110 </a></li>
      </ul>
    </div><!-- @end cr-tabs_naics -->
</div><!-- @end cr-tabs -->
<div id="chemical-rules-modal"></div>
<div id="chemical-rules-learnmore"><?php print $chemical_rules_learnmore; ?></div>
