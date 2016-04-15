define(
  function(require, exports, module) {
    var __Backbone  = require("backbone");
    var Frame = require("squiggle/models/Frame");
    var Animation = __Backbone.Collection.extend({
      model : Frame
    });
    return Animation;
  }
);
