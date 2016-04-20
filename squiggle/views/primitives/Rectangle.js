define(
  function(require, exports, module) {
    var DrawView = require("squiggle/views/primitives/DrawView");
    /**
    * Rectangle is a View that renders a rectangle area on screen
    * @property width {Number} - width in pixels of the rectangle
    * @property height {Number} - height in pixels of the rectangle
    * @property roundedCorners {Array} - Array of Number values for the top-left,top-right,bottom.-right and bottom-left corner radius values
    * @extends squiggle/views/primitives/DrawView
    * @exports squiggle/views/primitives/Rectangle
    */
    var Rectangle = DrawView.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize : function(sketch){
        DrawView.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name:'width',value:0},
          {name:'height',value:0},
          {name:'roundedCorners',value:[0,0,0,0]}
        ]);
        this.closed = true;
      },
      /**
      * Draw code for this class.
      * @override
      * @return void
      */
      draw:function(){
        if(this.hidden) return;
        if(arguments[0] != null){
          DrawView.prototype.updateOffset.apply(this, arguments);
        }
        this.applyStrokeProperties();
        if(this.fill){
          this.sketch.fill(this.fillColor.red, this.fillColor.green, this.fillColor.blue);
        }else{
          this.sketch.noFill();
        }
        this.sketch.rect(
          this.x + this.offsetX, 
          this.y + this.offsetY, 
          this.x + this.offsetX + this.width, 
          this.x + this.offsetX + this.height,
          this.roundedCorners[0],
          this.roundedCorners[1],
          this.roundedCorners[2],
          this.roundedCorners[3]
        );
        DrawView.prototype.draw.apply(this, arguments);
      }
    });
    return Rectangle;
  }
);
