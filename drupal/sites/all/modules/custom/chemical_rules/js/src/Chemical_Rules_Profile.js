/**
 * Created by smolinsk on 12/12/2016.
 */
var Chemical_Rule_Profile = function() {
  var profile = {};
  var _properties = {};
  var _white_list = ['Chemicals','Laws', 'NAICS'];
  var initialize = function() {
    // if passed some initial values, work with them
    if(arguments.length && typeof arguments[0] == 'object') {
      var init_obj = arguments[0] || {};
    }

    // allow only accepted values
    for(var index in _white_list){
      Object.defineProperty(profile, _white_list[index], {
        get: function() { return _properties[_white_list[index]] || []; },
        set: function(newValue) { _properties[_white_list[index]] = (newValue) ? newValue : []; },
        enumerable: true,
        configurable: true
      });
    }
  }

  profile.initialize = initialize;

  // Initial the new object
  initialize(arguments);
  return profile;
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
