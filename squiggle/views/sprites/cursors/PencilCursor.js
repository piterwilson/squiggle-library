define(
  function(require, exports, module) {
    var Path = require("squiggle/views/primitives/Path");
    var PencilCursor = Path.extend({
      size : 5,
      initialize: function(sketch) {
        Path.prototype.initialize.apply(this, arguments);
        // set stroke and fill
        this.setStrokeWeight(2);
        this.fillColor = Colors.black;
        // add points
        this.addPoint(0,0);
        this.addPoint(this.size,0);
        this.addPoint(this.size * 3, this.size * 2);
        this.addPoint(this.size * 2, this.size * 3);
        this.addPoint(0, this.size);
      }
    });
    return PencilCursor;
  }
);
