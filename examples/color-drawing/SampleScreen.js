define(
  function(require, exports, module) {
    var squiggle = require("squiggle");
    var Screen = squiggle.views.screens.Screen;
    var Word = squiggle.views.text.Word;
    var FrameRender = squiggle.views.animation.FrameRender;
    var FrameCapture = squiggle.views.animation.FrameCapture;
    var FrameModel = squiggle.models.Frame;
    var Rectangle = squiggle.views.primitives.Rectangle;
    var Button = squiggle.views.ui.Button;
    var randomColor = require("randomColor");
    var SampleScreen = Screen.extend({
      mousePressed : function(){
        // IMPORTANT : call "super"
        Screen.prototype.mousePressed.apply(this, arguments);
      },
      setup : function(){
        var frameRender, frameCapture, frameModel, title, instructions, background, da_size, s_size, margin, swatches_x, da_x, xpos, ypos, indicator;
        
        // size for the drawing area
        da_size = 400;
        
        // size of color swatches
        s_size = 50;
        
        // margin
        margin = 20;

        // x position of the drwaing area
        da_x = (window.innerWidth/2) - (da_size/2) + (s_size/2) ;
        
        // x position of the color swatches
        swatches_x = da_x - (margin * 2) - s_size;
        
        // colors!
        swatch_colors = [
          'Black',
          'Grey',
          'White',
          randomColor({hue:'yellow'}),
          randomColor({hue:'blue'}),
          randomColor({hue:'red'})
        ];
        // Title and instructions
        title = new Word().setText("draw inside the square")
                                    .setFontSize(18)
                                    .setY(window.innerHeight/2 - da_size/2 - 18 - 50)
                                    .centerHorizontalOnWindow();
        
        instructions = new Word().setText("(please allow pop-ups)")
                                    .setFontSize(14)
                                    .setY(window.innerHeight/2 + da_size/2 + 14 + 50)
                                    .centerHorizontalOnWindow();
        
        // sample frame capture / frame render
        // create a background colored Rectangle area
        background = new Rectangle().setWidth(da_size)
                                    .setHeight(da_size)
                                    .setJerkiness(5)
                                    .setFillColor('White')
                                    .setStrokeWeight(1)
                                    .setJerkiness(0.5)
                                    .setStrokeColor('Grey')
                                    .setX(da_x)
                                    .setY(window.innerHeight/2 - da_size/2);
                                    
        // create a FrameCapture instance
        frameCapture = new FrameCapture().setPosition(10,10)
                                         .setWidth(da_size)
                                         .setHeight(da_size)
                                         .setPosition(background.x, background.y);
                                         
        // create a FrameRender instance
        frameRender = new FrameRender().setPosition(10,10)
                                       .setWidth(da_size)
                                       .setHeight(da_size)
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

        // buttons
        xpos = swatches_x;
        ypos = background.y;
        
        // indicator
        indicator = new Rectangle().setPosition(xpos,ypos)
                                  .setWidth(s_size)
                                  .setHeight(s_size)
                                  .setStrokeWeight(8)
                                  .setFillColor('rgba(0,0,0,0)')
                                  .setRoundedCorners([s_size,s_size,s_size,s_size]);
                                  
        for(var i in swatch_colors){
          var button = new Button().setText('')
                               .setPosition(xpos,ypos)
                               .setWidth(s_size)
                               .setHeight(s_size)
                               .setBackgroundColorForState(swatch_colors[i], Button.states.NORMAL)
                               .setBackgroundColorForState(swatch_colors[i], Button.states.HOVER)
                               .setBackgroundColorForState(swatch_colors[i], Button.states.DOWN)
                               .setShowUnderline(false)
                               .on(Button.events.CLICKED,function(){
                                 frameCapture.setStrokeColor(this.getBackgroundRectangle().fillColor);
                                 indicator.setPosition(this.x, this.y);
                               });
          button.getBackgroundRectangle().setRoundedCorners([s_size,s_size,s_size,s_size]);
          if(swatch_colors[i] === 'White') button.getBackgroundRectangle().setStrokeWeight(1).setStrokeColor('Grey');             
          // all views must be added as a children of the Screen in order to be rendered
          this.addSubview(button);
          ypos += s_size + margin;
        }

        // all views must be added as a children of the Screen in order to be rendered
        this.addSubview(indicator,title,instructions,background,frameCapture,frameRender);
        
      }
    });
    return SampleScreen;
  }
);
