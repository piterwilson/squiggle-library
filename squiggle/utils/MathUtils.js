define(
  function(require, exports, module) {
    /**
    * MathUtils is an Object to contain Math related utility functions
    *
    * @exports squiggle/utils/MathUtils 
    */
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
