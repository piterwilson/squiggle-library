define(
  function(require, exports, module) {
    var Line = require("squiggle/views/primitives/Line");
    var View = require("squiggle/views/View");
    var Colors = require("squiggle/Colors");
    var Path = Line.extend({
      initialize: function(sketch) {
        Line.prototype.initialize.apply(this, arguments);
      },
      draw: function(){
        if(arguments[0] != null){
          View.prototype.updateOffset.apply(this, arguments);
        }
        this.applyStrokeProperties();
        if(this.fill){
          this.sketch.fill(this.fillColor.red, this.fillColor.green, this.fillColor.blue);
        }else{
          this.sketch.noFill();
        }
        this.sketch.beginShape();
        for(var index in this.points) {
          this.sketch.vertex(this.offsetX + this.x +  this.points[index][0], this.offsetY + this.y + this.points[index][1]);
        }
        if(this.closed){
          this.sketch.endShape(this.sketch.CLOSE);
        }else{
          this.sketch.endShape();
        }
        View.prototype.draw.apply(this, arguments);
      }
    });
    return Path;
  }
);
