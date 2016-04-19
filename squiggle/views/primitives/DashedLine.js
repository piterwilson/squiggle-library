define(
  function(require, exports, module) {
    var Path = require("squiggle/views/primitives/Path");
    var MathUtils = require("squiggle/utils/MathUtils");
    /**
    * DashedLine is a View that renders a dashed line
    * @property spacing {Number} - The spacing between the dashes in the dashed line rendered.
    * @property steps {Number} - The number to steps (p5renderer frames) to wait before switching the dashes to spaces and viceversa. ie the 'speed' of the line
    * @extends squiggle/views/primitives/Path
    * @exports squiggle/views/primitives/DashedLine
    */
    var DashedLine = Path.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        Path.prototype.initialize.apply(this, arguments);
        this.stepCounter = 0;
        this.step = true;
        this.initProperties([
          {name:'spacing',value:[8,8]},
          {name:'steps',value:60}
        ]);
        return this;
      },
      /**
      * Render a dashed line
      *
      * @param x0 {Number} - x coordinate of the first point in the line
      * @param y0 {Number} - y coordinate of the first point in the line
      * @param x1 {Number} - x coordinate of the second point in the line
      * @param y1 {Number} - y coordinate of the second point in the line
      * @param spacing {Number} - spacing between dash and line
      * @param drawLine {Boolean} 
      */
      drawDashedLine : function(x0, y0, x1, y1, spacing, drawLine){
        // adapted from the processing forums https://processing.org/discourse/beta/num_1202486379.html
        var distance = this.sketch.dist(x0, y0, x1, y1), xSpacing = [], ySpacing = [], drawn = 0.0, i = 0;  // amount of distance drawn
        if (distance > 0){
          for (i = 0; i < spacing.length; i++){
            xSpacing[i] = this.sketch.lerp(0, (x1 - x0), spacing[i] / distance);
            ySpacing[i] = this.sketch.lerp(0, (y1 - y0), spacing[i] / distance);
          }
          i = 0;
          while (drawn < distance){
            if (drawLine){
              var randomX = 0, randomY = 0, randomXL = 0, randomYL = 0;
              if(this.jerkiness != 0){
                randomX = (Math.random() * this.jerkiness) * MathUtils.coinToss();
                randomY = (Math.random() * this.jerkiness) * MathUtils.coinToss();
                randomXL = (Math.random() * this.jerkiness) * MathUtils.coinToss();
                randomYL = (Math.random() * this.jerkiness) * MathUtils.coinToss();
              }
              this.sketch.line(x0 + randomX, y0 + randomY, x0 + xSpacing[i] + randomXL, y0 + ySpacing[i] + randomYL);
            }

            x0 += xSpacing[i];
            y0 += ySpacing[i];
            /* Add distance "drawn" by this line or gap */
            drawn = drawn + this.sketch.mag(xSpacing[i], ySpacing[i]);
            i = (i + 1) % spacing.length;  // cycle through array
            drawLine = !drawLine;  // switch between dash and gap
          }
        }
      },
      /**
      * Draw routine for this View
      */
      draw: function(){
        if(arguments[0] != null){
          Path.prototype.updateOffset.apply(this, arguments);
        }
        if(this.points.length > 1){
          this.applyStrokeProperties();
          for(var i=0; i < this.points.length; i++){
            if(this.points[i + 1] != undefined){
              this.drawDashedLine(this.points[i][0],this.points[i][1],this.points[i+1][0],this.points[i+1][1],this.spacing, this.step);
            }
          }
          this.stepCounter++;
          if(this.stepCounter === this.steps){
            this.step = !this.step;
            this.stepCounter = 0;
          }
        }
      }
    });
    return DashedLine;
  }
);
