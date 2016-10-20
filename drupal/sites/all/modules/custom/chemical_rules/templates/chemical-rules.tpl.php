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
  <button id="cr-search-chems-btn">Search chemicals</button>  
  <div id="cr-search_description" class="description">Powered by EPA <a href="https://epa.gov/srs">Substance Registry Service</a> and <a href="https://epa.gov/lrs">Laws & Regulations Service</a></div>
</div><!-- @end cr-search -->    
<div id="cr-tabs">
    <ul>
      <li><a class="favorites-ignore" href="#cr-tabs_favorites">My Favorites</a></li>
      <li><a class="favorites-ignore" href="#cr-tabs_previous">Previous Searches</a></li>      
<!--       <li><a class="favorites-ignore" href="#cr-tabs_trending">Trending</a></li> -->
    </ul>
    <!-- @TAB: My Favorites -->
    <div id="cr-tabs_favorites">
      <div class="cr-tabs_favorites_empty">
        <p>
          You have 0 favorite chemicals saved.  To add a favorite, use the <a href="#cr-tabs_search">search</a> option.
        </p>
      </div><!-- @end cr-tabs_favorites_empty -->
      <div class="cr-tabs_favorites_available">
        <! -- @TODO - List favorites -->
        <ul class="cr-lists cr-tabs_favorites-list">
          <li><a class="favorite-chemical" href="#" data-epachemintnum="9999" data-systematicname="Acetone">67-64-1:  Acetone</a><a class="favorite-chemical-remove remove-link">Remove</a></li> 
        </ul>      
      </div><!-- @end cr-tabs_favorites_empty -->
    </div><!-- @end cr-tabs_favorites -->
    <!-- @TAB: Search -->    
    <div id="cr-tabs_previous">
      <p>
        Here are your 5 last searches:
      </p>
      <ul class="cr-lists">
        <li><a class="favorite-chemical" href="#" data-epachemintnum="9999" data-systematicname="Acetone">67-64-1:  Acetone</a></li> 
        <li><a class="favorite-chemical" href="#" data-epachemintnum="8888" data-systematicname="2,4,4-Trimethylhexamethylene diisocyanate">16938-22-0:  2,4,4-Trimethylhexamethylene diisocyanate</a></li>         
      </ul>  
    </div><!-- @end cr-tabs_previous -->    
</div><!-- @end cr-tabs -->
<div id="chemical-rules-modal"></div>
