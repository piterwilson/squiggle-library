require.config({
		paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
				squiggle: '../lib/squiggle',
				randomColor : "../lib/randomColor"
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
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

windowLoaded(function() {
  require(["squiggle","SampleScreen"], function (squiggle, SampleScreen) {
		squiggle.init();
		// output the squiggle Object to the console ... just for kicks
		console.log(squiggle);
		var sample = new SampleScreen();
		// set the active screen
		squiggle.screen = sample;
  });
});

requirejs.onError = function (err) {
    console.log("REQUIRE-JS: [ERROR] " , err);
    throw err;
};
