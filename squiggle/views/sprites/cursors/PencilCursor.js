define(
  function(require, exports, module) {
    var Cursor = require("squiggle/views/sprites/cursors/Cursor");
    var View = require("squiggle/views/View");
    var PencilCursor = Cursor.extend({
      size : 5,
      initialize: function(sketch) {
        Cursor.prototype.initialize.apply(this, arguments);
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
