define(
  function(require, exports, module) {
    var BaseRender = require("squiggle/views/animation/BaseRender");
    /**
    * FrameRender is a View that draws a sinle frame of an animation
    * @property model {Frame} Frame model to render
    * @extends squiggle/views/animation/BaseRender
    * @see squiggle/views/animation/FrameCapture
    * @exports squiggle/views/animation/FrameRender
    */
    var FrameRender = BaseRender.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        BaseRender.prototype.initialize.apply(this, arguments);
        this.__lineInProgress = undefined;
      },
      /**
      * Sets the 'line in progress' being drawn by the user and that has not been added to the Frame's contents yet.
      *
      * @param line {Line} a Line instance with content that is being drawn but is not part of the Frame's contents yet.
      * 
      * @returns {FrameRender} A reference to this instance
      */
      setLineInProgress : function(line){
        this.__lineInProgress = line;
        return this;
      },
      /**
      * Setter for the model property.
      *
      * @param ob {Frame} - The Animation to use as model
      * 
      * @returns {FrameRender} A reference to this instance
      */
      setModel : function(ob){
        this.model = ob;
        return this;
      },
      /**
      * Draw code for this class.
      * @override
      * @return void
      */
      draw:function(){
        if(!this.model) return;
        var lines,line;
        BaseRender.prototype.updateOffset.apply(this, arguments);
        BaseRender.prototype.draw.apply(this, arguments);
        this.__drawFrame(this.model);
        if(this.__lineInProgress){
          this.sketch.noFill();
          this.sketch.beginShape();
          this.applyStrokeProperties(this.sketch, this.__lineInProgress.exportStrokeProperties());
          for(var pointIndex in this.__lineInProgress.get('points')){
            this.sketch.vertex(this.offsetX + this.x + this.__lineInProgress.get('points')[pointIndex][0], this.offsetY + this.y + this.__lineInProgress.get('points')[pointIndex][1]);
          }
          this.sketch.endShape();
        }
      },
      /**
      * Exports an animated .gif an opens an new window with its contents and executes a callback when export is complete.
      *
      * @param callback {function} - A function to call when export is complete
      */
      export: function(callback){
        var imgData = this.__getImageData(this.model);
        var gif = new window.GIF({
          "workerScript" : this.getWorkerScript()
        });
        gif.addFrame(imgData);
        gif.on('finished', function(blob) {
          callback(blob);
        });
        gif.render();
      }

    });
    return FrameRender;
  }
);
