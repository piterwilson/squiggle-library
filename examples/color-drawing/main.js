require.config({
	paths: {
			jquery: '../vendor/jquery-2.2.3.min',
			underscore: '../vendor/underscore-min',
			backbone: '../vendor/backbone-min',
			p5 : "../vendor/p5.min",
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
