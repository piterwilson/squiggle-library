define(
  function(require, exports, module) {
    var __Backbone  = require("backbone");
    var Colors = require("squiggle/Colors");
    var AppSettings = require("squiggle/models/AppSettings");
    /**
    * Line model is an Object that encapsulates the idea of a line's properties. 
    *
    * @extends Backbone.Model
    * @exports squiggle/models/Line
    * @property stokeColor {Object} - The stroke color of the line on the form {red:[0-255],green:[0-255],blue:[0-255], alpha:[0-255]}
    * @property strokeWeight {Number} - The stroke weight
    * @property points {Array} - An Array of x,y coordinates that descibe the Line's geometry
    */
    var Line = __Backbone.Model.extend({
      /**
      * Initializes the Line instance
      * @private
      * 
      */
      initialize: function() {
        var sketch = AppSettings.sketch;
        this.set('strokeColor', Colors.black)
            .set('strokeWeight', 2)
            .set('points',[]);
        if(sketch !== undefined){
          this.set('strokeCap',sketch.SQUARE)
              .set('strokeJoin',sketch.MITER)
        }
      },
      /**
      * Adds a point's x and y coordinates to the line
      *
      * @param x {Number} - x position of the point
      * @param y {Number} - y position of the point
      * @fires change
      * @public 
      */
      addPoint: function(x,y){
        this.get('points').push([x,y]);
        this.trigger('change');
      },
      /**
      * Clears the points inside the line
      * @public
      *
      * @fires change
      */
      clear : function (){
        this.set('points',[])
            .trigger('change');
      },
      /**
      * Exports the properties of the Line into an Object class
      * @public
      *
      * @return Object with the Line's properties
      */
      exportStrokeProperties : function(){
        ob = {
          strokeColor   : this.get('strokeColor'),
          strokeWeight  : this.get('strokeWeight')
        }
        if(this.get('strokeCap') !== undefined) ob.strokeCap = this.get('strokeCap')
        if(this.get('strokeJoin') !== undefined) ob.strokeCap = this.get('strokeJoin')
        return ob;
      }
    });
    return Line;
  }
);
