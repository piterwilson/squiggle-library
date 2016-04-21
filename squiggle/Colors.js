define(
  function(require, exports, module) {
    // https://randomcolor.llllll.li/
    var randomColor = require("randomColor");
    /**
    * Helper class where some basic colors are defined. Additionally a wrapper around the 'randomColor' library (https://randomcolor.llllll.li/) is included.
    * @exports squiggle/Colors
    */
    var Colors = {
      /**
      * Transparent color as a CSS rgba string
      */
      transparent : "rgba(0,0,0,0.0)",
    /**
    * Light grey color as a CSS rgba string
    */
      lightGrey : "rgba(200,200,200,1.0)",
      /**
      * Pure green color as a CSS rgba string
      */
      green:"rgba(0,255,0,1.0)",
      /**
      * Pure blue color as a CSS rgba string
      */
      blue:"rgba(0,0,255,1.0)",
      /**
      * White color as a CSS rgba string
      */
      white : "rgba(255,255,255,1.0)",
      /**
      * Black color as a CSS rgba string
      */
      black : "rgba(0,0,0,1.0)",
      /**
      * Pure red color as a CSS rgba string
      */
      red:"rgba(255,0,0,1.0)",
      /**
      * Calls the randomColor librarie's randomColor() and translates the result to the format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      * @see {@link https://randomcolor.llllll.li/}
      * @return {string} color as a CSS rgba string
      */
      randomColor : function(){
        var arg;
        if(arguments[0] != undefined){
          arg = arguments[0];
          arg.format = "rgba";
        }else{
          arg = {format: "rgba"};
        }
        // http://stackoverflow.com/questions/12355212/how-can-i-get-the-red-green-and-blue-values-from-an-rgb-rgba-string
        return randomColor(arg);
      }
    }
    return Colors;
  }
);
