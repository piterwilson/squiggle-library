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
      * Internal Setup routine for this Screen. Is called once in the lifecycle of the Screen
      */
      __setup : function(){
        this.__wasSetup = true;
        this.setup();
      },
      /**
      * Internal draw routine for this Screen. Is called once in the lifecycle of the Screen
      */
      __draw : function(){
        if(!this.__wasSetup) this.__setup();
        if(arguments[0] != null) View.prototype.updateOffset.apply(this, arguments);
        if(this.backgroundColor != null) this.sketch.background(this.backgroundColor.red, this.backgroundColor.blue, this.backgroundColor.green);
        View.prototype.draw.apply(this, arguments);
        this.draw();
      },
      /**
      * Public setup routine for this Screen. Is called once in the lifecycle of the Screen. Meant to be filled in by end-user
      */
      setup : function(){},
      /**
      * Public Draw routine for this Screen. Is called once per draw() call in the p5renderer object. Meant to be filled in by end-user
      * @see {@link http://p5js.org/reference/#/p5/draw}
      */
      draw : function(){},
      /**
      * Called when a key is pressed. It is called by p5renderer.keyPressed()
      * @see {@link http://p5js.org/reference/#/p5/keyPressed}
      */
      keyPressed : function() {
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.userInteractionEnabled){
            child['keyPressed'].call(this.subviews[index])
          }
        }
      },
      /**
      * Called when a key is typed. It is called by p5renderer.keyTyped()
      * @see {@link http://p5js.org/reference/#p5/keyTyped}
      */
      keyTyped : function() {
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.userInteractionEnabled){
            child['keyTyped'].call(this.subviews[index])
          }
        }
      },
      /**
      * Called when a value has been injected via squiggle.injectValue(key,val)
      * @param {String} key - A key to identify the value being injected
      * @param {Object} val - Any value to inject into the Screen
      */
      onValueInjected : function(key,val){}
    });
    return Screen;
  }
);
