define(
  function(require, exports, module) {
    var squiggle = require("squiggle");
    var randomColor = require("randomColor");
    var Screen = squiggle.views.screens.Screen;
    var Word = squiggle.views.text.Word;
    var SampleScreen = Screen.extend({
      letter : undefined,
      setup : function(){
        var line1,line2,line3;
        line1 = new Word().setText("0123456789")
                          .centerHorizontalOnWindow()
                          .setY(50);
        line2 = new Word().setText("abcdefghijklmnopqrstuvwxyz")
                          .centerHorizontalOnWindow()
                          .setY(100);
        line3 = new Word().setText("+-=*()!")
                          .centerHorizontalOnWindow()
                          .setY(150);
        line4 = new Word().setText("type some text with your keyboard")
                          .setFontSize(16)
                          .centerHorizontalOnWindow()
                          .setY(200);
        this.letter = new Word()
                           .setText("...")
                           .setFontSize(200)
                           .setFontColor('#ff00ff')
                           .centerOnWindow();
        this.letter.setY(this.letter.getY() + line3.getY()/2);               
        this.addSubview(line1, line2, line3, line4, this.letter);
      },
      keyTyped : function() {
        this.letter.setText(this.sketch.key.toLowerCase()).centerHorizontalOnWindow();
      },
      onValueInjected : function(key,val){
        if(this.letter !== undefined) {
          if(key === 'jernkiness'){
            console.log("set jerkiness : "+val);
            this.letter.setJerkiness(val);
          }
        }
      }
    });
    return SampleScreen;
  }
);
