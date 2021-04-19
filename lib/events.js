var events = require('events');
var eventEmitter = new events.EventEmitter();
const Gpio = require ('onoff').Gpio;

const mov = [new Gpio(5, 'out'), new Gpio(6, 'out')];
const inSen = [new Gpio(13, 'in', 'rising', {debounceTimeout: 10}), new Gpio(26, 'in', 'rising', {debounceTimeout: 10})];

eventEmitter.on('srcDraw', function (actDraw,newDraw){
    inSen[1].unwatch();
    var result = actDraw - newDraw;
    if (result != 0){
        if (result > 6 || (result > -6 && result < 0)){
            inSen[1].watch((err, value) => {
                if (err) {
                    throw err;
                }
                if (value){
                    actDraw--;
                    if(actDraw < 0) actDraw = 15;
                    console.log(actDraw);
                } 
                if (actDraw == newDraw){
                    mov[0].writeSync(0);
                    eventEmitter.emit('confirm');
                    console.log('ready');
                    inSen[1].unwatch();
                }
            });
            mov[0].writeSync(1);
        } 
        else{
            inSen[1].watch((err, value) => {
                if (err) {
                    throw err;
                }
                if (value) actDraw++;
                if(actDraw > 15) actDraw = 0;
                if (actDraw == newDraw){
                    mov[1].writeSync(0);
                    eventEmitter.emit('confirm');
                    console.log('ready');
                    inSen[1].unwatch();
                }            
            });
            mov[1].writeSync(1);
        } 
    }
    else{
        eventEmitter.emit('confirm');
        console.log('ready');
    }
    inSen[0].watch((err, value) => {
        if (err) {
          throw err;
        }
        actDraw = 0;
    });
    /*setTimeout(function(){
        eventEmitter.emit('confirm');
        console.log('ready');
    },5000);*/
});

/*process.on('SIGINT', _ => {
    mov[0].unexport();
    mov[1].unexport();
    inSen[0].unexport();
    inSen[1].unexport();
    process.exit(0);
});*/


module.exports = eventEmitter;