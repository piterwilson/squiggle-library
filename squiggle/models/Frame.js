define(
  function(require, exports, module) {
    var __Backbone  = require("backbone");
    var Frame = __Backbone.Model.extend({
      initialize: function() {
        this.set('lines',[]);
      },
      addLine: function(line){
        this.get('lines').push(line);
        this.trigger('change');
      },
      clear : function (){
        this.set('lines',[]);
        this.trigger('change');
      }
    });
    return Frame;
  }
);
