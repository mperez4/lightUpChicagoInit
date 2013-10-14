/* run node tweet_blink.js --ledoff -q "yourQuery"*/

var argv = require('optimist')
		   .usage('Usage: $0 --pin [num] --search [string] --speed [milliseconds] --ledoff')
		   .default({'pin': 12,
					 'search': "bitch",
					 'speed': 2000})
		   .alias({'pin': 'p',
				   'search': 'q',
				   'speed': 's',
				   'ledoff': 'l'})
		   .argv;

var led = argv.pin;
var track = argv.search;
var timeOn = argv.speed;	
var isOn = false; 
var isStarting = true;
var spi = require('spi'),

RPixel = require('raspberrypixels');
var Pixel = RPixel.Pixel;
var numPixels = 11;
var deviceName = '/dev/spidev0.0';

var device  = new spi.Spi(deviceName, function(){});
var pixels  = new RPixel.PixelBuffer(device, numPixels); //instantiates the PixelBuffer class
var r = 0;
var g = 0;
var b = 0;

var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'TroyIuC1l3i3laNlwl5mg',
    consumer_secret: 'qYRSTEHzHhTsL0CBcMnXxjqeY5UQ6U4C0kNvmPSG4K4',
    access_token_key: '1230084602-UtUB4QdlhNkv1aLqrjS3eYoZ96APon5IhjOqBFt',
    access_token_secret: 'wscl1nV8gFO4kMhtJy7DjhQKkpJHB1fW5Jzb4RXZq8'
});
//----------------------------------------------------------------------

onStart();

twit.stream('filter', { track: track }, function(stream) {
	//event
    stream.on('data', function(data) {
    	if(output(data) && !onStart() ){	    		    	
	    	//throbbbbbbbb
	    	setTimeout(function(){	
		    	isOn = false;		    	
		    }, timeOn);
		}
	});

});

setInterval(onStart, 100);
// startup
function onStart(){       
     
    for(int i = 0; i == 255; i+= .5){
    	for(int n = 0; n < numPixels.length; n++){
    	pixles.setRGB(n, i,i ,i);    	
    }
    pixels.update();
}
    return true;	
}
//----------------------------------------------------------------------
//animation
function animate(){
	var color = {r: Math.random()*254, b: Math.random()*254, g: Math.random()};
	//throbb!

}
//----------------------------------------------------------------------
function output(data){
	if(typeof data !== 'undefined' &&
	   typeof data.user !== 'undefined'){
		printFragment("Created at", data.created_at);
		printFragment("Created by", data.user.name);
		printFragment("Tweet:", data.text);
		 console.log("");		 			 		 
		if (!onStart()) {return true;}
	}else return false; //error receiving tweet		
	
}
	
function printFragment(prefixMessage, value){
	if(typeof value !== 'undefined') console.log(prefixMessage+" "+value);
}

