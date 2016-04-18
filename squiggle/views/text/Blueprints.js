/**
* BluePrints.js
*
* by Juan Carlos Ospina Gonzalez
* Amsterdam, 2016
*
* This class defines 'blueprints' to draw Letter instances. The blueprint is defined as points in a grid that define the lines that make the Letter.
*/
define(
  function(require, exports, module) {
    var BluePrints = {
      // based on a grid of 5x6 define the lines to draw the letter
      /*
          1   2   3   4   5
          6   7   8   9   10
          11  12  13  14  15
          16  17  18  19  20
          21  22  23  24  25
          26  27  28  29  30

        example : draw 'L' will be: [[1,21], [21,25]] because first we will draw a line from point 1 to point 21 and then another from there to point 25.
                  user [-1,-1] to define 'pen up', in other words : to stop the continuos line drawing and start drawing fromt the next point on without joining with the previous one.
      */
      _blueprints : [
        {key : "" , value:[]},
        {key : " ", value:[]},
        {key : "2", value:[[1,5],[5,10],[10,16],[16,21],[21,25]]},
        {key : "a", value:[[1,5],[5,25],[-1,-1],[1,21],[-1,-1],[11,15]]},
        {key : "c", value:[[1,5],[1,21],[21,25]]},
        {key : "d", value:[[1,21],[21,24],[24,20],[20,10],[10,4],[4,1]]},
        {key : "e", value:[[5,1],[1,21],[21,25],[-1,-1],[11,14]]},
        {key : "g", value:[[5,1],[1,21],[21,25],[25,15],[15,13]]},
        {key : "h", value:[[1,21],[-1,-1],[11,15],[-1,-1],[5,25]]},
        {key : "k", value:[[1,21],[-1,-1],[5,11],[8,25]]},
        {key : "i", value:[[1,3],[2,22],[21,23]]},
        {key : "l", value:[[1,21],[21,25]]},
        {key : "m", value:[[21,1],[1,18],[18,5],[5,25]]},
        {key : "n", value:[[21,1],[1,25],[25,5]]},
        {key : "o", value:[[5,1],[1,21],[21,25],[25,5]]},
        {key : "p", value:[[11,15],[15,5],[5,1],[1,21]]},
        {key : "q", value:[[5,1],[1,21],[21,25],[25,5],[-1,-1],[18,28]]},
        {key : "r", value:[[11,15],[15,5],[5,1],[1,21],[-1,-1],[14,25]]},
        {key : "s", value:[[5,1],[1,11],[11,15],[15,25],[25,21]]},
        {key : "t", value:[[1,5],[-1,-1],[3,23]]},
        {key : "u", value:[[1,21],[21,25],[25,5]]},
        {key : "v", value:[[1,23],[23,5]]},
        {key : "w", value:[[1,22],[22,18],[18,24],[24,5]]},
        {key : "y", value:[[1,13],[13,23],[-1,-1],[13,5]]},
        {key : "!", value:[[2,12],[-1,-1],[17,22]]},
        {key : ">", value:[[1,13],[13,21]]},
        {key : "+", value:[[3,23],[-1,-1],[11,15]]},
        {key : "*", value:[[3,23],[-1,-1],[11,15],[-1,-1],[1,25],[-1,-1],[5,21]]},
        {key : "=", value:[[6,10],[-1,-1],[16,20]]},
        {key : "-", value:[[6,10]]},
        {key : "(", value:[[2,6],[6,16],[16,22]]},
        {key : ")", value:[[4,10],[10,20],[20,24]]},
      ],
      _widthFactors : [
        {key : "!", value:3},
        {key : ">", value:3},
        {key : "", value:0},
        {key : "i", value:3}
      ],
      /**
      * Not all letters have the same 'width'. This function returns the 'width factor' for a given character. The width factor is used to determine spacing when drawing Letter's
      *
      * @param {string} char - The character to get the width factor for
      *
      * @returns {number} the 'width factor' for a given character.
      */
      getWidthFactor : function(char){
        for(var i = 0; i < BluePrints._widthFactors.length; i++){
          if(BluePrints._widthFactors[i].key == char){
            return BluePrints._widthFactors[i].value;
          }
        }
        return 5;
      },
      /**
      * Function to get the 'blueprint' of a given character
      *
      * @param {string} char - The character to get the blueprint for
      *
      * @returns {array} An array of relative point coordinates
      */
      getBluePrint : function(char){
        for(var i = 0; i < BluePrints._blueprints.length; i++){
          if(BluePrints._blueprints[i].key == char){
            return BluePrints._blueprints[i].value;
          }
        }
      }
    }
    return BluePrints;
  }
);
