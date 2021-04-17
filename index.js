const dotenv = require('dotenv');
dotenv.config();

/**
 * Importing the Main App
 */

const {app,server} = require('./app');

app.set('socketio',io);
app.locals.reqInProg = false;
app.locals.done = false;

server.listen(app.get('port'));
console.log('Server is in port', app.get('port'));