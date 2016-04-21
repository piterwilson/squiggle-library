define(
  function(require, exports, module) {
    var Frame = require("squiggle/models/Frame");
    var DrawView = require("squiggle/views/primitives/DrawView");
    var AppSettings = require("squiggle/models/AppSettings")
    /**
    * BaseRender is the base class for AnimationRender and FrameRender
    * @abstract
    * @extends squiggle/views/DrawView
    * @property width {Number} Width in pixels of the BaseRender Object
    * @property height {Number} Height in pixels of the BaseRender Object
    * @exports squiggle/views/animation/BaseRender
    */
    var BaseRender = DrawView.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        DrawView.prototype.initialize.apply(this, arguments);
        this.strokeColor = AppSettings.defaultStrokeColor;
        this.strokeWeight = AppSettings.defaultStrokeWeight;
        this.initProperties([
          {name:'width',value:0},
          {name:'height',value:0},
          {name:'workerScript', value:'gif.worker.js'}
        ]);
      },
      /**
      * Draws a Frame on a separate canvas (using p5) and returns its ImageData object
      *
      * @param frame Frame instance to draw
      *
      * @return ImageData object with the given Frame drawn on it
      */
      __getImageData : function(frame){
        var canvas, ctx, p5renderer, lines;
        p5renderer = this.sketch.createGraphics(this.width, this.height);
        p5renderer.background(255);
        this.__drawFrame(frame, p5renderer, false);
        canvas = p5renderer.elt;
        ctx = canvas.getContext("2d");
        return ctx.getImageData(
          0,
          0,
          this.width,
          this.height
        );
      },
      /**
      * Modular function to draw a drame in a p5renderer
      *
      * @param frame The Frame instance to draw
      * @param p5renderer (optional) The p5renderer to use, defaults to this.sketch
      * @param includeOffset (optional) Whether or not to include the offsetX and offsetY properties in the drawing. Defaults to true
      *
      * @return void
      */
      __drawFrame : function(frame, p5renderer, includeOffset){
        var lines,line, offsetX = 0, offsetY = 0;
        if(p5renderer === undefined){
          p5renderer = this.sketch;
        }
        if(includeOffset === undefined){
          includeOffset = true;
          offsetX = this.offsetX + this.x;
          offsetY = this.offsetY + this.y;
        }
        if (frame === undefined) throw this.constructor.name+" ("+this.cid+") no Model set."
        lines = frame.get('lines');
        p5renderer.noFill();
        for(var lineindex in lines) {
          line = lines[lineindex];
          this.applyStrokeProperties(p5renderer, line.exportStrokeProperties());
          p5renderer.beginShape();
          for(var pointIndex in line.get('points')){
            p5renderer.vertex(offsetX + lines[lineindex].get('points')[pointIndex][0], offsetY + lines[lineindex].get('points')[pointIndex][1]);
          }
          p5renderer.endShape();
        }
      }
    });
    return BaseRender;
  }
);
