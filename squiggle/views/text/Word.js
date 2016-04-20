define(
  function(require, exports, module) {
    var DrawView = require("squiggle/views/primitives/DrawView");
    var Letter = require("squiggle/views/text/Letter");
    var Colors = require("squiggle/Colors");
    /**
    * A Word is a series of Letter instances drawn together
    *
    * @extends squiggle/views/primitives/DrawView
    * @exports squiggle/views/text/Word
    */
    var Word = DrawView.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        DrawView.prototype.initialize.apply(this, arguments);
        this.jerkiness = 2;
        this.fontSize = 24;
        this.w = "";
      },
      /**
      * Sets the font color
      * @param {Object} color - A color to use in the format {red:[0-255],green:[0-255],blue:[0-255], alpha:[0-255]}
      * @return {Object} a reference to this instance.
      */
      setFontColor : function(color){
        for(var index in this.subviews) {
          this.subviews[index].setStrokeColor(color);
        }
        return this;
      },
      /**
      * Sets the font size. Automatically sets the internal 'strokeWeight' and 'jerkiness' of the internal Letter instances
      * @param {Number} value - font size (in pixels) to use
      * @return {Object} a reference to this instance.
      */
      setFontSize : function(value){
        this.fontSize = value;
        this.strokeWeight = value/20;
        this.jerkiness = value/30;
        this.setText(this.w);
        return this;
      },
      /**
      * gets the font size. 
      * @return {Number} font size used in the internal Letter instances
      */
      getFontSize : function(){
        return this.fontSize;
      },
      /**
      * Sets the text written by the Word instance
      * @param {string} str - The text that is drawn by the word
      * @return {Object} a reference to this instance.
      */
      setText:function(str){
        var xpos = 0, letter = null;
        this.removeAllSubviews();
        this.w = str;
        for (var i = 0, len = str.length; i < len; i++) {
          // create letters one by one ...
          l = new Letter();
          l.setCharacter(str[i])
                .setFontSize(this.fontSize)
                .setJerkiness(this.jerkiness)
                .setPosition(xpos,0)
                .setStrokeColor(this.strokeColor)
                .setStrokeWeight(this.strokeWeight);
          xpos += ((this.fontSize / Letter.widthFactorDivider) * l.widthFactor) + ((this.fontSize / Letter.widthFactorDivider) * 2);
          this.addSubview(l);
        }
        return this;
      },
      /**
      * Gets the text drawn by the Word instance
      * @return {string} the text drawn by the Word instance
      */
      getText:function(){
        return this.w;
      },
      /**
      * Gets the calculated width of the Word instance in pixels
      * @return {Number} calculated width of the Word instance in pixels
      */
      getWidth : function(){
        if(this.subviews.length > 0){
          var last = this.subviews[this.subviews.length - 1]
          return last.getX() + ((this.fontSize / Letter.widthFactorDivider) * last.widthFactor);
        }else{
          return 0;
        }
      },
      /**
      * Draw code for this class.
      * @override
      * @return void
      */
      draw : function(){
        if(arguments[0] != null){
          DrawView.prototype.updateOffset.apply(this, arguments);
        }
        for(var i in this.subviews) {
          this.subviews[i].debug = this.debug;
          this.subviews[i].draw([this.x + this.offsetX, this.y + this.offsetY]);
        }
      },
      /**
      * Centers the Word horizontally in the window (using window.innerWidth)
      * @return {Object} a reference to this instance.
      */
      centerHorizontalOnWindow : function(){
        this.x = (window.innerWidth/2) - (this.getWidth()/2);
        return this;
      },
      /**
      * Centers the Word vertically in the window (using window.innerheight)
      * @return {Object} a reference to this instance.
      */
      centerVerticalOnWindow : function(){
        this.y = (window.innerHeight/2) - (this.fontSize/2);
        return this;
      },
      /**
      * Shortcut for to center both horizontally and vertically on screen
      * @return {Object} a reference to this instance.
      */
      centerOnWindow : function(){
        this.centerVerticalOnWindow();
        this.centerHorizontalOnWindow();
        return this;
      }
    });
    return Word;
  }
);
