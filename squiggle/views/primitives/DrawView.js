define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    var Colors = require("squiggle/Colors");
    var DrawView = View.extend({
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name:'strokeWeight',value:1},
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
