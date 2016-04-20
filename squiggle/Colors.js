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
    * Light grey color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
    */
      lightGrey : {
        red: 200,
        green:200,
        blue:200,
        alpha:255
      },
      /**
      * Pure green color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      green:{
        red:0,
        green:255,
        blue:0,
        alpha:255
      },
      /**
      * Pure blue color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      blue:{
        red:0,
        green:0,
        blue:255,
        alpha:255
      },
      /**
      * White color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      white : {
        red: 255,
        green:255,
        blue:255,
        alpha:255
      },
      /**
      * Black color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      black : {
        red: 0,
        green:0,
        blue:0,
        alpha:255
      },
      /**
      * Pure red color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      red:{
        red: 255,
        green:0,
        blue:0,
        alpha:255
      },
      /**
      * Helper function to convert a rgba CSS encoded string into an Object of the form {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      * @param {string} colorString -  rgba CSS encoded string
      * @return {Object} color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      rgbaStringToObject : function(colorString){
        var colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
        return {
          red : colorsOnly[0],
          green : colorsOnly[1],
          blue : colorsOnly[2],
          alpha : colorsOnly[3]
        };
      },
      /**
      * Calls the randomColor librarie's randomColor() and translates the result to the format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      * @see {@link https://randomcolor.llllll.li/}
      * @return {Object} color in format {red:0-255,green:0-255,blue:0-255,alpha:0-255}
      */
      randomColor : function(){
        var arg;
        if(arguments[0] != undefined){
          arg = arguments[0];
          arg.format = 'rgba';
        }else{
          arg = {format: 'rgba'};
        }
        // http://stackoverflow.com/questions/12355212/how-can-i-get-the-red-green-and-blue-values-from-an-rgb-rgba-string
        var ret = randomColor(arg);
        if(ret.constructor === Array){
          var colors = [];
          for(var i = 0; i < ret.length; i++){
            colors.push(Colors.rgbaStringToObject(ret[i]));
          }
          return colors;
        }else{
          return Colors.rgbaStringToObject(ret);
        }
      }
    }
    return Colors;
  }
);
