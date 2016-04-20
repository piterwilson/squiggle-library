define(
  function(require, exports, module) {
    var Path = require("squiggle/views/primitives/Path");
    /**
    * A View that draws a 'pencil' cursor.
    *
    * @extends squiggle/views/primitives/Path
    * @exports squiggle/views/sprites/cursors/PencilCursor
    */
    var PencilCursor = Path.extend({
      initialize: function(sketch) {
        Path.prototype.initialize.apply(this, arguments);
        var size = 5;
        // set stroke and fill
        this.setStrokeWeight(2);
        this.fillColor = Colors.black;
        // add points
        this.addPoint(0,0);
        this.addPoint(size,0);
        this.addPoint(size * 3, size * 2);
        this.addPoint(size * 2, size * 3);
        this.addPoint(0, size);
      }
    });
    return PencilCursor;
  }
);
