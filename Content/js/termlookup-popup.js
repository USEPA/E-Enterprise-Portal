(function() {

	TermLookupPopupAdder = function() {

		this._max_z_index = 100;
		this._opened_spans = [];

		// track mouse movement 
		document.onmousemove = function(e) {
			e = e || window.event;
			curEl = e.target || e.srcElement;
		}
	}

	TermLookupPopupAdder.HOVER_IN_DELAY = 500;
	TermLookupPopupAdder.HOVER_OUT_DELAY = 500;
	TermLookupPopupAdder.FADE_DURATION = 100;

	TermLookupPopupAdder.prototype.apply_termlookup = function(rootElt) {

		if (!rootElt) {
			rootElt = document;
		}

		var spans = rootElt.getElementsByTagName('span');

		// find all tooltips and add mouse events
		for (var i = 0; i < spans.length; i++) {
			
			if ((' '+spans[i].className+' ').indexOf(' termlookup-custom ') > -1) {

				var popup = spans[i];
				var anchor = spans[i].parentNode;

				this._opened_spans.push(popup);

				popup.className = "termlookup-js-custom";
				anchor.className = "termlookup-js-tooltip";

				anchor.href = "javascript:void(0)";

				// on mouse over 
				(function(target, dropdown, that) {
					target.onmouseover = function(e) {
						if (target.getAttribute("popup_lock") != "true") {
							setTimeout(function() {
								if (target.getAttribute("popup_lock") != "true") {
									if (curEl === target || curEl === dropdown) {
										that._fade_in_popup(target, dropdown);
									} else {
									}
								}
							}, TermLookupPopupAdder.HOVER_IN_DELAY);
						}
					}
				})(anchor, popup, this);

				// on mouse out
				(function(target, dropdown, that) {
					target.onmouseout = dropdown.onmouseout = function() {
						setTimeout(function() {
							if (curEl !== target && curEl !== dropdown && curEl.parentNode !== dropdown) {
								that._hide_popup(target, dropdown);
							}
						}, TermLookupPopupAdder.HOVER_OUT_DELAY);
					};
				})(anchor, popup, this);

				// on click 
				(function(target, dropdown, that) {
					target.onclick = function() {
						that._click_popup(target, dropdown);
					}
				})(anchor, popup, this);
			}
		}

		var LOCKED_CLASSES = "termlookup-js-tooltip-hover termlookup-js-tooltip-locked";
		var UNLOCKED_CLASSES = "termlookup-js-tooltip";

		// var num_visible = 0;

		TermLookupPopupAdder.prototype._click_popup = function(target, dropdown) {
			if (target.getAttribute("popup_lock") != "true") {
				this._close_all_popups();
				this._lock_popup(target, dropdown);
			} else {
				this._unlock_popup(target, dropdown);
				this._close_all_popups();
			}
		}

		// what is the current state of the popup?
		TermLookupPopupAdder.prototype._lock_popup = function(target, dropdown) {

			this._fade_in_popup(target, dropdown);

			target.className = LOCKED_CLASSES;
			target.setAttribute("popup_lock", "true");
			target.style.zIndex = ++this._max_z_index;
		}

		// unlock and hide immediately
		TermLookupPopupAdder.prototype._unlock_popup = function(target, dropdown) {
			// target.className = UNLOCKED_CLASSES;
			target.removeAttribute("popup_lock");
			this._hide_popup(target, dropdown);
		}

		// show popup, fading in 
		TermLookupPopupAdder.prototype._fade_in_popup = function(target, dropdown) {

			// if busy fading or already visible, take no action
			if (target.getAttribute("fadingin") == "true"
				|| (dropdown.style.visibility == 'visible' && target.getAttribute("fadingout") != "true")||
				target.getAttribute("fadingout") == "true"||
				target.getAttribute("popup_lock") == "true") {
				return;
			}

			if (target.getAttribute("fadingout") == "true" ) {
				target.removeAttribute("fadingout");
			}

			target.setAttribute("fadingin", "true");

			this._show_popup(target, dropdown);

			var that = this;

			this._fade(dropdown, 0, 1, TermLookupPopupAdder.FADE_DURATION, function(){
				that._show_popup(target, dropdown);
				target.removeAttribute("fadingin");
				// num_visible++;
			});
			
		}

		// show popup instantly
		TermLookupPopupAdder.prototype._show_popup = function(target, dropdown) {

			// if locked, then already visible so do nothing
			if (target.getAttribute("popup_lock") != "true") {
				// if (fade_timeout)
				// 	clearTimeout(fade_timeout);

				target.className = "termlookup-js-tooltip-hover";
				target.style.zIndex = ++this._max_z_index;
				target.removeAttribute("fadingin");
				target.removeAttribute("fadingout");
			}
		}

		// hide by fading out if visible, not locked, and not already fading out
		TermLookupPopupAdder.prototype._hide_popup = function(target, dropdown) {

			if (dropdown.style.visibility != 'visible'
				|| target.getAttribute("popup_lock") == "true"
				) {
				return;
			}

			target.removeAttribute("fadingin");

			target.setAttribute("fadingout", "true");
			this._fade(dropdown, 1, 0, TermLookupPopupAdder.FADE_DURATION, function(){
				target.className = "termlookup-js-tooltip";
				target.removeAttribute("fadingout");
				// num_visible--;
			});
		}

		// close all visibible popups, to be used when locking a popup
		TermLookupPopupAdder.prototype._close_all_popups = function() {
			
			for (var i = 0; i < this._opened_spans.length; i++) {
				
				var anchor = this._opened_spans[i].parentNode;

				if(anchor.getAttribute("popup_lock") == "true") {
					this._unlock_popup(anchor, this._opened_spans[i]);
				}
			}

			// this._opened_spans = [];
		}

		// fade popup effect

		var fade_timeout;

		TermLookupPopupAdder.prototype._fade = function(elt, start_opacity, finish_opacity, fade_duration, finish_callback, start_time) {

			start_time = start_time ? start_time : new Date().getTime();

			if (start_opacity == 0)
				elt.style.visibility="visible";
			
			var curr_time = new Date().getTime();
			var elapsed_time = curr_time - start_time;
			var new_opacity = start_opacity + (finish_opacity - start_opacity) * elapsed_time / fade_duration;

			if (Math.abs(new_opacity - start_opacity) > Math.abs(finish_opacity - start_opacity)) {
				
				this._set_opacity(elt, finish_opacity);
				
				if (finish_opacity == 0) 
					elt.style.visibility = "hidden";
				
				finish_callback();
				fade_timeout = undefined;
				return;
			}

			this._set_opacity(elt, new_opacity);
			var that = this;

			fade_timeout = setTimeout(function(){ that._fade(elt, start_opacity, finish_opacity, fade_duration, finish_callback, start_time) }, fade_duration / 100);
		}

		TermLookupPopupAdder.prototype._set_opacity = function(elt, opacity) {

			elt.style.opacity = opacity; // for real browsers
			elt.style.filter = "alpha(opacity="+(opacity*100)+")"; // for IE

			// IE hack
			if (opacity >= 1)
				elt.style.filter = "";
		}
	}
})();