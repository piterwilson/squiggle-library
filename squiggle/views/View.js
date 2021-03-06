define(
  function(require, exports, module) {
    var Backbone  = require("backbone");
    var _ = require("underscore");
    var AppSettings = require("squiggle/models/AppSettings");
    /**
    * <p>A View class represents anything that will be rendered on screen.</p>
    *
    * @property x {Number} - The x position of the View
    * @property y {Number} - The y position of the View
    * @property offsetX {Number} - A value that is meant to contain the x position of the parent of the View
    * @property offsetY {Number} - A value that is meant to contain the y position of the parent of the View
    * @property hidden {Boolean} - Whether or not to draw the view on screen
    * @property userInteractionEnabled {Boolean} - Whether or not the View should be checked for p5.js interactive function calls (mouseMoved(), mousePressed() etc...)
    * @extends Backbone.View
    * @exports squiggle/views/View
    */
    var View = Backbone.View.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        // Find a reference to the sketch (p5.js) Object
        if(sketch === null || sketch === undefined){
          this.sketch = AppSettings.sketch;
        }else{
          this.sketch = sketch;
        }
        if(this.sketch === undefined){
          throw new Error("no sketch defined");
        }
        // setup an Array to hold subviews of this View
        this.subviews = [];
        // setup a reference to a parent View
        this.parent = null;
        // set debug to true or false to see console output via the log() function on this View instance
        this.debug = false;
        //
        // initialize some properties. See the initProperties() function defined bellow
        //
        // x and y are the coordinates of the View
        // offsetX and offsetY are used to offset the view with the x and y of its parent (if present)
        // hidden is used to hide the view (turn off/pn drawing)
        // userInteractionEnabled is a flag to indicate if calls to interactive (p5) methods should be tried on this View by its parent Screen. (p5 interactive function are functions like mousePressed() etc...)
        //
        this.initProperties([
          {name:'x',value:0},
          {name:'y',value:0},
          {name:'offsetX', value:0},
          {name:'offsetY', value:0},
          {name:'hidden', value:false},
          {name:'userInteractionEnabled', value:false}
        ]);
      },
      /**
      * Called when the browser window is resized
      */
      windowResized : function(){
        for(var index in this.subviews) {
          var child = this.subviews[index];
          if(child.windowResized){
            child.windowResized.call(this.subviews[index])
          }
        }
      },
      /**
      * Outputs a message to the console when debug is set to true.
      *
      * @param {string} message to output to the console
      *
      * @returns void
      */
      log:function(message){
        if(this.debug){
          console.log(this.constructor.name+" ("+this.cid+") "+message);
        }
      },
      /**
      * Function determine if the mouse is over the the rectangle area defined by a given set of coordinates.
      *
      * @param {number} x1 - x position of the top left corner position of the rectangle area
      * @param {number} y1 - y position of the top left corner position of the rectangle area
      * @param {number} x2 - x position of the bottom right corner position of the rectangle area
      * @param {number} y2 - y position of the bottom right corner position of the rectangle area
      *
      * @returns {boolean} true if the mouse is over the rectangle area, false otherwise
      */
      isMouseOverRectangle : function(x1,y1,x2,y2){
        return (
          this.sketch.mouseX > x1 &&
          this.sketch.mouseX < x2 &&
          this.sketch.mouseY > y1 &&
          this.sketch.mouseY < y2
         )
      },
      /**
      * Function determine if touch is over the the rectangle area defined by a given set of coordinates.
      *
      * @param {number} x1 - x position of the top left corner position of the rectangle area
      * @param {number} y1 - y position of the top left corner position of the rectangle area
      * @param {number} x2 - x position of the bottom right corner position of the rectangle area
      * @param {number} y2 - y position of the bottom right corner position of the rectangle area
      *
      * @returns {boolean} true if touch is over the rectangle area, false otherwise
      */
      isTouchOverRectangle: function(x1,y1,x2,y2){
        return (
          this.sketch.touchX > x1 &&
          this.sketch.touchX < x2 &&
          this.sketch.touchY > y1 &&
          this.sketch.touchY < y2
         )
      },
      /**
      * Function that defines a setter and getter function for a given property name.
      *
      * @param {array} values - An Array of Object. Each object should contain a "name" and a "value" properties.
      *
      * @see createSetter, createGetter
      *
      * @returns void
      */
      initProperties : function(values){
        _.each(values,function(prop){
          if(!prop.name || prop.value === undefined) throw new Error("initProperties() parameters require an Object with properties 'name' and 'value'");
          this.createGetter(prop.name);
          this.createSetter(prop.name);
          this['set'+(prop.name.charAt(0).toUpperCase() + prop.name.slice(1))].call(this,prop.value);
        }.bind(this));
      },
      /**
      * Function that creates a setter given a property name. The setter is a function of the form 'set'+ propName and returns the class instance so that this setters are 'chainable'.
      *
      * @param {string} propName - The name of the property to generate a setter for
      *
      * @returns void
      */
      createSetter : function (propName){
        this['set'+(propName.charAt(0).toUpperCase() + propName.slice(1))] = function(value){
          this[propName] = value;
          return this;
        };
      },
      /**
      * Function that creates a getter given a property name. The getter is a function of the form 'get'+ propName.
      *
      * @param {string} propName - The name of the property to generate a getter for
      *
      * @returns void
      */
      createGetter : function (propName){
        this['get'+(propName.charAt(0).toUpperCase() + propName.slice(1))] = function(){
          return this[propName];
        };
      },
      /**
      * Shorthand Function for set(x).set(y)
      *
      * @param {number} x - New x position for the View
      * @param {number} y - New y position for the View
      *
      * @returns {Object} the View instance.
      */
      setPosition:function(x,y){
        return this.setX(x).setY(y);
      },
      /**
      * Adds a subview to the View. Child View's are taken into account in the draw() method.
      *
      * @param {Array} subviews - An Array containing the View's to add
      *
      * @see draw
      *
      * @returns {Object} the View instance.
      */
      addSubview : function(){
        var subview;
        for (i = 0; i < arguments.length; i++) {
          subview = arguments[i];
          if(_.has(subview, 'parent')){
            if(subview.parent) subview.parent.removeSubview(subview);
            subview.parent = this;
            this.subviews.push(subview);
          }else{
            console.log("Warning : "+subview+ " has no parent?");
          }
        }
        return this;
      },
      /**
      * Removes a subview from the View. Opposite of addSubview()
      *
      * @param {Array} subviews - An Array containing the View's to remove
      *
      * @returns {Object} the View instance.
      */
      removeSubview : function(){
        var subview;
        for (i = 0; i < arguments.length; i++) {
          subview = arguments[i];
          for(var index in this.subviews) {
            if(this.subviews[index] === subview){
              subview.parent = null;
              this.subviews.splice(index,1);
              continue;
            }
          }
        }
        return this;
      },
      /**
      * Shorthand to remove all subviews in the View
      *
      * @returns {Object} the View instance.
      */
      removeAllSubviews : function(){
        _.each(this.subviews, function(subview){
          subview.parent = undefined;
        });
        this.subviews = [];
        return this;
      },
      /**
      * This function is called by p5 to render the View on screen. Each View will additionally call draw() on its child View's. When calling draw() on the children View's we pass the x and y position of this View in addition to the x and y of the parent View (if present) using offsetX and offsetY
      *
      * @see updateOffset
      *
      * @returns void
      */
      draw : function(){
        if(this.hidden) return;
        _.each(this.subviews, function(subview){
          subview.draw([this.x + this.offsetX, this.y + this.offsetY]);
        }.bind(this));
      },
      /**
      * Used to calculate the offset x and y positions to add to the View's x and y positions and store them in the offsetX and offsetY properties. This function is not called in the base View draw() implementation.
      *
      * @returns void
      */
      updateOffset: function(args){
        if(args[0] != undefined){
          this.offsetX = args[0];
          this.offsetY = args[1];
        }
      },
      /**
      * Given a method name, it will cycle the children subviews and call that method if the child has its userInteractionEnabled proeprty set to true.
      * @param {String} methodName Name of the method to call on the child
      */
      __callonSubviewsIfUIE : function (methodName){
        _.each(this.subviews, function(child){
          if(child.userInteractionEnabled){
            if(typeof(child[methodName]) === "function"){
              child[methodName].call(child)
            }
          }
        });
      },
      /**
      * Called when the mouse has moved. It is called by p5renderer.mouseMoved()
      * @see {@link http://p5js.org/reference/#/p5/mouseMoved}
      */
      mouseMoved : function(){
        this.__callonSubviewsIfUIE('mouseMoved');
      },
      /**
      * Called when the mouse was dragged. It is called by p5renderer.mouseDragged()
      * @see {@link http://p5js.org/reference/#/p5/mouseDragged}
      */
      mouseDragged : function(){
        this.__callonSubviewsIfUIE('mouseDragged');
      },
      /**
      * Called when the mouse was pressed. It is called by p5renderer.mousePressed()
      * @see {@link http://p5js.org/reference/#/p5/mousePressed}
      */
      mousePressed : function(){
        this.__callonSubviewsIfUIE('mousePressed');
      },
      /**
      * Called when the mouse was released. It is called by p5renderer.mouseReleased()
      * @see {@link http://p5js.org/reference/#/p5/mouseReleased}
      */
      mouseReleased : function(){
        this.__callonSubviewsIfUIE('mouseReleased');
      },
      /**
      * Called when a touch event has started. It is called by p5renderer.touchStarted()
      * @see {@link http://p5js.org/reference/#/p5/touchStarted}
      */
      touchStarted : function(){
        this.__callonSubviewsIfUIE('touchStarted');
      },
      /**
      * Called every time a touch move is registered It is called by p5renderer.touchStarted()
      * @see {@link http://p5js.org/reference/#/p5/touchMoved}
      */
      touchMoved : function(){
        this.__callonSubviewsIfUIE('touchMoved');
      },
      /**
      * Called when a touch event has started. It is called by p5renderer.touchEnded()
      * @see {@link http://p5js.org/reference/#/p5/touchEnded}
      */
      touchEnded : function(){
        this.__callonSubviewsIfUIE('touchEnded');
      },
    });
    return View;
  }
);
