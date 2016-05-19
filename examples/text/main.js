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
  require(["squiggle","SampleScreen","slider"], function (squiggle, SampleScreen, slider) {
		console.log(squiggle);
		squiggle.init();
		// output the squiggle Object to the console ... just for kicks
		var sample = new SampleScreen();
		// set the active screen
		squiggle.screen = sample;
		// In this example we are using a bootstrap-slider to show how to inject values inside squiggle
		$('#ex1').slider({
			formatter: function(value) {
				return 'Jerkiness: ' + value;
			}
		}).on('change', function(){
			squiggle.injectValue('jerkiness',$('#ex1').prop('value'));
		});
  });
});

requirejs.onError = function (err) {
    console.log("REQUIRE-JS: [ERROR] " , err);
    throw err;
};
