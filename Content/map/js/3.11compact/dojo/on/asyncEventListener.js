/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/on/asyncEventListener",["dojo/on","dojo/_base/window","dojo/dom-construct","dojo/domReady!"],function(f,a,c){function g(d){var a={},b;for(b in d)a[b]=d[b];return a}a=c.create("div",null,a.body());var e,b;f.once(a,"click",function(a){e=a});a.click();try{b=void 0===e.clientX}catch(h){b=!0}finally{c.destroy(a)}return function(a){return b?function(b){a.call(this,g(b))}:a}});