define(
  function(require, exports, module) {
    var __Backbone  = require("backbone");
    var Colors = require("squiggle/Colors");
    var AppSettings = require("squiggle/models/AppSettings");
    var Line = __Backbone.Model.extend({
      initialize: function() {
        var sketch = AppSettings.sketch;
        this.set('strokeColor', Colors.black)
            .set('strokeWeight', 2)
            .set('points',[]);
        if(sketch !== undefined){
          this.set('strokeCap',sketch.SQUARE)
              .set('strokeJoin',sketch.MITER)
        }
      },
      addPoint: function(x,y){
        this.get('points').push([x,y]);
        this.trigger('change');
      },
      clear : function (){
        this.set('points',[])
            .trigger('change');
      },
      exportStrokeProperties : function(){
        ob = {
          strokeColor   : this.get('strokeColor'),
          strokeWeight  : this.get('strokeWeight'),
          strokeCap     : this.get('strokeCap'),
          strokeJoin    : this.get('strokeJoin')
        }
        return ob;
      }
    });
    return Line;
  }
);
