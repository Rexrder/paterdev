var events = require('events');
var eventEmitter = new events.EventEmitter();
const Gpio = require ('onoff').Gpio;

eventEmitter.on('resDraw', function (){
    
});

eventEmitter.on('srcDraw', function (){
    setTimeout(function(){
        eventEmitter.emit('confirm');
        console.log('ready');
    },5000);
});

module.exports = eventEmitter;