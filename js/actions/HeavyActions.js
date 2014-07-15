var AppDispatcher = require('../dispatcher/AppDispatcher');
var HeavyConstants = require('../constants/HeavyConstants');
var request = require('superagent');

var HeavyActions = {

  /**
   * Initial load of all our weights
   */
  
  load: function(){
    AppDispatcher.handleSyncAction({
      actionType: HeavyConstants.LOAD_WEIGHTS,
      action: null
    });

    // perform GET request
    request.get('/user/weights', function(res){
      if (res.body) {
        AppDispatcher.handleSyncAction({
          actionType: HeavyConstants.LOAD_WEIGHTS_SUCCESS,
          action: res.body
        });
      } else {
        AppDispatcher.handleSyncAction({
          actionType:HeavyConstants.LOAD_WEIGHTS_FAIL,
          action: res.error
        });
      }
    });
  },

  create: function(text) {
    AppDispatcher.handleViewAction({
      actionType: HeavyConstants.WEIGHT_ADD,
      text: text
    });
  },

  destroy: function(id){
    AppDispatcher.handleViewAction({
      actionType: HeavyConstants.WEIGHT_DESTROY,
      id: id
    });
  }

};

module.exports = HeavyActions;