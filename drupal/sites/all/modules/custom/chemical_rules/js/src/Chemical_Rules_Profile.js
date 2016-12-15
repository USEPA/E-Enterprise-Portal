/**
 * Created by smolinsk on 12/12/2016.
 */
var Chemical_Rule_Profile = function() {
  var profile = {};
  var _properties = {};
  var _white_list = ['Chemicals','Laws', 'NAICS'];

  _update_drupal_settings = function(){
    if(window.Drupal){
      return Drupal.settings.chemical_rules.profile = _properties;
    }
    return false;
  }

  profile.initialize = function() {
    var init_obj = {};
    // if passed some initial values, work with them
    if(arguments.length && typeof arguments[0] == 'object') {
      init_obj = arguments[0];
    }
    else if(window.Drupal) {
      init_obj = Drupal.settings.chemical_rules.profile;
    }

    // Define the behavior of the properties
    _white_list.map(function(property, index, array){
      if(!profile.hasOwnProperty(property)) {
        Object.defineProperty(profile, property, {
          get: function() {
            return _properties[property];
          },
          writeable: false,
          enumerable: true,
          configurable: false
        });
        _properties[property] = update_array();
      }
    });

    // allow only accepted values
    for(var index in _white_list){
      var property = _white_list[index]
        _properties[property] = update_array(init_obj[property]);
    }
  }

  profile.remove = function(favorite) {
    if(favorite.Type && _properties[favorite.Type]) {
      _properties[favorite.Type] = update_array(_properties[favorite.Type].reduce(function(accumulator, current, index, array){
        if(current.ID != favorite.ID) {
          accumulator.push(current);
        }
        return accumulator;
      }, []));
      return _properties[favorite.Type];
    }
    return false;
  }

  profile.add = function(favorite) {
    if(favorite.Type && _properties[favorite.Type] && !_properties[favorite.Type].contains(favorite)) {
      return this[favorite.Type].push(favorite);
    }
    return false;
  }

  profile.toString = function(){
    return JSON.stringify(_properties);
  }

  // Initial the new object
  profile.initialize.apply(profile, arguments);
  return profile;

  // Custom array behaviors to keep the Drupal variable up-to-data
  function update_array() {
    var arr = [];
    if(arguments.length && Array.isArray(arguments[0])) {
      arr = arr.concat(arguments[0]);
    }
    arr.update = function() {
      return _update_drupal_settings();
    };

    arr.push = function() {
      if(!this.contains(arguments[0])){
        _update_drupal_settings();
        return Array.prototype.push.apply(this, arguments);
      }
      return false;
    };

    arr.reduce = function() {
      //_update_drupal_settings();
      return Array.prototype.reduce.apply(this, arguments);
    };

    arr.map = function() {
      //_update_drupal_settings();
      return Array.prototype.map.apply(this, arguments);
    };

    arr.contains = function() {
      var arg = arguments[0];
      return Array.prototype.some.apply(this, [function(element, index, array) {
        return JSON.stringify(arg) == JSON.stringify(element)
      }]);
    }
    arr.__proto__ = update_array.prototype;
    return arr;
  }
}

var Chemical_Rule_Profile_Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new Chemical_Rule_Profile();
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
