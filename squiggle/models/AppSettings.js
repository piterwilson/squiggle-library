define(
  function(require, exports, module) {
    /**
    * AppSettings is an Object to keep Application wide properties and globals
    *
    * @exports squiggle/models/AppSettings
    *
    * @property sketch {Object} - The p5 instance used by all Classes to draw on screen
    */
    var AppSettings = {
      sketch : null
    }
    return AppSettings;
  }
);
