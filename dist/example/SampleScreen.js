define(
  function(require, exports, module) {
    var squiggle = require("squiggle");
    var Screen = squiggle.views.screens.Screen;
    var Word = squiggle.views.text.Word;
    var SampleScreen = Screen.extend({
      sampleText : null,
      setup : function(){
        // IMPORTANT : call "super"
        Screen.prototype.setup.apply(this,arguments);
        // rest of your setup code ...
        this.sampleText = new Word().setText("test")
                                    .setFontSize(72)
                                    .centerOnWindow();
        this.addSubview(this.sampleText);
      },
      draw : function(){
        // call "super"
        Screen.prototype.draw.apply(this,arguments);
        // rest of your draw code ...
      }
    });
    return SampleScreen;
  }
);
