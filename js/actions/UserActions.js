var Dispatch = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var AppActions = require('./AppActions');
var WeightActions = require('./WeightActions');
var request = require('superagent');
var debug = require('debug')('heavy:actions:useractions');

var UserActions = {

  addFriend: function(id) {
  },

  removeFriend: function(id){
  },

  load: function(){

    function success(usr){
      debug('loaded user', usr);
      Dispatch.handleAction(UserConstants.LOAD_USER_SUCCESS, usr);
      WeightActions.load();
      AppActions.page('main');
    }

    Dispatch.handleAction(UserConstants.LOAD_USER, null);
    // check for preloaded doc
    if (window._preloaded_user) {
      return success(window._preloaded_user);
    }

    request.get('/api/user', function(res){
      if (res.ok) return success(res.body);
      return Dispatch.handleAction(LOAD_USER_FAIL, res.text);
    });
  }

};

module.exports = UserActions;