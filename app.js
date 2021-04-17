const express = require('express'),
path = require('path'),
morgan = require('morgan'),
exphbs = require('express-handlebars'),
session = require('express-session'),
passport = require('passport'),
flash = require('connect-flash'),
MySQLStore = require('express-mysql-session')(session),
bodyParser = require('body-parser');
eventEmitter = require('./lib/events');
pool = require('./database');

const { database } = require('./keys');

const app = express();
server = require('http').Server(app),
io = require('socket.io')(server);

require('./lib/passport');

// Settings
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'paternoster',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  app.locals.reqInProg;
  app.locals.storeQuantity;
  app.locals.storeRequest;
  next();
});

// Sockets
var clients = 0;
io.on('connection', (socket) => {
  console.log(app.locals.user);
  if (app.locals.user){
    socket.join(app.locals.user.id);
    console.log(app.locals.user.id);
  }
  socket.on('reqConfirmed', (confirmation) => {
    if(confirmation){
      pool.query('INSERT INTO request set ?', [app.locals.storeRequest]);
      pool.query('UPDATE product set quantity = ? WHERE id = ?', [app.locals.storeQuantity,app.locals.storeRequest.prod]);
     }
    app.locals.reqInProg = false;
  })
  clients++;
  eventEmitter.on('confirm', function (){
    socket.to(app.locals.storeRequest.user).emit('askReqConfirm');
    console.log("confirmed");
    console.log(app.locals.storeRequest.user);
  });
    

  if (clients == 1) {
    io.sockets.emit('clientsconnected',{ description: clients + ' client connected!'});
  }
  else{
    io.sockets.emit('clientsconnected',{ description: clients + ' clients connected!'});
  }
  console.log('user connected');
  socket.on('disconnect', () => {
    clients --;
    if (clients == 1) {
      io.sockets.emit('clientsconnected',{ description: clients + ' client connected!'});
    }
    else{
      io.sockets.emit('clientsconnected',{ description: clients + ' clients connected!'});
    }
    console.log('user disconnected');
  });
});

//Routes
app.use(require('./routes/user.routes'));
app.use('/reqlist',require('./routes/req.routes'));
app.use('/objlist',require('./routes/list.routes'));
app.use('/profile',require('./routes/profile.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next){
	res.status(404).redirect('/');
});

// Start Server
module.exports = {app,server,io};