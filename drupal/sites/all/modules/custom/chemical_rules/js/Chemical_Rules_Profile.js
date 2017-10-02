var Chemical_Rule_Profile=function(){var profile={};var _properties={};var _white_list=["Chemicals","Laws","NAICS"];_update_drupal_settings=function(){if(window.Drupal){return Drupal.settings.chemical_rules.profile=_properties}return false};profile.initialize=function(){var init_obj={};if(arguments.length&&typeof arguments[0]=="object"){init_obj=arguments[0]}else if(window.Drupal){init_obj=Drupal.settings.chemical_rules.profile}_white_list.map(function(property,index,array){if(!profile.hasOwnProperty(property)){Object.defineProperty(profile,property,{get:function(){return _properties[property]},writeable:false,enumerable:true,configurable:false});_properties[property]=update_array()}});for(var index in _white_list){var property=_white_list[index];if(init_obj)_properties[property]=update_array(init_obj[property])}};profile.remove=function(favorite){if(favorite.Type&&_properties[favorite.Type]){_properties[favorite.Type]=update_array(_properties[favorite.Type].reduce(function(accumulator,current,index,array){if(current.ID!=favorite.ID){accumulator.push(current)}return accumulator},[]));return _properties[favorite.Type]}return false};profile.add=function(favorite){if(favorite.Type&&_properties[favorite.Type]&&!_properties[favorite.Type].contains(favorite)){return this[favorite.Type].push(favorite)}return false};profile.toString=function(){return JSON.stringify(_properties)};profile.initialize.apply(profile,arguments);return profile;function update_array(){var arr=[];if(arguments.length&&Array.isArray(arguments[0])){arr=arr.concat(arguments[0])}arr.update=function(){return _update_drupal_settings()};arr.push=function(){if(!this.contains(arguments[0])){_update_drupal_settings();return Array.prototype.push.apply(this,arguments)}return false};arr.reduce=function(){return Array.prototype.reduce.apply(this,arguments)};arr.map=function(){return Array.prototype.map.apply(this,arguments)};arr.contains=function(){var arg=arguments[0];return Array.prototype.some.apply(this,[function(element,index,array){return JSON.stringify(arg)==JSON.stringify(element)}])};arr.__proto__=update_array.prototype;return arr}};var Chemical_Rule_Profile_Singleton=function(){var instance;function createInstance(){var object=new Chemical_Rule_Profile;return object}return{getInstance:function(){if(!instance){instance=createInstance()}return instance}}}();
//# sourceMappingURL=src/Chemical_Rules_Profile.js.map