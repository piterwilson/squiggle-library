define(
  function(require, exports, module) {
    var MathUtils = {
      /**
      * Returns 1 or -1 at random
      *
      * @return 1 or -1 at random
      */
      coinToss:function(){
        return Math.random() * 1 > 0.5 ? 1 : -1;
      }
    }
    return MathUtils;
  }
);
