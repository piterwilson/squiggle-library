define(
  function(require, exports, module) {
    var DrawView = require("squiggle/views/primitives/DrawView");
    var MathUtils = require("squiggle/utils/MathUtils");
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
        if(this.width === 0 && this.height === 0) return;
        var randomX = 0,randomY = 0,randomW = 0,randomH = 0;
        if(arguments[0] != null){
          DrawView.prototype.updateOffset.apply(this, arguments);
        }
        this.applyStrokeProperties();
        if(this.fill){
          this.sketch.fill(this.fillColor);
        }else{
          this.sketch.noFill();
        }
        if(this.jerkiness > 0){
          randomX = (Math.random() * this.jerkiness) * MathUtils.coinToss();
          randomY = (Math.random() * this.jerkiness) * MathUtils.coinToss();
          randomW = (Math.random() * this.jerkiness) * MathUtils.coinToss();
          randomH = (Math.random() * this.jerkiness) * MathUtils.coinToss();
        }
        this.sketch.rect(
          this.x + this.offsetX + randomX, 
          this.y + this.offsetY + randomY, 
          this.width + randomW, 
          this.height + randomH,
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
