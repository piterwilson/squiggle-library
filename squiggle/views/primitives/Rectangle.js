define(
  function(require, exports, module) {
    var Path = require("squiggle/views/primitives/Path");
    var Rectangle = Path.extend({
      initialize : function(sketch){
        Path.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name:'x',value:0},
          {name:'y',value:0},
          {name:'width',value:0},
          {name:'height',value:0},
          {name:'fill',value:true}
        ]);
        this.closed = true;
      },
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
