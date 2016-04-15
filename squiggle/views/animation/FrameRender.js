define(
  function(require, exports, module) {
    var BaseRender = require("squiggle/views/animation/BaseRender");
    var Colors = require("squiggle/Colors");
    var GIF = require("gif");
    /**
    * FrameRender is a View that draws a sinle frmae of an animation. The drawing is defined by 'lines' which are arrays of x and y positions.
    */
    var FrameRender = BaseRender.extend({
      initialize: function(sketch) {
        BaseRender.prototype.initialize.apply(this, arguments);
        this.__lineInProgress = [];
      },

      setLineInProgress : function(arr){
        this.__lineInProgress = arr;
        return this;
      },

      setModel : function(ob){
        this.model = ob;
        return this;
      },
      /**
      * Draw code for this class.
      *
      * @return void
      */
      draw:function(){
        var lines,line;
        BaseRender.prototype.draw.apply(this, arguments);
        this.__drawFrame(this.model);

        if(this.__lineInProgress != null){
          this.sketch.noFill();
          this.sketch.beginShape();
          this.applyStrokeProperties(this.sketch, this.__lineInProgress.exportStrokeProperties());
          for(var pointIndex in this.__lineInProgress.get('points')){
            this.sketch.vertex(this.offsetX + this.x + this.__lineInProgress.get('points')[pointIndex][0], this.offsetY + this.y + this.__lineInProgress.get('points')[pointIndex][1]);
          }
          this.sketch.endShape();
        }
      },
      export: function(){
        var imgData = this.__getImageData(this.model);
        var gif = new window.GIF();
        gif.addFrame(imgData);
        gif.on('finished', function(blob) {
          console.log('finished!');
          window.open(URL.createObjectURL(blob));
        });
        gif.render();
      }

    });
    return FrameRender;
  }
);
