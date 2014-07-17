var Dispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/WeightConstants');
var debug = require('debug')('heavy:actions:weight');
var request = require('superagent');
var moment = require('moment');
var momentTimezone = require('moment-timezone');

var clientId = 0;

var HeavyActions = {

  /**
   * Initial load of all our weights
   */
  
  load: function(){
    Dispatcher.handleAction(Constants.LOAD_WEIGHTS, null);

    // perform GET request
    request.get('/api/weights', function(res){
      if (res.ok) {
        debug('fetched weights', res.body);
        return Dispatcher.handleAction(Constants.LOAD_WEIGHTS_SUCCESS, res.body);
      }
      
      Dispatcher.handleSyncAction(Constants.LOAD_WEIGHTS_FAIL, res.error);
    });
  },

  create: function(text) {

    var date = moment().utc().format()
    var id = clientId++;

    var weight = {
      weight: text,
      date: date
    };

    Dispatcher.handleAction( Constants.ADD_WEIGHT,{
      weight: weight,
      id: id
    });

    request
      .post('/api/weights')
      .send(weight)
      .end(function(res){
        if (res.ok){
          Dispatcher.handleAction(Constants.ADD_WEIGHT_SUCCESS, { weight: res.body, id: id });
        } else {
          Dispatcher.handleAction(Constants.ADD_WEIGHT_FAIL, { id: id, error: res.text })
        }
      })
  },

  destroy: function(id){
    Dispatcher.handleViewAction({
      actionType: Constants.DESTROY_WEIGHT,
      id: id
    });
  }

};

module.exports = HeavyActions;