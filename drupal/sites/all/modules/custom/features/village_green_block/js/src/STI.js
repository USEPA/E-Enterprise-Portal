// STI JavaScript (requires jQuery).
(function ($) {
    if (typeof(STI) === "undefined" || !STI) {
        STI = {};
    }

    // Returns the namespace specified, and creates it if it doesn't already exist.
    // All namespaces are started off the existing object STI. So "foo.bar" is actually "STI.foo.bar".
    STI.namespace = function(namespaceStr) {
        var sections = namespaceStr.split('.');
        var o = STI;
        for (var i = 0; i < sections.length; i++) {
            var currentSection = sections[i];
            if (typeof(o[currentSection]) !== 'object' || !o[currentSection]) {
                 o[currentSection] = {};
                 o = o[currentSection];
            } else {
                o = o[currentSection];
            }
        }
        return o;
    };

    STI.isDefined = function(thing) {
        if (thing === undefined) {
            return false;
        }
        if (thing === null) {
            return false;
        }
        return true;
    };
	
	STI.log = function(logMessage) {
		if (typeof console !== 'undefined' && typeof console.log === 'function') {
			console.log(logMessage);
		}
	};

    // Used for serializing an object to JSON
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    //because IE doesn't have the trim method, put the jQuery trim method on String when trim doesn't already exist.
    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return jQuery.trim(this);
        };
    }

    //Javascript doesn't give an easy way of figuring out if the client's date is in DST or not.
    Date.prototype.stdTimezoneOffset = function() {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    Date.prototype.dst = function() {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    };

    $.fn.isContainedIn = function(otherElem) {
        if (this.size() < 1)
            return false;
        if (!STI.isDefined(otherElem))
            return false;
        if (this[0] === otherElem)
            return true;
        if (this.parents().index(otherElem) >= 0)
            return true;
        return (this[0] === $(otherElem)[0]);
    };
})(jQuery);