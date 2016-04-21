define(
  function(require, exports, module) {
    /**
    * AppSettings is an Object to keep Application wide properties and globals
    *
    * @exports squiggle/models/AppSettings
    *
    * @property sketch {Object} - The p5 instance used by all Classes to draw on screen
    * @property defaultStrokeColor {String} - Default stroke color to use. (default 'Black')
    * @property defaultFillColor {String} - Default fill color to use. (default 'Red')
    * @property defaultStrokeWeight {Number} - Default stroke weight to use. (default 2)
    */
    var AppSettings = {
      sketch : null,
      defaultStrokeColor : 'Black',
      defaultFillColor : 'Red',
      defaultStrokeWeight : 2
    }
    return AppSettings;
  }
);
