define(
  function(require, exports, module) {
    /**
    * This class defines 'blueprints' to draw Letter instances. The blueprint is defined as points in a grid that define the lines that make the Letter.
    *
    * @exports squiggle/views/text/BluePrints
    */
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
      _b : [
        {k: "" , v:[]},
        {k: " ", v:[]},
        {k: "2", v:[[1,5],[5,10],[10,16],[16,21],[21,25]]},
        {k: "a", v:[[1,5],[5,25],[-1,-1],[1,21],[-1,-1],[11,15]]},
        {k: "c", v:[[1,5],[1,21],[21,25]]},
        {k: "d", v:[[1,21],[21,24],[24,20],[20,10],[10,4],[4,1]]},
        {k: "e", v:[[5,1],[1,21],[21,25],[-1,-1],[11,14]]},
        {k: "g", v:[[5,1],[1,21],[21,25],[25,15],[15,13]]},
        {k: "h", v:[[1,21],[-1,-1],[11,15],[-1,-1],[5,25]]},
        {k: "k", v:[[1,21],[-1,-1],[5,11],[8,25]]},
        {k: "i", v:[[1,3],[2,22],[21,23]]},
        {k: "l", v:[[1,21],[21,25]]},
        {k: "m", v:[[21,1],[1,18],[18,5],[5,25]]},
        {k: "n", v:[[21,1],[1,25],[25,5]]},
        {k: "o", v:[[5,1],[1,21],[21,25],[25,5]]},
        {k: "p", v:[[11,15],[15,5],[5,1],[1,21]]},
        {k: "q", v:[[5,1],[1,21],[21,25],[25,5],[-1,-1],[18,28]]},
        {k: "r", v:[[11,15],[15,5],[5,1],[1,21],[-1,-1],[14,25]]},
        {k: "s", v:[[5,1],[1,11],[11,15],[15,25],[25,21]]},
        {k: "t", v:[[1,5],[-1,-1],[3,23]]},
        {k: "u", v:[[1,21],[21,25],[25,5]]},
        {k: "v", v:[[1,23],[23,5]]},
        {k: "w", v:[[1,22],[22,18],[18,24],[24,5]]},
        {k: "y", v:[[1,13],[13,23],[-1,-1],[13,5]]},
        {k: "!", v:[[2,12],[-1,-1],[17,22]]},
        {k: ">", v:[[1,13],[13,21]]},
        {k: "+", v:[[3,23],[-1,-1],[11,15]]},
        {k: "*", v:[[3,23],[-1,-1],[11,15],[-1,-1],[1,25],[-1,-1],[5,21]]},
        {k: "=", v:[[6,10],[-1,-1],[16,20]]},
        {k: "-", v:[[6,10]]},
        {k: "(", v:[[2,6],[6,16],[16,22]]},
        {k: ")", v:[[4,10],[10,20],[20,24]]},
      ],
      _wf : [
        {k: "!", v:3},
        {k: ">", v:3},
        {k: "", v:0},
        {k: "i", v:3}
      ],
      /**
      * Not all letters have the same 'width'. This function returns the 'width factor' for a given character. The width factor is used to determine spacing when drawing Letter's
      *
      * @param {string} char - The character to get the width factor for
      *
      * @returns {number} the 'width factor' for a given character.
      */
      getWidthFactor : function(char){
        for(var i = 0; i < BluePrints._wf.length; i++){
          if(BluePrints._wf[i].k == char){
            return BluePrints._wf[i].v;
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
        for(var i = 0; i < BluePrints._b.length; i++){
          if(BluePrints._b[i].k == char){
            return BluePrints._b[i].v;
          }
        }
      }
    }
    return BluePrints;
  }
);
