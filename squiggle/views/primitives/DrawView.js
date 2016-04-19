define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    var Colors = require("squiggle/Colors");
    /**
    * DrawView is the base class for all View's that have 'drawable' properties
    * @property strokeWeight {Number} - The stroke weight to use when drawing.
    * @property strokeColor {Object} -  The stroke color to use then drawing of the form {red:[0-255],green:[0-255],blue:[0-255], alpha:[0-255]}
    * @property strokeCap {Number} - The stroke cap style to use when drawing.
    * @property strokeJoin {Number} - The stroke join style to use when drawing.
    * @property fill {Boolean} - Whether or not to fill when drawing.
    * @property fillColor {Number} - The color to use when 'filling' of the form {red:[0-255],green:[0-255],blue:[0-255], alpha:[0-255]}
    * @property closed {Boolean} - Whether or not the Object is 'closed' (ie. a path can be open or closed)
    * @property jerkiness {Number} - The amount of randomness applied when drawing
    * @extends squiggle/views/View
    * @exports squiggle/views/primitives/DrawView
    */
    var DrawView = View.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name:'strokeColor',value:{red:0,green:0,blue:0}},
          {name:'strokeWeight',value:4},
          {name:'strokeCap', value:this.sketch.SQUARE},
          {name:'strokeJoin', value:this.sketch.MITER},
          {name:"fill", value:true},
          {name:"closed", value:true},
          {name:"jerkiness", value:true},
          {name:"fillColor", value:Colors.white}
        ]);
      },
      /**
      * Applies stroke properties to the p5renderer Object specified in the parameters
      * 
      * @param p5Renderer {Object} - (optional) The p5 renderer instance. If not specified defaults to this.sketch
      * @param object {Object} - (optional) The object to take the properties from. If not specified defaults to this.
      */
      applyStrokeProperties: function(p5renderer, object){
        if(p5renderer === undefined){
          p5renderer = this.sketch;
        }
        if(object === undefined){
          object = this;
        }
        if(object.strokeCap !== undefined) p5renderer.strokeCap(object.strokeCap);
        if(object.strokeJoin !== undefined) p5renderer.strokeJoin(object.strokeJoin);
        p5renderer.strokeWeight(object.strokeWeight);
        p5renderer.stroke(object.strokeColor.red, object.strokeColor.green, object.strokeColor.blue, object.strokeColor.alpha);
        return this;
      },
    });
    return DrawView;
  }
);
