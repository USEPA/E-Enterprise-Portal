<h2>Forms &amp; Validation</h2>
<p style="padding-bottom:5px;">Accessible and usable forms:
<ol>
<li>Place labels consistently above or to the left of the field they label</li>
<li>Use the "for" attribute of the label tag to associate the label with its field, textarea, or select widget via the widget's ID(e.g., &lt;label for="fname"&gt;First name&lt;/label&gt;&lt;input type="text" id="fname" name="fname" /&gt; </li>
<li>Indicate required fields using icons or labels that are available to assistive technologies like screen readers also (e.g., &lt;label for="fname" class="required" &gt;First name&lt;span class="req"&gt;*&lt;/label&gt;</li>
</ol>
</p>
<div class="widget">
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
</div>
<div class="example">
<button class="btn-primary clip_button" data-clipboard-target="btn-group-code">Copy</button>
<div class="highlight" id="btn-group-code">
<pre>
<code class="language-markup">
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
</code>
</pre>
</div><!-- end highlight -->
</div><!-- end example -->
<div class="widget">
<div class="col-md-4">
	<label class="form_label error" for="adultPrimaryPhone1">Phone Number 1:</label>
	<input id="adultPrimaryPhone1" maxlength="12" type="text" name="primaryPhone" aria-describedby="p1 adultPrimaryPhone1-error" class="phoneNumber required" aria-required="true" aria-invalid="true"><strong id="adultPrimaryPhone1-error" class="error"><span class="fa fa-exclamation-circle Exclamation" aria-hidden="true" style="font-family: FontAwesome !important; font-size: 16px;"><span class="adobeBlank">Error icon</span></span> Important: Please enter a valid phone number</strong>
	<p id="p1" tabindex="-1"><span class="sr-only">Expected format:</span>X X X-X X X-X X X X</p>
</div>
</div>
<pre>
<code class="language-markup">
<div class="col-md-4">
	<label class="form_label error" for="adultPrimaryPhone1">Phone Number 1:</label>
	<input id="adultPrimaryPhone1" maxlength="12" type="text" name="primaryPhone" aria-describedby="p1 adultPrimaryPhone1-error" class="phoneNumber required" aria-required="true" aria-invalid="true"><strong id="adultPrimaryPhone1-error" class="error"><span class="fa fa-exclamation-circle Exclamation" aria-hidden="true" style="font-family: FontAwesome !important; font-size: 16px;"><span class="adobeBlank">Error icon</span></span> Important: Please enter a valid phone number</strong>
	<p id="p1" tabindex="-1"><span class="sr-only">Expected format:</span>X X X-X X X-X X X X</p>
</div>
</code>
</pre>
<h3>Inputs, Selects, Textareas</h3>
<h3>Error Feedback</h3>
