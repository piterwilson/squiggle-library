define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    var Screen = View.extend({
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.__wasSetup = false;
        this.backgroundColor = {
          red: 255,
          green: 255,
          blue: 255
        };
      },
      setup : function(){
        this.__wasSetup = true;
      },
      draw : function(){
        if(!this.__wasSetup) this.setup();
        if(arguments[0] != null){
          View.prototype.updateOffset.apply(this, arguments);
        }
        if(this.backgroundColor != null){
          this.sketch.background(this.backgroundColor.red, this.backgroundColor.blue, this.backgroundColor.green);
        }
        View.prototype.draw.apply(this, arguments);
      },
      mouseMoved : function(){
        this.log("mouseMoved()");
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.userInteractionEnabled){
            if(typeof(child['mouseMoved']) === "function"){
              child['mouseMoved'].call(this.subviews[index])
            }
          }
        }
      },
      mouseDragged : function(){
        this.log("mouseDragged()");
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.userInteractionEnabled){
            if(typeof(child['mouseDragged']) === "function"){
              child['mouseDragged'].call(this.subviews[index])
            }
          }
        }
      },
      mousePressed : function(){
        this.log("mousePressed()");
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.userInteractionEnabled){
            if(typeof(child['mousePressed']) === "function"){
              child['mousePressed'].call(this.subviews[index])
            }
          }
        }
      },
      mouseReleased : function(){
        this.log("mouseReleased ()");
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.userInteractionEnabled){
            if(typeof(child['mouseReleased']) === "function"){
              child['mouseReleased'].call(this.subviews[index])
            }
          }
        }
      }
    });
    return Screen;
  }
);
