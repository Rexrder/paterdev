const dotenv = require('dotenv');
dotenv.config();

/**
 * Importing the Main App
 */

const { app,server, mov, inSen } = require('./app');

app.set('socketio',io);
app.locals.draw = 0;
app.locals.reqInProg = false;
app.locals.confirm = false;

//Wait until Drawer 0
mov[0].writeSync(1);
inSen[0].watch((err, value) => {
    if (err) {
        throw err;
    }
    if(value){
        mov[0].write(0);
        server.listen(app.get('port'));
        console.log('Server is in port', app.get('port'));
        inSen[0].unwatch();
    }
});
/*server.listen(app.get('port'));
console.log('Server is in port', app.get('port'));*/