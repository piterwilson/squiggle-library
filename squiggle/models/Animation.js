define(
  function(require, exports, module) {
    var __Backbone  = require("backbone");
    var Frame = require("squiggle/models/Frame");
    /**
    * Animation model is a Backbone.Collection of Frame models
    * @extends Backbone.Collection
    * @see {@link squiggle/models/Frame}
    * @exports squiggle/models/Animation
    */
    var Animation = __Backbone.Collection.extend({
      model : Frame
    });
    return Animation;
  }
);
