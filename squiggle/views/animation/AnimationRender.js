define(
  function(require, exports, module) {
    var BaseRender = require("squiggle/views/animation/BaseRender");
    var Line = require("squiggle/models/Line");
    var GIF = require("gif");
    /**
    * AnimationRender is a View that draws an Animation model.
    *
    * @see squiggle/views/animation/AnimationCapture
    * @property model {Animation} Animation model to render
    * @property frameDelay {Number} number of frames (p5 render frames) to wait to draw the next Frame
    * @exports squiggle/views/animation/AnimationRender
    */
    var AnimationRender = BaseRender.extend({
      /**
      * initializes the AnimationRender instance
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        BaseRender.prototype.initialize.apply(this, arguments);
        this.__currentFrameIndex = 0;
        this.__playing = false;
        this.__frameDelayCounter = 0;
        this.model = null;
        this.initProperties([
          {name:"frameDelay",value:1}
        ]);
      },
      /**
      * Plays the animation playback
      * 
      * @return void
      */
      play : function(){
        this.__playing = true;
        return this;
      },
      /**
      * Pauses the animation playback
      * 
      * @return void
      */
      pause : function(){
        this.__playing = false;
        return this;
      },
      /**
      * Stops the animation playback
      * 
      * @return void
      */
      stop : function(){
        this.__playing = false;
        this.__currentFrameIndex = 0;
        return this;
      },
      /**
      * Renders a given frame index
      *
      * @param {integer} index - The frame index to render 
      *
      * @inner
      * @return void
      */
      gotoFrame : function(index){
        if(this.model.models[index] != null){
          this.__drawFrame(this.model.models[index]);
        }else{
          console.log(this.getName() + ": gotoFrame() ERROR : frame "+index+ " does not exist.");
        }
        return this;
      },
      /**
      * Setter for the model property.
      *
      * @param ob {Animation} - The Animation to use as model
      * 
      * @returns {AnimationRender} A reference to this instance
      */
      setModel : function(ob){
        this.model = ob;
        return this;
      },
      /**
      * Exports an animated .gif an opens an new window with its contents and executes a callback when export is complete.
      *
      * @param callback {function} - A function to call when export is complete
      */
      export: function(callback){
        var gif = new window.GIF({
          "workerScript" : this.getWorkerScript()
        });
        for(index in this.model.models){
          var model = this.model.models[index];
          var imgData = this.__getImageData(model);
          gif.addFrame(imgData,{delay:125});
        }
        gif.on('finished', function(blob) {
          callback(blob);
        });
        gif.render();
      }
      /**
      * Draw routine for this View
      * @override
      */
      draw:function(){
        if(this.model == null) return;
        BaseRender.prototype.updateOffset.apply(this, arguments);
        BaseRender.prototype.draw.apply(this, arguments);
        this.gotoFrame(this.__currentFrameIndex);
        if(!this.__playing) return;
        this.__frameDelayCounter++;
        if(this.__frameDelayCounter >= this.frameDelay){
          this.__frameDelayCounter = 0;
          this.__currentFrameIndex++;
          if(this.__currentFrameIndex >= this.model.models.length){
            this.__currentFrameIndex = 0;
          }
        }
      }
    });
    return AnimationRender;
  }
);
