define(
  function(require, exports, module) {
    var MathUtils = {
      oneOrMinusOne:function(){
        return Math.random() * 1 > 0.5 ? 1 : -1;
      }
    }
    return MathUtils;
  }
);
