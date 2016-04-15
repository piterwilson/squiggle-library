/*global define */

define(function (require) {
    'use strict';
    // bsae p5
    var p5 = require("p5"),
    // Models
      AppSettings = require("squiggle/models/AppSettings"),
      Animation = require("squiggle/models/Animation"),
      Frame = require("squiggle/models/Frame"),
      LineModel = require("squiggle/models/Line"),
    // utils
      MathUtils = require("squiggle/utils/MathUtils"),
    // Views
      // animations
      BaseRender = require("squiggle/views/animation/AnimationRender"),
      AnimationRender = require("squiggle/views/animation/AnimationRender"),
      FrameCapture = require("squiggle/views/animation/FrameCapture"),
      FrameRender = require("squiggle/views/animation/FrameRender"),
      // primitives
      DashedLine = require("squiggle/views/primitives/DashedLine"),
      DrawView = require("squiggle/views/primitives/DrawView"),
      Line = require("squiggle/views/primitives/Line"),
      Path = require("squiggle/views/primitives/Path"),
      Rectangle = require("squiggle/views/primitives/Rectangle"),
      // screens
      Screen = require("squiggle/views/screens/Screen"),
      // cursors
      PencilCursor = require("squiggle/views/sprites/cursors/PencilCursor"),
      // text
      Letter = require("squiggle/views/text/Letter"),
      Word = require("squiggle/views/text/Word"),
      // ui
      Button = require("squiggle/views/ui/Button"),
      // Colors
      Colors = require("squiggle/Colors");

    return {
      models:{
        AppSettings : AppSettings,
        Animation : Animation,
        Frame : Frame,
        Line : LineModel
      },
      views:{
        animation:{
          BaseRender : BaseRender,
          AnimationRender : AnimationRender,
          FrameCapture : FrameCapture,
          FrameRender : FrameRender
        },
        primitives:{
          DashedLine : DashedLine,
          DrawView : DrawView,
          Line : Line,
          Path : Path,
          Rectangle : Rectangle
        },
        screens:{
          Screen : Screen
        },
        sprites:{
          cursors:{
            PencilCursor : PencilCursor
          }
        },
        text:{
          Letter :Letter,
          Word : Word
        },
        ui:{
          Button : Button
        }
      },
      Colors : Colors,
      utils:{
        MathUtils : MathUtils
      },
      screen : undefined,
      init : function(){
        var __this = this;
        var myp5 = new p5(
          function( sketch ) {
            // all other classes need a reference to the 'sketch' instance. For convenience, we store a global in AppSettings
            AppSettings.sketch = sketch;
            // currentScreen will hold a reference to a 'Screen' Object. Changing the currentScreen will change what is displayed on screen
            var currentScreen = null;
            sketch.preload = function(){
            };
            sketch.setup = function() {
              sketch.frameRate(30);
              sketch.createCanvas(sketch.displayWidth, sketch.displayHeight);
            };
            sketch.draw = function() {
              if(__this.screen !== undefined) __this.screen.draw();
            };
            sketch.mousePressed = function(){
              if(__this.screen !== undefined) __this.screen.mousePressed();
            };
            sketch.mouseReleased = function(){
              if(__this.screen !== undefined) __this.screen.mouseReleased();
            };
            sketch.mouseMoved = function(){
              if(__this.screen !== undefined) __this.screen.mouseMoved();
            },
            sketch.mouseDragged = function(){
              if(__this.screen !== undefined) __this.screen.mouseDragged();
            }
          }, 'sketch-div'
        );
      }
    }
});
