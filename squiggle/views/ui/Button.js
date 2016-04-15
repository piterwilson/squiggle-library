/**
* Button.js
*
* by Juan Carlos Ospina Gonzalez
* Amsterdam, 2016
*
* The Button class is a View that holds a Word instance and a Line instance, and adds basic interactive behaviors : click, hover and down
*/
define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    var Word = require("squiggle/views/text/Word");
    var Line = require("squiggle/views/primitives/Line");
    var Button = View.extend({
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.__word = new Word().setJerkiness(0.5).setFontSize(14);
        this.__line = new Line().setStrokeWeight(1).setJerkiness(0.5).setHidden(true);
        this.userInteractionEnabled = true;
        this.width = this.__word.getWidth();
        this.height = this.__word.fontSize;
        this.pressed = false;
        this.addSubview(this.__word);
        this.addSubview(this.__line);
      },
      /**
      * Sets the text displayed in the
      *
      * @param {string} string - The text to display in the button
      *
      * @returns void
      */
      setText : function(string){
        this.__word.setText(string);
        this.width = this.__word.getWidth();
        this.height = this.__word.fontSize;
        var widthFactor = this.__word.subviews[0].widthFactor/2;
        this.__line.clearPoints()
                    .addPoint(0,this.height + widthFactor)
                    .addPoint(this.width, this.height + widthFactor);
        return this;
      },
      /**
      * Public getter for the Word instance
      *
      * @returns Word instance inside the button
      */
      getWord : function(){
        return this.__word;
      },
      getFontSize : function(){
        return this.__word.getFontSize();
      },
      setFontSize : function(value){
        this.__word.setFontSize(value);
        return this;
      },
      setFontColor : function(color){
        this.__word.setFontColor(color);
        this.__line.setStrokeColor(color);
        return this;
      },
      /**
      * Helper function to determine if the Mouse is in bounds
      *
      * @returns true if the mouse is in bounds, false otherwise
      */
      isMouseInBounds : function(){
        return this.isMouseOverRectangle(this.offsetX + this.x, this.offsetY + this.y, this.offsetX + this.x + this.width, this.offsetY + this.y + this.height);
      },
      /**
      * Draw code for this class.
      *
      * @returns void
      */
      draw:function(){
        if(arguments[0] != null){
          View.prototype.updateOffset.apply(this, arguments);
        }
        // get x,y widh and height
        var w, h;
        w = this.__word.width;
        h = this.__word.fontSize;
        View.prototype.draw.apply(this, arguments);
      },
      /**
      * Function executed when the mouse is moved to generate roll over visual effects.
      *
      * @returns void
      */
      mouseMoved : function(){
        // if in bounds, show underline
        this.__line.setHidden(!this.isMouseInBounds());
        if(!this.isMouseInBounds()){
          this.pressed = false;
        }
      },
      /**
      * Function executed when the mouse is pressed
      *
      * @returns void
      */
      mousePressed : function(){
        if(this.isMouseInBounds()){
          this.pressed = true;
          this.trigger(Button.events.PRESSED, this);
        }
      },
      /**
      * Function executed when the mouse is released
      *
      * @returns void
      */
      mouseReleased : function(){
        if(this.isMouseInBounds()){
          if(this.pressed){
            this.trigger(Button.events.CLICKED, this);
          }
        }
        this.pressed = false;
      },
      /**
      * Centers the button horizontally on the window object
      *
      * @returns void
      */
      centerHorizontalOnWindow : function(){
        this.x = (window.innerWidth/2) - (this.width/2);
        return this;
      },
      /**
      * Centers the button vertically on the window object
      *
      * @returns void
      */
      centerVerticalOnWindow : function(){
        this.y = (window.innerHeight/2) - (this.fontSize/2);
        return this;
      },
      /**
      * Centers the button horizontally and vertically on the window object
      *
      * @returns void
      */
      centerOnWindow : function(){
        this.centerVerticalOnWindow();
        this.centerHorizontalOnWindow();
      }

    });
    /**
    * Event names for the Button class
    */
    Button.events = {
      PRESSED : "BUTTON_PRESS",
      CLICKED : "BUTTON_CLICKED"
    };
    return Button;
  }
);
