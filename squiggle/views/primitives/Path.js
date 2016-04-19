define(
  function(require, exports, module) {
    var DrawView = require("squiggle/views/primitives/DrawView");
    var Colors = require("squiggle/Colors");
    var MathUtils = require("squiggle/utils/MathUtils");
    var Path = DrawView.extend({
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
        var randomX = 0, randomY = 0;
        if(arguments[0] != null){
          DrawView.prototype.updateOffset.apply(this, arguments);
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
            randomX = (Math.random() * this.jerkiness) * MathUtils.coinToss();
            randomY = (Math.random() * this.jerkiness) * MathUtils.coinToss();
          }
          this.sketch.vertex(this.offsetX + this.x +  this.points[index][0] + randomX, this.offsetY + this.y + this.points[index][1] + randomY);
        }
        if(this.closed){
          this.sketch.endShape(this.sketch.CLOSE);
        }else{
          this.sketch.endShape();
        }
        DrawView.prototype.draw.apply(this, arguments);
      }
    });
    return Path;
  }
);
