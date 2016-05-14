define(
  function(require, exports, module) {
    var View = require("squiggle/views/View");
    /**
    * DrawView is the base class for all View's that have 'drawable' properties
    * @property strokeWeight {Number} - The stroke weight to use when drawing.
    * @property strokeColor {String} -  The stroke color to use then drawing as a CSS rgba string
    * @property strokeCap {Number} - The stroke cap style to use when drawing.
    * @property strokeJoin {Number} - The stroke join style to use when drawing.
    * @property fill {Boolean} - Whether or not to fill when drawing.
    * @property fillColor {String} - The color to use when 'filling' as a CSS rgba string
    * @property closed {Boolean} - Whether or not the Object is 'closed' (ie. a path can be open or closed)
    * @property jerkiness {Number} - The amount of randomness applied when drawing (default 0.5)
    * @property defaultJerkinessBump {Number} - jerkiness value that is set in the jerkIt() effect if no value is provided
    * @property defaultJerkinessBumpIncrease {Number} - amount that gets added/substracted from the jerkiness on each draw() step after jerkIt() has been called
    * @extends squiggle/views/View
    * @exports squiggle/views/primitives/DrawView
    */
    var DrawView = View.extend({
      /**
      * Designated initializer
      *
      * @param {Object} sketch - Reference to the p5.js sketch
      */
      initialize: function(sketch) {
        View.prototype.initialize.apply(this, arguments);
        this.initProperties([
          {name:'strokeColor',value:'rgba(0,0,0,1.0)'},
          {name:'strokeWeight',value:4},
          {name:'strokeCap', value:this.sketch.SQUARE},
          {name:'strokeJoin', value:this.sketch.MITER},
          {name:"fill", value:true},
          {name:"closed", value:true},
          {name:"defaultJerkinessBump", value:10},
          {name:"defaultJerkinessBumpIncrease", value:1},
          {name:"fillColor", value:"rgba(255,0,0,1.0)"}
        ]);
        this.__jerkItCallback = undefined;
        this.jerkiness = 0.5;
        this.setJerkiness(0.5);
      },
      /**
      * Applies stroke properties to the p5renderer Object specified in the parameters
      * 
      * @param p5Renderer {Object} - (optional) The p5 renderer instance. If not specified defaults to this.sketch
      * @param object {Object} - (optional) The object to take the properties from. If not specified defaults to this.
      */
      applyStrokeProperties: function(p5renderer, object){
        if(p5renderer === undefined){
          p5renderer = this.sketch;
        }
        if(object === undefined){
          object = this;
        }
        if(object.strokeCap !== undefined) p5renderer.strokeCap(object.strokeCap);
        if(object.strokeJoin !== undefined) p5renderer.strokeJoin(object.strokeJoin);
        p5renderer.strokeWeight(object.strokeWeight);
        p5renderer.stroke(object.strokeColor);
        return this;
      },
    
      setJerkiness : function(value){
        this.jerkiness = value;
        this.originalJerkiness = value;
        return this;
      },
      
      getJerkiness : function(){
        return this.jerkiness;
      },
      
      /**
      * jerkIt visual effect.
      * It will 'jiggle' the view by animating its jerkiness. Optionally it will perform a callback when complete
      *
      * @param options {Object} (optional) contains the options for the jerkIt effect. 'amount' will determine the amount to 'jerk' the view for. 'complete' specified a callback to execute when the 'jerk' is complete 
      */
      jerkIt : function(options){
        var v;
        if(options === undefined){
          v = this.defaultJerkinessBump
        }else{
          options.amount === undefined ? v = this.defaultJerkinessBump : v = options.amount;
          if (options.complete !== undefined && typeof options.complete === 'function') this.__jerkItCallback = options.complete;
        }
        this.jerkiness = v;
        for(var index in this.subviews) {
          var o = (options !== undefined && options.amount && options.complete) ? {amount : options.amount} : undefined;
          if(this.subviews[index]['jerkIt']) this.subviews[index].jerkIt(o);
        }
      },
      
      __updateJerkiness : function(){
        if(this.jerkiness != 0){
          if(this.jerkiness != this.originalJerkiness){
            if(this.originalJerkiness < this.jerkiness){
              this.jerkiness -= this.defaultJerkinessBumpIncrease;
              if(this.jerkiness < this.originalJerkiness) this.jerkiness = this.originalJerkiness;
            }else{
              this.jerkiness += this.defaultJerkinessBumpIncrease;
              if(this.jerkiness > this.originalJerkiness) this.jerkiness = this.originalJerkiness;
            }
          }else{
            if(this.__jerkItCallback !== undefined){
              this.__jerkItCallback();
              this.__jerkItCallback = undefined;
            }
          }
        }
      },
      
      draw : function(){
        this.__updateJerkiness();
        View.prototype.draw.apply(this,arguments);
      }
      
    });
    return DrawView;
  }
);
