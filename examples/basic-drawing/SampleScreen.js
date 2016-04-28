define(
  function(require, exports, module) {
    var squiggle = require("squiggle");
    var randomColor = require("randomColor");
    var Screen = squiggle.views.screens.Screen;
    var Word = squiggle.views.text.Word;
    var FrameRender = squiggle.views.animation.FrameRender;
    var FrameCapture = squiggle.views.animation.FrameCapture;
    var FrameModel = squiggle.models.Frame;
    var Rectangle = squiggle.views.primitives.Rectangle;
    var SampleScreen = Screen.extend({
      setup : function(){
        var frameRender, frameCapture, frameModel, title, instructions, background, size;
        
        // size for the drawing area
        size = 400;
        
        // Title and instructions
        title = new Word().setText("draw inside the square")
                                    .setFontSize(18)
                                    .setY(window.innerHeight/2 - size/2 - 18 - 50)
                                    .centerHorizontalOnWindow();
        
        instructions = new Word().setText("(please allow pop-ups)")
                                    .setFontSize(14)
                                    .setY(window.innerHeight/2 + size/2 + 14 + 50)
                                    .centerHorizontalOnWindow();
        
        // sample frame capture / frame render
        // create a background colored Rectangle area
        background = new Rectangle().setWidth(size)
                                    .setHeight(size)
                                    .setJerkiness(1)
                                    .setFillColor(randomColor({luminosity: 'light', hue: 'blue'}))
                                    .setX(window.innerWidth/2 - size/2)
                                    .setY(window.innerHeight/2 - size/2)
                                    .setStrokeWeight(0);
        // create a FrameCapture instance
        frameCapture = new FrameCapture().setPosition(10,10)
                                         .setWidth(size)
                                         .setHeight(size)
                                         .setPosition(background.x, background.y);
                                         
        // create a FrameRender instance
        frameRender = new FrameRender().setPosition(10,10)
                                       .setWidth(size)
                                       .setHeight(size)
                                       // set the URL of the worker script required by gif.js (see: https://github.com/jnordberg/gif.js)
                                       .setWorkerScript('../gif.worker.js')
                                       .setPosition(background.x, background.y);
        // connect the FrameCapture instance to a the FrameRender instance
        frameCapture.setFrameRender(frameRender);
        // set a callback when the model inside the FrameCapture instance has changed
        // the model changes as the user draws lines on screen
        frameCapture.model.on(
          'change',
          function(){
            // when the model changes, export GIF
            frameRender.export(function(blob){
              // open the animated gif on a new window
              window.open(URL.createObjectURL(blob));
            });
          }
        );
        // all views must be added as a children of the Screen in order to be rendered
        this.addSubview(title,instructions,background,frameCapture,frameRender);
      }
    });
    return SampleScreen;
  }
);
