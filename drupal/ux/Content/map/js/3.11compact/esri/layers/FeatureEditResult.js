// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.11/esri/copyright.txt for details.
//>>built
define("esri/layers/FeatureEditResult",["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel"],function(b,c,d,e){b=b(null,{declaredClass:"esri.layers.FeatureEditResult",constructor:function(a){a&&c.isObject(a)&&(this.objectId=a.objectId,this.success=a.success,a.success||(a=a.error,this.error=Error(),this.error.code=a.code,this.error.message=a.description))}});d("extend-esri")&&c.setObject("layers.FeatureEditResult",b,e);return b});