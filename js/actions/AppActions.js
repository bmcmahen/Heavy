var Dispatch = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var debug = require('debug')('heavy:actions:appactions');

var AppActions = {
  page: function(page){
    Dispatch.handleAction(AppConstants.SWITCH_PAGE, page);
  }
};

module.exports = AppActions;