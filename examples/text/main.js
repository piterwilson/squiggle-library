require.config({
		paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
				squiggle: '../lib/squiggle',
				randomColor : "../lib/randomColor",
				slider: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/7.0.2/bootstrap-slider.min"
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
  require(["squiggle","SampleScreen","slider"], function (squiggle, SampleScreen, slider) {
		squiggle.init();
		// output the squiggle Object to the console ... just for kicks
		console.log(squiggle);
		console.log(slider);
		var sample = new SampleScreen();
		// set the active screen
		squiggle.screen = sample;
		$('#ex1').slider({
			formatter: function(value) {
				return 'Jerkiness: ' + value;
			}
		}).on('slide', function(){
			squiggle.injectValue('jerkiness',$('#ex1').prop('value'));
		});
		squiggle.injectValue('jerkiness',$('#ex1').prop('value'));
  });
});

requirejs.onError = function (err) {
    console.log("REQUIRE-JS: [ERROR] " , err);
    throw err;
};
