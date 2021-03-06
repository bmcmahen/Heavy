/**
 * Module dependencies
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var swig = require('swig');
var morgan = require('morgan');

/**
 * Relative dependencies
 */

require('./auth');


// Create our app
var app = express();

// app config
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// app middleware
app.use(morgan('short'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes/app'));
app.use('/api/user', require('./routes/user'));
app.use('/api/weights', require('./routes/weights'));
app.use('/auth', require('./routes/auth'));

app.listen(3000);