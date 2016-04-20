define(
  function(require, exports, module) {
    var Path = require("squiggle/views/primitives/Path");
    /**
    * Rectangle is a View that renders a rectangle area on screen
    * @property width {Number} - width in pixels of the rectangle
    * @property height {Number} - height in pixels of the rectangle
    * @extends squiggle/views/primitives/Path
    * @exports squiggle/views/primitives/Rectangle
    */
    var Rectangle = Path.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize : function(sketch){
        Path.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name:'width',value:0},
          {name:'height',value:0}
        ]);
        this.closed = true;
      },
      /**
      * Draw code for this class.
      * @override
      * @return void
      */
      draw:function(){
        this.points = [];
        this.addPoint(0, 0);
        this.addPoint(this.width, 0);
        this.addPoint(this.width,this.height);
        this.addPoint(0,this.height);
        Path.prototype.draw.apply(this, arguments);
      }
    });
    return Rectangle;
  }
);
