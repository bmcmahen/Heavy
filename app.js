var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var comongo = require('co-mongo');
var serve = require('koa-static');
var session = require('koa-session');
var path = require('path');
var co = require('co');
var passport = require('koa-passport');
var views = require('koa-render');

require('./auth');
var config = require('./config.json');


var app = koa()

/**
 * Middleware
 */
app.use(bodyParser());
app.use(views('./views', {
  map: { html: 'handlebars' },
  cache: false
}));
app.keys = ['secret'];
app.use(session());
app.use(serve(path.join(__dirname, 'public')), { defer: true })
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */

var routes = new Router();

routes.get('/', function*(){
  this.body = yield this.render('index');
});

routes.get('/auth/google', passport.authenticate('google'))

routes.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
);

routes.get('/logout', function*(){
  this.session = null;
  this.redirect('/');
});

app.use(routes.middleware())

// Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.redirect('/')
  }
});

var secured = new Router()

secured.get('/app', function*() {
  this.body = yield this.render('app');
});

secured.get('/user/weights', function*(){
  this.body = [
    { weight: 180 , date: '08/10/2014', _id: 1 },
    { weight: 160 , date: '08/15/2014', _id: 2 },
    { weight: 140 , date: '08/25/2014', _id: 3 }
  ]
})

app.use(secured.middleware())

app.listen(3000);