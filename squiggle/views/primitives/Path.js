define(
  function(require, exports, module) {
    var Line = require("squiggle/views/primitives/Line");
    var Colors = require("squiggle/Colors");
    var MathUtils = require("squiggle/utils/MathUtils");
    var Path = Line.extend({
      draw: function(){
        var randomX = 0, randomY = 0;
        if(arguments[0] != null){
          Line.prototype.updateOffset.apply(this, arguments);
        }
        this.applyStrokeProperties();
        if(this.fill){
          this.sketch.fill(this.fillColor.red, this.fillColor.green, this.fillColor.blue);
        }else{
          this.sketch.noFill();
        }
        this.sketch.beginShape();
        for(var index in this.points) {
          if(this.jerkiness > 0){
            randomX = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
            randomY = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
          }
          this.sketch.vertex(this.offsetX + this.x +  this.points[index][0] + randomX, this.offsetY + this.y + this.points[index][1] + randomY);
        }
        if(this.closed){
          this.sketch.endShape(this.sketch.CLOSE);
        }else{
          this.sketch.endShape();
        }
        Line.prototype.draw.apply(this, arguments);
      }
    });
    return Path;
  }
);
