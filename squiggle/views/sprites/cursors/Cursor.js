define(
  function(require, exports, module) {
    var Path = require("squiggle/views/primitives/Path");
    var View = require("squiggle/views/View");
    var Colors = require("squiggle/Colors");
    var Cursor = Path.extend({
      initialize: function(sketch) {
        Path.prototype.initialize.apply(this, arguments);
        this.setStrokeWeight(2);
        this.fillColor = Colors.black;
      },
      draw : function(){
        if(this.hidden) return;
        Path.prototype.draw.apply(this, arguments);
      },
    });
    return Cursor;
  }
);
