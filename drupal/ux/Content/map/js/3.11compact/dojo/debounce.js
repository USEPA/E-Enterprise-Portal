/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/debounce",[],function(){return function(b,c){var a;return function(){a&&clearTimeout(a);var d=arguments;a=setTimeout(function(){b.apply(this,d)},c)}}});