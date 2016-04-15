/**
* Colors.js
*
* by Juan Carlos Ospina Gonzalez
* Amsterdam, 2016
*
* Helper class where some basic colors are defined. Additionally a wrapper around the 'randomColor' library (https://randomcolor.llllll.li/) is included.
*/
define(
  function(require, exports, module) {
    // https://randomcolor.llllll.li/
    var randomColor = require("randomColor");
    var Colors = {
      lightGrey : {
        red: 200,
        green:200,
        blue:200,
        alpha:255
      },
      green:{
        red:0,
        green:255,
        blue:0,
        alpha:255
      },
      blue:{
        red:0,
        green:0,
        blue:255,
        alpha:255
      },
      white : {
        red: 255,
        green:255,
        blue:255,
        alpha:255
      },
      black : {
        red: 0,
        green:0,
        blue:0,
        alpha:255
      },
      red:{
        red: 255,
        green:0,
        blue:0,
        alpha:255
      },
      rgbaStringToObject : function(colorString){
        var colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
        return {
          red : colorsOnly[0],
          green : colorsOnly[1],
          blue : colorsOnly[2],
          alpha : colorsOnly[3]
        };
      },
      randomColor : function(){
        if(arguments[0] != undefined){
          arguments[0].format = 'rgba';
        }else{
          arguments = [{format: 'rgba'}];
        }
        // http://stackoverflow.com/questions/12355212/how-can-i-get-the-red-green-and-blue-values-from-an-rgb-rgba-string
        var ret = randomColor(arguments[0]);
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
