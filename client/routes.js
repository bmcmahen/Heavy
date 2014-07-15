var React = require('react');
var page = require('page');

var Graph = require('./graph');
var User = require('./model');

require('./addweight.js');


page('/app', loadUser, home);

function loadUser(ctx, next){
  request.get('/api/user', function(res){
    ctx.user = res.body;
    next();
  }.bind(this));
}

function home(ctx, next){
  var graph = new Graph(ctx.user.weights || []);
  React.renderComponent(<HelloMessage/> ctx.user, document.getElementById('submission'));
}