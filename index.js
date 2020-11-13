const express = require('express'),
path = require('path'),
morgan = require('morgan'),
exphbs = require('express-handlebars'),
session = require('express-session');
passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

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
app.use(require('./routes/req.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/list.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
/* app.use('/js', express.static(path.join(__dirname,'node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/js', express.static(path.join(__dirname,'node_modules/jquery/dist/js')));  //redirect JS jQuery
app.use('/css', express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));  //redirect CSS bootstrap */

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});