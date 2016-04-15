/**
* Letter.js
*
* by Juan Carlos Ospina Gonzalez
* Amsterdam, 2016
*
* Letter a class to encapsulate the concept of an animated typographic character. At its core, it is a View that draws a set of lines using a 'blueprint'.
*/
define(
  function(require, exports, module) {
    var Line = require("squiggle/views/primitives/Line");
    var Colors = require("squiggle/Colors");
    var BluePrints = require("squiggle/views/text/BluePrints");
    var MathUtils = require("squiggle/utils/MathUtils");
    var Letter = Line.extend({
        initialize: function(sketch) {
          Line.prototype.initialize.apply(this, arguments);
          this.fontSize = 16;
          this.strokeWeight = 3;
          this.jerkiness = 1;
          this.initProperties([
            {name:'blueprint',value:[]},
            {name:'widthFactor',value:5}
          ]);
          this.positions = [];
          this.mustCalculatePositions = true;
        },
        /**
        * Sets the character to be drawn in the Letter. The Function will look for the blueprint and width factor matching the character and set the matching properties if found.
        *
        * @param {string} char - The chatacter to draw
        *
        * @returns {Object} the Letter instance
        */
        setCharacter:function(char){
          char = char.toLowerCase();
          var blueprint = BluePrints.getBluePrint(char);
          if(blueprint == undefined){
            char = "*";
            blueprint = BluePrints.getBluePrint(char);
          }
          // need to add "empty" position at the end
          blueprint.push([-1,-1]);
          this.setBlueprint(blueprint)
              .setWidthFactor(BluePrints.getWidthFactor(char));
          return this;
        },
        /**
        * Sets the font size to use to draw the Letter
        *
        * @param {number} value - Font size to use
        *
        * @returns {Object} the Letter instance
        */
        setFontSize : function(value){
          this.fontSize = value;
          this.mustCalculatePositions = true;
          return this;
        },
        /**
        * Helper function used in the draw() call to determine if a position is an "empty" position. An empy position is defined as [-1,-1]
        *
        * @param {number} i - The position in the points array to check
        *
        * @see draw
        *
        * @returns void
        */
        pointIsSpace : function(i){
          return (this.points[i][0] === -1 && this.points[i][1] === -1);
        },
        /**
        * Calculates the actual x and y positions (taking into account the fontSize property) that each of the 'blueprint' points will map to.
        *
        * @returns void
        */
        calculatePositionsForFontSize:function(){
          this.positions = [];
          this.positions.push(undefined);
          var rows = 6, columns = 5, dist = 0;
          dist = this.fontSize / columns;
          for(var i = 0; i < rows; i++){
            for(var j = 0; j < columns; j++){
              this.positions.push([
                  j * dist,
                  i * dist
              ]);
            }
          }
          this.mustCalculatePositions = false;
        },
        /**
        * The draw call will take the blueprint information and the positions calculated by calculatePositionsForFontSize() to produce the final coordinates of the lines that draw the Letter.
        *
        * @returns void
        */
        draw : function(){
          var open = false, pos1, pos2,  point1, point2, tmpStrokeColor = this.strokeColor, tmpStokeWeight = this.strokeWeight, randomX = 0, randomY = 0, lastX = -1, lastY = -1;
          // if there are arguments passed, use them to calculate the offset in x and y (parent x and y)
          if(arguments[0] != null){
            Line.prototype.updateOffset.apply(this, arguments);
          }
          // if the positions need to be recalculated, do it!
          if(this.mustCalculatePositions){
            this.calculatePositionsForFontSize();
            // reset the points
            this.points = [];
            // calculate the points and add them
            for(var i = 0; i < this.blueprint.length; i++){
              pos1 = this.blueprint[i][0];
              point1 = this.positions[pos1];
              if(point1 != undefined){
                this.addPoint(point1[0],point1[1]);
              }else{
                this.addPoint(-1,-1);
              }
              pos2 = this.blueprint[i][1];
              point2 = this.positions[pos2];
              if(point2 != undefined){
                this.addPoint(point2[0],point2[1]);
              }else{
                this.addPoint(-1,-1);
              }
            }
          }
          // for debugging, draw the blueprint's bounding box coordinates
          if(this.debug){
              if(this.points.length > 1){
                this.setStrokeColor(Colors.red)
                  .setStrokeWeight(1)
                  .applyStrokeProperties();
                this.sketch.line(
                  this.x + this.offsetX + this.positions[1][0],
                  this.y + this.offsetY + this.positions[1][1],
                  this.x + this.offsetX + this.positions[5][0],
                  this.y + this.offsetY + this.positions[5][1]
                );
                this.sketch.line(
                  this.x + this.offsetX + this.positions[21][0],
                  this.y + this.offsetY + this.positions[21][1],
                  this.x + this.offsetX + this.positions[25][0],
                  this.y + this.offsetY + this.positions[25][1]
                );
                this.sketch.line(
                  this.x + this.offsetX + this.positions[1][0],
                  this.y + this.offsetY + this.positions[1][1],
                  this.x + this.offsetX + this.positions[21][0],
                  this.y + this.offsetY + this.positions[21][1]
                );
                this.sketch.line(
                  this.x + this.offsetX + this.positions[5][0],
                  this.y + this.offsetY + this.positions[5][1],
                  this.x + this.offsetX + this.positions[25][0],
                  this.y + this.offsetY + this.positions[25][1]
                );
              }
          }
          // draw the points
          if(this.points.length > 1){
            this.setStrokeColor(tmpStrokeColor)
              .setStrokeWeight(tmpStokeWeight)
              .applyStrokeProperties();
            this.sketch.strokeJoin(this.sketch.BEVEL);
            for(var i=0; i < this.points.length; i++){
              if(i == 0){
                this.sketch.noFill();
                this.sketch.beginShape();
                open = true;
              }
              if(this.pointIsSpace(i)){
                if(open){
                  this.sketch.endShape();
                  open = false;
                }
                this.sketch.noFill();
                this.sketch.beginShape();
                open = true;
              }else{
                 // add some jerkiness to the points
                  randomX = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
                  randomY = (Math.random() * this.jerkiness) * MathUtils.oneOrMinusOne();
                  this.sketch.vertex(this.x + this.offsetX + randomX + this.points[i][0], this.y + this.offsetY + randomY + this.points[i][1]);
              }
            }
          }
        }

    });
    Letter.widthFactorDivider = 6;
    return Letter;
  }
);
