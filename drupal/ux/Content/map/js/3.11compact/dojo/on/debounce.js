/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/on/debounce",["dojo/debounce","dojo/on","dojo/on/asyncEventListener"],function(a,b,c){return function(d,e){return function(f,g){return b(f,d,c(a(g,e)))}}});