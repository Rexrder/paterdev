const express = require('express'),
path = require('path'),
morgan = require('morgan'),
exphbs = require('express-handlebars'),
mysql = require('mysql'),
myConnection = require('express-myconnection');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();

// Settings
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'paternoster'
  }, 'single'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());

// Routes
app.use(require('./routes/req.routes'));
app.use(require('./routes/prof.routes'));
app.use(require('./routes/list.routes'));

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = false;
  next();
});

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});