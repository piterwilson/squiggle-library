define(
  function(require, exports, module) {
    var squiggle = require("squiggle");
    var Screen = squiggle.views.screens.Screen;
    var Word = squiggle.views.text.Word;
    var FrameRender = squiggle.views.animation.FrameRender;
    var FrameCapture = squiggle.views.animation.FrameCapture;
    var FrameModel = squiggle.models.Frame;
    var Rectangle = squiggle.views.primitives.Rectangle;
    var SampleScreen = Screen.extend({
      setup : function(){
        var frameRender, frameCapture, frameModel, title, instructions, background, size;
        // IMPORTANT : call "super"
        Screen.prototype.setup.apply(this,arguments);
        // rest of your setup code ...
        
        // size for the sample drawing
        size = 400;
        
        // sample text
        title = new Word().setText("draw inside the square")
                                    .setFontSize(18)
                                    .setY(window.innerHeight/2 - size/2 - 18 - 50)
                                    .centerHorizontalOnWindow();
        this.addSubview(title);
        instructions = new Word().setText("(please allow pop-ups)")
                                    .setFontSize(14)
                                    .setY(window.innerHeight/2 + size/2 + 14 + 50)
                                    .centerHorizontalOnWindow();
        this.addSubview(instructions);
        
        // sample frame capture / frame render
        background = new Rectangle().setWidth(size)
                                    .setHeight(size)
                                    .setFillColor(squiggle.Colors.randomColor({luminosity: 'light', hue: 'blue'}))
                                    .setX(window.innerWidth/2 - size/2)
                                    .setY(window.innerHeight/2 - size/2)
                                    .setStrokeWeight(0);
        frameCapture = new FrameCapture().setPosition(10,10)
                                         .setWidth(size)
                                         .setHeight(size)
                                         .setPosition(background.x, background.y);
        frameRender = new FrameRender().setPosition(10,10)
                                       .setWidth(size)
                                       .setHeight(size)
                                       .setPosition(background.x, background.y);
        frameCapture.setFrameRender(frameRender);
        frameCapture.model.on(
          'change',
          function(){
            // when the model changes, export GIF
            frameRender.export();
          }
        );
        this.addSubview(background);
        this.addSubview(frameCapture);
        this.addSubview(frameRender);
      },
      draw : function(){
        //  IMPORTANT : call "super"
        Screen.prototype.draw.apply(this,arguments);
        // rest of your draw code ...
      }
    });
    return SampleScreen;
  }
);
