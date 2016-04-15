define(
  function(require, exports, module) {
    var DrawView = require("squiggle/views/primitives/DrawView");
    var MathUtils = require("squiggle/utils/MathUtils");
    var Line = DrawView.extend({
      initialize: function(sketch) {
        DrawView.prototype.initialize.apply(this, arguments);
        this.points = [];
      },
      addPoint : function(x,y){
        this.points.push([x,y]);
        return this;
      },
      clearPoints : function(){
        this.points = [];
        return this;
      },
      draw: function(){
        var randomX1 = 0,
            randomY1 = 0,
            randomX2 = 0,
            randomY2 = 0;
        if(this.hidden) return;
        if(arguments[0] != null){
          DrawView.prototype.updateOffset.apply(this, arguments);
        }
        if(this.points.length > 1){
          this.applyStrokeProperties();
          if(this.jerkiness != 0){
            randomX1 = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
            randomY1 = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
            randomX2 = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
            randomY2 = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
          }
          this.sketch.line(this.offsetX + this.points[0][0] + randomX1,
                           this.offsetY + this.points[0][1] + randomY1,
                           this.offsetX + this.points[1][0] + randomX2,
                           this.offsetY + this.points[1][1] + randomY2);
        }
        DrawView.prototype.draw.apply(this, arguments);
      }
    });
    return Line;
  }
);
