/*global define */

define(function (require) {
    'use strict';
    // bsae p5
    var p5 = require("p5"),
    // Models
      AppSettings = require("squiggle/models/AppSettings"),
      Animation = require("squiggle/models/Animation"),
      Frame = require("squiggle/models/Frame"),
      Line = require("squiggle/models/Line"),
      // utils
      MathUtils = require("squiggle/utils/MathUtils"),
      // Views
      View = require("squiggle/views/View"),
      // animations
      BaseRender = require("squiggle/views/animation/AnimationRender"),
      AnimationRender = require("squiggle/views/animation/AnimationRender"),
      FrameCapture = require("squiggle/views/animation/FrameCapture"),
      FrameRender = require("squiggle/views/animation/FrameRender"),
      // primitives
      DashedLine = require("squiggle/views/primitives/DashedLine"),
      DrawView = require("squiggle/views/primitives/DrawView"),
      Path = require("squiggle/views/primitives/Path"),
      Rectangle = require("squiggle/views/primitives/Rectangle"),
      // screens
      Screen = require("squiggle/views/screens/Screen"),
      // cursors
      PencilCursor = require("squiggle/views/sprites/cursors/PencilCursor"),
      // text
      Letter = require("squiggle/views/text/Letter"),
      Word = require("squiggle/views/text/Word"),
      BluePrints = require("squiggle/views/text/BluePrints"),
      // ui
      Button = require("squiggle/views/ui/Button")
      
    return {
      /**
      * Main module object
      * @property screen {Screen} The Screen that is drawn on screen.
      * @property version {Number} The version of the module
      * @property sketch {Object} p5 sketch instance
      * @exports squiggle
      */
      models:{
        AppSettings : AppSettings,
        Animation : Animation,
        Frame : Frame,
        Line : Line
      },
      views:{
        View : View,
        animation:{
          BaseRender : BaseRender,
          AnimationRender : AnimationRender,
          FrameCapture : FrameCapture,
          FrameRender : FrameRender
        },
        primitives:{
          DashedLine : DashedLine,
          DrawView : DrawView,
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
          Word : Word,
          BluePrints : BluePrints
        },
        ui:{
          Button : Button
        }
      },
      utils:{
        MathUtils : MathUtils
      },
      version : "1.1.4",
      // the active screen that gets rendered on screen by p5
      screen : undefined,
      // p5 instance
      sketch : undefined,
      /**
      * Injects a value into the squiggle environment
      */
      injectValue : function(key, val){
        if(this.screen !== undefined) this.screen.onValueInjected(key,val);
      },
      /**
      * initializes the module and starts the p5 instance drawing
      */
      init : function(){
        var __this = this;
        var myp5 = new p5(
          function( sketch ) {
            // all other classes need a reference to the 'sketch' instance. For convenience, we store a global in AppSettings
            AppSettings.sketch = sketch;
            __this.sketch = sketch;
            sketch.setup = function() {
              sketch.frameRate(30);
              sketch.createCanvas(window.innerWidth, window.innerHeight);
            };
            sketch.draw = function() {
              if(__this.screen !== undefined) __this.screen.__draw(arguments);
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
            },
            sketch.keyPressed = function(){
              if(__this.screen !== undefined) __this.screen.keyPressed();
            },
            sketch.keyTyped = function(){
              if(__this.screen !== undefined) __this.screen.keyTyped();
            }
          }, 'sketch-div'
        );
      }
    }
});