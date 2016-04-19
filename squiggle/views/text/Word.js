define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    var Letter = require("squiggle/views/text/Letter");
    var Colors = require("squiggle/Colors");
    var Word = View.extend({
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.jerkiness = 2;
        this.fontSize = 24;
        this.w = "";
        this.initProperties([
          {name:'strokeColor',value:Colors.black},
          {name:'strokeWeight', value:1}
        ]);
      },
      setFontColor : function(color){
        for(var index in this.subviews) {
          this.subviews[index].setStrokeColor(color);
        }
        return this;
      },
      setFontSize : function(value){
        this.fontSize = value;
        this.strokeWeight = value/20;
        this.jerkiness = value/30;
        this.setText(this.w);
        return this;
      },
      getFontSize : function(){
        return this.fontSize;
      },
      setJerkiness : function(value){
        this.jerkiness = value;
        for(var index in this.subviews) {
          this.subviews[index].setJerkiness(this.jerkiness);
        }
        return this;
      },
      getText:function(){
        return this.w;
      },
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
      draw : function(){
        if(arguments[0] != null){
          View.prototype.updateOffset.apply(this, arguments);
        }
        for(var i in this.subviews) {
          this.subviews[i].debug = this.debug;
          this.subviews[i].draw([this.x + this.offsetX, this.y + this.offsetY]);
        }
      },
      getWidth : function(){
        if(this.subviews.length > 0){
          var last = this.subviews[this.subviews.length - 1]
          return last.getX() + ((this.fontSize / Letter.widthFactorDivider) * last.widthFactor);
        }else{
          return 0;
        }

      },
      centerHorizontalOnWindow : function(){
        this.x = (window.innerWidth/2) - (this.getWidth()/2);
        return this;
      },
      centerVerticalOnWindow : function(){
        this.y = (window.innerHeight/2) - (this.fontSize/2);
        return this;
      },
      centerOnWindow : function(){
        this.centerVerticalOnWindow();
        this.centerHorizontalOnWindow();
        return this;
      }
    });
    return Word;
  }
);
