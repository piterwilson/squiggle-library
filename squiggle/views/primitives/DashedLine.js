define(
  function(require, exports, module) {
    var Line = require("squiggle/views/primitives/Line");
    var View = require("squiggle/views/View");
    var MathUtils = require("squiggle/utils/MathUtils");
    var DashedLine = Line.extend({
      initialize: function(sketch) {
        Line.prototype.initialize.apply(this, arguments);
        this.stepCounter = 0;
        this.step = true;
        this.doDashLine = true;
        this.initProperties([
          {name:'spacing',value:[8,8]},
          {name:'steps',value:60}
        ]);
        return this;
      },
      drawDashedLine : function(x0, y0, x1, y1, spacing, drawLine, doDash){
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
                randomX = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
                randomY = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
                randomXL = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
                randomYL = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
              }
              this.sketch.line(x0 + randomX, y0 + randomY, x0 + xSpacing[i] + randomXL, y0 + ySpacing[i] + randomYL);
            }

            x0 += xSpacing[i];
            y0 += ySpacing[i];
            /* Add distance "drawn" by this line or gap */
            drawn = drawn + this.sketch.mag(xSpacing[i], ySpacing[i]);
            i = (i + 1) % spacing.length;  // cycle through array
            if(doDash){
              drawLine = !drawLine;  // switch between dash and gap
            }
          }
        }
      },
      draw: function(){
        if(arguments[0] != null){
          View.prototype.updateOffset.apply(this, arguments);
        }
        if(this.points.length > 1){
          this.applyStrokeProperties();
          for(var i=0; i < this.points.length; i++){
            if(this.points[i + 1] != undefined){
              this.drawDashedLine(this.points[i][0],this.points[i][1],this.points[i+1][0],this.points[i+1][1],this.spacing, this.step, this.doDashLine);
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
