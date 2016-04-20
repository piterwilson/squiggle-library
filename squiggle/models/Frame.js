define(
  function(require, exports, module) {
    var __Backbone  = require("backbone");
    /**
    * Frame is a model to encapsulate the idea of a single frame of animation
    *
    * @property lines {Array} - Array of Line instances
    * @extends Backbone.Model
    * @exports squiggle/models/Frame
    */
    var Frame = __Backbone.Model.extend({
      /**
      * Initializes the Frame instance by creating an Array of Line models
      */
      initialize: function() {
        this.set('lines',[]);
      },
      /**
      * Adds a Line model to the models property
      *
      * @see squiggle/models/Line
      * @param {Line} line - A Line instance to add
      */
      addLine: function(line){
        this.get('lines').push(line);
        this.trigger('change');
      },
      /**
      * Clears the internal Line's array
      */
      clear : function (){
        this.set('lines',[]);
        this.trigger('change');
      }
    });
    return Frame;
  }
);
