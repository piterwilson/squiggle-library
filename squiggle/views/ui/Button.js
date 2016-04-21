define(
  function(require, exports, module) {
    var Word = require("squiggle/views/text/Word");
    var View = require("squiggle/views/View");
    var Path = require("squiggle/views/primitives/Path");
    var Rectangle = require("squiggle/views/primitives/Rectangle");
    var AppSettings = require("squiggle/models/AppSettings")
    /**
    * The Button class is a View that holds a Word instance and a Line instance, and adds basic interactive behaviors : click, hover and down
    * @property padding {Number} - Padding inside the button 
    * @property width {Number} - width in pixels of the button
    * @property height {Number} - height in pixels of the button
    * @property showUnderline {Boolean} - Whether or not to show an underline on roll over
    * @extends squiggle/views/View
    * @exports squiggle/views/ui/Button
    */
    var Button = View.extend({
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        var fcolor,bcolor;
        this.initProperties([
          {name : "padding", value: 8},
          {name : "showUnderline", value:true}
        ]);
        this.height = 0;
        this.width = 0;
        this.__s = Button.states.NORMAL;
        fcolor = AppSettings.defaultStrokeColor;
        bcolor = AppSettings.defaultFillColor;
        this.__fc = {};
        this.__fc[Button.states.NORMAL] = fcolor;
        this.__fc[Button.states.HOVER] = fcolor;
        this.__fc[Button.states.DOWN] = fcolor;
        this.__bc = {};
        this.__bc[Button.states.NORMAL] = bcolor;
        this.__bc[Button.states.HOVER] = bcolor;
        this.__bc[Button.states.DOWN] = bcolor;
        this.__r = new Rectangle().setJerkiness(0.5).setStrokeWeight(0).setFillColor(this.__bc[Button.states.NORMAL]);
        this.__w = new Word().setJerkiness(0.5).setFontSize(14).setPosition(this.padding,this.padding).setFontColor(this.__fc[Button.states.NORMAL]);
        this.__l = new Path().setStrokeWeight(1).setJerkiness(0.5).setPosition(this.padding,this.padding).setHidden(true).setStrokeColor(this.__fc[Button.states.NORMAL]);;
        this.userInteractionEnabled = true;
        this.pressed = false;
        this.addSubview(this.__r);
        this.addSubview(this.__w);
        this.addSubview(this.__l);
      },
      /**
      * Sets the text displayed in the Button. Will automatically set the width and height of the button to match the text.
      *
      * @param {string} string - The text to display in the button
      *
      * @returns void
      */
      setText : function(string){
        this.__w.setText(string).setFontColor(this.__fc[Button.states.NORMAL]);
        var w,h;
        if(string === ""){
          this.__r.setWidth(this.width).setHeight(this.height);
        }else{
          w = this.__w.getWidth();
          h = this.__w.fontSize;
          this.__l.clearPoints()
                      .addPoint(0, h + (this.padding / 2))
                      .addPoint(w, h + (this.padding / 2));
          this.__r.setWidth(w + (this.padding * 2)).setHeight(h + (this.padding * 2));
          this.width = this.__r.width;
          this.height = this.__r.height;
        }
        return this;
      },
      /**
      * Sets the text color for a given Button.state
      * @see Button.state
      * @param color {Number} - The new font color for a Button.state
      * @param state {string} - One of the states in Button.state
      */
      setFontColorForState : function (color,state){
        if(this.__fc[state] !== undefined) this.__fc[state] = color;
        this.___ucs(this.__s);
        return this;
      },
      /**
      * Sets the background color for a given Button.state
      * @see Button.state
      * @param color {Number} - The new background color for a Button.state
      * @param state {string} - One of the states in Button.state
      */
      setBackgroundColorForState : function (color,state){
        if(this.__bc[state] !== undefined) this.__bc[state] = color;
        if(state === this.__s) this.___ucs(this.__s);
        return this;
      },
      /**
      * setter for the width property
      *
      * @param {Number} value - The new width in pixels
      * @return {Object} reference to this instance 
      */
      setWidth : function(value){
        this.width = value;
        this.__r.setWidth(this.width);
        return this;
      },
      /**
      * setter for the height property
      *
      * @param {Number} value - The new height in pixels
      * @return {Object} reference to this instance 
      */
      setHeight : function(value){
        this.height = value;
        this.__r.setHeight(this.height);
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
        if(arguments[0] != null) View.prototype.updateOffset.apply(this, arguments);
        this.__l.hidden = !this.showUnderline;
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
          this.__s = Button.states.NORMAL;
          this.___ucs(this.__s);
        }else{
          this.__s = Button.states.HOVER;
          this.___ucs(this.__s);
        }
      },
      // Updates the Colors in the subviews for the a given State
      ___ucs : function(state){
        this.__l.setStrokeColor(this.__bc[state]);
        this.__r.setFillColor(this.__bc[state]);
        this.__w.setFontColor(this.__fc[state]);
      },
      /**
      * Function executed when the mouse is pressed
      * @fires Button.events.Pressed
      * @returns void
      */
      mousePressed : function(){
        if(this.isMouseInBounds()){
          this.pressed = true;
          this.__s = Button.states.DOWN;
          this.___ucs(this.__s);
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
            this.__s = Button.states.NORMAL;
            this.___ucs(this.__s);
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
    /**
    * State names for the Button class
    */
    Button.states = {
      NORMAL : "NORMAL",
      HOVER : "HOVER",
      DOWN : "DOWN"
    };
    return Button;
  }
);
