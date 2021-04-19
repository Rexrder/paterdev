const dotenv = require('dotenv');
dotenv.config();
const GpioSt = require ('onoff').Gpio;
const zerIn = new GpioSt(13, 'in', 'rising', {debounceTimeout: 10});
const movIn = new GpioSt(5, 'out');

/**
 * Importing the Main App
 */

const {app,server} = require('./app');

app.set('socketio',io);
app.locals.draw = 0;
app.locals.reqInProg = false;
app.locals.confirm = false;

//Wait until Drawer 0
movIn.writeSync(1);
zerIn.watch((err, value) => {
    if (err) {
        throw err;
    }
    if(value){
        movIn.write(0);
        server.listen(app.get('port'));
        console.log('Server is in port', app.get('port'));
        zerIn.unwatchAll();
        movIn.unexport();
        zerIn.unexport();
    }
});
/*server.listen(app.get('port'));
console.log('Server is in port', app.get('port'));*/