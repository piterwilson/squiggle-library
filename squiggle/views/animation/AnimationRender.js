define(
  function(require, exports, module) {
    var BaseRender = require("squiggle/views/animation/BaseRender");
    var Colors = require("squiggle/Colors");
    var Line = require("squiggle/models/Line");
    var GIF = require("gif");
    /**
    * AnimationRender is a View that draws an Animation. The Animation is defined as a colleciton of Frame and each is defined by 'lines' which are arrays of x and y positions.
    */
    var AnimationRender = BaseRender.extend({
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
      play : function(){
        this.__playing = true;
        return this;
      },
      pause : function(){
        this.__playing = false;
        return this;
      },
      stop : function(){
        this.__playing = false;
        this.__currentFrameIndex = 0;
        return this;
      },
      gotoFrame : function(index){
        if(this.model.models[index] != null){
          this.__drawFrame(this.model.models[index]);
        }else{
          console.log(this.getName() + ": gotoFrame() ERROR : frame "+index+ " does not exist.");
        }
        return this;
      },
      setModel : function(ob){
        this.model = ob;
        return this;
      },
      export: function(){
        var gif = new window.GIF({
          "gifWorkerScript" : this.getGifWorkerScript()
        });
        for(index in this.model.models){
          var model = this.model.models[index];
          var imgData = this.__getImageData(model);
          gif.addFrame(imgData,{delay:125});
        }
        gif.on('finished', function(blob) {
          console.log('finished!');
          window.open(URL.createObjectURL(blob));
        });
        gif.render();
      },
      draw:function(){
        BaseRender.prototype.draw.apply(this, arguments);
        if(this.model == null) return;
        this.gotoFrame(this.__currentFrameIndex);
        if(!this.__playing) return;
        this.__frameDelayCounter++;
        if(this.__frameDelayCounter > this.frameDelay){
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
