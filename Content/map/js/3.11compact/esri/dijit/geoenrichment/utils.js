// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.11/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils",[],function(){return{getCeiling:function(a,c){if(0===a)return 0;var d;0>a?(a=-a,d=-1):d=1;var b=Math.pow(10,Math.ceil(Math.log(a)/Math.LN10)-1),b=2*Math.ceil(a/b/2)*b;c&&0===Math.log(b)/Math.LN10%1&&(b*=2);return b*d},supportsComparison:function(a,c){return"OneVar"==a||"Tapestry"!=a&&c}}});