define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    /**
    * <p>Screen is a View that represents and contains the UI and logic for a screen inside a squiggle application.</p>
    * <p>A squiggle application is made up of one or more Screen objects. </p>
    * <p>Only one screen can be rendered at at time.</p>
    * <p>Internally, p5 is calling its setup(), draw() and other methods on an instance of this class that is the active screen in the application.</p>
    * 
    * @property backgroundColor {Object} - Baclground color of the screen, in the format {red:[0-255],green:[0-255],blue:[0-255], alpha:[0-255]}
    * @extends squiggle/views/View
    * @exports squiggle/views/screens/Screen
    */
    var Screen = View.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.__wasSetup = false;
        this.backgroundColor = {
          red: 255,
          green: 255,
          blue: 255
        };
      },
      /**
      * Setup routine for this Screen. Is called once in the lifecycle of the Screen
      */
      setup : function(){
        this.__wasSetup = true;
      },
      /**
      * Draw routine for this Screen. Is called once per draw() call in the p5renderer object
      * @see {@link http://p5js.org/reference/#/p5/draw}
      */
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
      /**
      * Called when the mouse has moved. It is called by p5renderer.mouseMoved()
      * @see {@link http://p5js.org/reference/#/p5/mouseMoved}
      */
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
      /**
      * Called when the mouse was dragged. It is called by p5renderer.mouseDragged()
      * @see {@link http://p5js.org/reference/#/p5/mouseDragged}
      */
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
      /**
      * Called when the mouse was pressed. It is called by p5renderer.mousePressed()
      * @see {@link http://p5js.org/reference/#/p5/mousePressed}
      */
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
      /**
      * Called when the mouse was released. It is called by p5renderer.mouseReleased()
      * @see {@link http://p5js.org/reference/#/p5/mouseReleased}
      */
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
