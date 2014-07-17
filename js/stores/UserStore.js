/**
 * Module dependencies
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var CreateStore = require('./CreateStore');

/**
 * Create User Store
 *
 * Loads user info (sans weights)
 * 
 */

var UserStore = CreateStore(AppDispatcher, {

  initialize: function() {
    this.loading = false;
    this.error = null;
    this.attr = {};

    this.bindActions(
      UserConstants.LOAD_USER, this.onLoadUser,
      UserConstants.LOAD_USER_SUCCESS, this.onLoadUserSuccess,
      UserConstants.LOAD_USER_FAIL, this.onLoadUserFail
    )
  },

  onLoadUser: function(){
    this.loading = true;
    this.attr = {};
    this.error = null;
    this.emit('change');
  },

  onLoadUserSuccess: function(attr){
    this.attr = attr;
    this.loading = false;
    this.error = null;
    this.emit('change');
  },

  onLoadUserFail: function(msg){
    this.loading = false;
    this.error = msg;
    this.emit('change');
  }

});

module.exports = UserStore;