var AppDispatcher = require('../AppDispatcher/AppDispatcher');
var Emitter = require('component-emitter');
var UserConstants = require('../constants/UserConstants');
var _ = require('underscore');
var request = require('superagent');

var CHANGE_EVENT = 'change';

/**
 * Subscribe to store for data
 */

function UserStore(){
  this.attr = {};
  this.init();
};

Emitter(UserStore.prototype);

UserStore.prototype.init = function(){
  request.get('/user', function(res){
    this.attr = res.body;
    this.emitChange();
  }.bind(this));
};

UserStore.prototype.getAll = function(){
  return this.attr;
};

UserStore.prototype.emitChange = function(){
  this.emit('change');
};

UserStore.prototype.addChangeListener = function(fn){
  this.on('change', fn);
};

UserStore.prototype.removeChangeListener = function(fn){
  this.off('change', fn);
};

UserStore.prototype.addFriend = function(id){
  this.attr.friends.push(id);
};

UserStore.prototype.removeFriend = function(id){
  console.log('remove friend');
};

var user = new UserStore();

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var id;

  switch(action.actionType) {

    case UserConstants.FRIEND_ADD:
      id = action.id;
      user.addFriend(id);
      break;

    case UserConstants.FRIEND_REMOVE:
      var id = action.id;
      user.removeFriend(id);
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  user.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = user;