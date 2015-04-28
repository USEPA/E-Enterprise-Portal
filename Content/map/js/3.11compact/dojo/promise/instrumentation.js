/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/promise/instrumentation",["./tracer","../has","../_base/lang","../_base/array"],function(g,m,h,k){function n(c,a,b){var d="";c&&c.stack&&(d+=c.stack);a&&a.stack&&(d+="\n    ----------------------------------------\n    rejected"+a.stack.split("\n").slice(1).join("\n").replace(/^\s+/," "));b&&b.stack&&(d+="\n    ----------------------------------------\n"+b.stack);console.error(c,d)}function q(c,a,b,d){a||n(c,b,d)}function r(c,a,b,d){a?k.some(e,function(a,b){if(a.error===c)return e.splice(b,
1),!0}):k.some(e,function(a){return a.error===c})||e.push({error:c,rejection:b,deferred:d,timestamp:(new Date).getTime()});l||(l=setTimeout(p,f))}function p(){var c=(new Date).getTime(),a=c-f;e=k.filter(e,function(b){return b.timestamp<a?(n(b.error,b.rejection,b.deferred),!1):!0});l=e.length?setTimeout(p,e[0].timestamp+f-c):!1}m.add("config-useDeferredInstrumentation","report-unhandled-rejections");var e=[],l=!1,f=1E3;return function(c){var a=m("config-useDeferredInstrumentation");if(a){g.on("resolved",
h.hitch(console,"log","resolved"));g.on("rejected",h.hitch(console,"log","rejected"));g.on("progress",h.hitch(console,"log","progress"));var b=[];"string"===typeof a&&(b=a.split(","),a=b.shift());if("report-rejections"===a)c.instrumentRejected=q;else if("report-unhandled-rejections"===a||!0===a||1===a)c.instrumentRejected=r,f=parseInt(b[0],10)||f;else throw Error("Unsupported instrumentation usage \x3c"+a+"\x3e");}}});