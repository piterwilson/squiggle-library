define(
  function(require, exports, module) {
    var squiggle = require("squiggle");
    var randomColor = require("randomColor");
    var Screen = squiggle.views.screens.Screen;
    var Word = squiggle.views.text.Word;
    var SampleScreen = Screen.extend({
      setup : function(){
        // IMPORTANT : call "super"
        Screen.prototype.setup.apply(this, arguments);
        // rest of the implementation
        var line1,line2,line3;
        line1 = new Word().setText("0123457890")
                          .centerHorizontalOnWindow()
                          .setY(50);
        line2 = new Word().setText("abcdefghijklmnopqrstuvwxyz")
                          .centerHorizontalOnWindow()
                          .setY(100);
        line3 = new Word().setText("+-=*()!")
                          .centerHorizontalOnWindow()
                          .setY(150);
        this.addSubview(line1, line2, line3);
      }
    });
    return SampleScreen;
  }
);
