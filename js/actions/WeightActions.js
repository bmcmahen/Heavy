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

    var current = moment();
    var date = current.utc().format()
    var pretty = current.format('MMMM Do YYYY')
    var id = clientId++;

    var weight = {
      weight: text,
      date: date,
      pretty_date: pretty
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
    Dispatcher.handleAction(Constants.DESTROY_WEIGHT, { id : id });
    request
      .del('/api/weights/'+id)
      .end(function(res){
        if (res.ok) {
          Dispatcher.handleAction(Constants.DESTROY_WEIGHT_SUCCESS, { id : id });
        } else {
          Dispatcher.handleAction(Constants.DESTROY_WEIGHT_FAIL, { id: id, error: res.text });
        }
      });
  }

};

module.exports = HeavyActions;