define(
  function(require, exports, module) {
    var Word = require("squiggle/views/text/Word");
    var View = require("squiggle/views/View");
    var Path = require("squiggle/views/primitives/Path");
    var Rectangle = require("squiggle/views/primitives/Rectangle");
    var Colors = require("squiggle/Colors");
    /**
    * The Button class is a View that holds a Word instance and a Line instance, and adds basic interactive behaviors : click, hover and down
    * @property padding {Number} - Padding inside the button 
    * @property showUnderline {Boolean} - Whether or not to show an underline on roll over
    * @extends squiggle/views/View
    * @exports squiggle/views/ui/Button
    */
    var Button = View.extend({
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name : "padding", value: 8},
          {name : "showUnderline", value:true}
        ]);
        this.height = 0;
        this.width = 0;
        this.__r = new Rectangle().setJerkiness(0.5).setFillColor(Colors.randomColor()).setStrokeWeight(0);
        this.__w = new Word().setJerkiness(0.5).setFontSize(14).setPosition(this.padding,this.padding);
        this.__l = new Path().setStrokeWeight(1).setJerkiness(0.5).setPosition(this.padding,this.padding).setHidden(true);
        this.userInteractionEnabled = true;
        this.pressed = false;
        this.addSubview(this.__r);
        this.addSubview(this.__w);
        this.addSubview(this.__l);
      },
      /**
      * Sets the text displayed in the
      *
      * @param {string} string - The text to display in the button
      *
      * @returns void
      */
      setText : function(string){
        this.__w.setText(string);
        var w,h;
        w = this.__w.getWidth();
        h = this.__w.fontSize;
        this.__l.clearPoints()
                    .addPoint(0, h + (this.padding / 2))
                    .addPoint(w, h + (this.padding / 2));
        this.__r.setWidth(w + (this.padding * 2)).setHeight(h + (this.padding * 2));
        this.width = this.__r.width;
        this.height = this.__r.height;
        return this;
      },
      /**
      * Public getter for the background Rectangle instance
      *
      * @returns {Rectangle} rectangle instance inside the button
      */
      getBackgroundRectangle : function(){
        return this.__r;
      },
      /**
      * Public getter for the Word instance
      *
      * @returns {Word} Word instance inside the button
      */
      getWord : function(){
        return this.__w;
      },
      /**
      * Public getter for the font size 
      *
      * @returns {Number}
      */
      getFontSize : function(){
        return this.__w.getFontSize();
      },
      /**
      * Public setter for the font size 
      *
      * @returns {Object} reference to this instance
      */
      setFontSize : function(value){
        this.__w.setFontSize(value);
        return this;
      },
      /**
      * Public getter for the font color
      *
      * @returns {Object} in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      setFontColor : function(color){
        this.__w.setFontColor(color);
        this.__l.setStrokeColor(color);
        return this;
      },
      /**
      * Helper function to determine if the Mouse is in bounds
      *
      * @returns {Boolean} true if the mouse is in bounds, false otherwise
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
        if(!this.showUnderline) this.__l.hidden = true;
        View.prototype.draw.apply(this, arguments);
      },
      /**
      * Function executed when the mouse is moved to generate roll over visual effects.
      *
      * @returns void
      */
      mouseMoved : function(){
        // if in bounds, show underline
        this.__l.setHidden(!this.isMouseInBounds());
        if(!this.isMouseInBounds()){
          this.pressed = false;
          this.sketch.cursor(this.sketch.ARROW);
        }else{
          this.sketch.cursor(this.sketch.HAND);
        }
      },
      /**
      * Function executed when the mouse is pressed
      * @fires Button.events.Pressed
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
      * @fires Button.events.CLICKED
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
