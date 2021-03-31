const express = require('express'),
path = require('path'),
morgan = require('morgan'),
exphbs = require('express-handlebars'),
session = require('express-session'),
passport = require('passport'),
flash = require('connect-flash'),
MySQLStore = require('express-mysql-session')(session),
bodyParser = require('body-parser');

const { database } = require('./keys');

const app = express();
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
  next();
});

// Routes
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
module.exports = app;