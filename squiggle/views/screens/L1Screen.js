define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    var Screen = require("squiggle/views/screens/Screen");
    var DashedLine = require("squiggle/views/primitives/DashedLine");
    var FrameCapture = require("squiggle/views/animation/FrameCapture");
    var Colors = require("squiggle/Colors");
    var Letter = require("squiggle/views/text/Letter");
    var Word = require("squiggle/views/text/Word");
    var PencilCursor = require("squiggle/views/sprites/cursors/PencilCursor");
    var FrameRender = require("squiggle/views/animation/FrameRender");
    var AnimationRender = require("squiggle/views/animation/AnimationRender");
    var Animation = require("squiggle/models/Animation");
    var Button = require("squiggle/views/ui/Button");
    var Frame = require("squiggle/models/Frame");
    var L1Screen = Screen.extend({
      rect1 : null,
      rect2 : null,
      drawRect1: null,
      drawRect2: null,
      rect3 : null,
      title : null,
      pencil : null,
      rectSize : 0,
      equalsSignLines : [],
      frameRender1 : null,
      frameRender2 : null,
      animationRender : null,
      clearButton : null,
      downloadButton : null,
      initialize: function(sketch) {
        Screen.prototype.initialize.apply(this, arguments);
      },
      configureLine : function(line){
        line.setStrokeWeight(4)
          .setSpacing([5,7])
          .setSteps(2)
          .setJerkiness(0.5)
          .setStrokeColor(Colors.black);
      },
      addDashedRectAtPosition : function(x,y,rectSize){
        var line = new DashedLine()
          .addPoint(x, y)
          .addPoint(x + rectSize, y)
          .addPoint(x + rectSize, y + rectSize)
          .addPoint(x, y + rectSize)
          .addPoint(x, y)
        this.configureLine(line);
        this.addSubview(line);
        return line;
      },
      setup : function(){
        Screen.prototype.setup.apply(this, arguments);
        var guideY1,
          rect1X,
          rect1Y,
          rect2X,
          rect2Y,
          rect3X,
          rect3Y,
          totalUIWidth,
          w = window.innerWidth,
          h = window.innerHeight;

          // size of the rectangle sides
          this.rectSize = 250;
          // size of the = signs
          lineSize = 50;
          // margin between rectangles
          margin = 25;
          // total width of all elements
          totalUIWidth = (this.rectSize * 3) + (margin * 6) + (lineSize * 2);
          // top guide line
          guideY1 = (h / 2) - (this.rectSize / 2);
          // bottom guide line
          guideY2 = (h / 2) + (this.rectSize / 2);
          // position of rect 1
          rect1X = (w / 2) - (totalUIWidth / 2);
          rect1Y = guideY1;

          // add the rectangle lines (guides to draw inside of)
          rect2X = rect1X + this.rectSize + (margin * 2) + lineSize;
          rect2Y = rect1Y;
          rect3X = rect1X + this.rectSize + (margin * 2) + lineSize + this.rectSize + margin + lineSize + margin;
          rect3Y = rect1Y;

        // clear an download button
        this.clearButton = new Button().setPosition(10,10)
                                        .setText("start over")
                                        .setHidden(true)
                                        .on(
                                            Button.events.CLICKED,
                                            function(){
                                              this.drawRect1.model = new Frame();
                                              this.drawRect2.model = new Frame();
                                              this.onAnimationModelChange();
                                            }.bind(this)
                                          );
        this.clearButton.setFontColor(Colors.red);
        this.downloadButton = new Button().setY((h/2) + (this.rectSize/2) + (margin * 2))
                                        .setFontSize(18)
                                        .setText("download your animation")
                                        .setHidden(true)
                                        .centerHorizontalOnWindow()
                                        .on(
                                            Button.events.CLICKED,
                                            function(){
                                              this.animationRender.export();
                                            }.bind(this)
                                          );


        this.addSubview(this.clearButton);
        this.addSubview(this.downloadButton);

        this.rect1 = this.addDashedRectAtPosition(rect1X, rect1Y, this.rectSize);
        this.rect2 = this.addDashedRectAtPosition(rect2X, rect2Y, this.rectSize);
        this.rect3 = this.addDashedRectAtPosition(rect3X, rect3Y, this.rectSize);

        this.drawRect1 = new FrameCapture();
        this.drawRect1.setPosition(rect1X,rect1Y)
                      .setWidth(this.rectSize)
                      .setHeight(this.rectSize);
        this.addSubview(this.drawRect1);

        this.drawRect2 = new FrameCapture();
        this.drawRect2.setPosition(rect2X,rect2Y)
                      .setWidth(this.rectSize)
                      .setHeight(this.rectSize);
        this.addSubview(this.drawRect2);

        // add the signs (''+' and '=' sign)
        var word = new Word();
        word.setStrokeWeight(2)
            .setFontSize(48)
            .setJerkiness(0.5)
            .setStrokeWeight(3)
            .setText("+")
            .setPosition(
              rect1X + this.rectSize + margin + margin - 20,
              (h / 2) - 20
            );
        this.addSubview(word);

        word = new Word();
        word.setStrokeWeight(2)
            .setFontSize(48)
            .setJerkiness(0.5)
            .setStrokeWeight(3)
            .setText("=")
            .setPosition(
              rect1X + ((this.rectSize + margin) * 2) + lineSize + margin + 8,
              (h / 2) - 20
            );
        this.addSubview(word);

        // squiggle!
        word = new Word();
        word.setStrokeWeight(2)
            .setFontSize(24)
            .setJerkiness(0.5)
            .setStrokeWeight(3)
            .setText("2 squiggles is all that it takes!")
            .centerHorizontalOnWindow()
            .setY((h / 2) - this.rectSize + margin + word.getFontSize());
        this.addSubview(word);
        this.title = word;

        // Frame render
        this.frameRender1 = new FrameRender();
        this.frameRender1
                  .setX(this.drawRect1.x)
                  .setY(this.drawRect1.y)
                  .setWidth(this.rectSize)
                  .setHeight(this.rectSize);
        this.drawRect1.setFrameRender(this.frameRender1);
        this.frameRender2 = new FrameRender();
        this.frameRender2.setX(this.drawRect2.x).setY(this.drawRect2.y);
        this.drawRect2.setFrameRender(this.frameRender2);
        this.addSubview(this.frameRender1);
        this.addSubview(this.frameRender2);

        // Animation render
        this.animationRender = new AnimationRender()
                            .setX(rect3X)
                            .setY(rect3Y)
                            .setFrameDelay(3)
                            .setWidth(this.rectSize)
                            .setHeight(this.rectSize)
                            .play();
        this.addSubview(this.animationRender);

        // update Animation
        this.drawRect1.model.on('change',this.onAnimationModelChange,this);
        this.drawRect2.model.on('change',this.onAnimationModelChange,this);

        // mouse cursor
        this.pencil = new PencilCursor();
        this.addSubview(this.pencil);
      },
      onAnimationModelChange : function(){
        var animation = new Animation(
          [
            this.drawRect1.model,
            this.drawRect2.model
          ]
        );
        this.animationRender.setModel(animation);
        this.clearButton.setHidden(false);
        this.downloadButton.setHidden(false);
      },
      isMouseOverRectangle1 : function(){
        return this.drawRect1.isMouseInBounds();
      },
      isMouseOverRectangle2 : function(){
        return this.drawRect2.isMouseInBounds();
      },
      colorRectanglesOnRollOver : function(){
        this.sketch.cursor();
        this.title.setJerkiness(0.5);
        this.pencil.hidden = true;
        if(this.isMouseOverRectangle1()){
          this.sketch.noCursor();
          this.pencil.hidden = false;
        }
        if(this.isMouseOverRectangle2()){
          this.sketch.noCursor();
          this.pencil.hidden = false;
        }
      },
      movePencilCursorToMousePosition : function(){
        this.pencil.x = this.sketch.mouseX;
        this.pencil.y = this.sketch.mouseY;
      },
      draw: function(){
        Screen.prototype.draw.apply(this, arguments);
        this.colorRectanglesOnRollOver();
        this.movePencilCursorToMousePosition();
      },
      mouseMoved : function(){
        Screen.prototype.mouseMoved.apply(this, arguments);
        this.movePencilCursorToMousePosition();
      },
      mousePressed : function(){
        Screen.prototype.mousePressed.apply(this, arguments);
        this.movePencilCursorToMousePosition();
      },
      mouseReleased : function(){
        Screen.prototype.mouseReleased.apply(this, arguments);
      }
    });
    return L1Screen;
  }
);
