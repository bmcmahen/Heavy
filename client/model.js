var request = require('superagent');
var d3 = require('d3-browserify');
var Emitter = require('component-emitter');

var formatDate = d3.time.format('%x');
var formatTime = d3.time.format('%X')

// User
// {
//  _id
//  defaults: { metric: true },
//  weights: [
//    { 
//      weight: num,
//      date: MM-DD-YYYY,
//      time: time
//    }
//  ],
//  following: [userId]


module.exports = User;

function User(){
  this.fetch();
}

Emitter(User.prototype);

User.prototype.save = function(){
  request
    .put('/api/user')
    .send(this.attr)
    .end(function(error, res){
      if (err) console.log(err);
    }.bind(this));
}

User.prototype.fetch = function(){
  request.get('/api/user', function(res){
    this.attr = res.body;
    this.emit('ready', this.attr);
  }.bind(this));
}

User.prototype.getFollowing = function(){
  request.get('/api/user/friends', function(res){
    this.friends = res.body;
    this.emit('friends', this.friends);
  }.bind(this));
};

User.prototype.addWeight = function(weight){
  var d = new Date();
  this.attr.weights.push({
    weight: weight,
    date: formatDate(d),
    time: formatTime(d)
  });
}