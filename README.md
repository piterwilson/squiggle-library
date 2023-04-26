# Squiggle 

## Description

The Squiggle library is a set of classes that are ready to use to implement animation drawing applications that output animated .gif's.

Squiggle is made using [p5.js](http://p5js.org/) 

### Dependencies

The Squiggle library requires:

* p5.js
* require.js
* jquery
* Underscore
* Backbone

### Installation

Run `npm install` to install dependencies.
Run `npm run build-js` to minify the javascript to the dist folder.

### How to use squiggle.js to write an application

* Write a Screen Object. Screen Objects work just like p5.js sketches

        define(
          function(require, exports, module) {
            var squiggle = require("squiggle");
            var Screen = squiggle.views.screens.Screen;
            var SampleScreen = Screen.extend({
              setup : function(){    
                // setup things, called only once
              },
              draw : function(){
                // draw stuff on screen, once per frame
              }
            });
            return SampleScreen;
          }
        );

* In your main script file use require.js to include squiggle and its dependencies.

        require.config({
            paths: {
                jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min',
                underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
                backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
                p5 : "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.24/p5.min",
                squiggle: '../lib/squiggle'
            },
            shim: {
                backbone: {
                    exports: 'Backbone'
                },
                underscore: {
                    exports: '_'
                },
                p5:{
                  exports : 'p5'
                }
            },
           waitSeconds: 5
        });

        function windowLoaded(callback){
          if(document.readyState == "complete"){
            callback();
          }else{
            window.addEventListener("load", function(){
              callback();
            });
          }
        }

* Once squiggle and dependencies are loaded, call init() on squiggle, create a Screen Object and assign it as squiggle's active screen.

        windowLoaded(function() {
          require(["squiggle","SampleScreen"], function (squiggle, SampleScreen) {
        		// init squiggle 
            squiggle.init();
        		console.log(squiggle);
            // create a Screen Object
        		var sample = new SampleScreen();
            // assign it as the active screen for squiggle
        		squiggle.screen = sample;
          });
        });

        requirejs.onError = function (err) {
            console.log("REQUIRE-JS: [ERROR] " , err);
            throw err;
        };


### Acknowledgments

* Squiggle uses [p5.js](http://p5js.org/) under the hood for its drawing routines.
* Squiggle uses [gif.js](http://jnordberg.github.io/gif.js/) to export .gif's.

### License

This project is made for the public domain. 

### To do 

* Button crashes if width,height not set
* Button state problem
* Rectangle with jerkiness 0 doesn't draw

