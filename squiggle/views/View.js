/**
* View.js
*
* by Juan Carlos Ospina Gonzalez
* Amsterdam, 2016
*
* Base class for all View's. The View class extends backbone's View class and defines basic core methods and properties.
*/
define(
  function(require, exports, module) {
    var Backbone  = require("backbone");
    var AppSettings = require("squiggle/models/AppSettings");
    var View = Backbone.View.extend({
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
        // userInteractionEnabled is a flag to indicate if calls to interactive (p5) methods should be tried on this View by its parent. (p5 interactive function are functions like mousePressed() etc...)
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
      * Function that defines a setter and getter function for a given property name.
      *
      * @param {array} values - An Array of Object. Each object should contain a "name" and a "value" properties.
      *
      * @see createSetter, createGetter
      *
      * @returns void
      */
      initProperties : function(values){
        for(var i = 0; i < values.length; i++){
          if(values[i].name === undefined || values[i].value === undefined) throw new Error("initProperties() parameters require an Object with properties 'name' and 'value'");
          this.createGetter(values[i].name);
          this.createSetter(values[i].name);
          this['set'+(values[i].name.charAt(0).toUpperCase() + values[i].name.slice(1))].call(this,values[i].value);
        }
      },
      /**
      * Function that creates a setter given a property name. The setter is a function of the form 'set'+<propName> and returns the class instance so that this setters are 'chainable'.
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
      * Function that creates a getter given a property name. The getter is a function of the form 'get'+<propName>.
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
      * @param {Object} subview - An Object to define as child view (subview) of this View
      *
      * @see draw
      *
      * @returns {Object} the View instance.
      */
      addSubview : function(subview){
        if(subview.parent != null){
          subview.parent.removeSubview(subview);
        }
        this.subviews.push(subview);
        subview.parent = this;
        return this;
      },
      /**
      * Removes a subview from the View. Opposite of addSubview()
      *
      * @param {Object} subview - An Object to remove as a subview
      *
      * @returns {Object} the View instance.
      */
      removeSubview : function(subview){
        for(var index in this.subviews) {
          if(this.subviews[index] === subview){
            subview.parent = null;
            this.subviews.splice(index,1);
            break;
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
        for(var index in this.subviews) {
          this.subviews[index].parent = null;
        }
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
        // don't draw if hidden
        if(this.hidden) return;
        for(var index in this.subviews) {
          this.subviews[index].draw([this.x + this.offsetX, this.y + this.offsetY]);
        }
      },
      /**
      * Used to calculate the offset x and y positions to add to the View's x and y positions and store them in the offsetX and offsetY properties. This function is not called in the base View draw() implementation.
      *
      * @param {array} arguments - An array that contains x and y position offsets
      *
      * @returns void
      */
      updateOffset: function(arguments){
        if(arguments[0] != null){
          this.offsetX = arguments[0];
          this.offsetY = arguments[1];
        }
      }
    });
    return View;
  }
);
