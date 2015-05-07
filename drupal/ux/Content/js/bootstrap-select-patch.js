Object.keys = Object.keys || function(
			o, // object
			k, // key
			r  // result array
		) {
			// initialize object and result
			r = [];
			// iterate over object keys
			for (k in o)
				// fill result array with non-prototypical keys
				r.hasOwnProperty.call(o, k) && r.push(k);
			// return result
			return r
		};