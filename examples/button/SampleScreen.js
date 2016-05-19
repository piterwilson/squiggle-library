define(
  function(require, exports, module) {
    var squiggle = require("squiggle"),
        Screen = squiggle.views.screens.Screen,
        Button = squiggle.views.ui.Button,
        RectangleView = squiggle.views.primitives.Rectangle,
        SampleScreen = Screen.extend({
      setup : function(){
        var r1, r2, _s = 80, button = new Button().setText('')
                                           .setWidth(_s)
                                           .setHeight(_s)
                                           .setPosition(window.innerWidth/2 - _s/2,window.innerHeight/2 - _s/2)
                                           .setBackgroundColorForState("#41BDFD",Button.states.NORMAL)
                                           .setBackgroundColorForState("#50A9D9",Button.states.HOVER)
                                           .setBackgroundColorForState("#285269",Button.states.DOWN)
                                           .on(Button.events.CLICKED,function(){
                                             console.log('click');
                                           }.bind(this));
        button.getBackgroundRectangle().setRoundedCorners(_s);
        r1 = new RectangleView().setWidth(_s/2).setHeight(_s/6).setStrokeWeight(0).setFillColor("#ffffff").setPosition(_s/4,_s/2 - (_s/12));
        r2 = new RectangleView().setWidth(_s/6).setHeight(_s/2).setStrokeWeight(0).setFillColor("#ffffff").setPosition(_s/2 - (_s/12), _s/4);
        button.addSubview(r1);
        button.addSubview(r2);
        
        // all views must be added as a children of the Screen in order to be rendered
        this.addSubview(button);
      }
    });
    return SampleScreen;
  }
);
