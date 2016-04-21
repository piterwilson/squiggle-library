define(
  function(require, exports, module) {
    var Frame = require("squiggle/models/Frame");
    var Line = require("squiggle/models/Line");
    var Rectangle = require("squiggle/views/primitives/Rectangle");
    /**
    * The FrameCapture class is a View that captures mouse input and stores lines drawn by the user by pressing and dragging with the mouse.
    * The drawing is defined by 'lines' which are instances of the Line (model) class.
    * User in conjuction with the FrameRender class
    *
    * @property frameRender {FrameRender} - A FrameRender class to use in conjuction with this instance. A FrameCapture instance is useless without it.
    * 
    * @see squiggle/views/animation/FrameRender
    * @author Juan Carlos Ospina Gonzalez
    * @extends squiggle/views/primitives/Rectangle
    * @exports squiggle/views/animation/FrameCapture
    */
    var FrameCapture = Rectangle.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize : function(sketch){
        Rectangle.prototype.initialize.apply(this, arguments);
        this.model = new Frame();
        // A reference to the line being drawn by the user at a given point
        this.__lineInProgress = null;
        //
        // initialize some properties. See the View.initProperties()
        //
        // frameRender is a reference to a FrameRender class to use in conjuction with FrameCapture to show the lines being drawn
        // strokeWeight,strokeColor, strokeCap and strokeJoin" are the stroke properties used when creating new Lines.
        //
        this.initProperties([
          {name:"frameRender", value:null}
        ]);
        // this View is userInteractionEnabled
        this.setUserInteractionEnabled(true);
      },
      /**
      * Clears the drawn lines
      *
      * @return void
      */
      clear : function(){
        this.model.clear();
        return this;
      },
      /**
      * Public getter for thie lines Array in JSON format
      *
      * @return a JSON string representation of the lines array
      */
      toJSON : function (){
        return this.model.toJSON();
      },
      /**
      * Sets the 'active line' to be a new array where points will be pushed
      *
      * @return void
      */
      __startActiveLine : function(){
        this.__lineInProgress = new Line().set('strokeColor', this.strokeColor)
                                          .set('strokeWeight', this.strokeWeight)
                                          .set('strokeCap', this.strokeCap)
                                          .set('strokeJoin', this.strokeJoin);
      },
      /**
      * Returns an Array of positions with the line being currently drawn
      *
      * @return Array of x,y positions with the line being currently drawn
      */
      getLineInProgress : function(){
        return this.__lineInProgress;
      },
      /**
      * Pushes the 'active line' to the master lines array
      *
      * @return void
      */
      __endActiveLine : function(){
        if(this.__lineInProgress == null) return;
        if(this.__lineInProgress.get('points').length === 0){
          // if there are no lines drawn this is a POINT
          this.__addPointToActiveLine(this.__returnMousePositionWithoutOffset());
        }
        this.model.addLine(this.__lineInProgress);
        this.__lineInProgress = null;
      },
      /**
      * Adds a pair of x and y coordinates to the 'active line'
      *
      * @param {array} arr - Array where the first item is the x position and the second item is the y position
      *
      * @return void
      */
      __addPointToActiveLine : function(arr){
        this.__lineInProgress.addPoint(arr[0],arr[1]);
      },
      /**
      * If tehre is frameRender specified, set the its model and 'line in progress' (line being drawn)
      *
      * @see FrameRender
      *
      * @return void
      */
      draw:function(){
        if(this.frameRender != null){
          this.frameRender.setModel(this.model).setLineInProgress(this.__lineInProgress);
        }
      },
      /**
      * Helper function to determine if the Mouse is in bounds
      *
      * @return true if the mouse is in bounds, false otherwise
      */
      isMouseInBounds : function(){
        return this.isMouseOverRectangle(this.offsetX + this.x, this.offsetY + this.y, this.offsetX + this.x + this.width, this.offsetY + this.y + this.height);
      },
      /**
      * Calculates the raw mouse position relative to the 0,0 point inside the View.
      *
      * @return {array} Array with raw x and y positions relative to the 0,0 point inside the View.
      */
      __returnMousePositionWithoutOffset : function(){
        return [this.sketch.mouseX - this.offsetX - this.x, this.sketch.mouseY - this.offsetY - this.y];
      },
      /**
      * Code executed when the user moves the muose on screen. The View has to be included in the view hierarchy for this to be called.
      *
      * @return void
      */
      mouseMoved : function(){
        if(!this.isMouseInBounds()){
          if(this.__lineInProgress != null){
            this.__endActiveLine();
          }
        }
      },

      /**
      * Code executed when the user drags the mouse. The View has to be included in the view hierarchy for this to be called.
      *
      * @return void
      */
      mouseDragged : function(){
        if(this.isMouseInBounds()){
          if(this.__lineInProgress != null){
            this.__addPointToActiveLine(this.__returnMousePositionWithoutOffset());
          }else{
            this.__startActiveLine();
          }
        }else{
          if(this.__lineInProgress != null){
            this.__endActiveLine();
          }
        }
      },

      /**
      * Code executed when the user presses the mouse. The View has to be included in the view hierarchy for this to be called.
      *
      * @return void
      */
      mousePressed : function(){
        if(this.isMouseInBounds()){
          this.__startActiveLine();
        }
      },
      /**
      * Code executed when the user releases the mouse. The View has to be included in the view hierarchy for this to be called.
      *
      * @return void
      */
      mouseReleased : function(){
        if(this.__lineInProgress != null){
          this.__endActiveLine();
        }
      }
    });
    return FrameCapture;
  }
);
