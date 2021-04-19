const { Gpio } = require('onoff');

const express = require('express'),
path = require('path'),
morgan = require('morgan'),
exphbs = require('express-handlebars'),
session = require('express-session'),
passport = require('passport'),
flash = require('connect-flash'),
MySQLStore = require('express-mysql-session')(session),
bodyParser = require('body-parser'),
{eventEmitter, mov, inSen} = require('./lib/events');
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
  app.locals.confirm;
  app.locals.draw;
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
     app.locals.confirm = false;
    app.locals.reqInProg = false;
  })
  clients++;
  eventEmitter.on('confirm', function (){
    socket.to(app.locals.storeRequest.user).emit('askReqConfirm');
    app.locals.confirm = true;
    console.log("confirmed");
    console.log(app.locals.storeRequest.user);
  });

  if (app.locals.confirm){
    eventEmitter.emit('confirm');
  }    

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

//Events
eventEmitter.on('srcDraw', function (newDraw){
  inSen[1].unwatch();
  var result = newDraw - app.locals.draw;
  console.log(app.locals.draw);
  console.log(newDraw);
  console.log(result);
  if (result != 0){
      if (result > 6 || (result > -6 && result < 0)){
          inSen[1].watch((err, value) => {
              if (err) {
                  throw err;
              }
              if (value){
                  app.locals.draw--;
                  if(app.locals.draw < 0) app.locals.draw = 15;
                  console.log(app.locals.draw);
              } 
              if (app.locals.draw == newDraw){
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
              if (value){
                  app.locals.draw++;
                  if(app.locals.draw > 15) app.locals.draw = 0;
                  console.log(app.locals.draw);
              } 
              if (app.locals.draw == newDraw){
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
      app.locals.draw = 0;
  });
  /*setTimeout(function(){
      eventEmitter.emit('confirm');
      console.log('ready');
  },5000);*/
});

process.on('SIGINT', _ => {
  mov[0].unexport();
  mov[1].unexport();
  inSen[0].unexport();
  inSen[1].unexport();
  process.exit(0);
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
module.exports = {app,server, mov, inSen};