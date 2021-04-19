var events = require('events');
var eventEmitter = new events.EventEmitter();
const Gpio = require ('onoff').Gpio;

const mov = [new Gpio(5, 'out'), new Gpio(6, 'out')];
const inSen = [new Gpio(13, 'in', 'rising', {debounceTimeout: 10}), new Gpio(26, 'in', 'rising', {debounceTimeout: 10})];

module.exports = {eventEmitter, mov, inSen};