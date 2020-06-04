const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); 
const app = express();

// Settings
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));

// Routes
app.use(require('./routes/routes'));
// Static Files
app.use(express.static('public'));

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});