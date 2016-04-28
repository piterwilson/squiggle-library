require.config({
		paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
				p5 : "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.24/p5.min",
				squiggle: '../lib/squiggle',
				randomColor : "https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.4.4/randomColor.min",
				slider: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/7.0.2/bootstrap-slider.min"
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
