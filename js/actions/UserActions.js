var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var request = require('superagent');

var UserActions = {

  addFriend: function(id) {

    AppDispatcher.handleViewAction({
      actionType: UserConstants.FRIEND_ADD,
      id: id
    });

  },

  removeFriend: function(id){
    AppDispatcher.handleViewAction({
      actionType: UserConstants.FRIEND_REMOVE,
      id: id
    });
  }

};

module.exports = UserActions;