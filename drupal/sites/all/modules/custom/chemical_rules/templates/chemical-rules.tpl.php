<p class="widget-note">
  Source: <a href="https://www.epa.gov" target="_blank">US Environmental Protection Agency</a>
</p>
<p>
  Find federal laws and regulations.  As state and local partners join, more resources will be available.  <a href="javascript:void(0)" id="learn-more_chemical-rules">Learn how it works</a>.
</p>
<div id="cr-tabs">
    <ul>
      <li><a class="favorites-ignore" href="#cr-tabs_favorites">My Favorites</a></li>
      <li><a class="favorites-ignore" href="#cr-tabs_search">Search</a></li>
<!--       <li><a class="favorites-ignore" href="#cr-tabs_trending">Trending</a></li> -->
    </ul>
    <!-- @TAB: My Favorites -->
    <div id="cr-tabs_favorites" style="padding:0">
      <div class="cr-tabs_favorites_empty">
        <p>
          You have 0 favorite chemicals saved.  To add a favorite, use the <a href="#cr-tabs_search">search</a> option.
        </p>
      </div><!-- @end cr-tabs_favorites_empty -->
      <div class="cr-tabs_favorites_available">
        <! -- @TODO - List favorites -->
        <ul class="cr-tabs_favorites-list">
          <li><a class="cr-tabs_favorites-link" href="#">Acetone</a><a class="cr-tabs_favorites-remove">Remove</a></li> 
        </ul>      
      </div><!-- @end cr-tabs_favorites_empty -->
    </div><!-- @end cr-tabs_favorites -->
    <!-- @TAB: Search -->    
    <div id="cr-tabs_search" style="padding:0">
      <p>
        Use the search below to find rules and regulations for chemicals.
      </p>
      <p>
        <label for="cr-search">Enter chemical name or CAS #</label>
        <input id="cr-search" name="cr-search" type="text" class="form-text" aria-describedby="cr-search_description" size="60" maxlength="128">
        <div id="cr-search_description" class="description">Powered by EPA <a href="https://epa.gov/srs">Substance Registry Service</a> and <a href="https://epa.gov/lrs">Laws & Regulations Service</a></div>
        <button id="cr-search-chems-btn">
          Search chemicals
        </button>
      </p>
    </div><!-- @end cr-tabs_search -->    
</div><!-- @end cr-tabs -->
<div id="chemical-rules-modal"></div>
