var pixel = require("node-pixel");
var five = require("johnny-five");

var board = new five.Board({
    repl: false,
    debug: false
});

var strip = null;

var fps = 15;

var stripObj = {
    //takes in a color, desired amount of flashes and the desired delay
      ring_around: function(){
        var colorArr = ['red', 'blue'];
        var color_switch = false;
        var color_switch_counter = 0;

        var colorPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var counter = 0;
        var strip_length = colorPos.length;
        
        var ring_around = setInterval(function(){
          if(!color_switch){
            var p = strip.pixel(colorPos[counter % strip_length])

            console.log(counter % strip_length);
            p.color("red");
            counter++;
            console.log(counter);
            strip.show();
            if(counter % strip_length === 0){
              color_switch = true;
              color_switch_counter++;
            }
          }
          else {
            var p = strip.pixel(colorPos[counter % strip_length])

            console.log(counter % strip_length);
            p.color("blue");
            counter++;
            console.log(counter);
            strip.show();
            if(counter % strip_length === 0){
              clearInterval(ring_around);
              color_switch = 0;
              strip.off();
              strip.show();
            }
          }
        }, 50);
      },
    ok: function(){ stripObj.blink("green", 1, 1)},
    err: function(){ stripObj.blink("red", 1, 1) },
    rainbow: function(){
      strip.color();
    },
    blink: function(paint, flash_count, time){
      console.log(paint);
      var light_delay = time;
      var off_delay = time * 2;
      var light_counter = 0;
      var off_counter = 0;
      var light_timer = setInterval(function(){
        stripObj.paint(paint)
        light_counter++;
        console.log('light_timer');
        if(light_counter === flash_count){
          clearInterval(light_timer);
        }
      }, 1000/light_delay);

      var off_timer = setTimeout(function() {
        var off_timer_int = setInterval(function(){
          stripObj.off();
          off_counter++
          console.log('off_timer');
          console.log(off_counter);
          if(off_counter === flash_count){
            clearInterval(off_timer_int);
          }
        }, 1000/light_delay);
      }, 1000/off_delay)
    },
    //takes in a color preset or hex
    paint: function(paint){
      strip.color(paint);
      strip.show();
    },
    //takes in rgb values to show a color
    //you can tune the brightness this way as well
    paint_rgb: function(r,g,b){
      strip.color("rgb(" + r +"," + g + "," + b + ")");
      strip.show();
    },
    //preset colors
    select_color: ["red", "green", "blue", "yellow", "teal", "pink", "orange", "purple"],
    //turn off the neopixels
    off: function(){
      strip.off();
      strip.show();
    }
}


board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [{pin: 6, length: 24}, ], // this is preferred form for definition
    });

    strip.on("ready", function() {
        // do stuff with the strip here.

        console.log('Strip is ready!')
        // stripObj.off();
        //stripObj.blink("blue", 1, fps);
        console.log(strip);

        sendStrip();
    });
});


function sendStrip() {
  console.log('object sent this is flora.js');
  module.exports = [stripObj , board];
}
