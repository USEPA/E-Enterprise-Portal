<p class="widget-note">
  Source: <a href="https://www.epa.gov" target="_blank">US Environmental Protection Agency</a>
</p>
<p>
  Find federal laws and regulations.  As state and local partners join, more resources will be available.  <a href="javascript:void(0)" id="learn-more_chemical-rules">Learn how it works</a>.
</p>
<div id="cr-search">
  <div id="cr-search_field">
    <form id="chem_search_form">
      <label for="cr-search_input">Enter chemical name or CAS #</label>
      <input id="cr-search_input" name="cr-search_input" type="text" class="form-text" size="60" maxlength="128">
    </form>
  </div><!-- @end cr-search_field -->
  <button id="cr-search-chems-btn" type="button">Search chemicals</button>  
  <div id="cr-search_description" class="description">Powered by EPA <a href="https://epa.gov/srs">Substance Registry Service</a> and <a href="https://epa.gov/lrs">Laws &amp; Regulations Service</a></div>
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
      <p>
        Here are your previous searches:
      </p>
      <ul class="cr-lists">
        <li><a class="favorite-chemical" href="#" data-epachemintnum="9999" data-systematicname="Acetone">67-64-1:  Acetone</a></li> 
        <li><a class="favorite-chemical" href="#" data-epachemintnum="8888" data-systematicname="2,4,4-Trimethylhexamethylene diisocyanate">16938-22-0:  2,4,4-Trimethylhexamethylene diisocyanate</a></li>         
      </ul>  
    </div><!-- @end cr-tabs_previous -->
    <!-- @TAB: NAICS Codes -->
    <div id="cr-tabs_naics">
      <p class="cr_codes">
        NAICS codes:s
      </p>
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
